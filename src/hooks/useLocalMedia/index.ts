/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

function useLocalMedia () {
  const { localMediaStream } = useWebRTCAdapterState()

  return localMediaStream
}

export default useLocalMedia