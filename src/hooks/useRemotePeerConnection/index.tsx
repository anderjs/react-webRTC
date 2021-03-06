/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'


function useRemotePeerConnection () {
  const { remotePeerConnection } = useWebRTCAdapterState()

  return remotePeerConnection
}


export default useRemotePeerConnection