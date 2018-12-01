using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CloudReseller.Api.Models;
using CloudReseller.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CloudReseller.Api.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly VendorService _vendorService;

        public ProductsController(VendorService vendorService)
        {
            this._vendorService = vendorService;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _vendorService.GetProducts());
            }
            catch (Exception)
            {
                // log it

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
