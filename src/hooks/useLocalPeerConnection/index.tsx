/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react'


function useLocalPeerConnection () {
  const peerConnection = useContext(PeerLocalContext)

  return peerConnection
}

export const PeerLocalContext = createContext(new RTCPeerConnection())


export default useLocalPeerConnection