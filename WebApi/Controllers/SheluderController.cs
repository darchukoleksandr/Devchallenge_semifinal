using System;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/sheluder")]
    public class SheluderController : Controller
    {
        [HttpPost("update")]
        public IActionResult Post([FromBody] TimeSpan interval)
        {
            Sheluders.Sheluder.UpdateSheluder(interval);
            return Ok("Sheluder options updated!");
        }
    }
}
