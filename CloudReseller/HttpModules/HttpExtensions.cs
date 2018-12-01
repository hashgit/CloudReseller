using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CloudReseller.Api.HttpModules
{
    public static class HttpExtensions
    {
        public async static Task<T> ReadAsAsync<T>(this HttpContent httpContent)
        {
            var content = await httpContent.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<T>(content);
            return data;
        }

        public async static Task<HttpResponseMessage> PostAsJsonAsync<T>(this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return await httpClient.PostAsync(url, content);
        }
    }
}
