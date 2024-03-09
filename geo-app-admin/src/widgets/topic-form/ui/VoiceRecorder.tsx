import getBlobDuration from 'get-blob-duration'

import { useEffect, useState } from 'react';
// @ts-expect-error No typings
import { AudioVisualizer, LiveAudioVisualizer } from 'react-audio-visualize';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { Button, Card, CardProps, Stack } from 'react-bootstrap';
import { useAudio, blobToBase64 } from '@shared'

type Props = {
    title?: string;
    base64Data: string | null;
    onChange: (base64: string) => void
}
export default function VoiceRecorder({ title, onChange, base64Data, ...props }: Props & Omit<CardProps, 'onChange'>) {
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [duration, setDuration] = useState(0);
    const {
        startRecording,
        stopRecording,
        isRecording,
        recordingTime,
        recordingBlob,
        mediaRecorder
    } = useAudioRecorder();
    const audio = useAudio(base64Data)

    useEffect(() => {
        if (!recordingBlob) return;
        changeBlob(recordingBlob)
       
    }, [recordingBlob]);

    useEffect(() => {
        parseBlobData();
    }, [base64Data])

    const parseBlobData = async () => {
        if (base64Data) {
            const b = await fetch(base64Data).then(r => r.blob());
            const duration = await getBlobDuration(b);
            setBlobData(b);
            setDuration(duration);

        } else {
            setBlobData(null)
            setDuration(0);
        }
    }

    const changeBlob = async (blob: Blob) => {
        const base64 = await blobToBase64(blob);
        onChange(base64 as string)
    }

    const renderRecord = () => {
        if (!blobData) return <span>Нет записи</span>
        return <>
            <Button onClick={() => audio.play()}><i className='icon'>play_arrow</i></Button>
            <AudioVisualizer
                blob={blobData}
                width={300}
                height={32}
                barWidth={1}
                gap={0}
                barColor={'#f76565'}
            />
            <span style={{ padding: '0 0.5rem' }}>{duration} c</span>
        </>
    }

    const renderRecording = () => {
        if (!mediaRecorder) return <span>No media recorder</span>
        return <>
            <LiveAudioVisualizer
                mediaRecorder={mediaRecorder}
                width={300}
                height={32}
                barWidth={1}
                gap={0}
            />
            <span style={{ padding: '0 0.5rem' }}>{recordingTime} c</span>
        </>
    }

    return (
        <Card className="py-1 px-1" size="small" {...props}>
            {title && <span>{title}</span>}
            <Stack direction='horizontal'>
                <Button style={{ marginRight: '0.5rem' }} onMouseDown={startRecording} onMouseUp={stopRecording} ><i className='icon'>mic</i></Button>
                {isRecording
                    ? renderRecording()
                    : renderRecord()
                }
            </Stack>
        </Card>
    )
}