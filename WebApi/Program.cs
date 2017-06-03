using System.IO;
using Microsoft.AspNetCore.Hosting;
using Sqlite;
using WebApi.Sheluders;

namespace WebApi
{
    public class Program
    {
        public static void Main()
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .UseApplicationInsights()
                .Build();
            
            using (var client = new ApplicationDbContext())
            {
                client.Database.EnsureCreated();
                //client.Database.Migrate();
            }

            Sheluder.StartScheduler();

            host.Run();

        }
    }
}
