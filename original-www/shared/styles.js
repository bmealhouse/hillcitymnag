import {color, pseudo} from './constants'

const btnHover = {
  background: 'transparent',
  borderColor: color.brand,
  color: color.brand,
}

const btnHoverWhite = {
  background: 'transparent',
  borderColor: color.white,
  color: color.white,
}

export const btn = {
  background: 'transparent',
  border: `2px solid ${color.lightGreen}`,
  color: color.darkGreen,
  fontWeight: 500,
  transition: 'all 300ms ease-in-out',
  [pseudo.focus]: btnHover,
  [pseudo.hover]: btnHover,
}

export const btnWhite = {
  background: 'transparent',
  border: `2px solid rgba(255, 255, 255, 0.6)`,
  color: color.lightGray,
  fontWeight: 500,
  transition: 'all 300ms ease-in-out',
  [pseudo.focus]: btnHoverWhite,
  [pseudo.hover]: btnHoverWhite,
  '[disabled]:hover': {
    background: 'transparent',
    color: color.lightGray,
  },
}

const linkHover = {
  color: color.brand,
  textDecoration: 'none',
}

export const link = {
  color: color.mediumGreen,
  fontWeight: 300,
  transition: 'all 300ms ease-in-out',
  [pseudo.focus]: linkHover,
  [pseudo.hover]: linkHover,
}
