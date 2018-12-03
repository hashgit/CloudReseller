using System;
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
        public async Task<IActionResult> Get([FromQuery] CurrencyType currency = CurrencyType.AUD)
        {
            try
            {
                return Ok(await _vendorService.GetProducts(currency));
            }
            catch (NotSupportedException)
            {
                return NotFound(currency);
            }
            catch (Exception)
            {
                // log it

                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
