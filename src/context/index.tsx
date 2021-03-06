/* eslint-disable prettier/prettier */
import { createContext } from 'react'

export interface WebRTCAdapterContext {
  remotePeerConnection: RTCPeerConnection
  localPeerConnection: RTCPeerConnection
  localMediaStream?: MediaStream | null
  getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>
}

const RTC = createContext<WebRTCAdapterContext>({
  remotePeerConnection: new RTCPeerConnection(),
  localPeerConnection: new RTCPeerConnection(),
})

export default RTC