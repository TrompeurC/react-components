import { useEffect } from "react"


const defaultOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributeFilter: ['style', 'class']
} 

export default (nodeOrNodeList: HTMLElement | HTMLElement [] , callback: MutationCallback, options: MutationObserverInit = defaultOptions) => {
  useEffect(() => {
    if(!nodeOrNodeList) return

    const observer = new MutationObserver(callback)
    const nodes = Array.isArray(nodeOrNodeList) ? nodeOrNodeList : [nodeOrNodeList]
    nodes.forEach(node =>  observer.observe(node , options))

    return () => {
      observer.takeRecords()
      observer.disconnect()
    }

  } , [nodeOrNodeList,options ])
}