"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
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
    const videoScriptArray = videoScriptData.video_script;
  
    if (!Array.isArray(videoScriptArray)) {
      console.error("Invalid data format:", videoScriptData);
      return;
    }
  
    let script = '';
    videoScriptArray.forEach(item => {
      script = script + item.contentText + ' ';
    });
  
    console.log(script);
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
