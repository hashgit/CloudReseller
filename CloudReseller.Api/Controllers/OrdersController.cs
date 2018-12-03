using CloudReseller.Api.Models;
using CloudReseller.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CloudReseller.Api.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {
        private readonly VendorService _vendorService;

        public OrdersController(VendorService vendorService)
        {
            this._vendorService = vendorService;
        }

        // POST api/orders
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Order order)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _vendorService.PostOrder(order);
                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
