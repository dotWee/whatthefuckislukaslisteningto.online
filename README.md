# [whatthefuckislukaslisteningto.online](https://whatthefuckislukaslisteningto.online/)

_what the fuck is lukas listening to*?_

this repository contains the source of [whatthefuckislukaslisteningto.online](https://whatthefuckislukaslisteningto.online/), a [cloudflare worker](https://developers.cloudflare.com/workers/) that reads the latest scrobble from last.fm and renders it as a tiny website.

## setup

1. install [node.js](https://nodejs.org/) 24 or newer
2. clone the repository and install dependencies:

```bash
git clone https://github.com/dotWee/whatthefuckislukaslisteningto.online
cd whatthefuckislukaslisteningto.online
npm install
```

3. request a [last.fm api key](https://www.last.fm/api/intro)
4. copy `.dev.vars.example` to `.dev.vars` and set `LASTFM_API_KEY`

the last.fm username is a worker var (`LASTFM_USER`, currently `Twnksinr`).

## usage

```bash
npm run lint
npm test
npm run dev
```

then open [localhost:8787](http://localhost:8787).

## deploy

```bash
npx wrangler secret put LASTFM_API_KEY
npm run deploy
```

github actions deploys on push to `master` / `main` when `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are set.

the worker is bound to `whatthefuckislukaslisteningto.online` as a custom domain.

## license

copyright (c) 2020 lukas 'dotwee' wolfsteiner <lukas@wolfsteiner.media>

licensed under the [_do what the fuck you want to_](/LICENSE) public license
