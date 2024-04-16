import React, { PropsWithChildren } from "react"

import { SizeType } from '.'

interface ConfigContextType {
  space?: {
    size?: SizeType
  }
}

export const ConfigContext = React.createContext<ConfigContextType>({})


interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {

}
export const ConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { space, children } = props
  return <ConfigContext.Provider value={{ space }}>{children}</ConfigContext.Provider>
}