import { UserTask } from "@entities/task";
import { isMatchQA } from "@shared";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
export const useCheckSpeakingPractice = (task: UserTask) => {

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      const [isRecording, setIsRecording] = useState(false);
      const [record, setRecord] = useState("")
      const isSuccess = isMatchQA(record, task.ka);

      useEffect(() => {
        if (isRecording) {
          setRecord(transcript)
        }
      }, [transcript, isRecording])


      const onPressStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({ language: 'ka-GE', continuous: true });
        setIsRecording(true);
      }
      const onPressEnd = () => {
        SpeechRecognition.stopListening()
        setIsRecording(false);
      }

      return {
        browserSupportsSpeechRecognition,
        onPressStart,
        onPressEnd,
        isSuccess,
        record,
        isRecording,
        listening
      }
}