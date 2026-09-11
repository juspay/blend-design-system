declare module '*.png' {
    const content: string
    export default content
}

declare module '*.jpg' {
    const content: string
    export default content
}

declare module '*.jpeg' {
    const content: string
    export default content
}

declare module '*.svg' {
    const content: string
    export default content
}

declare module '*.gif' {
    const content: string
    export default content
}

// Vite's `?inline` query returns a CSS module's compiled text as a string
// instead of injecting it — used to self-host Monaco's editor stylesheet
// (see components/shared/monacoStyles.ts).
declare module '*.css?inline' {
    const content: string
    export default content
}
