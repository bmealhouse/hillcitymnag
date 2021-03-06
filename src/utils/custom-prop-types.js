import {bool, string, object, shape, arrayOf} from 'prop-types'

export const fixedImageShape = shape({
  fixed: object.isRequired,
})

export const htmlShape = shape({
  html: string.isRequired,
  text: string,
})

export const linksShape = arrayOf(
  shape({
    id: string.isRequired,
    route: string,
    text: string.isRequired,
    displayInHeader: bool.isRequired,
    displayInFooter: bool.isRequired,
  }).isRequired,
)
export const textShape = shape({
  text: string.isRequired,
})
