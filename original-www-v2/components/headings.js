import styled from 'styled-components'
import {rem} from 'src/utils'

export const HeaderGroup = styled.hgroup`
  /* margin-bottom: ${rem(8)}; */
  /* text-align: center; */
`

export const H1 = styled.h1`
  font-size: ${rem('3xl')};
  font-weight: 700;
  line-height: ${rem('4xl')};
  /* sm:text-5xl */
  /* lg:text-6xl */
`

export const H2 = styled.h2`
  font-size: ${rem('2xl')};
  font-weight: 700;
  line-height: ${rem('3xl')};
`

export const H3 = styled.h3`
  font-size: ${rem('2xl')};
  font-weight: 700;
  line-height: ${rem('3xl')};
`

export const Kicker = styled.div`
  margin-top: ${rem(2)};
  margin-right: ${rem(-4)};
  margin-left: ${rem(-4)};
  padding: ${rem(4)};
  /* padding: ${rem(4)} ${rem(10)}; */
  background-color: rgba(238, 236, 229, 0.8);
`

export const H2Kicker = styled.h2`
  max-width: ${rem(64)};
  /* margin-left: auto;
  margin-right: auto; */
  color: #18371b;
  font-size: ${rem('lg')};
  font-weight: 700;
  line-height: ${rem('xl')};
`
