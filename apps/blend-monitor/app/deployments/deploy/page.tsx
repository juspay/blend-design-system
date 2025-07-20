'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import Loader from '@/components/shared/Loader'
import {
    ButtonV2,
    ButtonTypeV2,
    ButtonSizeV2,
    ButtonSubTypeV2,
    SingleSelect,
    TextInput,
    TextInputSize,
    Checkbox,
    Tag as BlendTag,
    TagVariant,
    TagColor,
    TagSize,
} from 'blend-v1'
import {
    Rocket,
    GitBranch,
    Package,
    AlertCircle,
    CheckCircle,
    Clock,
    Settings,
} from 'lucide-react'
import type { DeploymentRequest } from '@/types'

const targetOptions = [
    { value: 'blend-staging', label: 'Staging', icon: '🧪' },
    { value: 'blend-prod', label: 'Production', icon: '🚀' },
]

export default function DeploymentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [deploying, setDeploying] = useState(false)
    const [deploymentRequest, setDeploymentRequest] =
        useState<DeploymentRequest>({
            target: 'blend-staging',
            buildOptions: {
                clean: false,
                cache: true,
                parallel: false,
            },
        })
    const [currentBranch, setCurrentBranch] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        // Get current git branch
        fetchCurrentBranch()
    }, [])

    const fetchCurrentBranch = async () => {
        try {
            // In a real implementation, this would fetch from an API
            setCurrentBranch('main')
        } catch (error) {
            console.error('Failed to fetch current branch:', error)
        }
    }

    const handleDeploy = async () => {
        setError(null)
        setSuccess(null)
        setDeploying(true)

        try {
            const user = auth.currentUser
            if (!user) {
                throw new Error('User not authenticated')
            }

            const token = await user.getIdToken()

            const response = await fetch('/api/deployments/hosting/deploy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(deploymentRequest),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Deployment failed')
            }

            if (data.deployment.status === 'pending_approval') {
                setSuccess('Deployment created and pending approval')
            } else {
                setSuccess('Deployment started successfully')
            }

            // Redirect to deployment details after 2 seconds
            setTimeout(() => {
                router.push(`/deployments/history/${data.deployment.id}`)
            }, 2000)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to start deployment'
            )
        } finally {
            setDeploying(false)
        }
    }

    return (
        <div className="h-full overflow-y-auto bg-white">
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Deploy to Firebase Hosting
                    </h1>
                    <p className="text-gray-600">
                        Deploy your application to Firebase Hosting environments
                    </p>
                </div>

                {/* Deployment Form */}
                <div className="space-y-6">
                    {/* Target Environment */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Target Environment
                        </h2>

                        <div className="space-y-4">
                            <SingleSelect
                                label="Select Environment"
                                selected={deploymentRequest.target}
                                onSelect={(value: string) =>
                                    setDeploymentRequest((prev) => ({
                                        ...prev,
                                        target: value,
                                    }))
                                }
                                items={[
                                    {
                                        items: targetOptions.map((opt) => ({
                                            value: opt.value,
                                            label: `${opt.icon} ${opt.label}`,
                                        })),
                                    },
                                ]}
                                placeholder="Choose target environment"
                            />

                            {deploymentRequest.target === 'blend-prod' && (
                                <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div className="text-sm">
                                        <p className="font-medium text-yellow-900">
                                            Production Deployment
                                        </p>
                                        <p className="text-yellow-700 mt-1">
                                            This deployment will require
                                            approval from an administrator.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Git Configuration */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <GitBranch className="w-5 h-5" />
                            Git Configuration
                        </h2>

                        <div className="space-y-4">
                            <TextInput
                                label="Branch"
                                size={TextInputSize.MEDIUM}
                                value={
                                    deploymentRequest.branch || currentBranch
                                }
                                onChange={(e) =>
                                    setDeploymentRequest((prev) => ({
                                        ...prev,
                                        branch: e.target.value,
                                    }))
                                }
                                placeholder="Enter branch name"
                                hintText={`Current branch: ${currentBranch}`}
                            />

                            <TextInput
                                label="Commit SHA (optional)"
                                size={TextInputSize.MEDIUM}
                                value={deploymentRequest.commitSha || ''}
                                onChange={(e) =>
                                    setDeploymentRequest((prev) => ({
                                        ...prev,
                                        commitSha: e.target.value,
                                    }))
                                }
                                placeholder="Leave empty to use latest commit"
                            />
                        </div>
                    </div>

                    {/* Build Options */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Build Options
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Clean Build
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Remove previous build artifacts before
                                        building
                                    </p>
                                </div>
                                <Checkbox
                                    checked={
                                        deploymentRequest.buildOptions?.clean ||
                                        false
                                    }
                                    onCheckedChange={(checked) =>
                                        setDeploymentRequest((prev) => ({
                                            ...prev,
                                            buildOptions: {
                                                ...prev.buildOptions,
                                                clean: checked === true,
                                            },
                                        }))
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        Use Build Cache
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Reuse builds from the same commit to
                                        speed up deployment
                                    </p>
                                </div>
                                <Checkbox
                                    checked={
                                        deploymentRequest.buildOptions
                                            ?.cache !== false
                                    }
                                    onCheckedChange={(checked) =>
                                        setDeploymentRequest((prev) => ({
                                            ...prev,
                                            buildOptions: {
                                                ...prev.buildOptions,
                                                cache: checked === true,
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-800 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {success}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4">
                        <ButtonV2
                            buttonType={ButtonTypeV2.SECONDARY}
                            size={ButtonSizeV2.MEDIUM}
                            subType={ButtonSubTypeV2.DEFAULT}
                            text="Cancel"
                            onClick={() => router.push('/deployments/hosting')}
                            disabled={deploying}
                        />

                        <ButtonV2
                            buttonType={ButtonTypeV2.PRIMARY}
                            size={ButtonSizeV2.MEDIUM}
                            subType={ButtonSubTypeV2.DEFAULT}
                            text={
                                deploying ? 'Deploying...' : 'Start Deployment'
                            }
                            onClick={handleDeploy}
                            disabled={deploying || !deploymentRequest.target}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
