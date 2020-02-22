const dset = require('dset')
const dlv = require('dlv')
const staticStyles = require('./static-styles.js')
const dynamicStyles = require('./dynamic-styles.js')
const {stringifyScreen, resolveStyle} = require('./utils.js')
const astify = require('./astify.js')
const assignify = require('./assignify.js')

module.exports = (str, t, state) => {
  const styles = (str.match(/\S+/g) || []).reduce((acc, className, index) => {
    let modifiers = []
    let modifier

    while (modifier !== null) {
      modifier = className.match(/^([a-z-_]+):/i)
      if (modifier) {
        className = className.slice(modifier[0].length)
        modifiers.push(modifier[1])
      }
    }

    modifiers = modifiers.map(mod => {
      if (['hover', 'focus', 'active', 'focus-within'].includes(mod)) {
        return `:${mod}`
      }

      if (mod === 'group') {
        return '.group &'
      }

      if (mod === 'group-hover') {
        return '.group:hover &'
      }

      if (state.isDev) {
        state.shouldImportConfig = true
      }

      return state.isProd
        ? stringifyScreen(state.config, mod)
        : '__computed__' +
            state.tailwindUtilsIdentifier.name +
            '.stringifyScreen(' +
            state.tailwindConfigIdentifier.name +
            ', "' +
            mod +
            '")'
    })

    if (staticStyles[className]) {
      if (modifiers.length > 0) {
        dset(acc, modifiers, {
          ...dlv(acc, modifiers, {}),
          ...staticStyles[className],
        })
        return acc
      }

      return {...acc, ...staticStyles[className]}
    }

    let prefix
    Object.keys(dynamicStyles).some(k => {
      if (className.startsWith(k + '-') || className === k) {
        prefix = k
        return true
      }

      return false
    })

    if (prefix) {
      if (state.isDev) {
        state.shouldImportConfig = true
      }

      let key = className.slice(prefix.length + 1)
      if (key === '') key = 'default'
      if (prefix.startsWith('-')) key = '-' + key

      let obj

      if (Array.isArray(dynamicStyles[prefix])) {
        obj = state.isProd
          ? resolveStyle(state.config, dynamicStyles[prefix], key)
          : {
              ['__spread__' + index]:
                state.tailwindUtilsIdentifier.name +
                '.resolveStyle(' +
                state.tailwindConfigIdentifier.name +
                ', ' +
                JSON.stringify(dynamicStyles[prefix]) +
                ',"' +
                key +
                '")',
            }
      } else {
        const props = Array.isArray(dynamicStyles[prefix].prop)
          ? dynamicStyles[prefix].prop
          : [dynamicStyles[prefix].prop]
        obj = props.reduce((a, c) => {
          let pre = dynamicStyles[prefix].config === 'negativeMargin' ? '-' : ''
          if (pre && state.isDev) {
            pre = `"${pre}" + `
          }

          return state.isProd
            ? {
                ...a,
                [c]:
                  pre + state.config.theme[dynamicStyles[prefix].config][key],
              }
            : {
                ...a,
                [c]:
                  '__computed__' +
                  pre +
                  state.tailwindConfigIdentifier.name +
                  '.theme.' +
                  dynamicStyles[prefix].config +
                  '["' +
                  key +
                  '"]',
              }
        }, {})
      }

      if (modifiers.length > 0) {
        dset(acc, modifiers, {...dlv(acc, modifiers, {}), ...obj})
        return acc
      }

      return {...acc, ...obj}
    }

    throw new Error(`Couldn’t resolve Tailwind class name: ${className}`)
  }, {})

  let ast = astify(styles, t)

  if (state.isDev) {
    ast = assignify(ast, t)
  }

  return ast
}
