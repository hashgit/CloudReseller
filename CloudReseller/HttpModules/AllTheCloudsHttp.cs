using CloudReseller.Api.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CloudReseller.Api.HttpModules
{
    public interface IAllTheCloudsHttp
    {
        Task<IList<Product>> GetProducts();
    }

    public class AllTheCloudsHttp : IAllTheCloudsHttp
    {
        public AllTheCloudsHttp(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public async Task<IList<Product>> GetProducts()
        {
            var client = GetClient();
            var response = await client.GetAsync("/api/products");
            if (response.IsSuccessStatusCode)
            {
                var products = await response.Content.ReadAs<IList<Product>>();
                return products;
            }

            throw new ApplicationException("Invalid response received from vendor");
        }

        private HttpClient GetClient()
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri(Configuration.GetValue<string>("AllTheCloudsHttp:Address"))
            };

            client.DefaultRequestHeaders.Add("api-key", Configuration.GetValue<string>("AllTheCloudsHttp:ApiKey"));
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return client;
        }
    }
}
