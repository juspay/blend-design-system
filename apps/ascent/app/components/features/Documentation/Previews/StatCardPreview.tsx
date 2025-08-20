'use client'
import {
    StatCard,
    StatCardVariant,
    ChangeType,
    SingleSelect,
} from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from './ComponentPreview'
import { DollarSign } from 'lucide-react'

const StatCardPreview = () => {
    const [selectedVariant, setSelectedVariant] = useState<string>('line')

    const tsCode = `import { StatCard, StatCardVariant, ChangeType, SingleSelect, SelectMenuSize, SelectMenuVariant } from "@juspay/blend-design-system";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { useState } from "react";

function MyComponent() {
  const [selectedVariant, setSelectedVariant] = useState<string>("line");

  const chartData = [
    { value: 100, name: "Jan" },
    { value: 120, name: "Feb" },
    { value: 110, name: "Mar" },
    { value: 140, name: "Apr" },
    { value: 130, name: "May" },
    { value: 160, name: "Jun" },
  ];

  const variantItems = [
    {
      items: [
        { label: "Line Chart", value: "line" },
        { label: "Bar Chart", value: "bar" },
        { label: "Progress Bar", value: "progress" },
        { label: "Number Only", value: "number" },
      ],
    },
  ];

  const getStatCardProps = (variant: string) => {
    const baseProps = {
      title: "Total Revenue",
      value: "$12,345",
      subtitle: "Last 30 days",
      titleIcon: <DollarSign size={20} />,
      change: { value: 12.5, valueType: ChangeType.INCREASE },
    };

    switch (variant) {
      case "line":
        return { ...baseProps, variant: StatCardVariant.LINE, chartData };
      case "bar":
        return { ...baseProps, variant: StatCardVariant.BAR, chartData };
      case "progress":
        return { ...baseProps, variant: StatCardVariant.PROGRESS_BAR, progressValue: 85 };
      case "number":
        return { ...baseProps, variant: StatCardVariant.NUMBER };
      default:
        return { ...baseProps, variant: StatCardVariant.LINE, chartData };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SingleSelect
        label="Select StatCard Variant"
        placeholder="Choose a variant"
        items={variantItems}
        selected={selectedVariant}
        onSelect={setSelectedVariant}
        size={SelectMenuSize.MEDIUM}
        variant={SelectMenuVariant.CONTAINER}
      />
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StatCard {...getStatCardProps(selectedVariant)} />
      </div>
    </div>
  );
}`

    const reCode = `type statCardVariant = [#line | #progress | #bar | #number]
type changeType = [#increase | #decrease]

type chartDataPoint = {
  value: int,
  label: string,
  date: option<string>,
}

type statCardChange = {
  value: float,
  valueType: changeType,
}

@react.component
let make = () => {
  let (selectedVariant, setSelectedVariant) = React.useState(() => "line")

  let chartData = [
    {value: 100, label: "Jan", date: Some("2024-01")},
    {value: 120, label: "Feb", date: Some("2024-02")},
    {value: 110, label: "Mar", date: Some("2024-03")},
    {value: 140, label: "Apr", date: Some("2024-04")},
    {value: 130, label: "May", date: Some("2024-05")},
    {value: 160, label: "Jun", date: Some("2024-06")},
  ]

  let variantItems = [
    {
      items: [
        {label: "Line Chart", value: "line"},
        {label: "Bar Chart", value: "bar"},
        {label: "Progress Bar", value: "progress"},
        {label: "Number Only", value: "number"},
      ],
    },
  ]

  let getStatCardProps = (variant: string) => {
    let baseProps = {
      title: "Total Revenue",
      value: "$12,345",
      subtitle: Some("Last 30 days"),
      titleIcon: Some(<DollarSign size=20 />),
      change: Some({value: 12.5, valueType: #increase}),
    }

    switch variant {
    | "line" => {...baseProps, variant: #line, chartData: Some(chartData)}
    | "bar" => {...baseProps, variant: #bar, chartData: Some(chartData)}
    | "progress" => {...baseProps, variant: #progress, progressValue: Some(85)}
    | "number" => {...baseProps, variant: #number}
    | _ => {...baseProps, variant: #line, chartData: Some(chartData)}
    }
  }

  <div style={ReactDOM.Style.make(~display="flex", ~flexDirection="column", ~gap="16px", ())}>
    <SingleSelect
      label="Select StatCard Variant"
      placeholder="Choose a variant"
      items=variantItems
      selected=selectedVariant
      onSelect=setSelectedVariant
      size=#md
      variant=#container
    />
    
    <div style={ReactDOM.Style.make(~display="flex", ~justifyContent="center", ())}>
      <StatCard {...getStatCardProps(selectedVariant)} />
    </div>
  </div>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~title: string,
  ~value: string,
  ~change: option<statCardChange>=?,
  ~subtitle: option<string>=?,
  ~variant: statCardVariant,
  ~chartData: option<array<chartDataPoint>>=?,
  ~progressValue: option<int>=?,
  ~titleIcon: option<React.element>=?,
  ~actionIcon: option<React.element>=?,
  ~helpIconText: option<string>=?,
) => React.element = "StatCard"`

    const chartData = [
        { value: 100, name: 'Jan' },
        { value: 120, name: 'Feb' },
        { value: 110, name: 'Mar' },
        { value: 140, name: 'Apr' },
        { value: 130, name: 'May' },
        { value: 160, name: 'Jun' },
    ]

    const variantItems = [
        {
            items: [
                { label: 'Line Chart', value: 'line' },
                { label: 'Bar Chart', value: 'bar' },
                { label: 'Progress Bar', value: 'progress' },
                { label: 'Number Only', value: 'number' },
            ],
        },
    ]

    const getStatCardProps = (variant: string) => {
        const baseProps = {
            title: 'Total Revenue',
            value: '$12,345',
            subtitle: 'Last 30 days',
            titleIcon: <DollarSign size={20} />,
            change: { value: 12.5, valueType: ChangeType.INCREASE },
        }

        switch (variant) {
            case 'line':
                return {
                    ...baseProps,
                    variant: StatCardVariant.LINE,
                    chartData,
                }
            case 'bar':
                return { ...baseProps, variant: StatCardVariant.BAR, chartData }
            case 'progress':
                return {
                    ...baseProps,
                    variant: StatCardVariant.PROGRESS_BAR,
                    progressValue: 85,
                }
            case 'number':
                return { ...baseProps, variant: StatCardVariant.NUMBER }
            default:
                return {
                    ...baseProps,
                    variant: StatCardVariant.LINE,
                    chartData,
                }
        }
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
                className="p-6"
            >
                <SingleSelect
                    label="Select StatCard Variant"
                    placeholder="Choose a variant"
                    items={variantItems}
                    selected={selectedVariant}
                    onSelect={setSelectedVariant}
                    // size={SelectMenuSize.MEDIUM as SingleSelectProps["size"]}
                    // variant={SelectMenuVariant.CONTAINER}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <StatCard {...getStatCardProps(selectedVariant)} />
                </div>
            </div>
        </ComponentPreview>
    )
}

export default StatCardPreview
