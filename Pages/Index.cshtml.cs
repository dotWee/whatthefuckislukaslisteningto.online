using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using WhatTheFuckIsLukasListeningTo.Helper;
using WhatTheFuckIsLukasListeningTo.Model;

namespace WhatTheFuckIsLukasListeningTo.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly IConfiguration Configuration;

        private LastFmApiHelper _lastFmApiHelper;
        public TrackModel Track;

        public IndexModel(ILogger<IndexModel> logger, IConfiguration configuration, LastFmApiHelper lastFmApiHelper)
        {
            _logger = logger;
            Configuration = configuration;
            _lastFmApiHelper = lastFmApiHelper;
        }

        public async Task<IActionResult> OnGet()
        {
            Track = await _lastFmApiHelper.GetLastTrack();
            
            return Page();
        }
    }

}
