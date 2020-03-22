using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

using WhatTheFuckIsLukasListeningTo.Helper;
using WhatTheFuckIsLukasListeningTo.Model;

namespace WhatTheFuckIsLukasListeningTo.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public TrackModel Track;


        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> OnGet()
        {
            Track = await LastFmApiHelper.GetLastTrack();
            
            return Page();
        }
    }

}
