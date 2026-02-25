'use client'
import React from 'react'

const DocArticle = ({
    content,
}: {
    content: React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<any>
    >
}) => {
    return <div>{content}</div>
}

export default DocArticle
