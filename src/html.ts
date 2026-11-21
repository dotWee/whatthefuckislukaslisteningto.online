const LIBREFM_PROFILE = "https://libre.fm/user/twnksinr";
const GITHUB_URL =
  "https://github.com/dotWee/whatthefuckislukaslisteningto.online";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/styles.css" />
  <script>
    var _paq = window._paq = window._paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.whatthefuckislukaslisteningto.online"]);
    _paq.push(["setDomains", ["*.whatthefuckislukaslisteningto.online"]]);
    _paq.push(["enableCrossDomainLinking"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    (function() {
      var u = "//matm.dotwee.de/";
      _paq.push(["setTrackerUrl", u + "matm.php"]);
      _paq.push(["setSiteId", "6"]);
      var d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = u + "matm.js";
      s.parentNode.insertBefore(g, s);
    })();
  </script>
</head>
<body>
  <div class="shell">
    <header>
      <nav>
        <a class="brand" href="/">What The Fuck Is Lukas Listening To?!</a>
        <a href="/about">About</a>
      </nav>
    </header>
    <main>${body}</main>
    <footer>
      <p>Copyright &copy; 2020&ndash;2026 <a href="https://lukas.wolfsteiner.media">Lukas Wolfsteiner</a></p>
    </footer>
  </div>
</body>
</html>`;
}

export function renderHome(track: {
  title: string;
  artist: string;
  link: string;
  nowPlaying: boolean;
}): string {
  const title = escapeHtml(track.title);
  const artist = escapeHtml(track.artist);
  const link = escapeHtml(track.link);
  const lede = track.nowPlaying
    ? "Lukas is currently listening to"
    : "Lukas was recently listening to";

  return layout(
    "What The Fuck Is Lukas Listening To?!",
    `<p class="lede">${lede}</p>
<p class="track">
  <span class="track-slot">
    <span class="track-fit" aria-hidden="true">
      <span class="mark">${title}</span>
      <small><i>by</i></small>
      <span class="mark">${artist}</span>
    </span>
    <span class="track-line">
      <em class="mark"><a href="${link}">${title}</a></em>
      <small><i>by</i></small>
      <em class="mark"><a href="${link}">${artist}</a></em>
    </span>
  </span>
</p>
<p>check my <a href="${LIBREFM_PROFILE}">libre.fm profile</a> for previous tracks!</p>
<p class="now"><small><a href="/">...and what about now?</a></small></p>`,
  );
}

export function renderUnavailable(): string {
  return layout(
    "What The Fuck Is Lukas Listening To?!",
    `<p class="lede">Lukas is currently listening to</p>
<p class="track">something libre.fm would not tell us just now.</p>
<p>check my <a href="${LIBREFM_PROFILE}">libre.fm profile</a> instead.</p>
<p class="now"><small><a href="/">...and what about now?</a></small></p>`,
  );
}

export { GITHUB_URL };
