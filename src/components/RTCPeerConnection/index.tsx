/* eslint-disable prettier/prettier */
import React from 'react'

import useLocalPeerConnection from 'hooks/useLocalPeerConnection'
import useRemotePeerConnection from 'hooks/useRemotePeerConnection'

interface Props {
  onSuccessHandleCandidate?: () => void
  onErrorHandleCanidate?: () => void
}

const RTCPeerConnectionHandler: React.FunctionComponent<Props> = props => {
  const localPeerConnection = useLocalPeerConnection()

  const remotePeerConnection = useRemotePeerConnection()

  async function handleConnectionSuccess(event: RTCPeerConnectionIceEvent) {
    const peerConnection = event?.target

    const iceCandidate = event?.candidate

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate)

      const getOutgoingPeer = getPeerConnectionHandler(peerConnection)

      try {
        await getOutgoingPeer.addIceCandidate(newIceCandidate)

        props.onSuccessHandleCandidate && props.onSuccessHandleCandidate()
      } catch (err) {
        props.onErrorHandleCanidate && props.onErrorHandleCanidate()
      }
    }
  }

  React.useEffect(() => {
    localPeerConnection.addEventListener('icecandidate', handleConnectionSuccess)

    remotePeerConnection.addEventListener('icecandidate', handleConnectionSuccess)
  }, [])

  const getPeerConnectionHandler = (peerConnection: EventTarget | null) => {
    return peerConnection === localPeerConnection
      ? remotePeerConnection
      : localPeerConnection
  }

  return <React.Fragment>{props.children}</React.Fragment>
}

export default RTCPeerConnectionHandler
