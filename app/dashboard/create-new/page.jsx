"use client";
import React, { useContext, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";

// const scriptData =
//   "The old cabin stood alone, nestled deep within a forest where shadows danced with every rustle of leaves. Inside, an empty rocking chair swayed slowly, its rhythm echoing the silence of the night. An ancient book lay open on a table, its pages filled with symbols that seemed to writhe in the dim light. From the corner of the room, a shadowy figure emerged, its form barely visible in the darkness, but its presence undeniable. With a slow creak, the front door swung open, revealing a path into the dark woods, beckoning like an invitation. And then a whisper, soft as the wind through leaves, as if the very forest was alive with a presence, following and surrounding you. ";

// const FILEURL =
//   "https://firebasestorage.googleapis.com/v0/b/ai-short-video-generator-27991.firebasestorage.app/o/ai-short-video-files%2F52ef4cfd-8193-4c9d-be3b-ccecdd667915.mp3?alt=media&token=f473079c-c2b9-4562-b129-053e95643ef1";

// const VideoSCRIPT = [
//   {
//     imagePrompt:
//       "A bustling Roman marketplace in the year 79 AD, with merchants selling goods, people in togas walking by, and the imposing Mount Vesuvius looming in the background. Sunlight, realistic, highly detailed.",
//     contentText:
//       "Imagine a vibrant Roman marketplace, a scene of daily life in 79 AD, moments before history took a dramatic turn.",
//   },
//   {
//     imagePrompt:
//       "Mount Vesuvius erupting with massive force, smoke billowing into the sky, ash and lava spewing from the volcano. Chaos and destruction depicted in a realistic style. Dark and dramatic lighting.",
//     contentText:
//       "Then, without warning, the earth trembled. Mount Vesuvius unleashed its fury, engulfing the nearby city of Pompeii in a deadly embrace.",
//   },
// ];

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const {videoData, setVideoData} = useContext(VideoDataContext);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL);
    // GenerateImage();
  };

  // Get Video Script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic : " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field.";
    console.log(prompt);

    const resp = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      });
      if (resp.data.result) {
        setVideoData(prev => ({
          ...prev,
          'videoScript': resp.data.result
        }))
        setVideoScript(resp.data.result);
        GenerateAudioFile(resp.data.result);
      }
  };

  // Generating Audio File and Save FireBase Storage

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    const videoScriptArray = videoScriptData.video_script;

    if (!Array.isArray(videoScriptArray)) {
      console.error("Invalid data format:", videoScriptData);
      return;
    }

    let script = "";
    const id = uuidv4();
    videoScriptArray.forEach((item) => {
      script = script + item.contentText + " ";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });
    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': resp.data.result
    }))
    // console.log(resp.data);
    setAudioFileUrl(resp.data.result);
    resp.data.result && GenerateAudioCaption(resp.data.result, videoScriptData);
  };

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true);
    console.log(fileUrl);

    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl,
    });

    setCaptions(resp?.data?.result);
    setVideoData(prev => ({
      ...prev,
      'videoScript': resp.data.result
    }))
    resp?.data?.result && GenerateImage(videoScriptData);
  };

  const GenerateImage = async (videoScriptData) => {
    let images = [];

    // await videoScriptData.forEach(async (element) => {
    //   await axios
    //     .post("/api/generate-image", {
    //       prompt: element?.imagePrompt,
    //     })
    //     .then((resp) => {
    //       console.log(resp.data.result);
    //       images.push(resp.data.result);
    //     });
    // });

    for (const element of videoScriptData)
    {
      try {
        const resp = await axios.post('/api/generate-image', {
          prompt: element.imagePrompt
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch(e) {
        console.log('Error', e);
      }
    }

    setImageList(images);
    setLoading(false);
  };

  return (
    <div className="md:px-29">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />

        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />

        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />

        {/* Create */}
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
