using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers {
    [Route ("api/[controller]")]
    public class ReservationsController : Controller {
        public JObject _reservations { get; set; }
        private readonly IHostingEnvironment _hostingEnviornment;

        public ReservationsController () {
            //string projectRootPath = _hostingEnviornment.ContentRootPath;
            //Console.WriteLine (projectRootPath);
            using (StreamReader file = System.IO.File.OpenText (@"data/sites.geojson"))
            using (JsonTextReader reader = new JsonTextReader (file)) {
                _reservations = (JObject) JToken.ReadFrom (reader);
            }
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get () {
            return Ok (_reservations);
        }

        // GET api/values/5
        [HttpGet ("{id}")]
        public IActionResult Get (int id) {
            JArray features = (JArray) _reservations["features"];
            var feature = features.SelectToken ("$.[?(@.properties.siteId =='16')]");
            return Ok (feature);
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }

    }
}