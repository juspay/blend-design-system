import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createUploadManager } from '../../../lib/components/Upload/utils'
import { UploadState } from '../../../lib/components/Upload/types'
import type { UploadFile } from '../../../lib/components/Upload/types'

const createTestUploadFile = (id: string): UploadFile => ({
    id,
    file: new File(['content'], `${id}.txt`, { type: 'text/plain' }),
    progress: 0,
    status: UploadState.UPLOADING,
})

describe('createUploadManager', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('cancelAllUploads stops progress callbacks after unmount-style cleanup', () => {
        const onProgress = vi.fn()
        const onComplete = vi.fn()
        const manager = createUploadManager()

        manager.startUpload(
            createTestUploadFile('file-1'),
            onProgress,
            onComplete,
            200
        )

        vi.advanceTimersByTime(200)
        expect(onProgress).toHaveBeenCalled()

        manager.cancelAllUploads()
        onProgress.mockClear()

        vi.advanceTimersByTime(2000)
        expect(onProgress).not.toHaveBeenCalled()
        expect(onComplete).not.toHaveBeenCalled()
    })

    it('cancelAllUploads clears pending completion timeout', () => {
        const onProgress = vi.fn()
        const onComplete = vi.fn()
        const manager = createUploadManager()

        manager.startUpload(
            { ...createTestUploadFile('file-2'), progress: 100 },
            onProgress,
            onComplete,
            200
        )

        vi.advanceTimersByTime(200)
        manager.cancelAllUploads()

        vi.advanceTimersByTime(500)
        expect(onComplete).not.toHaveBeenCalled()
    })
})
