// components/Candidate.js
import React, { useState, useEffect, useRef } from 'react';

const Candidate = ({ jobId }) => {
  const [job, setJob] = useState(null);
  const [recordingIndex, setRecordingIndex] = useState(0);
  const videoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await fetch(`/api/jobs/${jobId}`);
      const data = await response.json();
      setJob(data);
    };
    if (jobId) fetchJob();
  }, [jobId]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    setRecorder(mediaRecorder);

    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      videoRef.current.src = URL.createObjectURL(blob);
      setRecordedChunks([...recordedChunks, blob]);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    recorder.stop();
    setRecorder(null);
    setRecordingIndex(recordingIndex + 1);
  };

  return (
    <div>
      {job ? (
        <>
          <h1>{job.jobDescription}</h1>
          {recordingIndex < job.questions.length ? (
            <>
              <h2>Question {recordingIndex + 1}</h2>
              <p>{job.questions[recordingIndex]}</p>
              <button onClick={startRecording} disabled={recorder}>Start Recording</button>
              <button onClick={stopRecording} disabled={!recorder}>Stop Recording</button>
            </>
          ) : (
            <p>Thank you for completing all questions!</p>
          )}
          <video ref={videoRef} controls width={600}></video>
        </>
      ) : (
        <p>Loading job information...</p>
      )}
    </div>
  );
};

export default Candidate;
