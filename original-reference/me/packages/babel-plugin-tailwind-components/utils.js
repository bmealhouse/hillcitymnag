const dlv = require('dlv')
const resolveTailwindConfig = require('tailwindcss/lib/util/resolveConfig.js')
const defaultTailwindConfig = require('tailwindcss/stubs/defaultConfig.stub.js')

let resolvedConfig

exports.resolveConfig = config => {
  if (resolvedConfig) return resolvedConfig
  resolvedConfig = resolveTailwindConfig([config, defaultTailwindConfig])
  return resolvedConfig
}

exports.stringifyScreen = (config, screenName) => {
  const screen = dlv(config, ['theme', 'screens', screenName])
  if (typeof screen === 'undefined') {
    throw new TypeError(`Couldn’t find Tailwind screen: ${screenName}`)
  }

  if (typeof screen === 'string') return `@media (min-width: ${screen})`
  if (typeof screen.raw === 'string') {
    return `@media ${screen.raw}`
  }

  const str = (Array.isArray(screen) ? screen : [screen])
    .map(range => {
      return [
        typeof range.min === 'string' ? `(min-width: ${range.min})` : null,
        typeof range.max === 'string' ? `(max-width: ${range.max})` : null,
      ]
        .filter(Boolean)
        .join(' and ')
    })
    .join(', ')
  return str ? `@media ${str}` : ''
}

exports.resolveStyle = (config, opts, key) => {
  for (const opt of opts) {
    if (
      [
        'backgroundColor',
        'borderColor',
        'textColor',
        'fill',
        'stroke',
      ].includes(opt.config)
    ) {
      const colors = flattenColors(dlv(config, ['theme', opt.config], {}))
      if (typeof colors[key] !== 'undefined') {
        return {[opt.prop]: colors[key]}
      }
    } else {
      let value = dlv(config, ['theme', opt.config, key])
      if (typeof value !== 'undefined') {
        if (opt.config === 'fontFamily' && Array.isArray(value)) {
          value = value.join(', ')
        }

        return {[opt.prop]: value}
      }
    }
  }

  return {}
}

function flattenColors(colors) {
  const result = {}
  for (const color in colors) {
    // eslint-disable-next-line unicorn/new-for-builtins
    if (colors[color] === Object(colors[color])) {
      // eslint-disable-next-line guard-for-in
      for (const key in colors[color]) {
        const suffix = key === 'default' ? '' : `-${key}`
        result[`${color}${suffix}`] = colors[color][key]
      }
    } else {
      result[color] = colors[color]
    }
  }

  return result
}
