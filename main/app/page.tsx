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

  function handleClearPrompt() {
    setResponse('');
    setPrompt('');
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-500 to-purple-500">
      <main className="flex flex-col items-center p-24">
        <h1 className="text-4xl font-bold m-2 block">AI Code Explainer</h1>
        <p className="text-md block w-100 text-center mb-4">Paste or write a piece of code for the AI to explain</p>
        <textarea className="field-sizing-content w-full min-h-[100px] resize-none border-2 border-black p-2 rounded bg-white" placeholder="Enter your code here..." value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
        <button className="bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-800" disabled={isButtonDisabled} onClick={handleSubmit}>{loading ?  'Generating...' : 'Submit'}</button>
        {response && (
          <div className="w-full max-w-3xl mt-8 border-2 border-gray-300 rounded-lg bg-white shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm" onClick={handleClearPrompt}>Clear Prompt</button>
            </div>
            <div className="p-6 prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 my-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 my-4" {...props} />,
                  li: ({node, ...props}) => <li className="ml-2 leading-relaxed" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 mt-4 text-gray-900" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3 mt-3 text-gray-900" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-2 text-gray-800" {...props} />,
                  code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-mono text-sm" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4" {...props} />,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
