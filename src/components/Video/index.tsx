/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import { io, Socket } from 'socket.io-client';
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash } from 'phosphor-react';

import { ActionButton, Content } from './styles';
import fim from '../../assets/tel.svg';
import Cam from '../../assets/fim.svg';
import { Data } from '../../pages/RequestForm';
import { theme } from '../../styles/theme';

interface Props{
  CloseVideo:() => void;
  requestData: Data;
  socket?: Socket;
  receivedCall: string | null;
  remoteVideoHidden: boolean;
  remoteMuted: boolean
}

const firebaseConfig = {
  apiKey: 'AIzaSyBlBrfOAcVWR3ju8MXzAoK7ss6-wh5U03s',
  authDomain: 'webrtc-prototype-10b6a.firebaseapp.com',
  databaseURL: 'https://webrtc-prototype-10b6a-default-rtdb.firebaseio.com',
  projectId: 'webrtc-prototype-10b6a',
  storageBucket: 'webrtc-prototype-10b6a.appspot.com',
  messagingSenderId: '427297240445',
  appId: '1:427297240445:web:97bd6b5fb551f691024814',
  measurementId: 'G-21X3W6XM5Q',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function Video({
  CloseVideo,
  requestData,
  socket,
  receivedCall,
  remoteVideoHidden,
  remoteMuted,
}: Props) {
  let remoteStream: MediaStream;
  let pc = new RTCPeerConnection(servers);
  // let pc2 = new RTCPeerConnection(servers);

  const webcamRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState(true);
  const [videoStream, setVideoSTream] = useState(true);

  const handleStartWebcam = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    remoteStream = new MediaStream();

    // Push tracks from local stream to peer connection
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      console.log('eventstreams', event.streams);
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    console.log({ remoteStream });

    webcamRef.current!.srcObject = stream;
    remoteRef.current!.srcObject = remoteStream;

    setLocalStream(stream);
  };

  const handleCall = async () => {
    // reference firestore collections for signaling
    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    // callInputRef.current!.value = `https://9d69-2804-431-cffe-35c7-5685-e76a-b14e-262a.sa.ngrok.io/?videoId=${callDoc.id}`;

    const socketEmit: any = {
      cdAtendimento: requestData.cdAtendimento,
      offerInfo: {
        offer: callDoc.id,
        cdUsuario: requestData.cdAtendente,
      },
    };

    console.log('to mobile:', socketEmit);

    socket!.emit('new video request', socketEmit);

    // get candidates for caller to save to db
    pc.onicecandidate = event => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // create offer
    const offerDescription: RTCSessionDescriptionInit = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // listen for remote ice candidates
    answerCandidates.onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  const handleAnswer = async (videoId: string) => {
    console.log({ videoId });
    const callDoc = firestore.collection('calls').doc(videoId);

    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    pc.onicecandidate = event => {
      event.candidate && answerCandidates.add(event.candidate.toJSON());
    };

    // Fetch data, then set the offer and anser
    const callData = (await callDoc.get()).data();

    const offerDescription = callData!.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await callDoc.update({ answer });

    // Listen to offer candidates

    offerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change);
        if (change.type === 'added') {
          let data = change.doc.data();
          pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  };

  const streamAction = (key: string, action: boolean) => {
    const socketEmit = {
      cdAtendimento: requestData.cdAtendimento,
      cdUsuario: -1,
      [key]: action,
    };
    console.log('component: Video\nfunction: streamAction, value:socketEmit', { socketEmit });

    socket!.emit('video action', socketEmit);
  };

  const handleMute = () => {
      localStream!.getAudioTracks()[0].enabled = !audioStream;
      streamAction('muted', audioStream);
      return setAudioStream(!audioStream);
  };

  const handleVideoStream = () => {
      localStream!.getVideoTracks()[0].enabled = !videoStream;
      streamAction('hidden', videoStream);
      return setVideoSTream(!videoStream);
  };

  useEffect(() => {
    handleStartWebcam();

    setTimeout(() => {
      if (receivedCall) {
        // handleAnswer(receivedCall);
      } else {
        console.log('oi');
        handleCall();
      }
    }, 1000);
  }, []);

  return (
    <Content>
      <div id="camera-container">
        <section>
          <div id="callBox">
            <video id="remoteCam" autoPlay playsInline ref={remoteRef} />
          </div>
          <div id="statusIndicator">
            {
              remoteVideoHidden && (
              <button type="submit">
                <VideoCameraSlash size="22" weight="fill" color="#FFF" />
              </button>
              )
            }
            {
              remoteMuted && (
              <button type="submit">
                <MicrophoneSlash size="22" weight="fill" color="#FFF" />
              </button>
              )
            }
          </div>
        </section>
        <section>
          <div id="callBox">
            <video id="localCam" autoPlay playsInline muted ref={webcamRef} />
          </div>
        </section>
      </div>
      <div id="buttons">
        <ActionButton onClick={handleMute} backGroundColor={theme.colors.greenMain}>
          {audioStream ? <Microphone size="32" weight="fill" color="#FFF" /> : <MicrophoneSlash size="32" weight="fill" color="#FFF" /> }
        </ActionButton>
        <ActionButton onClick={handleVideoStream} backGroundColor={theme.colors.blueMain}>
          {videoStream ? <VideoCamera size="32" weight="fill" color="#FFF" /> : <VideoCameraSlash size="32" weight="fill" color="#FFF" />}
        </ActionButton>
      </div>
    </Content>
  );
}
