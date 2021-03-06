/// <reference types="react" />
export interface WebRTCAdapterContext {
    remotePeerConnection: RTCPeerConnection;
    localPeerConnection: RTCPeerConnection;
    localMediaStream?: MediaStream | null;
    getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>;
}
declare const RTC: import("react").Context<WebRTCAdapterContext>;
export default RTC;
