# hillcitymnag

[![Build Status](https://travis-ci.com/bmealhouse/hillcitymnag.svg?branch=master)](https://travis-ci.com/bmealhouse/hillcitymnag)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Monorepo for [https://www.hillcitymnag.church](https://www.hillcitymnag.church)

## Getting started

### Installation

```sh
yarn && yarn dev
```

## Scripts

### `yarn deploy`

Build & deploy the monorepo using [Now](https://zeit.co/now).<br>
Deploys to staging environment only.

### `yarn deploy:prod`

Build & deploy the monorepo using [Now](https://zeit.co/now).<br>
Depolys to staging environment and updates production aliases.

### `yarn dev`

Runs the monorepo in development using [now dev](https://zeit.co/blog/now-dev).<br>
Automatically updates localhost when a code change is detected.

### `yarn dev:fe`

Runs the frontend in development mode using [Next.js](https://nextjs.org/).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Runs [Jest](https://jestjs.io/) tests across all workspaces using [Bolt](http://boltpkg.com/).<br>
Code coverage report will also be included in command line output.
