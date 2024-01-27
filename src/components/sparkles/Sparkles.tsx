import React, { useEffect, useState } from 'react'
import SparkleInstance from './SparkleInstance'
import generateSparkle, { type Sparkle } from '../../utilities/generate-sparkle'
import useRandomInterval from '../../utilities/use-random-interval'
import range from '../../utilities/range'
import random from '../../utilities/random'

interface Props {
  children: React.ReactNode
}

const DEFAULT_SPARKLE_SIZE = 50

const Sparkles = ({ children, ...delegated }: Props) => {
  const [sparkles, setSparkles] = useState(() => {
    // Initialize sparkles with a default size
    return range(3).map(() => ({
      ...generateSparkle(),
      size: DEFAULT_SPARKLE_SIZE, // Use the default size
      style: { ...generateSparkle().style, top: '50%', left: '50%' }
    }))
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

  useEffect(() => {
    // Only adjust sizes and positions on the client side
    setSparkles(
      sparkles.map((sparkle) => ({
        ...sparkle,
        size: random(30, 80), // Now apply the random size
        style: {
          ...sparkle.style,
          top: random(0, 100) + '%',
          left: random(0, 100) + '%'
        }
      }))
    )
  }, [])

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

export default Sparkles
