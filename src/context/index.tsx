/* eslint-disable prettier/prettier */
import { createContext } from 'react'

export interface WebRTCAdapterContext {
  dataChannel: RTCDataChannel
  setDataChannel: (channel: RTCDataChannel) => void
  remotePeerConnection: RTCPeerConnection
  localPeerConnection: RTCPeerConnection
  localConnection: RTCPeerConnection
  remoteConnection: RTCPeerConnection
  getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>
  setUserMedia?: (mediaStream: MediaStream) => Promise<void>
  connect: (media: MediaStreamConstraints) => Promise<void>
}

const RTC = createContext<WebRTCAdapterContext>({
  dataChannel: new RTCDataChannel(),
  setDataChannel: function () {},
  remotePeerConnection: new RTCPeerConnection(),
  localPeerConnection: new RTCPeerConnection(),
  localConnection: new RTCPeerConnection(),
  remoteConnection: new RTCPeerConnection(),
  connect: async function () {}
})

export default RTC