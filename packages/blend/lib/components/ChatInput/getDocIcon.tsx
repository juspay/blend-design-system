import React from 'react'
import { FileMinus, Image, FileText } from 'lucide-react'
import type { AttachedFile } from './types'
import { FOUNDATION_THEME } from '../../tokens'

export const getDocIcon = (fileType: AttachedFile['type']): React.ReactNode => {
    switch (fileType) {
        case 'image':
            return <Image color={FOUNDATION_THEME.colors.gray[600]} size={12} />
        case 'pdf':
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
        case 'csv':
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
        case 'text':
            return (
                <FileText color={FOUNDATION_THEME.colors.gray[600]} size={12} />
            )
        default:
            return (
                <FileMinus
                    color={FOUNDATION_THEME.colors.gray[600]}
                    size={12}
                />
            )
    }
}
