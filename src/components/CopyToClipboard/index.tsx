import copy from 'copy-to-clipboard'
import React from 'react';
import { FC } from 'react'

type CopyToClipboardProps = {
  text: string;
  onCopy?: (text: string, result: boolean) => void;
  children: React.ReactElement;
  options?: {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
  };
}




const CopyToClipboard: FC<CopyToClipboardProps> = (props) => {
  const { text, children, onCopy, options } = props

  const elem = React.Children.only(children);

  const onClick = (event: MouseEvent) => {
    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result)
    }

    if (typeof elem.props.onClick === 'function') {
      elem.props.onClick(event)
    }

  }

  return React.cloneElement(elem, { onClick })
}

export default CopyToClipboard