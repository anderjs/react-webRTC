/* eslint-disable prettier/prettier */
import React, { memo, useState } from 'react'

import { PeerLocalContext } from 'hooks/useLocalPeerConnection'
import { PeerRemoteContext } from 'hooks/useRemotePeerConnection'

import Adapter from 'components/Adapter'

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

  return (
    <Adapter>
      <PeerLocalContext.Provider value={localPeerConnection}>
        <PeerRemoteContext.Provider value={remotePeerConnection}>
          {children}
        </PeerRemoteContext.Provider>
      </PeerLocalContext.Provider>
    </Adapter>
  )
}

export default memo(WebRTCAdapter)
