import { useEffect } from "react"

const defaultOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributeFilter: ["class", 'style']
}

export default function useMutateObserver (
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if(!nodeOrList) return

    let instance: MutationObserver

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback);

      nodeList.forEach(element => {
        instance.observe(element, options);
      });
    }

    return () => {
      // takeRecords 删掉所有剩余通知
      instance?.takeRecords()
      // disconnect 停止接收新的通知
      instance?.disconnect()
    }
  } , [options, nodeOrList])

}