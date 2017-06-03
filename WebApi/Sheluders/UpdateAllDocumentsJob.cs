using System.Threading.Tasks;
using Quartz;

namespace WebApi.Sheluders
{
    public class UpdateAllDocumentsJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            new RadaParser.Parser().UpdateAll();
            return Task.CompletedTask;
        }
    }
}
