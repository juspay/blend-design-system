import { useState } from 'react'
import UploadV2 from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2'
import type { UploadFileV2 } from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2.types'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { UploadState } from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2.types'
import { Upload as UploadIcon, CheckCircle, AlertCircle } from 'lucide-react'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { UploadErrorReason } from '../../../../packages/blend/lib/components/InputsV2/UploadV2/UploadV2.types'
import {
    getDemoCopy,
    PSEUDO_LOCALE,
    type DemoLocale,
} from '../i18n/translations'

type UploadV2DemoProps = {
    /**
     * Optional because `SidebarDemo` (the V1 sidebar playground) renders this
     * page too and has no locale picker. Defaulting to `en-US` there keeps the
     * demo's own sample copy in English, which matches that page's provider.
     */
    demoLocale?: DemoLocale | typeof PSEUDO_LOCALE
}

const UploadV2Demo = ({ demoLocale = 'en-US' }: UploadV2DemoProps) => {
    // Playground state
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundCustomSlot, setPlaygroundCustomSlot] = useState(true)
    const [playgroundHelpIconText, setPlaygroundHelpIconText] = useState(
        'Upload your files here. Supported formats include CSV files up to 8MB in size.'
    )
    // UploadV2 files state
    const [uploadV2Files, setUploadV2Files] = useState<UploadFileV2[]>([])

    // Tier 1 of the three-tier string resolution. When set, this beats both
    // the provider's translation and Blend's English default, so toggling it
    // against the Locale picker in the topbar shows all three tiers:
    // prop wins -> provider t() -> built-in English.
    const [browseFilesOverride, setBrowseFilesOverride] = useState('')
    const successDummyFiles: UploadFileV2[] = [
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: true,
        },
    ]
    const errorDummyFilesSingle: UploadFileV2[] = [
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: false,
            errorReason: UploadErrorReason.OVERSIZED,
        },
    ]
    const errorDummyFilesMultiple: UploadFileV2[] = [
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: true,
        },
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: true,
            errorReason: UploadErrorReason.MAX_FILES,
        },
        {
            file: new File(['dummy success content'], 'sample_file.csv', {
                type: 'text/csv',
            }),
            isValid: false,
            errorReason: UploadErrorReason.MAX_FILES,
        },
    ]
    return (
        <div className="p-8 space-y-12 mb-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-[15px]">
                    UploadV2 Playground
                </h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Switch
                            label="Multiple Files"
                            checked={playgroundMultiple}
                            onChange={() =>
                                setPlaygroundMultiple(!playgroundMultiple)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Custom Slot"
                            checked={playgroundCustomSlot}
                            onChange={() =>
                                setPlaygroundCustomSlot(!playgroundCustomSlot)
                            }
                        />
                        <Switch
                            label="Help Icon Text"
                            checked={!!playgroundHelpIconText}
                            onChange={() =>
                                setPlaygroundHelpIconText((prev) =>
                                    prev
                                        ? ''
                                        : 'Upload your files here. Supported formats include CSV files up to 8MB in size.'
                                )
                            }
                        />
                        <Switch
                            label='browseFilesText="Pick a file"'
                            checked={!!browseFilesOverride}
                            onChange={() =>
                                setBrowseFilesOverride((prev) =>
                                    prev ? '' : 'Pick a file'
                                )
                            }
                        />
                    </div>
                    <div className="rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-600">
                        <p className="font-semibold text-gray-700">
                            Localization
                        </p>
                        <p className="mt-1">
                            Switch <strong>Locale</strong> in the topbar to see
                            these strings change: the{' '}
                            <strong>Browse Files</strong> and{' '}
                            <strong>Replace File</strong> buttons, the drop
                            hint, the uploading status, the selected-file label,
                            every validation message, and the{' '}
                            <em>Remove {'{name}'}</em> accessible name on each
                            file tag.
                        </p>
                        <p className="mt-1">
                            Turn on{' '}
                            <code>browseFilesText=&quot;Pick a file&quot;</code>{' '}
                            and the button stops following the locale — an
                            explicit prop always wins. Pick the{' '}
                            <strong>Pseudo-locale</strong> and anything still
                            rendering plain English is either unmigrated or
                            overridden by a prop.
                        </p>
                        <p className="mt-1">
                            That distinction bites in practice. This page used
                            to pass <code>uploadHeaderText</code> on every card,
                            which pinned each header to English under every
                            locale and made the component look unmigrated. Cards
                            whose text merely restated Blend&apos;s default now
                            pass no prop at all. The two states Blend has no
                            header for — <strong>uploading</strong> and{' '}
                            <strong>success</strong> — still take app-supplied
                            copy, so this page translates that copy itself,
                            exactly as a consuming app would.
                        </p>
                        <p className="mt-1">
                            With more than four files selected, the overflow
                            button&apos;s accessible name uses{' '}
                            <code>Intl.PluralRules</code>, so it reads
                            &ldquo;Show 1 more file&rdquo; at one and
                            &ldquo;Show 2 more files&rdquo; at two.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                UploadV2 Idle State
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel={getDemoCopy(
                                    demoLocale,
                                    'field-sublabel'
                                )}
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <UploadIcon size={32} color="#6366f1" />
                                    ) : undefined
                                }
                                state={UploadState.IDLE}
                                multiple={playgroundMultiple}
                                disabled={playgroundDisabled}
                                files={uploadV2Files}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description'
                                )}
                            />
                        </Block>
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                Error State - Single File
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel={getDemoCopy(
                                    demoLocale,
                                    'field-sublabel'
                                )}
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <AlertCircle
                                            size={32}
                                            color="#ef4444"
                                        />
                                    ) : undefined
                                }
                                multiple={false}
                                disabled={playgroundDisabled}
                                files={errorDummyFilesSingle}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                state={UploadState.ERROR}
                                // errorText="File type not supported"
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description'
                                )}
                            />
                        </Block>
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                Error State - Multiple Files
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel={getDemoCopy(
                                    demoLocale,
                                    'field-sublabel'
                                )}
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <AlertCircle
                                            size={32}
                                            color="#ef4444"
                                        />
                                    ) : undefined
                                }
                                multiple={true}
                                disabled={playgroundDisabled}
                                files={errorDummyFilesMultiple}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                state={UploadState.ERROR}
                                // errorText="File type not supported"
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description'
                                )}
                            />
                        </Block>
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                UploadV2 Success State - Single File
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel="Max 10MB"
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <CheckCircle
                                            size={32}
                                            color="#10b981"
                                        />
                                    ) : undefined
                                }
                                multiple={false}
                                disabled={playgroundDisabled}
                                files={successDummyFiles}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                state={UploadState.SUCCESS}
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description-success'
                                )}
                                progressBarValue={50}
                                // App-supplied copy: UploadV2 has no built-in header
                                // for this state, so this is tier 1 and the demo has
                                // to localize it itself.
                                uploadHeaderText={getDemoCopy(
                                    demoLocale,
                                    'upload-succeeded'
                                )}
                            />
                        </Block>
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                UploadV2 Success State - Multiple Files
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel="Max 10MB"
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <CheckCircle
                                            size={32}
                                            color="#10b981"
                                        />
                                    ) : undefined
                                }
                                multiple={true}
                                disabled={playgroundDisabled}
                                files={successDummyFiles}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                state={UploadState.SUCCESS}
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description-success'
                                )}
                                progressBarValue={50}
                            />
                        </Block>
                        <Block width="100%">
                            <h2 className="text-2xl font-bold mb-[15px]">
                                UploadV2 with Progress Bar
                            </h2>
                            <UploadV2
                                browseFilesText={
                                    browseFilesOverride || undefined
                                }
                                label={getDemoCopy(demoLocale, 'field-label')}
                                subLabel="Max 10MB"
                                helpIconText={playgroundHelpIconText}
                                required={playgroundRequired}
                                acceptedFileTypes={[
                                    '.csv',
                                    '.txt',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.xls',
                                    '.xlsx',
                                    '.ppt',
                                    '.pptx',
                                    '.jpg',
                                    '.jpeg',
                                    '.png',
                                    '.gif',
                                    '.mp4',
                                    '.avi',
                                    '.mov',
                                    '.mp3',
                                    '.wav',
                                ]}
                                slot={
                                    playgroundCustomSlot ? (
                                        <UploadIcon size={32} color="#6366f1" />
                                    ) : undefined
                                }
                                multiple={playgroundMultiple}
                                disabled={playgroundDisabled}
                                files={uploadV2Files}
                                onChange={(files) => {
                                    setUploadV2Files(files)
                                }}
                                state={UploadState.UPLOADING}
                                // errorText="File type not supported"
                                maxSize={8 * 1024 * 1024}
                                maxFiles={2}
                                description={getDemoCopy(
                                    demoLocale,
                                    'field-description'
                                )}
                                // App-supplied copy: UploadV2 has no built-in header
                                // for this state, so this is tier 1 and the demo has
                                // to localize it itself.
                                uploadHeaderText={getDemoCopy(
                                    demoLocale,
                                    'uploading-named'
                                )}
                                progressBarValue={50}
                            />
                        </Block>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadV2Demo
