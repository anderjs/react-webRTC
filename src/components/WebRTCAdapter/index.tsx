/* eslint-disable prettier/prettier */
import React, { memo, useState, useMemo } from 'react'

import Adapter from 'components/Adapter'

import RTC from 'context'
import MediaRTC from 'context/Media'

import { logTrace } from 'utils'

interface Props {
  children: React.ReactNode
  localPeerConfiguration?: RTCConfiguration
  remotePeerConfiguration?: RTCConfiguration
}

interface WebRTCAdapterContext {
  dataChannel: RTCDataChannel
  setDataChannel: (channel: RTCDataChannel) => void
  remotePeerConnection: RTCPeerConnection
  localPeerConnection: RTCPeerConnection
  localConnection: RTCPeerConnection
  remoteConnection: RTCPeerConnection
  getUserMedia?: (constraints: MediaStreamConstraints) => Promise<MediaStream | null>
  setUserMedia?: (mediaStream: MediaStream) => Promise<void>
  connect: (media: MediaStreamConstraints) => Promise<void>
}

const WebRTCAdapter: React.FunctionComponent<Props> = ({
  children,
  localPeerConfiguration,
  remotePeerConfiguration
}) => {
  const [localPeerConnection] = useState(
    new RTCPeerConnection(localPeerConfiguration)
  )

  const [remotePeerConnection] = useState(
    new RTCPeerConnection(remotePeerConfiguration)
  )

  const [localConnection] = useState(
    new RTCPeerConnection()
  )

  const [remoteConnection] = useState(
    new RTCPeerConnection()
  )

  const [dataChannel, setDataChannel] = useState<RTCDataChannel>()

  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null
  )

  const [remoteMediaStream, setRemoteMediaStream] = useState<
    readonly MediaStream[]
  >([])

  async function getUserMedia(constraints: MediaStreamConstraints) {
    if (navigator?.mediaDevices?.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      setLocalMediaStream(stream)

      return stream
    }
    throw new Error()
  }

  async function setUserMedia(mediaStream: MediaStream) {
    setLocalMediaStream(mediaStream)
  }

  /**
   * @description
   * The `connect` method provides a direct call with the browser to request the video or audio devices.
   * It also establishes the ICECandidate, and RTCPeerConnection protocols
   * to achieve a connection between both browsers.
   */
  async function connect(
    constraints: MediaStreamConstraints,
    offerOptions?: RTCOfferOptions
  ) {
    try {
      const localMedia = await getUserMedia(constraints)

      const audioTracks = localMedia.getAudioTracks()

      const videoTracks = localMedia.getVideoTracks()

      if (audioTracks.length > 0) {
        logTrace(`Connected audio device: ${audioTracks[0].label}`)
      }

      if (videoTracks.length > 0) {
        logTrace(`Connected video device: ${videoTracks[0].label}`)
      }

      /**
       * @description
       * Local Peer Connection Events
       */
      localPeerConnection.addEventListener(
        'icecandidate',
        handleRTCIceConnection
      )

      localPeerConnection.addEventListener(
        'iceconnectionstatechange',
        handleConnectionChange
      )

      /**
       * @description
       * Remote Peer Connection Events
       */
      remotePeerConnection.addEventListener(
        'icecandidate',
        handleRTCIceConnection
      )

      remotePeerConnection.addEventListener(
        'iceconnectionstatechange',
        handleConnectionChange
      )

      remotePeerConnection.addEventListener('track', handleRemoteStream)

      localPeerConnection.addTrack(localMedia.getTracks()[0])

      const offer = await localPeerConnection.createOffer(
        offerOptions ?? {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }
      )

      logTrace(`
        Offer from localPeerConnection: \n ${offer.sdp}
        localPeerConnection setLocalDescription start
        `)

      await localPeerConnection.setLocalDescription(offer)

      logTrace(`
        Description from ${getOutgoingPeerConnection(
          localPeerConnection
        )} successfull
      `)

      await remotePeerConnection.setRemoteDescription(offer)

      logTrace(`
        Description from ${getOutgoingPeerConnection(
          remotePeerConnection
        )} successfull
      `)

      const answer = await remotePeerConnection.createAnswer()

      logTrace(`
        Offer from localPeerConnection: \n ${answer.sdp}
        localPeerConnection setLocalDescription start
        `)

      await remotePeerConnection.setLocalDescription(answer)

      logTrace(`
      Description from ${getOutgoingPeerConnection(
        localPeerConnection
      )} successfull
    `)

      await localPeerConnection.setRemoteDescription(answer)

      logTrace(`
      Description from ${getOutgoingPeerConnection(
        remotePeerConnection
      )} successfull
    `)
    } catch (err) {
      logTrace(err.name)
    }
  }

  /**
   * The WebRTC API interface `RTCTrackEvent` represents the `track` event,
   * which is sent when a new `MediaStreamTrack` is added to an `RTCRtpReceiver` which is part of the `RTCPeerConnection`.
   * The target is the `RTCPeerConnection` object to which the track is being added.
   */
  const handleRemoteStream = (event: RTCTrackEvent) => {
    setRemoteMediaStream(event.streams)

    logTrace(`Remote stream received: ${event.track}`)
  }

  const handleConnectionChange = (event: Event) => {
    const peer = event.target

    logTrace(`${getPeerName(peer)} ICE State: ${peer}`)
  }

  /**
   * @description
   * When a web site or app using `RTCPeerConnection` receives a new ICE candidate from the remote peer
   * over its signaling channel, it delivers the newly-received candidate to the browser's `ICE`
   * agent by calling
   * `RTCPeerConnection.addIceCandidate()`. This adds this new remote candidate to the
   * `RTCPeerConnection`'s remote description, which describes the state of the remote end of the connection.
   */
  const handleRTCIceConnection = async (event: RTCPeerConnectionIceEvent) => {
    const peerConnection = event.target

    const iceCandidate = event.candidate

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate)

      const outgoingPeerConnection = getOutgoingPeerConnection(peerConnection)

      try {
        await outgoingPeerConnection.addIceCandidate(newIceCandidate)
        logTrace(
          `${getPeerName(peerConnection)} addIceCandidate: \n ${
            event.candidate?.candidate
          }`
        )
      } catch (err) {
        logTrace(
          `${getPeerName(
            peerConnection
          )} failed to add ICE Candidate: \n ${JSON.stringify(err, null, 2)}`
        )
      }
    }
  }

  const getOutgoingPeerConnection = (peerConnection: EventTarget | null) => {
    return peerConnection === localPeerConnection
      ? remotePeerConnection
      : localPeerConnection
  }

  const getPeerName = (peerConnection: EventTarget | null) => {
    return peerConnection === localPeerConnection
      ? 'remotePeerConnection'
      : 'localPeerConnection'
  }

  const memo = useMemo(() => {
    return {
      dataChannel,
      setDataChannel: (channel: RTCDataChannel) => {
        setDataChannel(channel)
      },
      localConnection,
      remoteConnection,
      localPeerConnection,
      remotePeerConnection,
      getUserMedia,
      setUserMedia,
      connect
    } as WebRTCAdapterContext
  }, [])

  const mediaStreamConsumer = useMemo(
    () => ({
      localMediaStream,
      remoteMediaStream
    }),
    []
  )

  return (
    <Adapter>
      <RTC.Provider value={memo}>
        <MediaRTC.Provider value={mediaStreamConsumer}>
          {children}
        </MediaRTC.Provider>
      </RTC.Provider>
    </Adapter>
  )
}

export default memo(WebRTCAdapter)
