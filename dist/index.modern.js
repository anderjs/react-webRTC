import React, { useContext, createContext, useState, useEffect, memo } from 'react';

function useLocalPeerConnection() {
  const peerConnection = useContext(PeerLocalContext);
  return peerConnection;
}

const PeerLocalContext = createContext(new RTCPeerConnection());

function useRemotePeerConnection() {
  const peerConnection = useContext(PeerRemoteContext);
  return peerConnection;
}

const PeerRemoteContext = createContext(new RTCPeerConnection());

function useMediaDevices(constraints) {
  const [localMediaStream, setLocalMediaStream] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    var _navigator, _navigator$mediaDevic;

    if ((_navigator = navigator) !== null && _navigator !== void 0 && (_navigator$mediaDevic = _navigator.mediaDevices) !== null && _navigator$mediaDevic !== void 0 && _navigator$mediaDevic.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(setLocalMediaStream).catch(setError);
    } else {
      const err = new Error('Unsupoorted mediaDevices see: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices');
      setError(err);
    }
  }, []);
  return {
    localMediaStream,
    error
  };
}

function useRTCIceCandidate() {
  function handleICECandidateConnection(event) {
    const connection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      console.debug(newIceCandidate.usernameFragment);
      return {
        connection,
        newIceCandidate
      };
    }

    return null;
  }

  return {
    handleICECandidateConnection
  };
}

const Adapter = ({
  children
}) => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://webrtc.github.io/adapter/adapter-latest.js";
    document.body.appendChild(script);
  }, []);
  return React.createElement(React.Fragment, null, children);
};

const WebRTCAdapter = ({
  children,
  localPeerConfiguration,
  remotePeerConfiguration
}) => {
  const [localPeerConnection] = useState(new RTCPeerConnection(localPeerConfiguration));
  const [remotePeerConnection] = useState(new RTCPeerConnection(remotePeerConfiguration));
  return React.createElement(Adapter, null, React.createElement(PeerLocalContext.Provider, {
    value: localPeerConnection
  }, React.createElement(PeerRemoteContext.Provider, {
    value: remotePeerConnection
  }, children)));
};

var index = memo(WebRTCAdapter);

const RTCPeerConnectionHandler = props => {
  const localPeerConnection = useLocalPeerConnection();
  const remotePeerConnection = useRemotePeerConnection();

  async function handleConnectionSuccess(event) {
    const peerConnection = event === null || event === void 0 ? void 0 : event.target;
    const iceCandidate = event === null || event === void 0 ? void 0 : event.candidate;

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const getOutgoingPeer = getPeerConnectionHandler(peerConnection);

      try {
        await getOutgoingPeer.addIceCandidate(newIceCandidate);
        props.onSuccessHandleCandidate && props.onSuccessHandleCandidate();
      } catch (err) {
        props.onErrorHandleCanidate && props.onErrorHandleCanidate();
      }
    }
  }

  React.useEffect(() => {
    localPeerConnection.addEventListener('icecandidate', handleConnectionSuccess);
    remotePeerConnection.addEventListener('icecandidate', handleConnectionSuccess);
  }, []);

  const getPeerConnectionHandler = peerConnection => {
    return peerConnection === localPeerConnection ? remotePeerConnection : localPeerConnection;
  };

  return React.createElement(React.Fragment, null, props.children);
};

export { Adapter, RTCPeerConnectionHandler, index as WebRTCAdapter, useLocalPeerConnection, useMediaDevices, useRTCIceCandidate, useRemotePeerConnection };
//# sourceMappingURL=index.modern.js.map
