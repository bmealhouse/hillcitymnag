import {bool, string, shape, arrayOf} from 'prop-types'

export const htmlShape = shape({
  html: string.isRequired,
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
