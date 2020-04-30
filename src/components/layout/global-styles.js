import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  /**
   * Tailwind custom reset styles
   */

  /**
   * Skip since Typography.js is in charge of font styles.
   *
   * 1. Use the user's configured "sans" font-family (with Tailwind's default
   *    sans-serif font stack as a fallback) as a sane default.
   * 2. Use Tailwind's default "normal" line-height so the user isn't forced
   *    to override it to ensure consistency even when using the default theme.
   *
   * html {
   *   font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /1/
   *   line-height: 1.5; /2/
   * }
   *
   */

  /**
   * 1. Prevent padding and border from affecting element width.
   *
   *    We used to set this in the html element and inherit from
   *    the parent element for everything else. This caused issues
   *    in shadow-dom-enhanced elements like <details> where the content
   *    is wrapped by a div with box-sizing set to "content-box".
   *
   *    https://github.com/mozdevs/cssremedy/issues/4
   *
   *
   * 2. Allow adding a border to an element by just adding a border-width.
   *
   *    By default, the way the browser specifies that an element should have no
   *    border is by setting it's border-style to "none" in the user-agent
   *    stylesheet.
   *
   *    In order to easily add borders to elements by just setting the "border-width"
   *    property, we change the default border-style for all elements to "solid", and
   *    use border-width to hide them instead. This way our "border" utilities only
   *    need to set the "border-width" property instead of the entire "border"
   *    shorthand, making our border utilities much more straightforward to compose.
   *
   *    https://github.com/tailwindcss/tailwindcss/pull/116
   */

  *,
  ::before,
  ::after {
    box-sizing: border-box; /* 1 */
    border-width: 0; /* 2 */
    border-style: solid; /* 2 */
    border-color: #e2e8f0; /* 2 */
  }

  /**
   * Ensure horizontal rules are visible by default
   */

  hr {
    border-top-width: 1px;
  }

  /**
   * Undo the "border-style: none" reset that Normalize applies to images so that
   * our "border-{width}" utilities have the expected effect.
   *
   * The Normalize reset is unnecessary for us since we default the border-width
   * to 0 on all elements.
   *
   * https://github.com/tailwindcss/tailwindcss/issues/362
   */

  img {
    border-style: solid;
  }

  textarea {
    resize: vertical;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #a0aec0;
  }

  input::-ms-input-placeholder, textarea::-ms-input-placeholder {
    color: #a0aec0;
  }

  input::placeholder,
  textarea::placeholder {
    color: #a0aec0;
  }

  button,
  [role="button"] {
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
  }


  /**
   * Skip since Typography.js is in charge of font styles.
   *
   * h1,
   * h2,
   * h3,
   * h4,
   * h5,
   * h6 {
   *   font-size: inherit;
   *   font-weight: inherit;
   * }
   *
   */

  /**
   * Reset links to optimize for opt-in styling instead of
   * opt-out.
   */

  a {
    color: inherit;
    text-decoration: inherit;
  }

  /**
   * Reset form element properties that are easy to forget to
   * style explicitly so you don't inadvertently introduce
   * styles that deviate from your design system. These styles
   * supplement a partial reset that is already applied by
   * normalize.css.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    padding: 0;
    line-height: inherit;
    color: inherit;
  }

  /**
   * Use the configured 'mono' font family for elements that
   * are expected to be rendered with a monospace font, falling
   * back to the system monospace stack if there is no configured
   * 'mono' font family.
   */

  pre,
  code,
  kbd,
  samp {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  /**
   * Make replaced elements "display: block" by default as that's
   * the behavior you want almost all of the time. Inspired by
   * CSS Remedy, with "svg" added as well.
   *
   * https://github.com/mozdevs/cssremedy/issues/14
   */

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
    vertical-align: middle;
  }

  /**
   * Constrain images and videos to the parent width and preserve
   * their instrinsic aspect ratio.
   *
   * https://github.com/mozdevs/cssremedy/issues/14
   */

  img,
  video {
    max-width: 100%;
    height: auto;
  }

   /**
    * Hill City Assembly of God styles
    */

  a {
    color: #0074d9;
    text-decoration: underline;
  }
`
