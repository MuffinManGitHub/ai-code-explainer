import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ''});

export async function POST(req: Request) {
 try {
  console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
   const { prompt } = await req.json();

   if (!prompt) {
     return NextResponse.json({ error: 'Prompt is required' }, 
        { status: 400 });
    }

    const response = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: prompt,
    });
    console.log(response.output_text);
    return NextResponse.json({ text: response.output_text });
    
 } catch(error) {
   console.error('Gemini API Error:', error);
   return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
 }
}