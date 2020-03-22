# [whatthefuckislukaslisteningto.online](http://heroku.whatthefuckislukaslisteningto.online/)

[![GitHub License](https://img.shields.io/github/license/whatthefuckislukaslisteningto.online)](https://github.com/dotWee/whatthefuckislukaslisteningto.online/blob/master/LICENSE)

_what the fuck is lukas listening to*?_

![screenshot.png](https://github.com/dotWee/whatthefuckislukaslisteningto.online/raw/master/art/screenshot.png)

this repository contains the source code of [whatthefuckislukaslisteningto.online](http://heroku.whatthefuckislukaslisteningto.online/), written in some `c#` using the `.net core 3` framework.

## [setup](#setup)

1. get the [.net core 3.1 sdk](https://dotnet.microsoft.com/download/) for your platform

2. clone this git repository and change into the repo directory:

    ```bash
    $ git clone https://github.com/dotWee/whatthefuckislukaslisteningto.online

    $ cd whatthefuckislukaslisteningto.online
    ```

## [usage](#usage)

> **note**: last.fm api access required!

you need a last.fm api key to use this project. request one [here](https://www.last.fm/api/intro), then put your key in the [appsettings.json](./appsettings.json).

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

### run using a self-made docker [docker](https://www.docker.com/) image

1. build the docker image:

    ```bash
    $ docker build \
        --pull --rm \
        -t whatthefuckislukaslisteningto .
    ```

2. and run the fresh docker image:

    ```bash
    $ docker run \
        --rm -it \
        -p 8080:80 \
        whatthefuckislukaslisteningto
    ```

3. now browse to [localhost:8080](http://localhost:8080)

### or pull the [docker](https://www.docker.com/) image from the docker hub

1. pull the docker image:

    ```bash
    $ docker pull dotwee/whatthefuckislukaslisteningto
    ```

2. and run the docker image:

    ```bash
    $ docker run \
        --rm -it \
        -p 8080:80 \
        dotwee/whatthefuckislukaslisteningto
    ```

3. now browse to [localhost:8080](http://localhost:8080)

## [license](#license)

copyright (c) 2020 lukas 'dotwee' wolfsteiner <lukas@wolfsteiner.media>

licensed under the [_do what the fuck you want to_](/LICENSE) public license
