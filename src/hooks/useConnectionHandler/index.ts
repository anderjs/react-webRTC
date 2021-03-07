/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

import { logTrace } from 'utils'


function useConnectionHandler () {
  const { connect, localConnection, remoteConnection, setDataChannel } = useWebRTCAdapterState()

  const createChannelContext = async () => {
    logTrace('Using STCP Data Channel')

    const channel = localConnection.createDataChannel('DataChannel')

    setDataChannel(channel)

    localConnection.onicecandidate = handleLocalConnectionCallback
    remoteConnection.onicecandidate = handleRemoteConnectionCallback
  } 
  
  const handleLocalConnectionCallback = async (event: RTCPeerConnectionIceEvent) => {
    const iceCandidate = event.candidate

    if (iceCandidate) {
      await remoteConnection.addIceCandidate(iceCandidate)
    }
  }

  const handleRemoteConnectionCallback = async (event: RTCPeerConnectionIceEvent) =>  {
    const iceCandidate = event.candidate

    if (iceCandidate) {
      await localConnection.addIceCandidate(iceCandidate)
    }
  }


  return {
    createChannelContext,
    connect
  }
}

export default useConnectionHandler