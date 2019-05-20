# www.hillcitymnag.church

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

## Scripts

### `yarn start`

Runs the application in production mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn run build`

Builds the application for production using [Next.js](https://zeit.co/blog/next).  
Generates `./next` directory with build artifacts.

### `yarn run commit`

Commit code while enforcing the [Commitizen](http://commitizen.github.io/cz-cli/) conventional changelog standard.  
Before running this script, add files using `git add`.

### `yarn run dev`

Runs the application in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn run lint`

Lint code using [JavaScript Standard Style](http://standardjs.com/).  
Tries to fix code style errors automatically.

## Updates

### Generate event timestamp

```js
(new Date("2019-04-06 1:00 PM")).getTime()
```
