"use client"

import Script from 'next/script';
import React from 'react'

const StructuredData = ({ data }) => {
    if (!data) return null;

    // console.log("data: ", data)

    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default StructuredData