/* eslint-disable prettier/prettier */


function useRTCIceCandidate () {
  function handleICECandidateConnection (event: RTCPeerConnectionIceEvent) {
    const connection = event.target

    const iceCandidate = event.candidate

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);

      console.debug(newIceCandidate.usernameFragment)

      return {
        connection,
        newIceCandidate
      }
    }
    
    return null
  }

  return {
    handleICECandidateConnection
  }
}


export default useRTCIceCandidate