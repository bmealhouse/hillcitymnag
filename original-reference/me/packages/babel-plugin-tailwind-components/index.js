const {resolve, relative, dirname} = require('path')
const {existsSync} = require('fs')
const {createMacro} = require('babel-plugin-macros')
const resolveConfig = require('tailwindcss/lib/util/resolveConfig.js')
const defaultTailwindConfig = require('tailwindcss/stubs/defaultConfig.stub.js')
const findIdentifier = require('./find-identifier.js')
const parseTte = require('./parse-tte.js')
const addImport = require('./add-import.js')
const getStyles = require('./get-styles.js')
const replaceWithLocation = require('./replace-with-location.js')

console.log('create Macro')
export default createMacro(
  ({babel: {types: t}, references, state, config}) => {
    const sourceRoot = state.file.opts.sourceRoot || '.'
    const program = state.file.path
    const configFile = config && config.config
    const configPath = resolve(sourceRoot, configFile || './tailwind.config.js')
    const configExists = existsSync(configPath)

    if (configFile && !configExists) {
      throw new Error(`Couldn’t find Tailwind config ${configPath}`)
    }

    state.tailwindConfigIdentifier = program.scope.generateUidIdentifier(
      'tailwindConfig',
    )
    state.tailwindUtilsIdentifier = program.scope.generateUidIdentifier(
      'tailwindUtils',
    )
    state.isProd = process.env.NODE_ENV === 'production'
    state.isDev = !state.isProd

    if (state.isProd) {
      state.config = configExists
        ? resolveConfig([require(configPath), defaultTailwindConfig])
        : resolveConfig([defaultTailwindConfig])
    }

    const styledImport =
      config && config.styled
        ? {
            import: config.styled.import || 'default',
            from: config.styled.from || config.styled,
          }
        : {import: 'default', from: '@emotion/styled'}

    state.existingStyledIdentifier = false
    state.styledIdentifier = findIdentifier({
      program,
      mod: styledImport.from,
      name: styledImport.import,
    })
    if (state.styledIdentifier === null) {
      state.styledIdentifier = program.scope.generateUidIdentifier('styled')
    } else {
      state.existingStyledIdentifier = true
    }

    program.traverse({
      JSXAttribute(path) {
        if (path.node.name.name !== 'tw') return
        const styles = getStyles(path.node.value.value, t, state)
        const attrs = path
          .findParent(p => p.isJSXOpeningElement())
          .get('attributes')
        const cssAttr = attrs.filter(p => p.node.name.name === 'css')

        if (cssAttr.length > 0) {
          path.remove()
          const expr = cssAttr[0].get('value').get('expression')
          if (expr.isArrayExpression()) {
            expr.pushContainer('elements', styles)
          } else {
            expr.replaceWith(t.arrayExpression([expr.node, styles]))
          }
        } else {
          path.replaceWith(
            t.jsxAttribute(
              t.jsxIdentifier('css'),
              t.jsxExpressionContainer(styles),
            ),
          )
        }
      },
    })

    references.default.forEach(path => {
      const parent = path.findParent(x => x.isTaggedTemplateExpression())
      if (!parent) return

      const parsed = parseTte({
        path: parent,
        types: t,
        styledIdentifier: state.styledIdentifier,
        state,
      })
      if (!parsed) return

      replaceWithLocation(parsed.path, getStyles(parsed.str, t, state))
    })

    if (state.shouldImportStyled && !state.existingStyledIdentifier) {
      addImport({
        types: t,
        program,
        mod: styledImport.from,
        name: styledImport.import,
        identifier: state.styledIdentifier,
      })
    }

    if (state.shouldImportConfig) {
      const configImportPath =
        './' + relative(dirname(state.file.opts.filename), configPath)
      const originalConfigIdentifier = program.scope.generateUidIdentifier(
        'tailwindConfig',
      )

      program.unshiftContainer(
        'body',
        t.variableDeclaration('const', [
          t.variableDeclarator(
            state.tailwindConfigIdentifier,
            t.callExpression(
              t.memberExpression(
                state.tailwindUtilsIdentifier,
                t.identifier('resolveConfig'),
              ),
              [
                configExists
                  ? originalConfigIdentifier
                  : t.objectExpression([]),
              ],
            ),
          ),
        ]),
      )
      if (configExists) {
        program.unshiftContainer(
          'body',
          t.importDeclaration(
            [t.importDefaultSpecifier(originalConfigIdentifier)],
            t.stringLiteral(configImportPath),
          ),
        )
      }

      program.unshiftContainer(
        'body',
        t.importDeclaration(
          [t.importDefaultSpecifier(state.tailwindUtilsIdentifier)],
          t.stringLiteral('tailwind.macro/utils.umd.js'),
        ),
      )
    }

    program.scope.crawl()
  },
  {configName: 'tailwind'},
)
