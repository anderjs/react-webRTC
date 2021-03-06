import React from 'react';
interface Props {
    onSuccessHandleCandidate?: () => void;
    onErrorHandleCanidate?: () => void;
    onConnectionStateChange?: () => void;
}
declare const RTCPeerConnectionHandler: React.FunctionComponent<Props>;
export default RTCPeerConnectionHandler;
