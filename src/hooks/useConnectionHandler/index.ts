/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

import { logTrace } from 'utils'

function useConnectionHandler() {
  const {
    connect,
    localConnection,
    remoteConnection,
    setDataChannel
  } = useWebRTCAdapterState()

  /**
   * @description
   * The `createDataChannel()` method on the `RTCPeerConnection` interface creates a new channel
   * linked with the remote peer, over which any kind of data may be transmitted.
   * This can be useful for back-channel content such as images, file transfer,
   * text chat, game update packets, and so forth.
   */
  const createDataChannel = async () => {
    logTrace('Using STCP Data Channel')

    const channel = localConnection.createDataChannel('DataChannel')

    setDataChannel(channel)

    localConnection.onicecandidate = handleLocalConnectionCallback

    remoteConnection.onicecandidate = handleRemoteConnectionCallback
  }

  const handleLocalConnectionCallback = async (
    event: RTCPeerConnectionIceEvent
  ) => {
    const iceCandidate = event.candidate

    if (iceCandidate) {
      try {
        await remoteConnection.addIceCandidate(iceCandidate)
      } catch (err) {
        logTrace('Fail to attemp remoteConnection iceCandidate')
      }
    }
  }

  const handleRemoteConnectionCallback = async (
    event: RTCPeerConnectionIceEvent
  ) => {
    const iceCandidate = event.candidate

    if (iceCandidate) {
      try {
        await localConnection.addIceCandidate(iceCandidate)
      } catch (err) {
        logTrace('Fail to attemp localConnection iceCandidate')
      }
    }
  }

  return {
    createDataChannel,
    connect
  }
}

export default useConnectionHandler
