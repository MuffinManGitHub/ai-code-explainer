import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI();

export async function POST(req: Request) {
 try {

   const prompt = await req.json();

   if (!prompt) {
     return NextResponse.json({ error: 'Prompt is required' }, 
        { status: 400 });
    }

    const response = await ai.interactions.create({
      model: 'gemini-2.5-flash',
      input: prompt,
    });

    return NextResponse.json({ text: response });
    
 } catch(error) {
   console.error('Gemini API Error:', error);
   return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
 }
}