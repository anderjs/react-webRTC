/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'



function useLocalPeerConnection () {
  const { localPeerConnection } = useWebRTCAdapterState()

  return localPeerConnection
}


export default useLocalPeerConnection