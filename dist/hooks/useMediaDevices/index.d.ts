interface MediaDevicesHook {
    localMediaStream: MediaStream | null;
    error: Error | null;
}
declare function useMediaDevices(constraints?: MediaStreamConstraints): MediaDevicesHook;
export default useMediaDevices;
