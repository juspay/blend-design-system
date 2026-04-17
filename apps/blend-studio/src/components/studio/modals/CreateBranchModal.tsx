import { useState } from 'react'
import {
    listPresets,
    getPreset,
    type BrandConfig,
} from '@blend-design/token-engine'
import type { useCreateBranchWithMock } from '@/frontend/hooks/use-studio'
import { BranchModal } from './BranchModal'

interface CreateBranchModalProps {
    onClose: () => void
    onCreate: (
        input: Parameters<
            ReturnType<typeof useCreateBranchWithMock>['createBranch']
        >[0]
    ) => void
    loading: boolean
}

export function CreateBranchModal({
    onClose,
    onCreate,
    loading,
}: CreateBranchModalProps) {
    const presets = listPresets()
    const [form, setForm] = useState({
        name: '',
        brandId: '',
        slug: '',
        description: '',
        preset: 'blend',
        visibility: 'private' as 'private' | 'team' | 'public',
        clientName: '',
        projectName: '',
        tags: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = () => {
        const e: Record<string, string> = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.brandId.trim()) e.brandId = 'Brand ID is required'
        if (!form.slug.trim()) e.slug = 'Slug is required'
        if (!/^[a-z0-9-]+$/.test(form.slug))
            e.slug = 'Slug must be lowercase letters, numbers, and hyphens only'
        return e
    }

    const handleSubmit = () => {
        const e = validate()
        if (Object.keys(e).length > 0) {
            setErrors(e)
            return
        }

        const selectedPreset = presets.find((p) => p.name === form.preset)
        const presetConfig = selectedPreset
            ? getPreset(selectedPreset.name)
            : undefined
        const baseConfig: BrandConfig = presetConfig || {
            brandId: form.brandId,
            name: form.name,
            version: '0.1.0',
            colors: {},
        }

        onCreate({
            brandId: form.brandId,
            name: form.name,
            slug: form.slug,
            description: form.description,
            visibility: form.visibility,
            clientName: form.clientName || undefined,
            projectName: form.projectName || undefined,
            tags: form.tags
                ? form.tags
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                : [],
            brandConfig: {
                ...baseConfig,
                brandId: form.brandId,
                name: form.name,
            },
        })
    }

    const handleNameChange = (name: string) => {
        const slug = name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
        const brandId =
            name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .split('-')[0] || ''
        setForm((f) => ({ ...f, name, slug, brandId }))
    }

    return (
        <BranchModal
            isOpen
            onClose={onClose}
            title="New Branch"
            subtitle="Create a token branch for your brand"
            confirmText="Create Branch"
            onConfirm={handleSubmit}
            loading={loading}
            minWidth="720px"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() =>
                                setForm((f) => ({
                                    ...f,
                                    preset: preset.name,
                                }))
                            }
                            className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                                form.preset === preset.name
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div
                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm shrink-0"
                                style={{
                                    backgroundColor:
                                        getPreset(preset.name)?.colors
                                            ?.primary?.['500'] || '#3B82F6',
                                }}
                            />
                            <span className="text-sm font-medium text-gray-700 capitalize">
                                {preset.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. My Brand"
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.brandId}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                brandId: e.target.value,
                            }))
                        }
                        placeholder="my-brand"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.brandId
                                ? 'border-red-400'
                                : 'border-gray-300'
                        }`}
                    />
                    {errors.brandId && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.brandId}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={form.slug}
                        onChange={(e) =>
                            setForm((f) => ({
                                ...f,
                                slug: e.target.value,
                            }))
                        }
                        placeholder="my-brand-default"
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.slug ? 'border-red-400' : 'border-gray-300'
                        }`}
                    />
                    {errors.slug && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.slug}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    type="text"
                    value={form.description}
                    onChange={(e) =>
                        setForm((f) => ({
                            ...f,
                            description: e.target.value,
                        }))
                    }
                    placeholder="Optional description"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                </label>
                <input
                    type="text"
                    value={form.tags}
                    onChange={(e) =>
                        setForm((f) => ({ ...f, tags: e.target.value }))
                    }
                    placeholder="retail, banking (comma-separated)"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </BranchModal>
    )
}
