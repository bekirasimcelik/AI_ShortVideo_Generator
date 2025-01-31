import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from "remotion";

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {

  const { fps } = useVideoConfig();

  const getDurationFrame = () => {

    setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps)
  
    return captions[captions?.length - 1]?.end / 1000 * fps;
  };
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      {imageList?.map((item, index) => (
        <>
          <Sequence
            key={index}
            from={((index * getDurationFrame()) / imageList?.length)}
            durationInFrames={getDurationFrame()}
          >
          <AbsoluteFill style={{justifyContent:'center', alignItems:'center'}}>
            <Img
              src={item}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <AbsoluteFill style={{color:"white", justifyContent:'center', top: undefined, bottom: 50, height: 150, textAlign: 'center', width: '100%'}}>
              <h2 className="text-2xl">Captions</h2>
            </AbsoluteFill>
          </AbsoluteFill>

          </Sequence>
        </>
      ))}
      <Audio src={audioFileUrl} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
