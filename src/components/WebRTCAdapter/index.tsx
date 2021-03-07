/* eslint-disable prettier/prettier */
import React, { memo, useState, useMemo } from 'react'

import Adapter from 'components/Adapter'

import RTC from 'context'

import { logTrace } from 'utils'

interface Props {
  children: React.ReactNode
  localPeerConfiguration?: RTCConfiguration
  remotePeerConfiguration?: RTCConfiguration
}

interface WebRTCAdapterContext {
  remotePeerConnection: RTCPeerConnection
  localPeerConnection: RTCPeerConnection
  localMediaStream?: MediaStream | null
  getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>
  setUserMedia?: (mediaStream: MediaStream) => Promise<void>
  connect: (media: MediaStreamConstraints) => Promise<void>
}

const WebRTCAdapter: React.FunctionComponent<Props> = ({
  children,
  localPeerConfiguration,
  remotePeerConfiguration
}) => {
  const [localPeerConnection] = useState(
    new RTCPeerConnection(localPeerConfiguration)
  )

  const [remotePeerConnection] = useState(
    new RTCPeerConnection(remotePeerConfiguration)
  )

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null
  )

  async function getUserMedia(constraints: MediaStreamConstraints) {
    if (navigator?.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      setLocalMediaStream(stream)

      return stream
    }
    throw new Error()
  }

  async function setUserMedia(mediaStream: MediaStream) {
    setLocalMediaStream(mediaStream)
  }

  async function connect(constraints: MediaStreamConstraints) {
    try {
      const localMedia = await getUserMedia(constraints)

      const audioTracks = localMedia.getAudioTracks()[0]

      const videoTracks = localMedia.getVideoTracks()[0]

      logTrace(`Connected audio device: ${audioTracks.label}`)
      logTrace(`Connected video device: ${videoTracks.label}`)
    } catch (err) {
      logTrace(err.name)
    }
  }

  const memo = useMemo(() => {
    return {
      localPeerConnection,
      remotePeerConnection,
      localMediaStream,
      getUserMedia,
      setUserMedia,
      connect
    } as WebRTCAdapterContext 
  }, [])

  return (
    <Adapter>
      <RTC.Provider value={memo}>{children}</RTC.Provider>
    </Adapter>
  )
}

export default memo(WebRTCAdapter)
