import { env } from "cloudflare:workers";
import {
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

const samplePayload = {
  recenttracks: {
    track: [
      {
        name: "Fast Car",
        url: "https://libre.fm/artist/Tracy+Chapman/_/Fast+Car",
        artist: { "#text": "Tracy Chapman" },
      },
    ],
  },
};

describe("worker", () => {
  beforeEach(async () => {
    await caches.default.delete(
      new Request(
        `https://wtfillt.internal/librefm/${encodeURIComponent(env.LIBREFM_USER)}`,
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the latest track on /", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json(samplePayload)),
    );

    const request = new IncomingRequest("https://example.com/");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("Lukas was recently listening to");
    expect(body).toContain("Fast Car");
    expect(body).toContain("Tracy Chapman");
  });

  it("says the track is current when libre.fm marks it now playing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          recenttracks: {
            track: [
              {
                ...samplePayload.recenttracks.track[0],
                "@attr": { nowplaying: "true" },
              },
            ],
          },
        }),
      ),
    );

    const request = new IncomingRequest("https://example.com/");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    const body = await response.text();

    expect(body).toContain("Lukas is currently listening to");
    expect(body).toContain("Fast Car");
  });

  it("redirects /about to the repository", async () => {
    const request = new IncomingRequest("https://example.com/about");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "https://github.com/dotWee/whatthefuckislukaslisteningto.online",
    );
  });

  it("returns 404 for unknown paths", async () => {
    const request = new IncomingRequest("https://example.com/nope");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(404);
  });
});
