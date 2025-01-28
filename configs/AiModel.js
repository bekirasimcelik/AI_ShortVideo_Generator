const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "video_script": [\n    {\n      "scene": 1,\n      "imagePrompt": "A bustling Roman marketplace in the year 79 AD, with merchants selling goods, people in togas walking by, and the imposing Mount Vesuvius looming in the background. Sunlight, realistic, highly detailed.",\n      "contentText": "Imagine a vibrant Roman marketplace, a scene of daily life in 79 AD, moments before history took a dramatic turn."\n    },\n   {\n      "scene": 2,\n      "imagePrompt": "Mount Vesuvius erupting with massive force, smoke billowing into the sky, ash and lava spewing from the volcano. Chaos and destruction depicted in a realistic style. Dark and dramatic lighting.",\n      "contentText": "Then, without warning, the earth trembled. Mount Vesuvius unleashed its fury, engulfing the nearby city of Pompeii in a deadly embrace."\n    },\n    {\n      "scene": 3,\n      "imagePrompt": "A street in Pompeii covered in thick layers of ash, with ghostly figures of people frozen in their final moments, their bodies preserved in the volcanic ash. Somber and realistic depiction. Muted colors.",\n      "contentText": "The once bustling city was now a ghostly tableau, its inhabitants frozen in time by the ash, a poignant reminder of nature\'s power."\n    },\n    {\n      "scene": 4,\n    "imagePrompt": "Archaeologists carefully excavating the ruins of Pompeii, uncovering ancient artifacts and human remains preserved in the volcanic ash. Realistic, detailed scene. Natural lighting.",\n     "contentText":"Centuries later, archaeologists unearthed this lost city, uncovering a treasure trove of history, revealing the intimate lives of those who perished."\n   },\n  {\n      "scene": 5,\n      "imagePrompt": "A close up shot of a perfectly preserved loaf of bread found in Pompeii, a testament to the suddenness of the disaster. Realistic, detailed, focus on texture and lighting.",\n       "contentText":"Even everyday objects, like a loaf of bread, offer glimpses into the final moments before disaster struck,  preserving a moment in time."\n    },\n   {\n      "scene": 6,\n    "imagePrompt": "A modern tourist walking through the ruins of Pompeii, observing the preserved remains of ancient buildings with a sense of awe and reflection. Realistic scene with natural lighting and subtle shadows",\n      "contentText": "Today, Pompeii stands as a testament to the power of nature, a place where history speaks across millennia, a reminder of both human fragility and resilience."\n   }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});
