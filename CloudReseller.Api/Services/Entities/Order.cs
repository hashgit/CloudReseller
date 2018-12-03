using Newtonsoft.Json;
using System.Collections.Generic;

namespace CloudReseller.Api.Services.Entities
{
    public class Order
    {
        [JsonProperty("customerName")]
        public string CustomerName { get; set; }

        [JsonProperty("customerEmail")]
        public string CustomerEmail { get; set; }

        [JsonProperty("lineItems")]
        public IList<Item> LineItems { get; set; }
    }

    public class Item
    {
        [JsonProperty("productId")]
        public string ProductId { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }
    }
}
