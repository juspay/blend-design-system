'use client'

import { useState, useRef, useEffect } from 'react'
import { Tabs } from './Tabs'
import { Separator } from '../Separator'
import { TokenizerComp } from './tokenizer/Tokenizer'
import { Components } from './components/Components'
import { Documentation } from './documentation/Documentation'
import { PlaygroundComp } from './playground/Playground'
import { ConnectWithUs } from '../connect-with-us/ConnectWithUs'
import { Footer } from '../footer/Footer'

export const TabsSection = () => {
    const [selectedTab, setSelectedTab] = useState('tokenizer')

    // Refs for each section
    const tokenizerRef = useRef<HTMLDivElement>(null)
    const componentsRef = useRef<HTMLDivElement>(null)
    const documentationRef = useRef<HTMLDivElement>(null)
    const playgroundRef = useRef<HTMLDivElement>(null)
    const blogsRef = useRef<HTMLDivElement>(null)

    // Combine all refs into an array for easy iteration
    const sectionRefs = useRef([
        { ref: tokenizerRef, label: 'tokenizer' },
        { ref: componentsRef, label: 'components' },
        { ref: documentationRef, label: 'documentation' },
        { ref: playgroundRef, label: 'playground' },
        { ref: blogsRef, label: 'blogs' },
    ])

    useEffect(() => {
        // Options for the IntersectionObserver
        const options = {
            root: null, // use the viewport as the root
            rootMargin: '0px 0px -50% 0px', // Trigger when 50% of the section is visible
            threshold: 0, // as soon as even a single pixel is visible
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // If a section is intersecting, update the selectedTab state
                if (entry.isIntersecting) {
                    // Find the corresponding label for the intersecting section
                    const currentSection = sectionRefs.current.find(
                        (section) => section.ref.current === entry.target
                    )
                    if (currentSection) {
                        setSelectedTab(currentSection.label)
                    }
                }
            })
        }, options)

        // Observe each section
        sectionRefs.current.forEach((section) => {
            if (section.ref.current) {
                observer.observe(section.ref.current)
            }
        })

        // Cleanup function to disconnect the observer
        return () => {
            observer.disconnect()
        }
    }, []) // Empty dependency array ensures this runs only once on mount

    const handleTabSelection = (label: string) => {
        setSelectedTab(label)
        // Scroll to the selected component
        switch (label) {
            case 'tokenizer':
                tokenizerRef.current?.scrollIntoView({ behavior: 'smooth' })
                break
            case 'components':
                componentsRef.current?.scrollIntoView({ behavior: 'smooth' })
                break
            case 'documentation':
                documentationRef.current?.scrollIntoView({ behavior: 'smooth' })
                break
            case 'playground':
                playgroundRef.current?.scrollIntoView({ behavior: 'smooth' })
                break
            // case 'blogs':
            //     blogsRef.current?.scrollIntoView({ behavior: 'smooth' })
            //     break
            default:
                break
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="sticky top-0 z-10 rounded-[var(--tab-bar-border-radius)] md:pt-5 pt-3 bg-transparent">
                <Tabs
                    selectedTab={selectedTab}
                    handleTabSelection={handleTabSelection}
                />
            </div>

            <div ref={tokenizerRef}>
                <TokenizerComp />
            </div>
            <div ref={componentsRef} className="w-full">
                <Components />
            </div>

            <Separator className="mb-50" />

            <div ref={documentationRef}>
                <Documentation />
            </div>

            <div ref={playgroundRef}>
                <PlaygroundComp />
            </div>

            {/* <div ref={blogsRef}>
                <Blogs />
            </div> */}

            <ConnectWithUs />
            <Footer />
        </div>
    )
}
