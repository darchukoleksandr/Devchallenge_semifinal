using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sqlite;

namespace WebApi.Controllers
{
    [Route("api/documents")]
    public class DocumentController : Controller
    {
        private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

        [HttpGet]
        public IEnumerable<Document> GetDocuments(int page = 1, int amount = 10, bool deleted = false, bool inclVers = false)
        {
            if (inclVers)
            {
                if (deleted)
                    return _dbContext.Documents
                        .Where(document => document.Deleted != null)
                        .Include(document => document.Versions)
                        .Skip(page * amount).Take(amount);

                return _dbContext.Documents
                    .Where(document => document.Deleted == null)
                    .Include(document => document.Versions)
                    .Skip(page * amount).Take(amount);
            }

            if (deleted)
                return _dbContext.Documents
                    .Where(document => document.Deleted != null)
                    .Skip(page*amount).Take(amount);
            
            return _dbContext.Documents
                .Where(document => document.Deleted == null)
                .Skip(page*amount).Take(amount);
        }

        [HttpGet("{sourceId}")]
        public async Task<Document> GetVersions(int sourceId)
        {
            return await _dbContext.Documents
                .Where(document => document.SourceId == sourceId)
                .Include(document => document.Versions)
                .FirstAsync();
        }
    }
}
