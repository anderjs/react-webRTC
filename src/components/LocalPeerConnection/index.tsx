/* eslint-disable prettier/prettier */
import React, { memo, useRef } from 'react'

import { PeerContext } from 'hooks/useLocalPeerConnection'

interface Props {
  children: React.ReactNode
  localPeerConfiguration: RTCConfiguration
}

const LocalPeerConnection: React.FunctionComponent<Props> = ({
  children,
  localPeerConfiguration
}) => {
  const localPeerConnection = useRef(
    new RTCPeerConnection(localPeerConfiguration)
  )

  return (
    <PeerContext.Provider value={localPeerConnection.current}>
      {children}
    </PeerContext.Provider>
  )
}

export default memo(LocalPeerConnection)