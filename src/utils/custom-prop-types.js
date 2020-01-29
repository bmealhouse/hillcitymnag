import {string, shape} from 'prop-types'

export const htmlShape = shape({
  html: string.isRequired,
})

export const textShape = shape({
  text: string.isRequired,
})
