declare function useRTCIceCandidate(): {
    handleICECandidateConnection: (event: RTCPeerConnectionIceEvent) => {
        connection: EventTarget | null;
        newIceCandidate: RTCIceCandidate;
    } | null;
};
export default useRTCIceCandidate;
