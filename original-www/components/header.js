import React from 'react'
import {color, mediaQuery, pseudo} from '../shared/constants'

export default function Header() {
  return (
    <div className="parallax" css={parallax}>
      <div css={parallaxBackground}>
        <img
          alt=""
          className="parallax-background-image"
          src="static/img/background.jpg"
          css={parallaxImage}
        />
      </div>
      <div className="container" css={container}>
        <div className="row text-center">
          <div className="col-xs-12">
            <p css={fancy}>Be still</p>
            <p css={simple}>and know that</p>
            <p className="center-block" css={bold}>
              I AM GOD
            </p>
            <p css={scripture}>Psalm 46:10</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mediaQuery475 = '@media (min-width: 475px)'
const mediaQuery1675 = '@media (min-width: 1675px)'

const parallax = {
  position: 'relative',
  overflow: 'hidden',
  // display: 'block', // IE?
  // backgroundSize: '100%', // IE?
  // width: '100%', // needed?
  height: 425,
  [mediaQuery475]: {height: 530},
  [mediaQuery.sm]: {height: 700},
  [pseudo.after]: {
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 2000,
    content: '""',
    opacity: 0.7,
    zIndex: 1,
    background: [
      'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzIzMjUyNiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0MTQzNDUiIHN0b3Atb3BhY2l0eT0iMC44NyIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+)',
      'gradient(linear, left top, left bottom, color-stop(0%, rgba(35,37,38,1)), color-stop(100%, rgba(65,67,69,0.87)))',
      'linear-gradient(top, rgba(35,37,38,1) 0%, rgba(65,67,69,0.87) 100%)',
      'linear-gradient(to bottom, rgba(35,37,38,1) 0%, rgba(65,67,69,0.87) 100%)',
    ],
    filter:
      'progid:DXImageTransform.Microsoft.gradient(startColorstr="#232526", endColorstr="#de414345", GradientType=0)',
  },
}

const parallaxBackground = {
  position: 'relative',
  // width: '100%', // IE?
  // height: '100%', // IE?
  zIndex: 1,
  [mediaQuery.sm]: {top: 0},
  [mediaQuery.md]: {top: -100},
  [mediaQuery.lg]: {top: -240},
  [mediaQuery1675]: {top: -450},
}

const parallaxImage = {
  // position: 'relative', // IE?
  width: '100%',
  // height: 'auto' // IE?
}

const container = {
  position: 'absolute',
  // marginLeft: 'auto', // IE?
  // marginRight: 'auto', // IE?
  top: 0,
  left: 0,
  right: 0,
  zIndex: 2,
}

const fancy = {
  marginTop: 190,
  color: color.lightGray,
  fontFamily: 'spumante-regular-plus-shadow, sans-serif',
  fontSize: 75,
  lineHeight: 1,
  [mediaQuery475]: {
    marginTop: 300,
  },
  [mediaQuery.sm]: {
    marginTop: 400,
    fontSize: 100,
  },
}

const simple = {
  position: 'relative',
  color: color.lightGray,
  fontFamily: 'reklame-script, sans-serif',
  fontSize: 35,
  lineHeight: 1,
  top: -30,
  left: 35,
  [mediaQuery.sm]: {
    fontSize: 47,
    top: -40,
    left: 47,
  },
}

const bold = {
  position: 'relative',
  paddingTop: 8,
  backgroundColor: color.lightGray,
  color: color.charcoal,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 60,
  fontWeight: 900,
  lineHeight: 1,
  top: -25,
  [mediaQuery475]: {
    width: 350,
  },
  [mediaQuery.sm]: {
    paddingTop: 11,
    fontSize: 80,
    top: -30,
    width: '65%',
  },
  [mediaQuery.md]: {
    width: '55%',
  },
  [mediaQuery.lg]: {
    width: '45%',
  },
}

const scripture = {
  position: 'relative',
  color: color.lightGray,
  fontFamily: 'reklame-script, sans-serif',
  fontSize: 20,
  lineHeight: 1,
  top: -20,
  [mediaQuery.sm]: {
    fontSize: 27,
  },
}
