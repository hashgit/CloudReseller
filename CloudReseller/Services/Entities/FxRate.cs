using CloudReseller.Api.Models;
using Newtonsoft.Json;

namespace CloudReseller.Api.Services.Entities
{
    public class FxRate
    {
        [JsonProperty("sourceCurrency")]
        public CurrencyType Source { get; set; }

        [JsonProperty("targetCurrency")]
        public CurrencyType Target { get; set; }

        [JsonProperty("rate")]
        public double Rate { get; set; }
    }
}
