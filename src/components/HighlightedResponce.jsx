import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

function HighlightedResponse({ response }) {
  const codeBlockRegex = /```([\w-]+)?\n([^`]+)```/g;
  const processedResponse = response.replace(
    codeBlockRegex,
    (_, lang, code) =>
      `<SyntaxHighlighter language="${lang || 'text'}" style={atomOneDark}>${code.trim()}</SyntaxHighlighter>`
  );

  return (
    <div>
      <ReactMarkdown>{processedResponse}</ReactMarkdown>
    </div>
  );
}

export default HighlightedResponse;
