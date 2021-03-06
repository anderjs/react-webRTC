/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

function useLocalMedia () {
  const { localMediaStream: stream, setUserMedia: setStream } = useWebRTCAdapterState()

  return {
    stream,
    setStream
  }
}

export default useLocalMedia