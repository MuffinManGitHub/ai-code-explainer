'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'; 

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = loading === true;

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    
    try {
      if (!prompt.trim()) return;
      if (loading) return;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if(res.ok){
        setResponse(data.text);
      } else {
        setResponse(`Error: ${data.error}`);
      }


    } catch(error) {
      setResponse('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-blue-500 to-purple-500 h-32 w-full">
      <main className="flex flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold m-2 block">AI Code Explainer</h1>
        <p className="text-md block w-100 text-center mb-4">Paste or write a piece of code for the AI to explain</p>
        <textarea className="field-sizing-content w-full min-h-[100px] resize-none border-2 border-black p-2 rounded bg-white" placeholder="Enter your code here..." value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
        <button className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-800" disabled={isButtonDisabled} onClick={handleSubmit}>{loading ?  'Generating...' : 'Submit'}</button>
        {response && (
          <div className="border-2 border-black p-2 rounded bg-white">
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  );
}
