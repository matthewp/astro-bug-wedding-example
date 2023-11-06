import React from 'react'
import styled from 'styled-components'
import SparkleInstance from './SparkleInstance'
import generateSparkle, { type Sparkle } from '../../utilities/generate-sparkle'
import useRandomInterval from '../../utilities/use-random-interval'
import range from '../../utilities/range'

interface Props {
  children: React.ReactNode
}

const Sparkles = ({ children, ...delegated }: Props) => {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(3).map(() => generateSparkle())
  })

  useRandomInterval(
    () => {
      const sparkle = generateSparkle()
      const now = Date.now()
      const nextSparkles = sparkles.filter((sp: Sparkle) => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    500,
    1000
  )
  return (
    <span className='inline-block relative w-full' {...delegated}>
      {sparkles.map((sparkle: Sparkle) => (
        <SparkleInstance
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <span className='flex flex-col z-[1] justify-center items-center'>
        {children}
      </span>
    </span>
  )
}

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`

const ChildWrapper = styled.span`
  position: relative;
  z-index: 1;
`

export default Sparkles
