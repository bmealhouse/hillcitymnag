import React from 'react'
import {string, node, oneOf} from 'prop-types'
import styled, {css} from 'styled-components'
import {rem, screens} from 'src/utils'

Article.propTypes = {
  id: string,
  children: node.isRequired,
  highlight: oneOf(['even', 'odd']),
}

Article.defaultProps = {
  highlight: null,
}

function Article({id, children, highlight}) {
  return (
    <ArticleElement id={id} highlight={highlight}>
      {children}
    </ArticleElement>
  )
}

export default React.memo(Article)

const ArticleElement = styled.article`
  margin-top: ${rem(10)};
  margin-bottom: ${rem(10)};

  p:last-of-type {
    margin-bottom: 0;
  }

  ${(props) =>
    props.highlight &&
    css`
      :nth-child(${props.highlight}) {
        margin-right: ${rem(-6)};
        margin-left: ${rem(-6)};
        padding: ${rem(10)} ${rem(6)};
        background-color: hsla(47, 21%, 92%, 0.5);

        @media (min-width: ${screens.lg}) {
          margin-right: ${rem(-8)};
          margin-left: ${rem(-8)};
          padding-right: ${rem(8)};
          padding-left: ${rem(8)};
        }
      }
    `};
`
