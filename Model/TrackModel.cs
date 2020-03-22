
namespace WhatTheFuckIsLukasListeningTo.Model {

    public class TrackModel {

        public string Title { get; set; }
        public string Artist { get; set; }
        public string Link { get; set; }

        public TrackModel(string title, string artist, string link) {
            Title = title;
            Artist = artist;
            Link = link;
        }
    }

}