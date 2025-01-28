import TextToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { Result } from "postcss";

const client = new TextToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, index } = await req.json();

  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("output.mp3", response.audioContent, "binary");
  console.log("Audio content written to file: output.mp3");

  return NextResponse.json({ Result: "Success" });
}
