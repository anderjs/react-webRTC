/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'

import { useConnectionHandler, useMediaStream } from 'react-webrtc-stream'

const App = () => {
  const { localMediaStream } = useMediaStream()

  const { connect } = useConnectionHandler()

  const audioRef = useRef<HTMLAudioElement>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    async function connectHandler () {
      await connect({ audio: true, video: true })
    }

    connectHandler()
  }, [connect])

  React.useEffect(() => {
    if (audioRef.current && videoRef.current) {
      audioRef.current.srcObject = localMediaStream
      videoRef.current.srcObject = localMediaStream
    } 
  }, [localMediaStream])

  return (
    <>
      <video autoPlay ref={videoRef} />
      <audio autoPlay ref={audioRef} />
    </>
  )
}

export default App
