# pull npm dependencies
FROM node AS npm-build
# Create and define the node_modules's cache directory.
WORKDIR /usr/src/cache
COPY package.json package-lock.json /usr/src/cache/
RUN npm install --no-optional && npm cache clean --force

# https://hub.docker.com/_/microsoft-dotnet-core
# copy csproj and restore as distinct layers
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source
COPY *.csproj ./
COPY --from=npm-build /usr/src/cache/node_modules/bootstrap node_modules/bootstrap
COPY --from=npm-build /usr/src/cache/node_modules/jquery node_modules/jquery
COPY --from=npm-build /usr/src/cache/node_modules/popper.js node_modules/popper.js
COPY --from=npm-build /usr/src/cache/node_modules/jquery-validation node_modules/jquery-validation
COPY --from=npm-build /usr/src/cache/node_modules/jquery-validation-unobtrusive node_modules/jquery-validation-unobtrusive
RUN dotnet restore

# copy everything else and build app
COPY . ./
WORKDIR /source
RUN dotnet publish -c Release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet WhatTheFuckIsLukasListeningTo.dll