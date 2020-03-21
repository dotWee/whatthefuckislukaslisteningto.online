using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace WhatTheFuckIsLukasListeningTo.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private string _trackArtist = "Testartist";
        private string _trackTitle = "Titletest";


        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public IActionResult OnGet()
        {
            ViewData["TrackArtist"] = _trackArtist;
            ViewData["TrackTitle"] = _trackTitle;
            return Page();
        }
    }
}
