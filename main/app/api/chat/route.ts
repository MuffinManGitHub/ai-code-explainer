import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/app/rate-limiter';


const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ''});

function getClientIP(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIP(req); 

  const { success, limit, remaining, reset } 
  = await rateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    );
  }


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
      
      system_instruction: `You are an AI code explainer.

        Your task is to explain the provided code in a clear and concise manner.

        Please provide a detailed explanation of the code, including its purpose,

        functionality, and any important concepts or techniques used. 

        Avoid providing a line-by-line explanation; instead, focus on the overall structure

        and logic of the code. Include any ways on how to improve the code if applicable.`
    });
    console.log(response.output_text);
    return NextResponse.json({ text: response.output_text });
    
 } catch(error) {
   console.error('Gemini API Error:', error);
   return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
 }
}