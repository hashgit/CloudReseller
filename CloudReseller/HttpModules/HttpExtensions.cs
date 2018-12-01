using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace CloudReseller.Api.HttpModules
{
    public static class HttpExtensions
    {
        public async static Task<T> ReadAs<T>(this HttpContent httpContent)
        {
            var content = await httpContent.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<T>(content);
            return data;
        }
    }
}
