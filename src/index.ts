import { GITHUB_URL, renderHome, renderUnavailable } from "./html";
import { getLastTrack } from "./lastfm";

function html(body: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=15",
    },
  });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/about") {
      return Response.redirect(GITHUB_URL, 302);
    }

    if (url.pathname !== "/") {
      return new Response("Not found", { status: 404 });
    }

    try {
      const track = await getLastTrack(env, ctx);
      return html(renderHome(track));
    } catch (error) {
      console.error(
        JSON.stringify({
          message: "failed to load recent track",
          error: error instanceof Error ? error.message : "unknown error",
        }),
      );
      return html(renderUnavailable(), 503);
    }
  },
} satisfies ExportedHandler<Env>;
