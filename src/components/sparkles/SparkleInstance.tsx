import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  color: string
  size: number
  style: React.CSSProperties
}

const SparkleInstance = ({ color, size, style }: Props) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z'

  return (
    <SparkleWrapper style={style}>
      <SparkleSvg width={size} height={size} viewBox='0 0 68 68' fill='none'>
        <path d={path} fill={color} />
      </SparkleSvg>
    </SparkleWrapper>
  )
}

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`

const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  animation: ${comeInOut} 1400ms forwards;
`
const SparkleSvg = styled.svg`
  display: block;
  animation: ${spin} 2000ms linear;
`

export default SparkleInstance
