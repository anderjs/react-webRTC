/* eslint-disable prettier/prettier */
import React from 'react'

import useLocalPeerConnection from 'hooks/useLocalPeerConnection'
import useRemotePeerConnection from 'hooks/useRemotePeerConnection'

interface Props {
  onSuccessHandleCandidate?: () => void
  onErrorHandleCanidate?: () => void
  onConnectionStateChange?: () => void
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

  function handleConnectionChange(event: RTCPeerConnectionIceEvent) {
    console.trace(`${getPeerName(event.target)} ICE State: null`)

    if (props.onConnectionStateChange) {
      props.onConnectionStateChange()
    }
  }

  function getPeerName(peerConnection: EventTarget | null): string {
    return peerConnection === localPeerConnection
      ? 'localPeerConnection'
      : 'remotePeerConnection'
  }

  React.useEffect(() => {
    localPeerConnection.addEventListener(
      'icecandidate',
      handleConnectionSuccess
    )
    localPeerConnection.addEventListener(
      'iceconnectionstatechange',
      handleConnectionChange
    )

    remotePeerConnection.addEventListener(
      'icecandidate',
      handleConnectionSuccess
    )
    remotePeerConnection.addEventListener(
      'iceconnectionstatechange',
      handleConnectionChange
    )
  }, [])

  const getPeerConnectionHandler = (peerConnection: EventTarget | null) => {
    return peerConnection === localPeerConnection
      ? remotePeerConnection
      : localPeerConnection
  }

  return <React.Fragment>{props.children}</React.Fragment>
}

export default RTCPeerConnectionHandler
