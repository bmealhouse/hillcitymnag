# hillcitymnag-website

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Source for https://www.hillcitymnag.church

## Scripts

### `yarn dev`

Runs the app in development mode using [Next.js](https://nextjs.org/).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn now-build`

Ensure [Now](https://zeit.co/now) builds a fresh version of the [Next.js](https://nextjs.org/) app.<br>
Prefetches data and writes to static `.json` files for performance.

## Maintenance

### Generate event timestamp

```js
(new Date("2019-04-06 1:00 PM")).getTime()
```
