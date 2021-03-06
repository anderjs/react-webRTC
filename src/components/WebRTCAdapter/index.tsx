/* eslint-disable prettier/prettier */
import React, { memo, useState, useMemo } from 'react'


import Adapter from 'components/Adapter'

import RTC from 'context'

interface Props {
  children: React.ReactNode
  localPeerConfiguration?: RTCConfiguration
  remotePeerConfiguration?: RTCConfiguration
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

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(null)

  async function getUserMedia (constraints: MediaStreamConstraints) {
    if (navigator?.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      setLocalMediaStream(stream)

      return stream
    }
    return null
  }

  const memo = useMemo(() => {
    return {
      localPeerConnection,
      remotePeerConnection,
      localMediaStream,
      getUserMedia
    }
  }, [])

  return (
    <Adapter>
      <RTC.Provider value={memo}>
        {children}
      </RTC.Provider>
    </Adapter>
  )
}

export default memo(WebRTCAdapter)
