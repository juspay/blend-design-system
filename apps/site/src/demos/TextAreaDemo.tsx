import {
  TextArea,
  SingleSelect,
  Switch,
  addSnackbar,
} from "blend-v1";
import { useState } from "react";

const TextAreaDemo = () => {
  const [playgroundValue, setPlaygroundValue] = useState("This is a sample text area content that demonstrates the component's capabilities.");
  const [playgroundRows, setPlaygroundRows] = useState(3);
  const [playgroundResize, setPlaygroundResize] = useState<"none" | "both" | "horizontal" | "vertical" | "block" | "inline">("none");
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showAutoFocus, setShowAutoFocus] = useState(false);

  // Options for selects
  const rowsOptions = [
    { value: "2", label: "2 rows" },
    { value: "3", label: "3 rows" },
    { value: "4", label: "4 rows" },
    { value: "5", label: "5 rows" },
    { value: "6", label: "6 rows" },
  ];

  const resizeOptions = [
    { value: "none", label: "None" },
    { value: "both", label: "Both" },
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
    { value: "block", label: "Block" },
    { value: "inline", label: "Inline" },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextArea
              label="Value"
              value={playgroundValue}
              onChange={(e) => setPlaygroundValue(e.target.value)}
              placeholder="Enter text..."
            />

            <SingleSelect
              label="Rows"
              items={[{ items: rowsOptions }]}
              selected={String(playgroundRows)}
              onSelect={(value) => setPlaygroundRows(Number(value))}
              placeholder="Select rows"
            />

            <SingleSelect
              label="Resize"
              items={[{ items: resizeOptions }]}
              selected={playgroundResize}
              onSelect={(value) => setPlaygroundResize(value as typeof playgroundResize)}
              placeholder="Select resize"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Auto Focus"
              checked={showAutoFocus}
              onChange={() => setShowAutoFocus(!showAutoFocus)}
            />
            <Switch
              label="Disabled"
              checked={isDisabled}
              onChange={() => setIsDisabled(!isDisabled)}
            />
            <Switch
              label="Error State"
              checked={hasError}
              onChange={() => setHasError(!hasError)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
            <div className="w-full max-w-md">
              <TextArea
                label="Playground Text Area"
                value={playgroundValue}
                onChange={(e) => setPlaygroundValue(e.target.value)}
                placeholder="Enter text here..."
                rows={playgroundRows}
                resize={playgroundResize}
                autoFocus={showAutoFocus}
                disabled={isDisabled}
                error={hasError}
                errorMessage={hasError ? "This field has an error" : undefined}
                hintText="This is a hint text"
                helpIconHintText="This is help text for the text area"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Basic Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Basic Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default Text Area</h3>
            <TextArea
              label="Default"
              value=""
              onChange={() => {}}
              placeholder="Enter text..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Placeholder</h3>
            <TextArea
              label="Description"
              value=""
              onChange={() => {}}
              placeholder="Enter your description here..."
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Field</h3>
            <TextArea
              label="Required Text Area"
              value=""
              onChange={() => {}}
              placeholder="Enter required text..."
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Hint Text</h3>
            <TextArea
              label="Comments"
              value=""
              onChange={() => {}}
              placeholder="Enter your comments"
              hintText="Maximum 500 characters allowed"
            />
          </div>
        </div>
      </div>

      {/* Rows Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Rows Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">2 Rows</h3>
            <TextArea
              label="Short Description"
              value=""
              onChange={() => {}}
              placeholder="Short text..."
              rows={2}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">3 Rows (Default)</h3>
            <TextArea
              label="Medium Description"
              value=""
              onChange={() => {}}
              placeholder="Medium text..."
              rows={3}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">4 Rows</h3>
            <TextArea
              label="Long Description"
              value=""
              onChange={() => {}}
              placeholder="Longer text..."
              rows={4}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">5 Rows</h3>
            <TextArea
              label="Extended Description"
              value=""
              onChange={() => {}}
              placeholder="Extended text..."
              rows={5}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">6 Rows</h3>
            <TextArea
              label="Very Long Description"
              value=""
              onChange={() => {}}
              placeholder="Very long text..."
              rows={6}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">8 Rows</h3>
            <TextArea
              label="Essay"
              value=""
              onChange={() => {}}
              placeholder="Essay content..."
              rows={8}
            />
          </div>
        </div>
      </div>

      {/* Resize Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Resize Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">No Resize</h3>
            <TextArea
              label="Fixed Size"
              value=""
              onChange={() => {}}
              placeholder="Cannot resize"
              resize="none"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Both Directions</h3>
            <TextArea
              label="Resizable Both Ways"
              value=""
              onChange={() => {}}
              placeholder="Resize horizontally and vertically"
              resize="both"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horizontal Only</h3>
            <TextArea
              label="Horizontal Resize"
              value=""
              onChange={() => {}}
              placeholder="Resize horizontally only"
              resize="horizontal"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vertical Only</h3>
            <TextArea
              label="Vertical Resize"
              value=""
              onChange={() => {}}
              placeholder="Resize vertically only"
              resize="vertical"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Block Resize</h3>
            <TextArea
              label="Block Resize"
              value=""
              onChange={() => {}}
              placeholder="Block resize"
              resize="block"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Inline Resize</h3>
            <TextArea
              label="Inline Resize"
              value=""
              onChange={() => {}}
              placeholder="Inline resize"
              resize="inline"
            />
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Default</h3>
            <TextArea
              label="Default State"
              value=""
              onChange={() => {}}
              placeholder="Default text area"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <TextArea
              label="Disabled Text Area"
              value="This text area is disabled and cannot be edited."
              onChange={() => {}}
              placeholder="Disabled text area"
              disabled
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Error</h3>
            <TextArea
              label="Error Text Area"
              value=""
              onChange={() => {}}
              placeholder="Error text area"
              error
              errorMessage="This field is required"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Help Text</h3>
            <TextArea
              label="Help Text Area"
              value=""
              onChange={() => {}}
              placeholder="With help text"
              helpIconHintText="This is additional help information"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Sublabel</h3>
            <TextArea
              label="Sublabel Text Area"
              value=""
              onChange={() => {}}
              sublabel="This is a sublabel"
              placeholder="With sublabel"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required</h3>
            <TextArea
              label="Required Text Area"
              value=""
              onChange={() => {}}
              placeholder="Required field"
              required
            />
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Controlled Input</h3>
            <TextArea
              label="Controlled"
              value={playgroundValue}
              onChange={(e) => setPlaygroundValue(e.target.value)}
              placeholder="Type here..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Clickable Demo</h3>
            <div 
              className="p-4 border rounded cursor-pointer hover:bg-gray-50"
              onClick={() => {
                addSnackbar({
                  header: "Demo clicked!",
                });
              }}
            >
              <TextArea
                label="Click the container"
                value=""
                onChange={() => {}}
                placeholder="Click outside the text area"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Real-world Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Form</h3>
            <TextArea
              label="Message"
              value=""
              onChange={() => {}}
              placeholder="Enter your message..."
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product Description</h3>
            <TextArea
              label="Description"
              value=""
              onChange={() => {}}
              placeholder="Describe your product..."
              rows={5}
              resize="vertical"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Comments Section</h3>
            <TextArea
              label="Comments"
              value=""
              onChange={() => {}}
              placeholder="Share your thoughts..."
              rows={3}
              hintText="Be respectful and constructive"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bug Report</h3>
            <TextArea
              label="Bug Description"
              value=""
              onChange={() => {}}
              placeholder="Describe the bug in detail..."
              rows={6}
              required
              error
              errorMessage="Please provide a detailed description"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Code Snippet</h3>
            <TextArea
              label="Code"
              value=""
              onChange={() => {}}
              placeholder="Paste your code here..."
              rows={8}
              resize="both"
              wrap="pre"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Feedback Form</h3>
            <TextArea
              label="Feedback"
              value=""
              onChange={() => {}}
              placeholder="Tell us what you think..."
              rows={4}
              helpIconHintText="Your feedback helps us improve"
            />
          </div>
        </div>
      </div>

      {/* All Resize Options with Different States */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Resize Options with States</h2>
        <div className="space-y-8">
          {(["none", "both", "horizontal", "vertical", "block", "inline"] as const).map((resize) => (
            <div key={resize} className="space-y-4">
              <h3 className="text-lg font-semibold">{resize.toUpperCase()} Resize</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextArea
                  label="Default"
                  value=""
                  onChange={() => {}}
                  placeholder={`${resize} default`}
                  resize={resize}
                />
                <TextArea
                  label="With Content"
                  value="This text area has some content to demonstrate how it looks with text inside."
                  onChange={() => {}}
                  placeholder={`${resize} with content`}
                  resize={resize}
                />
                <TextArea
                  label="Error"
                  value=""
                  onChange={() => {}}
                  placeholder={`${resize} error`}
                  resize={resize}
                  error
                  errorMessage="Error message"
                />
                <TextArea
                  label="Disabled"
                  value="This text area is disabled."
                  onChange={() => {}}
                  placeholder={`${resize} disabled`}
                  resize={resize}
                  disabled
                />
                <TextArea
                  label="Required"
                  value=""
                  onChange={() => {}}
                  placeholder={`${resize} required`}
                  resize={resize}
                  required
                />
                <TextArea
                  label="With Hint"
                  value=""
                  onChange={() => {}}
                  placeholder={`${resize} with hint`}
                  resize={resize}
                  hintText="This is a hint"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextAreaDemo; 