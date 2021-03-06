/* eslint-disable prettier/prettier */
import { createContext, useContext } from 'react'


function useLocalPeerConnection () {
  const peerConnection = useContext(PeerContext)

  return peerConnection
}

export const PeerContext = createContext(new RTCPeerConnection())


export default useLocalPeerConnection