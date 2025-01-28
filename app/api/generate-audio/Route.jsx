import { storage } from "@/configs/FirebaseConfig";
import TextToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { Result } from "postcss";

const fs = require('fs');
const util = require('util');

const client = new TextToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  const storageRef = ref(storage, 'ai-short-video-files/'+id+'.mp3');
  
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response.audioContent, 'binary');

  await uploadBytes(storageRef, audioBuffer, {contentType:'audio/mp3'});

  const downloadUrl = await getDownloadURL(storageRef);

  // Write the binary audio content to a local file
  // const writeFile = util.promisify(fs.writeFile);
  // await writeFile("output.mp3", response.audioContent, "binary");
  // console.log("Audio content written to file: output.mp3");
  console.log(downloadUrl);
  return NextResponse.json({ Result: downloadUrl });
}
