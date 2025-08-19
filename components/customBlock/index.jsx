'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';

const CustomBlocksRenderer = ({ content }) => {
    // Helper function to convert a string to Strapi blocks format
    const convertStringToBlocks = (input) => {
        if (!input) return [];

        // Handle markdown-like bullet lists
        if (typeof input === 'string' && input.includes('\n') && input.split('\n').every(line => line.trim().startsWith('-'))) {
            return [{
                type: 'list',
                format: 'unordered',
                children: input
                    .split('\n')
                    .filter(item => item.trim() !== '')
                    .map(item => ({
                        type: 'list-item',
                        children: [{ type: 'text', text: item.replace(/^- /, '').trim() }],
                    })),
            }];
        }

        // Handle plain text as a paragraph
        return [{
            type: 'paragraph',
            children: [{ type: 'text', text: typeof input === 'string' ? input : '' }],
        }];
    };

    // Normalize content to always be an array of blocks
    const normalizedContent = Array.isArray(content) ? content : convertStringToBlocks(content);

    return (
        <BlocksRenderer
            content={normalizedContent}
            blocks={{
                heading: ({ children, level }) => {
                    switch (level) {
                        case 1:
                            return (
                                <h1 className="text-[2em] text-gray-900 font-semibold mb-6 mt-10">
                                    {children}
                                </h1>
                            );
                        case 2:
                            return (
                                <h2 className="text-[1.7em] text-gray-900 font-semibold mb-6 mt-10">
                                    {children}
                                </h2>
                            );
                        default:
                            return (
                                <h3 className="text-[1.3em] text-gray-900 font-semibold mb-6 mt-10">
                                    {children}
                                </h3>
                            );
                    }
                },
                paragraph: ({ children }) => (
                    <p className="text-con leading-[1.4]">{children}</p>
                ),
                link: ({ children, url }) => (
                    <a
                        href={url}
                        className="text-blue-600 hover:underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                ),
                image: ({ image }) => (
                    <div className="my-6">
                        <Image
                            src={image.url}
                            alt={image.alternativeText || 'Blog image'}
                            width={image.width}
                            height={image.height}
                            className="rounded-lg shadow-md"
                        />
                        {image.caption && (
                            <p className="text-con leading-[1.4]">
                                {image.caption}
                            </p>
                        )}
                    </div>
                ),
                list: ({ children, format }) => {
                    if (format === 'ordered') {
                        return (
                            <ol className="list-decimal pl-4 mb-4 text-con leading-[1.4]">{children}</ol>
                        );
                    }
                    return <ul className="list-disc pl-4 mb-4 text-con leading-[1.4]">{children}</ul>;
                },
                listItem: ({ children }) => <li className="mb-2">{children}</li>,
            }}
        />
    );
};

export default CustomBlocksRenderer;