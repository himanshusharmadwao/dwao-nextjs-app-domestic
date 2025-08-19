import DOMPurify from 'isomorphic-dompurify';

// Safe sanitization that works on both client and server
export const sanitizeHtml = (dirty) => {
  if (typeof window === 'undefined') {
    // Server-side: isomorphic-dompurify handles this
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'code', 'pre', 'table',
        'thead', 'tbody', 'tr', 'td', 'th', 'div', 'span', 'hr', 'sup', 'sub',
        'del', 'ins', 'mark', 'abbr', 'cite', 'dfn', 'kbd', 'samp', 'var'
      ],
      ALLOWED_ATTR: [
        'href', 'title', 'target', 'src', 'alt', 'width', 'height', 
        'class', 'id', 'style', 'rel', 'data-*', 'aria-*', 'role'
      ],
      ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
    });
  }
  
  // Client-side
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'code', 'pre', 'table',
      'thead', 'tbody', 'tr', 'td', 'th', 'div', 'span', 'hr', 'sup', 'sub',
      'del', 'ins', 'mark', 'abbr', 'cite', 'dfn', 'kbd', 'samp', 'var'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'target', 'src', 'alt', 'width', 'height', 
      'class', 'id', 'style', 'rel', 'data-*', 'aria-*', 'role'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|sms):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });
};

// Component wrapper for ReactMarkdown with sanitization
export const SafeMarkdown = ({ children, ...props }) => {
  // Pre-sanitize the content before passing to ReactMarkdown
  const sanitizedContent = sanitizeHtml(children);
  return sanitizedContent;
};