/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'

interface MediaDevicesHook {
  localMediaStream: MediaStream | null
  error: Error | null
}


function useMediaDevices(constraints?: MediaStreamConstraints): MediaDevicesHook {
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null
  )

  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(setLocalMediaStream)
        .catch(setError)
    } else {
      const err = new Error(
        'Unsupoorted mediaDevices see: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices'
      )

      setError(err)
    }
  }, [])

  return {
    localMediaStream,
    error
  }
}

export default useMediaDevices
