using CloudReseller.Api.HttpModules;
using CloudReseller.Api.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using CloudReseller.Api.Services.Entities;
using Product = CloudReseller.Api.Models.Product;
using Order = CloudReseller.Api.Models.Order;

namespace CloudReseller.Api.Services
{
    public class VendorService
    {
        private readonly IAllTheCloudsHttp _allTheCloudsHttp;

        public VendorService(IAllTheCloudsHttp allTheCloudsHttp, IConfiguration configuration)
        {
            this._allTheCloudsHttp = allTheCloudsHttp;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public async Task<IList<Product>> GetProducts(CurrencyType currency)
        {
            var products = await _allTheCloudsHttp
                .GetProducts();

            IList<FxRate> fxRates = null;
            if (currency != CurrencyType.AUD)
            {
                fxRates = await _allTheCloudsHttp.GetFxRates();
            }

            var mapped = products
                .Select(p => MapToModel(p, fxRates, currency))
                .ToList();

            return mapped;
        }

        public async Task PostOrder(Order order)
        {
            var serviceOrder = new Entities.Order
            {
                CustomerEmail = order.Email,
                CustomerName = order.Name,
                LineItems = order.Items?.Select(o => new Item { ProductId = o.ProductId, Quantity = o.Quantity }).ToList()
            };

            await _allTheCloudsHttp.Order(serviceOrder);
        }

        private Product MapToModel(Entities.Product p, IList<FxRate> fxRates, CurrencyType currency)
        {
            var product = new Product
            {
                Name = p.Name,
                Description = p.Description,
                ProductId = p.ProductId,
                UnitPrice = p.UnitPrice,
            };

            if (currency != CurrencyType.AUD && fxRates != null)
            {
                var target = fxRates.SingleOrDefault(x => x.Target == currency);
                if (target == null)
                {
                    throw new NotSupportedException($"Currenty {currency} is not supported");
                }

                product.UnitPrice = p.UnitPrice * target.Rate;
            }

            return MarkUp(product);
        }

        private Product MarkUp(Product product)
        {
            var markUp = Configuration.GetValue<double>("Markup:AllTheClouds");
            product.UnitPrice = Math.Round(product.UnitPrice + (product.UnitPrice * markUp), 2);
            return product;
        }
    }
}
