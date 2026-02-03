'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
    ssr: false,
    loading: () => (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-bg)'
        }}>
            Loading editor...
        </div>
    )
})

const TipTapEditorWrapper = (props) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg)'
            }}>
                Loading editor...
            </div>
        )
    }

    return <TipTapEditor {...props} />
}

export default TipTapEditorWrapper
