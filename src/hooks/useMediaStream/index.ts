/* eslint-disable prettier/prettier */
import { useContext } from 'react'

import MediaRTC from 'context/Media'

function useMediaStream() {
  const { localMediaStream, remoteMediaStream } = useContext(MediaRTC)

  return {
    localMediaStream,
    remoteMediaStream
  }
}

export default useMediaStream
