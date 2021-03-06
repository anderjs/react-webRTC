/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect, useDebugValue } from 'react'

import {
  RTCPeerConnectionHandler,
  useLocalPeerConnection,
  useMediaDevices
} from 'react-webrtc-stream'

const App = () => {
  const localPeerConnection = useLocalPeerConnection()

  const { localMediaStream, error } = useMediaDevices({
    audio: true,
    video: true
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  const videoRef = useRef<HTMLVideoElement>(null)

  useDebugValue([localPeerConnection])

  useDebugValue([localMediaStream, error])

  useEffect(() => {
    if (localMediaStream && videoRef.current) {
      videoRef.current.srcObject = localMediaStream
    }
  }, [localMediaStream])

  return (
    <>
      <RTCPeerConnectionHandler />
      <video autoPlay ref={videoRef} />
      <audio autoPlay ref={audioRef} />
    </>
  )
}

export default App
