import React, {Component} from 'react'
import fetch from 'isomorphic-unfetch'
import {color, mediaQuery, pseudo} from '../shared/constants'
import {btnWhite} from '../shared/styles'

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      send: {
        disabled: false,
        text: 'Send',
      },
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setSendingState() {
    this.setState({
      send: {
        disabled: true,
        text: 'Sending...',
      },
    })
  }

  setCompletedState() {
    this.setState({
      send: {
        disabled: true,
        text: 'Thank you!',
      },
    })
  }

  setErrorState() {
    this.setState({
      send: {
        disabled: false,
        text: 'Error!  Please try again.',
      },
    })
  }

  handleSubmit(event) {
    this.setSendingState()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name.value,
        email: this.email.value,
        message: this.message.value,
      }),
    }

    fetch('/api/contact', options)
      .then(() => this.setCompletedState()) // eslint-disable-line promise/prefer-await-to-then
      .catch(() => this.setErrorState())

    event.preventDefault()
  }

  render() {
    const disabled = this.state.send.disabled ? 'disabled' : ''
    return (
      <section id="contact-us" css={section}>
        <div className="parallax" css={parallax}>
          <div css={parallaxBackground}>
            <img
              className="parallax-background-image"
              src="static/img/background.jpg"
              css={parallaxImage}
            />
          </div>
          <div css={container}>
            <h2 css={header}>Contact Us</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  ref={name => {
                    this.name = name
                  }}
                  type="text"
                  className="form-control"
                  required="required"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  ref={email => {
                    this.email = email
                  }}
                  type="email"
                  className="form-control"
                  required="required"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <textarea
                  ref={message => {
                    this.message = message
                  }}
                  className="form-control"
                  required="required"
                  placeholder="Message"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-default btn-block btn-lg"
                  disabled={disabled}
                  value={this.state.send.text}
                  css={btnWhite}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

const mediaQuery475 = '@media (min-width: 475px)'

const section = {
  position: 'relative',
  // padding: '30px 0' // needed?
}

const parallax = {
  // display: 'block', // IE?
  // backgroundSize: '100%', // IE?
  position: 'relative',
  color: color.white,
  overflow: 'hidden',
  width: '100%', // needed?
  height: 425,
  textAlign: 'center',
  [mediaQuery.sm]: {height: 460},
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
  bottom: 0,
  // width: '100%', // IE?
  // height: '100%', // IE?
  zIndex: 1,
  [mediaQuery475]: {top: -240}, // -235
  [mediaQuery.sm]: {top: -600}, // -450
  [mediaQuery.md]: {top: -900}, // -550
  [mediaQuery.lg]: {top: -1200}, // -950
}

const parallaxImage = {
  // position: 'relative', // IE?
  width: '100%',
  // height: 'auto' // IE?
}

const container = {
  position: 'absolute',
  top: 40,
  left: '50%',
  maxWidth: 450,
  transform: 'translateX(-50%)',
  width: '80%',
  zIndex: 20,
  [mediaQuery.sm]: {top: 50},
}

const header = {
  color: color.lightGray,
  fontFamily: 'proxima-nova-condensed, sans-serif',
  fontSize: 47,
  fontWeight: 900,
  lineHeight: 1,
  textTransform: 'uppercase',
  [mediaQuery.sm]: {fontSize: 66},
}
