"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 
import styles from "./Accordion.module.css";
import markStyles from "@/styles/markdown.module.css";

const Accordion = ({ data }) => {
  // console.log(data)
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className="accordion-wrapper">
        {/* Accordion Header */}
        <button
          onClick={toggleAccordion}
          className={`w-full flex items-center justify-between py-3 bg-white border-b ${isOpen ? "border-[var(--mainColor)]" : "border-gray-200"} transition-all duration-300 hover:bg-gray-50 cursor-pointer outline-none`}
        >
          <span className="lg:text-[20px] text-[17px] text-left">{data?.heading}</span>
          <span className="relative w-5 h-5 flex items-center justify-center">
            <span className="absolute w-3 h-0.5 bg-gray-800 rounded-full transition-all duration-300"></span>
            <span
              className={`absolute w-3 h-0.5 bg-gray-800 rounded-full transition-all duration-300 rotate-90 ${isOpen ? "opacity-0" : ""}`}
            ></span>
          </span>
        </button>

        {/* Accordion Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out text-con ${isOpen ? "max-h-96" : "max-h-0"
            } bg-white`}
        >
          <div className="py-4">
            <div className={`${styles.accordionStyle} ${markStyles.markdownStyle}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                transform={(html) => DOMPurify.sanitize(html)}
              >
                {data?.markdownContent}
              </ReactMarkdown>
            </div>
            <Link prefetch={false}
              href={data?.linkHref || "#"}
              className="mt-4 flex gap-2 items-center group hover:text-[var(--mainColor)] uppercase"
              aria-label="Learn more about our services"
            >
              {data?.linkTitle || 'Learn More'} <span className="transition-all duration-300 group-hover:translate-x-[10px] ">
                <Image src="/icons/theme-right-arrow.svg" height={30} width={30} alt="missing image" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;