import React from 'react'
import {node, oneOf} from 'prop-types'
import styled, {css} from 'styled-components'
import {rem} from 'src/utils'

Article.propTypes = {
  children: node.isRequired,
  highlight: oneOf(['even', 'odd']),
}

Article.defaultProps = {
  highlight: null,
}

export default function Article({children, highlight}) {
  return <ArticleElement highlight={highlight}>{children}</ArticleElement>
}

const ArticleElement = styled.article`
  margin-top: ${rem(10)};
  margin-bottom: ${rem(10)};

  ${props =>
    props.highlight &&
    css`
      :nth-child(${props.highlight}) {
        margin-right: ${rem(-4)};
        margin-left: ${rem(-4)};
        padding: ${rem(10)} ${rem(4)};
        background-color: rgba(238, 236, 229, 0.5);
      }
    `}
`
