// import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
// import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// SyntaxHighlighter.registerLanguage('javascript', js);

// function HighlightedResponse({ response }) {
//   const codeBlockRegex = /```([\w-]+)?\n([^`]+)```/g;
//   const processedResponse = response.replace(
//     codeBlockRegex,
//     (_, lang, code) =>
//       `<SyntaxHighlighter language="${lang || 'text'}" style={atomOneDark}>${code.trim()}</SyntaxHighlighter>`
//   );

//   return (
//     <div>
//       <ReactMarkdown>{processedResponse}</ReactMarkdown>
//     </div>
//   );
// }

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markup-templating.js"
import "prismjs/components/prism-markup";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-php";
import "prismjs/components/prism-python";
// import "prismjs/themes/prism.css";

const codeBlockRegex = /```([\w-]+)?\n([^`]+)```/g;
function HighlightedResponse(response) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  let newText = response.replace(/[&<>]/g, function(m) { return map[m]; });

  const processedResponse = newText.replace(
    codeBlockRegex,
    (_, lang, code) => {
      const highlightedCode = Prism.highlight(
        code.trim(),
        Prism.languages[lang] || Prism.languages.markup
      );
      const languageClass = `language-${lang || "markup"}`;
      return `<pre><code class="${languageClass}">${highlightedCode}</code></pre>`;
    }
  );

  // return <div dangerouslySetInnerHTML={{ __html: processedResponse }} />;
  return processedResponse;
}

export default HighlightedResponse;
