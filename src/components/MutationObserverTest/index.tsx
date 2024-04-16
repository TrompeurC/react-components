import React, { memo, useEffect, useRef, useState } from 'react'

const MutationObserverTest = memo(() => {
  const [className, setClassName] = useState('aaa')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setClassName('bbbb')
    }, 3000)
    // function callback(mutationsList: MutationRecord[]) {
    //   console.log(mutationsList)
    // }
    const targetNode = containerRef.current!;
    const callback = function (mutationsList: MutationRecord[],) {
      console.log(mutationsList);
    };
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, {
      attributes: true,
      childList: true,
      subtree: true
    })


  }, [])

  return (
    <div className='container' ref={containerRef}>
      <div className={className}>
        {
          className === 'aaa' ? <div>aaa</div> : <div>
            <p>bbb</p>
          </div>
        }
      </div>
    </div>
  )
})

export default MutationObserverTest