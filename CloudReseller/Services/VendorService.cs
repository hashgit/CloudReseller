using CloudReseller.Api.HttpModules;
using CloudReseller.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CloudReseller.Api.Services
{
    public class VendorService
    {
        private readonly IAllTheCloudsHttp _allTheCloudsHttp;

        public VendorService(IAllTheCloudsHttp allTheCloudsHttp)
        {
            this._allTheCloudsHttp = allTheCloudsHttp;
        }

        public async Task<IList<Product>> GetProducts()
        {
            var products = await _allTheCloudsHttp.GetProducts();
            return products;
        }
    }
}
