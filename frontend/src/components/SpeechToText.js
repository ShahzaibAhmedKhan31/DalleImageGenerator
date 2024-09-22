import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector } from 'react-redux';

const SpeechToText = ({ onTranscriptChange, onRecordingChange }) => {
  const [recording, setRecording] = useState(false);
  const [recordingStop, setRecordingStop] = useState(true);
  const { transcript, resetTranscript } = useSpeechRecognition();

  var darkMode = useSelector(state => state.darkMode)
  

  useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Your browser does not support speech recognition software! Try Chrome desktop, maybe?</div>;
  }

  const startRecording = () => {
    setRecording(true);
    resetTranscript();
    setRecordingStop(false);
    onRecordingChange(true); // Notify parent component
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecording = () => {
    setRecording(false);
    setRecordingStop(true);
    onRecordingChange(false); // Notify parent component
    SpeechRecognition.stopListening();
  };

  return (
    <div className='d-flex'>
      <button className={`btn ${darkMode ? 'btn-success' : 'btn-dark'} p-1`} onClick={startRecording} disabled={recording} hidden={!recordingStop}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
        >
            <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
            <path d="M19 10a1 1 0 00-1 1v1a6 6 0 01-12 0v-1a1 1 0 10-2 0v1a8 8 0 007 7.93V21h-3a1 1 0 100 2h8a1 1 0 100-2h-3v-1.07A8 8 0 0020 12v-1a1 1 0 00-1-1z" />
        </svg>
        </button>
        <button className="btn btn-danger p-1" onClick={stopRecording} disabled={!recording} hidden={recordingStop}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
        >
            <path d="M6 6h12v12H6z" />
        </svg>
        </button>
        </div>
  );
};

export default SpeechToText;
