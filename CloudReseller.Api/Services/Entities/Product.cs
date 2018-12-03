using Newtonsoft.Json;

namespace CloudReseller.Api.Services.Entities
{
    public class Product
    {
        [JsonProperty("productId")]
        public string ProductId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("unitPrice")]
        public double UnitPrice { get; set; }

        [JsonProperty("maximumQuantity")]
        public int? MaximumQuantity { get; set; }
    }
}
