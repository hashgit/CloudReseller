using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudReseller.Api.HttpModules;
using CloudReseller.Api.Models;
using CloudReseller.Api.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;
using Product = CloudReseller.Api.Services.Entities.Product;

namespace CloudReseller.Api.Tests
{
    public class VendorServiceTests
    {
        // An example unit test
        [Fact]
        public async Task CanRetrieveProductsWithMarkup()
        {
            var httpClient = new Mock<IAllTheCloudsHttp>();
            var configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("Markup:AllTheClouds", "0.10")
                })
                .Build();

            var products = new List<Product>
            {
                new Product {Name = "P1", UnitPrice = 150},
                new Product {Name = "P2", UnitPrice = 100}
            };

            httpClient.Setup(x => x.GetProducts()).Returns(Task.FromResult<IList<Product>>(products));

            var service = new VendorService(httpClient.Object, configuration);

            var result = await service.GetProducts(CurrencyType.AUD);

            Assert.NotNull(result);
            Assert.Equal(2, result.Count);

            Assert.Equal(165, result.First().UnitPrice);
            Assert.Equal(110, result.Last().UnitPrice);
        }
    }
}
