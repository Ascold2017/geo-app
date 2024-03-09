import { useEffect, useState } from "react";

export function useAudio(url: string | null) {
    const [audioElement, setAudionElement] = useState<HTMLAudioElement | null>(null)
    useEffect(() => {
       
        const audio = createAudio(url);
        setAudionElement(audio);
        return () => audio?.remove()
    }, [url])

    function createAudio(url?: string | null) {
        if (!url) return null;
        const audio = document.createElement("audio");
        audio.src = url;
        
        return audio
    }

    return {
        play: () => audioElement?.play(),
        playUrl: (url?: string) => {
            const audio = createAudio(url);
            audio?.play();
        }
    };
}