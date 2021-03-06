/* eslint-disable prettier/prettier */
import { useContext } from 'react'

import RTC from 'context'

function useWebRTCAdapterState () {
  const state = useContext(RTC)
  
  return state
}

export default useWebRTCAdapterState