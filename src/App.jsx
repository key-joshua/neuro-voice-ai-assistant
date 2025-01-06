'use client';

import { Mic, MicOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { WaveSVG } from './components/SVG';
import Section from './components/Section';
import { Header } from './components/Header';
import { VoiceViz } from './components/Voice-Viz';
import { promptOpenAI } from './services/openaiService';

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastSpeechTime, setLastSpeechTime] = useState(Date.now());
  const [isFinishedSpeaking, setIsFinishedSpeaking] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true })
      .then(() => console.log('Listening started successfully.'))
      .catch((error) => console.error('Error starting listening:', error));
  };

  const stopListening = () => {
    SpeechRecognition.stopListening()
      .then(() => console.log('Listening stopped successfully.'))
      .catch((error) => console.error('Error stopping listening:', error));
  };

  const speakResponse = (text) => new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const [defaultVoice] = speechSynthesis.getVoices();
    utterance.voice = defaultVoice;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => resolve(false);
    speechSynthesis.speak(utterance);
  });

  const handleMicClick = () => {
    setIsListening((currentState) => {
      const newState = !currentState;
      if (newState) {
        startListening();
      } else {
        stopListening();
        setIsFinishedSpeaking(false);
        speakResponse('Thank you for speaking to us.');
      }
      return newState;
    });
  };

  useEffect(() => {
    if (isListening && transcript) {
      const silenceThreshold = 2000;

      const checkIfFinished = () => {
        const isSilent = Date.now() - lastSpeechTime > silenceThreshold;
        if (isSilent) {
          stopListening();
          setIsFinishedSpeaking(true);
        }
      };

      const interval = setInterval(checkIfFinished, 1000);
      return () => clearInterval(interval);
    }

    return () => {};
  }, [isListening, transcript, lastSpeechTime]);

  useEffect(() => {
    if (transcript) {
      setLastSpeechTime(Date.now());
      setIsFinishedSpeaking(false);
    }
  }, [transcript]);

  useEffect(() => {
    const handleUserRequest = async (userPrompt) => {
      try {
        resetTranscript();
        const response = await promptOpenAI(userPrompt);
        console.log('CHAT GPT RESPONSE ===>', response);
        speakResponse(`${response}. Is there anything else I can help you with`).then((status) => {
          setIsFinishedSpeaking(status);
          startListening();
        });
      } catch (error) {
        console.log('ERROR:', error);
      }
    };

    if (isFinishedSpeaking && transcript) {
      handleUserRequest(transcript);
      speakResponse('Let me think a moment...');
    }
  }, [isFinishedSpeaking, transcript]);

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <Section />
        {browserSupportsSpeechRecognition && (
          <div className="phone-container">
            <div className="phone-mockup">
              <div className="phone-screen">
                <button onClick={handleMicClick} type="button" className={`mic-button ${isListening ? 'listening' : ''}`}>
                  {isListening ? <Mic className="mic-icon" /> : <MicOff className="mic-icon" />}
                </button>
                <WaveSVG />

                {isListening && <VoiceViz />}

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
