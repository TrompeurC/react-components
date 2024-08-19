import React from "react";
import Icon, { IconProps } from ".";


const loadedSet = new Set<string>();

export function createFromIconfont(scriptUrl: string) {
  if (scriptUrl.length && !loadedSet.has(scriptUrl)) {
    loadedSet.add(scriptUrl);
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props
    return <Icon {...rest} ref={ref}>
      {type ? <use xlinkHref={`#${type}`} /> : null}
    </Icon>
  })

  return Iconfont;
}