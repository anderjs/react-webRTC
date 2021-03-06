/// <reference types="react" />
interface MediaContext {
    localMediaStream?: MediaStream | null;
    remoteMediaStream?: MediaStream | null;
    getUserMedia: () => Promise<MediaStream | null>;
}
export declare const MediaStreamContext: import("react").Context<MediaContext | null>;
declare function useMediaStreams(): {
    localMediaStream: MediaStream | null | undefined;
    remoteMediaStream: MediaStream | null | undefined;
};
export default useMediaStreams;
