import './index.css'
import { WebRTCAdapter } from 'react-webrtc-stream'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render((
  <WebRTCAdapter>
    <App />
  </WebRTCAdapter>
), document.getElementById('root'))
