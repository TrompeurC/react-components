import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import './index.css'


const ReacSpringAnimation = (() => {
  const style = useSpring({
    from: {
      height: 0,
      with: 0
    },
    to: {
      height: 200,
      width: 200
    },
    config: {
      // duration: 2000,
      // 质量  质量（也就是重量），质量越大，回弹惯性越大，回弹的距离和次数越多
      mass: 2,
      // 张力 张力，弹簧松紧程度，弹簧越紧，回弹速度越快
      tension: 10,
      // 摩擦力 ：摩擦力，增加点阻力可以抵消质量和张力的效果
      friction: 1
    }
  })
  useEffect(() => {
    // width.start(200)
  })
  return (
    <div className='react-spring-animation'>
      <animated.div className="box" style={{ ...style }}></animated.div>
    </div>
  )
})

export default ReacSpringAnimation2


function ReacSpringAnimation2() {
  const [styles, api] = useSpring(() => {
    return {
      from: {
        width: 100,
        height: 100
      },
      config: {
        // duration: 2000
        mass: 2,
        friction: 10,
        tension: 400
      }
    }
  });

  function clickHandler() {
    api.start({
      width: 200,
      height: 200
    });
  }

  return <div className='react-spring-animation'>
    <animated.div className="box" style={{ ...styles }} onClick={clickHandler}></animated.div>
  </div>
}