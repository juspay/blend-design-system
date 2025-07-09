"use client";
import React from "react";
import Tooltip from "./Tooltip";
import { InfoIcon } from "lucide-react";

export type TableRow = {
  propName: string;
  propType: string;
  propDescription: string;
  propDefault: string;
  typeDefinition?: string;
  llmContext?: string;
  // New fields for MCP functionality
  category?: string; // For prop grouping (e.g., "Styling", "Behavior", "Content")
  required?: boolean; // Whether prop is required
};

export type ExampleUsage = {
  title: string;
  description?: string;
  code: string;
};

export type ComponentMeta = {
  componentName: string;
  componentDescription?: string;
  features?: string[];
  usageExamples?: ExampleUsage[];
  props: TableRow[];
};

const BlendTypeTable = ({ tableRows }: { tableRows: TableRow[] }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Prop Name</th>
            <th>Prop Type</th>
            <th>Prop Default</th>
          </tr>
        </thead>
        <tbody>
          {tableRows &&
            tableRows.map((row) => (
              <tr key={row.propName}>
                <td className="flex items-center gap-2">
                  {row.propName}{" "}
                  <Tooltip content={row.propDescription} side="right">
                    <InfoIcon className="w-4 h-4" />
                  </Tooltip>
                </td>
                <td>
                  {row.typeDefinition && (
                    <Tooltip content={row.typeDefinition} side="right">
                      <InfoIcon className="w-4 h-4" />
                    </Tooltip>
                  )}
                </td>
                <td>{row.propDefault}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlendTypeTable;
