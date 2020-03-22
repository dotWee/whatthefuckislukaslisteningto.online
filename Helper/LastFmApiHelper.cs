using System;
using System.Buffers;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using WhatTheFuckIsLukasListeningTo.Model;

namespace WhatTheFuckIsLukasListeningTo.Helper
{
    public class LastFmApiHelper
    {
        private const string API_KEY = "YOUR_API_KEY";
        private const string USER_NAME = "YOUR_USER_NAME";

        private static async Task<string> GetJsonResponse()
        {
            string url = $"http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user={USER_NAME}&api_key={API_KEY}&format=json&limit=1";

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage res = await client.GetAsync(url))
                {
                    using (HttpContent content = res.Content)
                    {
                        string json = await content.ReadAsStringAsync();
                        if (json != null)
                        {
                            Console.WriteLine(json);
                            return json;
                        }
                    }
                }
            }

            return null;
        }

        public static async Task<TrackModel> GetLastTrack()
        {
            var json = await GetJsonResponse();
            var options = new JsonDocumentOptions
            {
                AllowTrailingCommas = true
            };

            using (JsonDocument document = JsonDocument.Parse(json, options))
            {

                var trackObj = document.RootElement
                    .GetProperty("recenttracks")
                    .GetProperty("track")
                    .EnumerateArray()
                    .First();

                string trackTitle = trackObj.GetProperty("name").GetString();
                string trackArtist = trackObj.GetProperty("artist").GetProperty("#text").GetString();
                string trackLink = trackObj.GetProperty("url").GetString();

                return new TrackModel(trackTitle, trackArtist, trackLink);
            }

        }
    }

}