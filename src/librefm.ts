export type Track = {
  title: string;
  artist: string;
  link: string;
};

type ScrobbleArtist = {
  "#text"?: string;
};

type ScrobbleTrack = {
  name?: string;
  url?: string;
  artist?: ScrobbleArtist | string;
};

function artistName(artist: ScrobbleTrack["artist"]): string | undefined {
  if (typeof artist === "string") {
    return artist;
  }
  return artist?.["#text"];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readTrack(value: unknown): ScrobbleTrack | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  const artist = value.artist;
  const track: ScrobbleTrack = {
    name: typeof value.name === "string" ? value.name : undefined,
    url: typeof value.url === "string" ? value.url : undefined,
  };

  if (typeof artist === "string") {
    track.artist = artist;
  } else if (isRecord(artist) && typeof artist["#text"] === "string") {
    track.artist = { "#text": artist["#text"] };
  }

  return track;
}

function firstTrack(payload: unknown): ScrobbleTrack | undefined {
  if (!isRecord(payload) || !isRecord(payload.recenttracks)) {
    return undefined;
  }

  const track = payload.recenttracks.track;
  if (Array.isArray(track)) {
    return readTrack(track[0]);
  }
  return readTrack(track);
}

export function parseRecentTrack(payload: unknown): Track {
  const track = firstTrack(payload);
  const title = track?.name?.trim();
  const artist = artistName(track?.artist)?.trim();
  const link = track?.url?.trim();

  if (!title || !artist || !link) {
    throw new Error("libre.fm response was missing track fields");
  }

  return { title, artist, link };
}

const LIBRE_FM_API = "https://libre.fm/2.0/";

export async function getLastTrack(
  env: Env,
  ctx: ExecutionContext,
): Promise<Track> {
  const user = env.LIBREFM_USER;
  const cache = caches.default;
  const cacheKey = new Request(
    `https://wtfillt.internal/librefm/${encodeURIComponent(user)}`,
  );
  const cached = await cache.match(cacheKey);
  if (cached) {
    return parseRecentTrack(await cached.json());
  }

  const url = new URL(LIBRE_FM_API);
  url.searchParams.set("method", "user.getrecenttracks");
  url.searchParams.set("user", user);
  url.searchParams.set("api_key", env.LIBREFM_API_KEY);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: {
      "user-agent": "whatthefuckislukaslisteningto.online",
    },
  });

  if (!response.ok) {
    throw new Error(`libre.fm request failed: ${response.status}`);
  }

  const payload: unknown = await response.json();
  const track = parseRecentTrack(payload);
  const stored = new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=30",
    },
  });
  ctx.waitUntil(cache.put(cacheKey, stored));
  return track;
}
