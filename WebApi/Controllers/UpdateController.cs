using Microsoft.AspNetCore.Mvc;
using RadaParser;

namespace WebApi.Controllers
{
    [Route("api/update")]
    public class UpdateController : Controller
    {
        private readonly Parser _parser = new Parser();

        [HttpPost("all")]
        public IActionResult UpdateAllDocuments()
        {
            _parser.UpdateAll();
            return Ok();
        }
    }
}
