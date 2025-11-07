'use client';

import { useState, useEffect } from 'react';
import { Client } from '@gradio/client';

interface PredictionResult {
  data: string[];
}

const PoetryGenerator = () => {
  const [mounted, setMounted] = useState(false);
  const [prompt, setPrompt] = useState('Stars above');
  const [maxLength, setMaxLength] = useState(200);
  const [temperature, setTemperature] = useState(0.9);
  const [topP, setTopP] = useState(0.95);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPoem, setGeneratedPoem] = useState('');
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const samplePrompts = [
    { icon: '🌙', text: 'The night falls', color: 'from-blue-500 to-cyan-500' },
    { icon: '✨', text: 'Stars above', color: 'from-purple-500 to-pink-500' },
    { icon: '🌍', text: 'When the world', color: 'from-amber-500 to-orange-500' },
    { icon: '❤️', text: 'Love and', color: 'from-red-500 to-pink-500' }
  ];

  const generatePoem = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedPoem('');

    try {
      const client = await Client.connect("NimalanNatarajan/poetry-generator");
      const result = await client.predict("/generate_poem", {
        prompt: prompt,
        max_length: maxLength,
        temperature: temperature,
        top_p: topP,
      }) as PredictionResult;

      if (result.data && result.data[0]) {
        setGeneratedPoem(result.data[0]);
      } else {
        setError('No poem was generated. Please try again.');
      }
    } catch (err) {
      console.error('Error generating poem:', err);
      setError('Failed to generate poem. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearAll = () => {
    setPrompt('');
    setGeneratedPoem('');
    setError('');
  };

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Poetry Generator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-5xl animate-pulse">🎭</div>
            <h1 className="text-5xl sm:text-6xl font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              WordWeaver
            </h1>
          </div>
          <p className="text-gray-400 text-xl font-light">Transform your thoughts into beautiful words with AI</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Prompt Input Section - Glassmorphic Design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <label className="block text-white/90 font-medium mb-4 text-lg">
                What inspires you today?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your creative spark..."
                className="w-full h-32 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 resize-none text-lg transition-all duration-300"
              />
              
              {/* Sample Prompts */}
              <div className="mt-6">
                <p className="text-white/70 text-sm mb-3">Or try one of these:</p>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((sample, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(sample.text)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white/80 hover:text-white text-sm font-medium transition-all duration-200 border border-white/20"
                    >
                      {sample.icon} {sample.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
                >
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Advanced Options
                </button>
                
                {/* Advanced Controls */}
                <div className={`overflow-hidden transition-all duration-300 ${showAdvanced ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-6 p-4 bg-white/5 rounded-2xl border border-white/10">
                    {/* Max Length */}
                    <div>
                      <label className="block text-white/80 font-medium mb-2 text-sm">
                        Max Length: {maxLength} characters
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        value={maxLength}
                        onChange={(e) => setMaxLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Temperature */}
                    <div>
                      <label className="block text-white/80 font-medium mb-2 text-sm">
                        Creativity: {temperature}
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="2.0"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Top P */}
                    <div>
                      <label className="block text-white/80 font-medium mb-2 text-sm">
                        Diversity: {topP}
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1.0"
                        step="0.05"
                        value={topP}
                        onChange={(e) => setTopP(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={generatePoem}
                  disabled={isGenerating}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Magic...
                    </div>
                  ) : (
                    'Weave Words ✨'
                  )}
                </button>
                <button
                  onClick={clearAll}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 border border-white/20"
                >
                  Clear
                </button>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl text-red-300">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Generated Poem - Prominent Display */}
          {generatedPoem && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl animate-bounce">✨</div>
                  <h2 className="text-2xl font-light text-white">Your Creation</h2>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <pre className="text-white/90 whitespace-pre-wrap font-serif leading-relaxed text-lg sm:text-xl">
                    {generatedPoem}
                  </pre>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => navigator.clipboard?.writeText(generatedPoem)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-white/80 hover:text-white text-sm font-medium transition-all duration-200 border border-white/20"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={generatePoem}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 backdrop-blur-sm rounded-xl text-white/80 hover:text-white text-sm font-medium transition-all duration-200 border border-purple-400/30 disabled:opacity-50"
                  >
                    🔄 Regenerate
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default PoetryGenerator;
