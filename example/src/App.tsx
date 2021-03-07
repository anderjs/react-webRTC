/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'

import { useConnectionHandler } from 'react-webrtc-stream'

const App = () => {
  const { connect } = useConnectionHandler()

  const audioRef = useRef<HTMLAudioElement>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    async function connectHandler () {
      await connect({ audio: true, video: true })
    }

    connectHandler()
  }, [connect])

  return (
    <>
      <video autoPlay ref={videoRef} />
      <audio autoPlay ref={audioRef} />
    </>
  )
}

export default App
