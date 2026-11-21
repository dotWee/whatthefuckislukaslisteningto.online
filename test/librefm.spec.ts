import { describe, expect, it } from "vitest";
import { parseRecentTrack } from "../src/librefm";

describe("parseRecentTrack", () => {
  it("reads the first recent track", () => {
    const track = parseRecentTrack({
      recenttracks: {
        track: [
          {
            name: "Fast Car",
            url: "https://libre.fm/artist/Tracy+Chapman/_/Fast+Car",
            artist: { "#text": "Tracy Chapman" },
          },
        ],
      },
    });

    expect(track).toEqual({
      title: "Fast Car",
      artist: "Tracy Chapman",
      link: "https://libre.fm/artist/Tracy+Chapman/_/Fast+Car",
      nowPlaying: false,
    });
  });

  it("marks a track that is playing now", () => {
    const track = parseRecentTrack({
      recenttracks: {
        track: [
          {
            name: "Fast Car",
            url: "https://libre.fm/artist/Tracy+Chapman/_/Fast+Car",
            artist: { "#text": "Tracy Chapman" },
            "@attr": { nowplaying: "true" },
            date: { uts: "1795271746", "#text": "21 Nov 2026, 14:35" },
          },
        ],
      },
    });

    expect(track.nowPlaying).toBe(true);
  });

  it("accepts a single track object", () => {
    const track = parseRecentTrack({
      recenttracks: {
        track: {
          name: "Fast Car",
          url: "https://libre.fm/artist/Tracy+Chapman/_/Fast+Car",
          artist: "Tracy Chapman",
        },
      },
    });

    expect(track.artist).toBe("Tracy Chapman");
  });

  it("rejects incomplete payloads", () => {
    expect(() => parseRecentTrack({ recenttracks: { track: [] } })).toThrow(
      /missing track fields/,
    );
  });
});
