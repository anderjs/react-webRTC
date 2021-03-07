/* eslint-disable prettier/prettier */
import { createContext } from 'react'

export interface WebRTCAdapterContext {
  remotePeerConnection: RTCPeerConnection
  localPeerConnection: RTCPeerConnection
  localMediaStream?: MediaStream | null
  getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>
  setUserMedia?: (mediaStream: MediaStream) => Promise<void>
  connect: (media: MediaStreamConstraints) => Promise<void>
}

const RTC = createContext<WebRTCAdapterContext>({
  remotePeerConnection: new RTCPeerConnection(),
  localPeerConnection: new RTCPeerConnection(),
  connect: async function () {}
})

export default RTC