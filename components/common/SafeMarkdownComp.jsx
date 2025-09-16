"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { sanitizeHtml } from '@/libs/sanitizeHtml';
import { useMemo } from 'react';
import DOMPurify from 'dompurify'; // required even when it is not used 

const SafeMarkdownComp = ({ children, ...props }) => {
  // Sanitize content before rendering
  const sanitizedContent = useMemo(() => {
    if (!children) return '';
    return sanitizeHtml(children);
  }, [children]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      {...props}
    >
      {sanitizedContent}
    </ReactMarkdown>
  );
};

export default SafeMarkdownComp;