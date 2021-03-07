/* eslint-disable prettier/prettier */
import { createContext } from 'react'

export interface MediaContext {
  localMediaStream: MediaStream | null
  remoteMediaStream: readonly MediaStream []
}

const MediaRTC = createContext<MediaContext>({
  localMediaStream: new MediaStream(),
  remoteMediaStream: []
})

export default MediaRTC
