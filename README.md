# react-webrtc-stream

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-webrtc-stream.svg)](https://www.npmjs.com/package/react-webrtc-stream) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-webrtc-stream
```

## Usage


#### src/index.js

```js
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
```

```js
  import React, { useEffect, useRef } from 'react'

  import { useConnectionHandler, useMediaStream } from 'react-webrtc-stream'

  const App = () => {
    const audioRef = useRef(null)

    const videoRef = useRef(null)

    const { connect } = useConnectionHandler()

    const { localMediaStream } = useMediaStream()

    useEffect(() => {
      connect({
        audio: true,
        video: true,
      })
    }, [])

    useEffect(() => {
      if (audioRef && videoRef) {
        audioRef.current.srcObject = localMediaStream
        videoRef.current.srcObject = localMediaStream
      }
    }, [localMediaStream])

    return (
      <React.Fragment>
        <audio autoPlay ref={audioRef} />
        <video autoPlay ref={videoRef} />
      </React.Fragment>
    )
  }

  export default App
```

## License

MIT © [anderjs](https://github.com/anderjs)
