/* eslint-disable prettier/prettier */
import useWebRTCAdapterState from 'hooks/useWebRTCAdapterState'

function useConnectionHandler () {
  const { connect } = useWebRTCAdapterState()

  return {
    connect
  }
}

export default useConnectionHandler