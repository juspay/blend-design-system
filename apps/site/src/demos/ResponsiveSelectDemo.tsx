'use client'

import { useState } from 'react'
import { MultiSelect } from '../../../../packages/blend/lib/components/MultiSelect'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Star } from 'lucide-react'

// Sample data for the selects
const countryOptions = [
    {
        groupLabel: 'Popular Countries',
        items: [
            { label: 'United States', value: 'us', slot1: <span>🇺🇸</span> },
            { label: 'United Kingdom', value: 'uk', slot1: <span>🇬🇧</span> },
            { label: 'Canada', value: 'ca', slot1: <span>🇨🇦</span> },
            { label: 'Australia', value: 'au', slot1: <span>🇦🇺</span> },
        ],
        showSeparator: true,
    },
    {
        groupLabel: 'Other Countries',
        items: [
            { label: 'Germany', value: 'de', slot1: <span>🇩🇪</span> },
            { label: 'France', value: 'fr', slot1: <span>🇫🇷</span> },
            { label: 'Japan', value: 'jp', slot1: <span>🇯🇵</span> },
            { label: 'India', value: 'in', slot1: <span>🇮🇳</span> },
            { label: 'Brazil', value: 'br', slot1: <span>🇧🇷</span> },
        ],
    },
]

const skillOptions = [
    {
        groupLabel: 'Programming Languages',
        items: [
            {
                label: 'JavaScript',
                value: 'js',
                subLabel: 'Popular web language',
                slot1: <span style={{ color: '#f7df1e' }}>JS</span>,
            },
            {
                label: 'TypeScript',
                value: 'ts',
                subLabel: 'Typed JavaScript',
                slot1: <span style={{ color: '#3178c6' }}>TS</span>,
            },
            {
                label: 'Python',
                value: 'py',
                subLabel: 'Versatile language',
                slot1: <span style={{ color: '#3776ab' }}>PY</span>,
            },
            {
                label: 'React',
                value: 'react',
                subLabel: 'UI library',
                slot1: <span style={{ color: '#61dafb' }}>⚛️</span>,
            },
        ],
        showSeparator: true,
    },
    {
        groupLabel: 'Design Tools',
        items: [
            {
                label: 'Figma',
                value: 'figma',
                subLabel: 'Design collaboration',
                slot1: <span style={{ color: '#f24e1e' }}>🎨</span>,
            },
            {
                label: 'Adobe XD',
                value: 'xd',
                subLabel: 'Adobe design tool',
                slot1: <span style={{ color: '#ff61f6' }}>XD</span>,
            },
            {
                label: 'Sketch',
                value: 'sketch',
                subLabel: 'Mac design tool',
                slot1: <span style={{ color: '#fdad00' }}>✏️</span>,
            },
        ],
    },
]

const priorityOptions = [
    {
        items: [
            {
                label: 'Low Priority',
                value: 'low',
                slot1: <Star size={16} color="#10b981" />,
                subLabel: 'Can wait',
            },
            {
                label: 'Medium Priority',
                value: 'medium',
                slot1: <Star size={16} color="#f59e0b" />,
                subLabel: 'Important',
            },
            {
                label: 'High Priority',
                value: 'high',
                slot1: <Star size={16} color="#ef4444" />,
                subLabel: 'Urgent',
            },
            {
                label: 'Critical',
                value: 'critical',
                slot1: <Star size={16} color="#dc2626" fill="currentColor" />,
                subLabel: 'Immediate attention',
            },
        ],
    },
]

export const ResponsiveSelectDemo = () => {
    const [selectedCountry, setSelectedCountry] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [selectedPriority, setSelectedPriority] = useState('')
    const [selectedCountryNoDrawer, setSelectedCountryNoDrawer] = useState('')
    const [selectedSkillsNoDrawer, setSelectedSkillsNoDrawer] = useState<
        string[]
    >([])

    const handleSkillChange = (value: string) => {
        setSelectedSkills((prev) =>
            prev.includes(value)
                ? prev.filter((skill) => skill !== value)
                : [...prev, value]
        )
    }

    const handleSkillChangeNoDrawer = (value: string) => {
        setSelectedSkillsNoDrawer((prev) =>
            prev.includes(value)
                ? prev.filter((skill) => skill !== value)
                : [...prev, value]
        )
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <div>
                <h2
                    style={{
                        marginBottom: '8px',
                        fontSize: '24px',
                        fontWeight: '600',
                    }}
                >
                    Responsive Select Demo
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                    These selects automatically switch to drawer mode on mobile
                    devices (screen width &lt; 1024px). Try resizing your
                    browser window to see the responsive behavior.
                </p>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <SingleSelect
                    label="Country"
                    placeholder="Select your country"
                    items={countryOptions}
                    selected={selectedCountry}
                    onSelect={setSelectedCountry}
                    hintText="Choose the country where you're located"
                    required
                />

                <MultiSelect
                    label="Skills & Technologies"
                    placeholder="Select your skills"
                    items={skillOptions}
                    selectedValues={selectedSkills}
                    onChange={handleSkillChange}
                    hintText="Select all technologies you're proficient in"
                />

                <SingleSelect
                    label="Task Priority"
                    placeholder="Set priority level"
                    items={priorityOptions}
                    selected={selectedPriority}
                    onSelect={setSelectedPriority}
                    hintText="Choose the urgency level for this task"
                />
            </div>

            <div
                style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                }}
            >
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Selected Values:
                </h3>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '14px',
                    }}
                >
                    <div>
                        <strong>Country:</strong>{' '}
                        {selectedCountry || 'None selected'}
                    </div>
                    <div>
                        <strong>Skills:</strong>{' '}
                        {selectedSkills.length > 0
                            ? selectedSkills.join(', ')
                            : 'None selected'}
                    </div>
                    <div>
                        <strong>Priority:</strong>{' '}
                        {selectedPriority || 'None selected'}
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: '32px',
                    padding: '16px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                }}
            >
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#92400e',
                    }}
                >
                    🎛️ Custom Responsive Behavior
                </h3>
                <p
                    style={{
                        color: '#92400e',
                        marginBottom: '16px',
                        fontSize: '14px',
                    }}
                >
                    You can control whether to use drawer on mobile with the
                    `useDrawerOnMobile` prop. These selects below will always
                    use dropdown menus, even on mobile:
                </p>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <SingleSelect
                        label="Country (No Drawer)"
                        placeholder="Select your country"
                        items={countryOptions}
                        selected={selectedCountryNoDrawer}
                        onSelect={setSelectedCountryNoDrawer}
                        hintText="This select uses dropdown even on mobile"
                        useDrawerOnMobile={false}
                    />

                    <MultiSelect
                        label="Skills (No Drawer)"
                        placeholder="Select your skills"
                        items={skillOptions}
                        selectedValues={selectedSkillsNoDrawer}
                        onChange={handleSkillChangeNoDrawer}
                        hintText="This multi-select uses dropdown even on mobile"
                        useDrawerOnMobile={false}
                    />
                </div>

                <div
                    style={{
                        marginTop: '16px',
                        padding: '12px',
                        backgroundColor: '#fbbf24',
                        borderRadius: '6px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            fontSize: '14px',
                            color: '#92400e',
                        }}
                    >
                        <div>
                            <strong>Country (No Drawer):</strong>{' '}
                            {selectedCountryNoDrawer || 'None selected'}
                        </div>
                        <div>
                            <strong>Skills (No Drawer):</strong>{' '}
                            {selectedSkillsNoDrawer.length > 0
                                ? selectedSkillsNoDrawer.join(', ')
                                : 'None selected'}
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    marginTop: '16px',
                    padding: '16px',
                    backgroundColor: '#eff6ff',
                    borderRadius: '8px',
                    border: '1px solid #bfdbfe',
                }}
            >
                <h4
                    style={{
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1e40af',
                    }}
                >
                    💡 How it works:
                </h4>
                <ul
                    style={{
                        margin: 0,
                        paddingLeft: '20px',
                        fontSize: '14px',
                        color: '#1e40af',
                    }}
                >
                    <li>
                        <strong>
                            Default behavior (useDrawerOnMobile=true):
                        </strong>{' '}
                        On desktop (≥1024px) shows dropdown, on mobile
                        (&lt;1024px) shows drawer
                    </li>
                    <li>
                        <strong>
                            Custom behavior (useDrawerOnMobile=false):
                        </strong>{' '}
                        Always shows dropdown menu regardless of screen size
                    </li>
                    <li>
                        Uses MenuItem components inside the drawer for
                        consistent styling
                    </li>
                    <li>
                        Drawer respects the 74px top offset and 16px margins as
                        configured in tokens
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ResponsiveSelectDemo
