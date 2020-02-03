import React from 'react'
import {color, mediaQuery, pseudo} from '../shared/constants'
import {link as regLink} from '../shared/styles'

export default function Footer() {
  return (
    <footer css={footer}>
      <div className="container">
        <nav css={floatLeft}>
          <ul css={footerLinks}>
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
          </ul>
        </nav>

        {/*
      <div css={[socialLinks, floatRight]}>
        <a href='https://www.facebook.com/Hill-City-Assembly-of-God-115583631855218' css={facebookLink}>
          <i className='fa fa-facebook fa-2x' />
        </a>
      </div>
      */}

        <hr className="visible-xs-block" />

        <div css={[contactInfo, floatRight]}>
          <p css={phone}>
            <a href="tel:+12186972662" css={regLink}>
              218-697-2662
            </a>
          </p>
          <p>
            <a href="mailto:hillcityagchurch@gmail.com" css={regLink}>
              hillcityagchurch@gmail.com
            </a>
          </p>
        </div>

        <hr className="visible-xs-block" />

        <div css={copyright}>&copy; {year} Hill City Assembly of God</div>
      </div>
    </footer>
  )
}

const year = new Date().getFullYear()

const footer = {
  position: 'relative',
  [mediaQuery.sm]: {
    marginTop: 40,
  },
}

const floatLeft = {
  [mediaQuery.sm]: {
    float: 'left',
  },
}

const floatRight = {
  [mediaQuery.sm]: {
    float: 'right',
  },
}

const phone = {
  [mediaQuery.sm]: {
    marginBottom: 0,
  },
}

const footerLinks = {
  margin: '0 -15px',
  padding: 0,
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: -0.5,
  listStyle: 'none',
}

const listItem = {
  [mediaQuery.sm]: {
    float: 'left',
  },
}

const hoverGreen = {
  backgroundColor: 'transparent !important',
  color: color.brand,
  textDecoration: 'none',
}

const link = {
  display: 'block',
  margin: '15px 0',
  padding: '10px 15px',
  color: color.darkGreen,
  textAlign: 'center',
  transition: 'all 300ms ease-in-out',
  [pseudo.focus]: hoverGreen,
  [pseudo.hover]: hoverGreen,
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
    margin: '15px 0',
    lineHeight: 1.42857143,
    // margin: '0 10px',
    // padding: '3px 5px !important',
    // color: color.lightGray,
    // width: 'auto',
    // [pseudo.focus]: hoverWhite,
    // [pseudo.hover]: hoverWhite
  },
}

// const socialLinks = {
//   margin: '0 -15px',
// }

// const facebookLink = {
//   display: 'block',
//   margin: '15px 0',
//   padding: '10px 15px',
//   color: color.darkGreen,
//   textAlign: 'center',
//   width: '100%',
//   [pseudo.focus]: hoverGreen,
//   [pseudo.hover]: hoverGreen,
// }

const contactInfo = {
  fontSize: 16,
  textAlign: 'center',
  [mediaQuery.sm]: {
    marginTop: 15,
    textAlign: 'right',
    width: 533,
    // width: 277
  },
  [mediaQuery.md]: {
    width: 753,
    // width: 497
  },
  [mediaQuery.lg]: {
    width: 953,
    // width: 697
  },
}

const copyright = {
  margin: 0,
  marginBottom: 20,
  color: color.charcoal,
  fontSize: 12,
  textAlign: 'center',
  [mediaQuery.sm]: {
    position: 'absolute',
    marginBottom: 0,
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    top: 115,
    left: 0,
    right: 0,
  },
}
