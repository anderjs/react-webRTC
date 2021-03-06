/* eslint-disable prettier/prettier */
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Adapter: React.FunctionComponent<Props> = ({ children }) => {
  React.useEffect(() => {
    const script = document.createElement('script')

    script.src = "https://webrtc.github.io/adapter/adapter-latest.js"

    document.body.appendChild(script)
  }, [])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Adapter