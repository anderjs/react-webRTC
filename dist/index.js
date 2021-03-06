function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function useLocalPeerConnection() {
  var peerConnection = React.useContext(PeerLocalContext);
  return peerConnection;
}

var PeerLocalContext = React.createContext(new RTCPeerConnection());

function useRemotePeerConnection() {
  var peerConnection = React.useContext(PeerRemoteContext);
  return peerConnection;
}

var PeerRemoteContext = React.createContext(new RTCPeerConnection());

function useMediaDevices(constraints) {
  var _useState = React.useState(null),
      localMediaStream = _useState[0],
      setLocalMediaStream = _useState[1];

  var _useState2 = React.useState(null),
      error = _useState2[0],
      setError = _useState2[1];

  React.useEffect(function () {
    var _navigator, _navigator$mediaDevic;

    if ((_navigator = navigator) !== null && _navigator !== void 0 && (_navigator$mediaDevic = _navigator.mediaDevices) !== null && _navigator$mediaDevic !== void 0 && _navigator$mediaDevic.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(setLocalMediaStream)["catch"](setError);
    } else {
      var err = new Error('Unsupoorted mediaDevices see: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices');
      setError(err);
    }
  }, []);
  return {
    localMediaStream: localMediaStream,
    error: error
  };
}

function useRTCIceCandidate() {
  function handleICECandidateConnection(event) {
    var connection = event.target;
    var iceCandidate = event.candidate;

    if (iceCandidate) {
      var newIceCandidate = new RTCIceCandidate(iceCandidate);
      console.debug(newIceCandidate.usernameFragment);
      return {
        connection: connection,
        newIceCandidate: newIceCandidate
      };
    }

    return null;
  }

  return {
    handleICECandidateConnection: handleICECandidateConnection
  };
}

var Adapter = function Adapter(_ref) {
  var children = _ref.children;
  React__default.useEffect(function () {
    var script = document.createElement('script');
    script.src = "https://webrtc.github.io/adapter/adapter-latest.js";
    document.body.appendChild(script);
  }, []);
  return React__default.createElement(React__default.Fragment, null, children);
};

var WebRTCAdapter = function WebRTCAdapter(_ref) {
  var children = _ref.children,
      localPeerConfiguration = _ref.localPeerConfiguration,
      remotePeerConfiguration = _ref.remotePeerConfiguration;

  var _useState = React.useState(new RTCPeerConnection(localPeerConfiguration)),
      localPeerConnection = _useState[0];

  var _useState2 = React.useState(new RTCPeerConnection(remotePeerConfiguration)),
      remotePeerConnection = _useState2[0];

  return React__default.createElement(Adapter, null, React__default.createElement(PeerLocalContext.Provider, {
    value: localPeerConnection
  }, React__default.createElement(PeerRemoteContext.Provider, {
    value: remotePeerConnection
  }, children)));
};

var index = React.memo(WebRTCAdapter);

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var RTCPeerConnectionHandler = function RTCPeerConnectionHandler(props) {
  var handleConnectionSuccess = function handleConnectionSuccess(event) {
    try {
      var peerConnection = event === null || event === void 0 ? void 0 : event.target;
      var iceCandidate = event === null || event === void 0 ? void 0 : event.candidate;

      var _temp3 = function () {
        if (iceCandidate) {
          var newIceCandidate = new RTCIceCandidate(iceCandidate);
          var getOutgoingPeer = getPeerConnectionHandler(peerConnection);

          var _temp4 = _catch(function () {
            return Promise.resolve(getOutgoingPeer.addIceCandidate(newIceCandidate)).then(function () {
              props.onSuccessHandleCandidate && props.onSuccessHandleCandidate();
            });
          }, function () {
            props.onErrorHandleCanidate && props.onErrorHandleCanidate();
          });

          if (_temp4 && _temp4.then) return _temp4.then(function () {});
        }
      }();

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var localPeerConnection = useLocalPeerConnection();
  var remotePeerConnection = useRemotePeerConnection();
  React__default.useEffect(function () {
    localPeerConnection.addEventListener('icecandidate', handleConnectionSuccess);
    remotePeerConnection.addEventListener('icecandidate', handleConnectionSuccess);
  }, []);

  var getPeerConnectionHandler = function getPeerConnectionHandler(peerConnection) {
    return peerConnection === localPeerConnection ? remotePeerConnection : localPeerConnection;
  };

  return React__default.createElement(React__default.Fragment, null, props.children);
};

exports.Adapter = Adapter;
exports.RTCPeerConnectionHandler = RTCPeerConnectionHandler;
exports.WebRTCAdapter = index;
exports.useLocalPeerConnection = useLocalPeerConnection;
exports.useMediaDevices = useMediaDevices;
exports.useRTCIceCandidate = useRTCIceCandidate;
exports.useRemotePeerConnection = useRemotePeerConnection;
//# sourceMappingURL=index.js.map
