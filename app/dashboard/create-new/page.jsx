"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';


const scriptData = "The old cabin stood alone, nestled deep within a forest where shadows danced with every rustle of leaves. Inside, an empty rocking chair swayed slowly, its rhythm echoing the silence of the night. An ancient book lay open on a table, its pages filled with symbols that seemed to writhe in the dim light. From the corner of the room, a shadowy figure emerged, its form barely visible in the darkness, but its presence undeniable. With a slow creak, the front door swung open, revealing a path into the dark woods, beckoning like an invitation. And then a whisper, soft as the wind through leaves, as if the very forest was alive with a presence, following and surrounding you. "

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
    // Burada Manuele Geçiyoruz
    // GenerateAudioFile(scriptData);
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
  
    try {
      const resp = await axios.post("/api/get-video-script", { prompt });
      const resultData = resp.data.result;
      setVideoScript(resultData.video_script);
      GenerateAudioFile(resultData);
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    const videoScriptArray = videoScriptData.video_script;
  
    if (!Array.isArray(videoScriptArray)) {
      console.error("Invalid data format:", videoScriptData);
      return;
    }
  
    let script = '';
    const id = uuidv4();
    videoScriptArray.forEach(item => {
      script = script + item.contentText + ' ';
    });

    await axios.post('/api/generate-audio', {
      text: script,
      id: id
    }).then(resp => {
      // console.log(resp.data);
      setAudioFileUrl(resp.data.result);
    })
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
