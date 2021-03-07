# react-webrtc-stream

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-webrtc-stream.svg)](https://www.npmjs.com/package/react-webrtc-stream) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-webrtc-stream
```

## Usage

```tsx
  import React, { useEffect, useRef } from 'react'

  import { useConnectionHandler } from 'react-webrtc-stream'

  const App = () => {
    const audioRef = useRef(null)

    const videoRef = useRef(null)

    const { connect} = useConnectionHandler()

    useEffect(() => {
      connect({
        audio: true,
        video: true,
      })
    }, [])

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
