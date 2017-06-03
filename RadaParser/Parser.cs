using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using AngleSharp;
using AngleSharp.Dom;
using Sqlite;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Version = Domain.Models.Version;

namespace RadaParser
{
    public class Parser
    {
        private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();
        /// <summary>
        /// Main function to parse nad localize changes in documents
        /// </summary>
        public async void UpdateAll()
        {
            var page = 0;
            var yearTo = DateTime.Now.Year;
            var dayNow = DateTime.Now.Day;
            var monthNow = DateTime.Now.Month;

            var existedSourceIds = await _dbContext.Documents.Select(document => document.SourceId).ToListAsync();
            ParallelQuery<IElement> documentsLinks;
            do
            {
                var mainUrl = $"http://brovary-rada.gov.ua/documents/?start={page}0&c=5&d=0&fd=29&fm=12&fy=2011&td={dayNow}&tm={monthNow}&ty={yearTo}&dn=&s=&w=&o=DESC";

                var addressDocument = await BrowsingContext.New(Configuration.Default.WithDefaultLoader()).OpenAsync(mainUrl);

                var body = addressDocument.All.First(element => element.LocalName == "div" && element.ClassName == "bg1-content col-md-8 col-sm-8");

                documentsLinks = body.Children.Where(element => element.LocalName == "a").AsParallel().AsOrdered();

                Console.WriteLine("page " + page);

                foreach (var link in documentsLinks)
                {
                    var sourceId = Convert.ToInt32(Regex.Match(link.GetAttribute("href"), "\\d+").Groups[0].Value);

                    var newDoc = await BrowsingContext.New(Configuration.Default.WithDefaultLoader()).OpenAsync($"http://brovary-rada.gov.ua/documents/{sourceId}.html");

                    var content = newDoc.All.First(element => element.ClassName == "bg1-content col-md-8 col-sm-8");
                    var documentName = content.Children.First(element => element.LocalName == "h1").TextContent;

                    var textsDivs = content.Children.Where(element =>
                        element.ClassName != "col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-4" && // main-content footer
                        element.LocalName != "h1" && // contains the name of document model
                        element.ClassName != "js-print print"); // link to printable version

                    var textStringBuilder = new StringBuilder();
                    foreach (var textDiv in textsDivs)
                    {
                        textStringBuilder.AppendLine(textDiv.TextContent);
                    }

                    if (!existedSourceIds.Contains(sourceId))
                    {
                        var document = new Document
                        {
                            SourceId = sourceId,
                            Name = documentName
                        };
                        var version = new Version
                        {
                            SourceId = sourceId,
                            Text = textStringBuilder.ToString(),
                            Updated = DateTime.Now
                        };

                        _dbContext.Documents.Add(document);
                        _dbContext.Versions.Add(version);

                        Console.WriteLine("\tnew: " + sourceId);
                        continue;
                    }

                    var lastVersion = await _dbContext.Versions.LastAsync(version => version.SourceId == sourceId);

                    existedSourceIds.Remove(sourceId);

                    var text = textStringBuilder.ToString();
                    if (text == lastVersion.Text)
                        continue;

                    Console.WriteLine("\tupdating " + sourceId);
                    _dbContext.Versions.Add(new Version
                    {
                        SourceId = sourceId,
                        Text = text,
                        Updated = DateTime.Now
                    });

                }
                
                page++;
           } while (documentsLinks.Any());

            // Marking documents as deleted from source web site
            foreach (var existedSourceId in existedSourceIds)
            {
                (await _dbContext.Documents.FindAsync(existedSourceId)).Deleted = DateTime.Now;
            }

            Console.WriteLine("SAVING TO DATABASE");

            await _dbContext.SaveChangesAsync();
        }
    }
}
