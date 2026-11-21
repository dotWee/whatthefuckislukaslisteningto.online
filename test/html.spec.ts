import { describe, expect, it } from "vitest";
import { escapeHtml, renderHome } from "../src/html";

describe("html", () => {
  it("escapes markup in track titles", () => {
    expect(escapeHtml(`<script>alert("x")</script>`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
    );
  });

  it("renders escaped track metadata", () => {
    const page = renderHome({
      title: "A <b>Song</b>",
      artist: "An & Artist",
      link: "https://libre.fm/artist/example/_/Track",
    });

    expect(page).toContain("A &lt;b&gt;Song&lt;/b&gt;");
    expect(page).toContain("An &amp; Artist");
    expect(page).toContain('href="https://libre.fm/artist/example/_/Track"');
  });
});
