/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react'


function useRemotePeerConnection () {
  const peerConnection = useContext(PeerRemoteContext)

  return peerConnection
}

export const PeerRemoteContext = createContext(new RTCPeerConnection())


export default useRemotePeerConnection