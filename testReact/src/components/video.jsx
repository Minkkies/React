import { useEffect, useRef } from "react";

export default function Video({ src, isPlaying, style, className }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
 // เมื่อ isPlaying เปลี่ยนแปลง จะทำให้ useEffect ทำงานและเรียก play() หรือ pause() ตามค่าใหม่   
  }, [isPlaying]); 

  return <video ref={ref} src={src} loop playsInline style={style} className={className} />;
}