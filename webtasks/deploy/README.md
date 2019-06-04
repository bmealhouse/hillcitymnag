# hillcitymnag-deploy-webtask

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Schedules Hill City Assembly of God website deployments

## Getting Started

### Installation

```sh
yarn global add wt-cli
```

## Scripts

### `yarn test`

Runs the tests using [Jest](https://facebook.github.io/jest/).<br>
Code coverage report will also be included in command line output.


## Webtask Management

```sh
wt create ./deploy.js --name hillcitymnag-deploy-webtask
wt edit hillcitymnag-deploy-webtask
wt update hillcitymnag-deploy-webtask ./deploy.js
```

### Real-time Logging

```sh
wt logs -v
```

### Production Scheduling

```sh
wt cron create --name hillcitymnag-deploy-webtask --secret HCAG_DEPLOYMENT_TOKEN=$HCAG_DEPLOYMENT_TOKEN --schedule "0 */3 * * 0,1,2" --tz "America/Chicago" ./deploy.js
```

> Every 3 hours, only on Sunday, Monday, and Tuesday
