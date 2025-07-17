'use client'

import React, { useState, useMemo } from 'react'
import { useVersionHistory } from '@/hooks/useRealtimeData'
import {
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    ButtonV2,
    ButtonSizeV2,
    ButtonTypeV2,
} from 'blend-v1'
import {
    GitBranch,
    Package,
    Calendar,
    Download,
    Shield,
    Zap,
    AlertTriangle,
    Filter,
} from 'lucide-react'

export default function VersionHistoryPage() {
    const { versions, loading } = useVersionHistory()
    const [filterType, setFilterType] = useState<
        'all' | 'major' | 'minor' | 'patch'
    >('all')
    const [showPrerelease, setShowPrerelease] = useState(true)

    // Filter versions based on selected criteria
    const filteredVersions = useMemo(() => {
        return versions.filter((version) => {
            // Filter by pre-release
            if (
                !showPrerelease &&
                (version.version.includes('-') ||
                    version.version.includes('alpha') ||
                    version.version.includes('beta'))
            ) {
                return false
            }

            // Filter by version type
            if (filterType !== 'all') {
                const versionParts = version.version.split('.')
                const prevVersion = versions.find(
                    (v, idx) => idx === versions.indexOf(version) + 1
                )

                if (prevVersion) {
                    const prevParts = prevVersion.version.split('.')

                    switch (filterType) {
                        case 'major':
                            return (
                                parseInt(versionParts[0]) >
                                parseInt(prevParts[0])
                            )
                        case 'minor':
                            return (
                                versionParts[0] === prevParts[0] &&
                                parseInt(versionParts[1]) >
                                    parseInt(prevParts[1])
                            )
                        case 'patch':
                            return (
                                versionParts[0] === prevParts[0] &&
                                versionParts[1] === prevParts[1]
                            )
                    }
                }
            }

            return true
        })
    }, [versions, filterType, showPrerelease])

    const getVersionTypeTag = (version: string, prevVersion?: string) => {
        if (!prevVersion) return null

        const current = version.split('.')
        const prev = prevVersion.split('.')

        if (parseInt(current[0]) > parseInt(prev[0])) {
            return (
                <Tag
                    text="MAJOR"
                    variant={TagVariant.ATTENTIVE}
                    color={TagColor.ERROR}
                    size={TagSize.XS}
                />
            )
        } else if (
            current[0] === prev[0] &&
            parseInt(current[1]) > parseInt(prev[1])
        ) {
            return (
                <Tag
                    text="MINOR"
                    variant={TagVariant.ATTENTIVE}
                    color={TagColor.WARNING}
                    size={TagSize.XS}
                />
            )
        } else {
            return (
                <Tag
                    text="PATCH"
                    variant={TagVariant.SUBTLE}
                    color={TagColor.SUCCESS}
                    size={TagSize.XS}
                />
            )
        }
    }

    const formatDownloads = (downloads: number) => {
        if (downloads >= 1000000) {
            return `${(downloads / 1000000).toFixed(1)}M`
        } else if (downloads >= 1000) {
            return `${(downloads / 1000).toFixed(1)}K`
        }
        return downloads.toString()
    }

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">
                        Loading version history...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Publishing History Timeline
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Comprehensive publishing audit trail for blend-v1
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <div className="flex items-center gap-2">
                                <ButtonV2
                                    text="All"
                                    size={ButtonSizeV2.SMALL}
                                    buttonType={
                                        filterType === 'all'
                                            ? ButtonTypeV2.PRIMARY
                                            : ButtonTypeV2.SECONDARY
                                    }
                                    onClick={() => setFilterType('all')}
                                />
                                <ButtonV2
                                    text="Major"
                                    size={ButtonSizeV2.SMALL}
                                    buttonType={
                                        filterType === 'major'
                                            ? ButtonTypeV2.PRIMARY
                                            : ButtonTypeV2.SECONDARY
                                    }
                                    onClick={() => setFilterType('major')}
                                />
                                <ButtonV2
                                    text="Minor"
                                    size={ButtonSizeV2.SMALL}
                                    buttonType={
                                        filterType === 'minor'
                                            ? ButtonTypeV2.PRIMARY
                                            : ButtonTypeV2.SECONDARY
                                    }
                                    onClick={() => setFilterType('minor')}
                                />
                                <ButtonV2
                                    text="Patch"
                                    size={ButtonSizeV2.SMALL}
                                    buttonType={
                                        filterType === 'patch'
                                            ? ButtonTypeV2.PRIMARY
                                            : ButtonTypeV2.SECONDARY
                                    }
                                    onClick={() => setFilterType('patch')}
                                />
                            </div>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showPrerelease}
                                onChange={(e) =>
                                    setShowPrerelease(e.target.checked)
                                }
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span className="text-sm text-gray-700">
                                Show pre-releases
                            </span>
                        </label>
                    </div>
                </div>

                {/* Version Timeline */}
                <div className="space-y-4">
                    {filteredVersions.map((version, index) => {
                        const prevVersion = filteredVersions[index + 1]
                        const isPrerelease =
                            version.version.includes('-') ||
                            version.version.includes('alpha') ||
                            version.version.includes('beta')

                        return (
                            <div
                                key={version.version}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Version Header */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-xl font-mono font-bold text-gray-900">
                                                    v{version.version}
                                                </h3>
                                                {getVersionTypeTag(
                                                    version.version,
                                                    prevVersion?.version
                                                )}
                                                {isPrerelease && (
                                                    <Tag
                                                        text="PRE-RELEASE"
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        color={TagColor.PURPLE}
                                                        size={TagSize.XS}
                                                    />
                                                )}
                                                {version.breaking && (
                                                    <Tag
                                                        text="BREAKING CHANGES"
                                                        variant={
                                                            TagVariant.ATTENTIVE
                                                        }
                                                        color={TagColor.ERROR}
                                                        size={TagSize.XS}
                                                        leftSlot={
                                                            <AlertTriangle className="w-3 h-3" />
                                                        }
                                                    />
                                                )}
                                            </div>

                                            {/* Changelog */}
                                            <p className="text-gray-700 mb-4">
                                                {version.changelog}
                                            </p>

                                            {/* Metadata */}
                                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {new Date(
                                                            version.publishedAt
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <GitBranch className="w-4 h-4" />
                                                    <span>
                                                        by {version.publisher}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Download className="w-4 h-4" />
                                                    <span>
                                                        {formatDownloads(
                                                            version.downloads
                                                        )}{' '}
                                                        downloads
                                                    </span>
                                                </div>
                                                {version.size && (
                                                    <div className="flex items-center gap-1">
                                                        <Package className="w-4 h-4" />
                                                        <span>
                                                            {formatSize(
                                                                version.size
                                                                    .unpacked
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Special Badges */}
                                            <div className="flex items-center gap-2 mt-3">
                                                {version.changelog
                                                    .toLowerCase()
                                                    .includes('security') && (
                                                    <div className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                                                        <Shield className="w-3 h-3" />
                                                        <span>
                                                            Security Patch
                                                        </span>
                                                    </div>
                                                )}
                                                {version.changelog
                                                    .toLowerCase()
                                                    .includes(
                                                        'performance'
                                                    ) && (
                                                    <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                        <Zap className="w-3 h-3" />
                                                        <span>Performance</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 ml-4">
                                            <ButtonV2
                                                text="View Diff"
                                                size={ButtonSizeV2.SMALL}
                                                buttonType={
                                                    ButtonTypeV2.SECONDARY
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Summary Stats */}
                <div className="mt-8 bg-gray-100 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {versions.length}
                            </p>
                            <p className="text-sm text-gray-600">
                                Total Releases
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {versions.filter((v) => v.breaking).length}
                            </p>
                            <p className="text-sm text-gray-600">
                                Breaking Changes
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {
                                    versions.filter((v) =>
                                        v.version.includes('-')
                                    ).length
                                }
                            </p>
                            <p className="text-sm text-gray-600">
                                Pre-releases
                            </p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {versions[0]?.version || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600">
                                Latest Version
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
