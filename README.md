# [whatthefuckislukaslisteningto.online](http://heroku.whatthefuckislukaslisteningto.online/)

[![GitHub License](https://img.shields.io/github/license/whatthefuckislukaslisteningto.online)](https://github.com/dotWee/whatthefuckislukaslisteningto.online/blob/master/LICENSE)

_what the fuck is lukas listening to*?_

this repository contains the source code of [whatthefuckislukaslisteningto.online](http://heroku.whatthefuckislukaslisteningto.online/), written in some `c#` using the `.net core 3` framework.

## [setup](#setup)

1. get the [.net core 3.1 sdk](https://dotnet.microsoft.com/download/) for your platform

2. clone this git repository and change into the repo directory:

    ```bash
    $ git clone https://github.com/dotWee/whatthefuckislukaslisteningto.online

    $ cd whatthefuckislukaslisteningto.online
    ```

## [usage](#usage)

### run site locally

1. pull required package dependencies:

    ```bash
    $ dotnet restore
    ```

2. start building & run on localhost:

    ```bash
    $ dotnet run
    info: Microsoft.Hosting.Lifetime[0]
          Now listening on: http://localhost:5000
    info: Microsoft.Hosting.Lifetime[0]
          Application started. Press Ctrl+C to shut down.
    ```

3. now browse to [localhost:5000](http://localhost:5000)

## [license](#license)

copyright (c) 2020 lukas 'dotwee' wolfsteiner <lukas@wolfsteiner.media>

licensed under the [_do what the fuck you want to_](/LICENSE) public license
