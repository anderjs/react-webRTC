/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

import { logTrace } from 'utils'


function useConnectionHandler () {
  const { connect, localConnection, setDataChannel } = useWebRTCAdapterState()

  const createChannelContext = () => {
    logTrace('Using STCP Data Channel')

    const channel = localConnection.createDataChannel('DataChannel')

    setDataChannel(channel)
  } 


  return {
    createChannelContext,
    connect
  }
}

export default useConnectionHandler