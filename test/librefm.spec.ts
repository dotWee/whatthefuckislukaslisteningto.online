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
    });
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
