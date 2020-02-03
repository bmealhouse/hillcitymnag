import React from 'react'
import Link from 'next/link'
import {color, mediaQuery, pseudo} from '../shared/constants'

export default function Navigation() {
  return (
    <nav className="navbar" css={navbar}>
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            className="navbar-toggle collapsed"
            data-target="#navbar-links"
            data-toggle="collapse"
            type="button"
            css={navbarToggle}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" css={iconBar} />
            <span className="icon-bar" css={iconBar} />
            <span className="icon-bar" css={iconBar} />
          </button>
          <Link href="/">
            <a className="navbar-brand" css={navbarBrand}>
              <img
                alt="Hill City Assembly of God"
                className="visible-xs-block"
                src="static/img/light-logo.svg"
                css={logo}
              />
              <img
                alt="Hill City Assembly of God"
                className="hidden-xs"
                src="static/img/dark-logo.svg"
                css={logo}
              />
            </a>
          </Link>
        </div>
        <div
          className="collapse navbar-collapse"
          id="navbar-links"
          css={navbarLinks}
        >
          <ul className="nav navbar-nav navbar-right text-center">
            {/* <li css={listItem}>
            <Link href='/about'>
              <a css={link}>About</a>
            </Link>
          </li> */}
            {/* <li css={listItem}>
            <Link href='/sermons'>
              <a css={link}>Sermons</a>
            </Link>
          </li> */}
            {/* <li css={listItem}>
            <Link href='/events'>
              <a css={link}>Events</a>
            </Link>
          </li> */}
            <li css={listItem}>
              <form
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="_top"
              >
                <input name="cmd" type="hidden" value="_s-xclick" />
                <input
                  name="hosted_button_id"
                  type="hidden"
                  value="7SWTHCY3X9Z3E"
                />
                <input type="submit" value="Donate" css={donateLink} />
                <img
                  alt=""
                  src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                  width="0"
                  height="0"
                />
              </form>
            </li>
            <li css={listItem}>
              <a href="#contact-us" css={link}>
                Contact Us
              </a>
            </li>
            {/*
          <li css={listItem}>
            <a href='https://www.facebook.com/Hill-City-Assembly-of-God-115583631855218' css={facebookLink}>
              <i aria-hidden='true' className='fa fa-facebook fa-2x' />
            </a>
          </li>
          */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

const navbar = {
  margin: 0,
  transform: 'translate3d(0, 0, 0)',
  transition: 'all 3000ms ease-in-out',
  [mediaQuery.sm]: {
    position: 'absolute',
    top: 0,
    left: 60,
    right: 45,
    zIndex: 1030,
  },
}

const navbarToggle = {
  margin: '30px 10px',
  border: 0,
}

const iconBar = {
  border: `1px solid ${color.darkGray}`,
}

const navbarBrand = {
  display: 'block',
  float: 'left',
  margin: '10px 20px',
  padding: 0,
  width: 75,
  [mediaQuery.sm]: {
    margin: '30px 0',
    width: 100,
    // height: auto // IE?
  },
}

const logo = {
  width: '100%',
}

const navbarLinks = {
  borderTop: `1px solid ${color.separator}`,
  [mediaQuery.sm]: {
    marginTop: 70,
    padding: 0,
    border: 0,
  },
}

const listItem = {
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: -0.5,
}

const hoverGreen = {
  backgroundColor: 'transparent !important',
  color: color.brand,
}

const hoverWhite = {
  backgroundColor: 'transparent !important',
  color: color.white,
}

const link = {
  margin: '15px 0',
  color: color.darkGreen,
  [pseudo.focus]: hoverGreen,
  [pseudo.hover]: hoverGreen,
  [mediaQuery.sm]: {
    margin: '0 10px',
    padding: '3px 5px !important',
    color: color.lightGray,
    [pseudo.focus]: hoverWhite,
    [pseudo.hover]: hoverWhite,
  },
}

const donateLink = {
  marginTop: 20,
  padding: '10px 15px',
  backgroundColor: 'transparent',
  border: 0,
  color: color.darkGreen,
  letterSpacing: -0.5,
  lineHeight: '20px',
  width: '100%',
  [pseudo.focus]: hoverGreen,
  [pseudo.hover]: hoverGreen,
  [mediaQuery.sm]: {
    margin: '0 10px',
    padding: '3px 5px !important',
    color: color.lightGray,
    width: 'auto',
    [pseudo.focus]: hoverWhite,
    [pseudo.hover]: hoverWhite,
  },
}

// const facebookLink = {
//   margin: '15px 0',
//   color: color.darkGreen,
//   [pseudo.focus]: hoverGreen,
//   [pseudo.hover]: hoverGreen,
//   [mediaQuery.sm]: {
//     margin: '0 10px',
//     padding: '3px 5px !important',
//     color: color.lightGray,
//     top: -7,
//     [pseudo.focus]: hoverWhite,
//     [pseudo.hover]: hoverWhite,
//   },
// }
