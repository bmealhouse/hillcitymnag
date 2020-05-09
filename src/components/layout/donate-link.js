import React from 'react'
import styled from 'styled-components'

export default function DonateLink() {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
    >
      <input name="cmd" type="hidden" value="_s-xclick" />
      <input name="hosted_button_id" type="hidden" value="7SWTHCY3X9Z3E" />
      <Button type="submit" value="Donate" />
      <img
        alt=""
        src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
        width="0"
        height="0"
      />
    </form>
  )
}

const Button = styled.input`
  cursor: pointer;
  letter-spacing: -0.025em;
  background-color: transparent;
`
