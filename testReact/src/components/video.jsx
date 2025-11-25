import { useRef } from "react";

function Video({ src,isPlaying }) {
    const ref = useRef(null)

    if (isPlaying) {
        ref.current?.play()
    } else {
        ref.current?.pause()
    }

    return <Videoo ref={ref} src={src} loop playsInline/>
}