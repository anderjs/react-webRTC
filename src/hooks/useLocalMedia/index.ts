/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

function useLocalMedia () {
  const { setUserMedia: setStream } = useWebRTCAdapterState()

  return {
    setStream
  }
}

export default useLocalMedia