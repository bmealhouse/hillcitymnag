/* eslint-disable import/extensions, react/no-danger */
import React, {Component} from 'react'
import {object} from 'prop-types'
import Head from 'next/head'
import Navigation from '../components/navigation'
import Header from '../components/header'
import SundayService from '../components/sunday-service'
import Updates from '../components/updates'
import LatestSermon from '../components/latest-sermon'
import UpcomingEvent from '../components/upcoming-event'
import Contact from '../components/contact'
import Footer from '../components/footer'
import events from '../static/events.json'
import sermons from '../static/sermons.json'

export default class extends Component {
  static propTypes = {
    latestSermon: object.isRequired,
    upcomingEvent: object.isRequired,
  }

  static async getInitialProps() {
    const latestSermon = sermons[0]

    const today = Date.now()
    const upcomingEvent = [...events]
      .reverse()
      .filter(event => new Date(event.startTime) > today)[0]

    return {latestSermon, upcomingEvent}
  }

  render() {
    return (
      <div
        css={{
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          fontFamily: 'proxima-nova,Helvetica Neue,Open Sans,Arial,sans-serif',
        }}
      >
        <Head>
          <script dangerouslySetInnerHTML={typekitFonts()} />
          <meta charSet="utf-8" />
          <title>Hill City Assembly of God Church</title>
          <link
            rel="apple-touch-icon"
            href="static/apple-touch-icon.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            href="static/favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link
            rel="icon"
            href="static/favicon-16x16.png"
            sizes="16x16"
            type="image/png"
          />
          <link rel="manifest" href="static/manifest.json" />
          <link
            rel="mask-icon"
            href="static/safari-pinned-tab.svg"
            color="#18371b"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-square150x150logo"
            content="static/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="HCAG" />
          <meta name="application-name" content="HCAG" />
          <meta name="theme-color" content="#ffffff" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="stylesheet" href="static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="static/css/font-awesome.min.css" />
        </Head>
        <Navigation />
        <main>
          <Header />
          <SundayService />
          <hr className="hidden-md hidden-lg" css={separator} />
          <Updates>
            <LatestSermon latestSermon={this.props.latestSermon} />
            <hr className="hidden-md hidden-lg" css={separator} />
            <UpcomingEvent upcomingEvent={this.props.upcomingEvent} />
          </Updates>
          <Contact />
          <Footer />
        </main>
        <script
          type="text/javascript"
          src="static/js/jquery-3.1.1.slim.min.js"
        />
        <script type="text/javascript" src="static/js/bootstrap.min.js" />
      </div>
    )
  }
}

const separator = {
  margin: '75px auto',
  width: '75%',
}

const typekitFonts = () => ({
  __html: `
(function(d) {
  var config = {
    kitId: 'aly8gvz',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
`,
})
