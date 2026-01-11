
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "./types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Analyzes lyrics to generate a visual description for the image model.
 */
export async function analyzeLyrics(title: string, lyrics: string): Promise<AnalysisResult> {
  const ai = getAI();
  const prompt = `Analyze the following song lyrics and create a detailed visual prompt for an album cover generation. 
  Song Title: "${title}"
  Lyrics: 
  ${lyrics}

  Your response must focus on metaphors, atmosphere, and visual symbols found in the lyrics. 
  Do not include the song title in the visual description itself, as that will be handled separately.
  Focus on artistic style, lighting, and composition.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          visualPrompt: { 
            type: Type.STRING, 
            description: "A detailed 1-2 sentence visual description for an image generator." 
          },
          mood: { 
            type: Type.STRING, 
            description: "The primary emotional mood of the song (e.g., Melancholic, Energetic, Ethereal)." 
          },
          colors: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "A list of 3 predominant colors suggested by the lyrics."
          }
        },
        required: ["visualPrompt", "mood", "colors"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result;
}

/**
 * Generates the album cover image using gemini-2.5-flash-image.
 */
export async function generateCoverImage(title: string, analysis: AnalysisResult): Promise<string> {
  const ai = getAI();
  
  // Construct the final prompt with the specific constraint: only the title.
  const imagePrompt = `A professional cinematic album cover. Visual theme: ${analysis.visualPrompt}. 
  The primary colors should be ${analysis.colors.join(", ")}. 
  STRICT CONSTRAINT: The only text on the image should be the song title "${title.toUpperCase()}". 
  No artist name, no watermarks, no credits, no labels. The title should be elegantly integrated into the composition. 
  Style: Artistic, modern, and high resolution.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: imagePrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  let imageUrl = '';
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  if (!imageUrl) {
    throw new Error("Failed to generate image data.");
  }

  return imageUrl;
}
