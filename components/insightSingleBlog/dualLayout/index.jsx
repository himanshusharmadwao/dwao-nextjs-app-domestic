import React from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 
import styles from "@/styles/markdown.module.css";

const DualLayout = ({ data }) => {
  // console.log("data: ", JSON.stringify(data));

  const contentData = Array.isArray(data) ? data[0] : data;

  if (!contentData) {
    return <div>No content available</div>;
  }

  return (
    <div>
      <h2 className="text-con-dark text-[1.2rem] lg:text-[2rem] mb-4">{contentData.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h3 className="text-[2.1rem] leading-[1] w-[80%]">{contentData.heading}</h3>
        <div className={`text-gray-600 ${styles.markdownStyle}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            transform={(html) => DOMPurify.sanitize(html)}
          >
            {contentData.markdownContent}
          </ReactMarkdown>
        </div>
      </div>
      <div className="mx-auto flex gap-10 flex-wrap">
        {contentData.resultStats?.map((stat, index) => (
          <div key={index} className="lg:basis-1/4 basis-full text-center lg:my-20 my-8 mx-auto">
            <h4 className="text-con-dark text-[3.2rem] leading-[1.1] mb-3">
              {stat.percentageStats}
            </h4>
            <p className="text-gray-600 text-con">{stat.percentageDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DualLayout;