import {
  NumberInput,
  SingleSelect,
  Switch,
  addSnackbar,
} from "blend-v1";
import { NumberInputSize } from "../../../../packages/blend/lib/components/Inputs/NumberInput/types";
import { useState } from "react";

const NumberInputDemo = () => {
  const [playgroundValue, setPlaygroundValue] = useState(42);
  const [playgroundSize, setPlaygroundSize] = useState<NumberInputSize>(NumberInputSize.MEDIUM);
  const [playgroundStep, setPlaygroundStep] = useState("1");
  const [playgroundMin, setPlaygroundMin] = useState<string | undefined>(undefined);
  const [playgroundMax, setPlaygroundMax] = useState<string | undefined>(undefined);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showMin, setShowMin] = useState(false);
  const [showMax, setShowMax] = useState(false);

  // Options for selects
  const sizeOptions = [
    { value: NumberInputSize.MEDIUM, label: "Medium" },
    { value: NumberInputSize.LARGE, label: "Large" },
  ];

  const stepOptions = [
    { value: "0.1", label: "0.1" },
    { value: "0.5", label: "0.5" },
    { value: "1", label: "1" },
    { value: "5", label: "5" },
    { value: "10", label: "10" },
  ];

  const minOptions = [
    { value: "0", label: "0" },
    { value: "10", label: "10" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const maxOptions = [
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NumberInput
              label="Value"
              value={playgroundValue}
              onChange={(e) => setPlaygroundValue(Number(e.target.value))}
              placeholder="Enter value"
              
            />

            <SingleSelect
              label="Size"
              items={[{ items: sizeOptions }]}
              selected={playgroundSize}
              onSelect={(value) => setPlaygroundSize(value as NumberInputSize)}
              placeholder="Select size"
            />

            <SingleSelect
              label="Step"
              items={[{ items: stepOptions }]}
              selected={playgroundStep}
              onSelect={(value) => setPlaygroundStep(value)}
              placeholder="Select step"
            />

            <SingleSelect
              label="Min Value"
              items={[{ items: minOptions }]}
              selected={playgroundMin || ""}
              onSelect={(value) => setPlaygroundMin(value)}
              placeholder="Select min"
            />

            <SingleSelect
              label="Max Value"
              items={[{ items: maxOptions }]}
              selected={playgroundMax || ""}
              onSelect={(value) => setPlaygroundMax(value)}
              placeholder="Select max"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Show Min"
              checked={showMin}
              onChange={() => setShowMin(!showMin)}
            />
            <Switch
              label="Show Max"
              checked={showMax}
              onChange={() => setShowMax(!showMax)}
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
              <NumberInput
                label="Playground Number Input"
                value={playgroundValue}
                onChange={(e) => setPlaygroundValue(Number(e.target.value))}
                placeholder="Enter number..."
                size={playgroundSize}
                step={Number(playgroundStep)}
                min={showMin ? Number(playgroundMin) : undefined}
                max={showMax ? Number(playgroundMax) : undefined}
                disabled={isDisabled}
                error={hasError}
                errorMessage={hasError ? "This field has an error" : undefined}
                hintText="This is a hint text"
                helpIconHintText="This is help text for the number input"
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
            <h3 className="text-lg font-semibold">Default Number Input</h3>
            <NumberInput
              label="Default"
              value={0}
              onChange={() => {}}
              placeholder="Enter number..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Step</h3>
            <NumberInput
              label="Step by 5"
              value={0}
              onChange={() => {}}
              placeholder="Enter number..."
              step={5}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Field</h3>
            <NumberInput
              label="Required Number"
              value={0}
              onChange={() => {}}
              placeholder="Enter number..."
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Hint Text</h3>
            <NumberInput
              label="Age"
              value={0}
              onChange={() => {}}
              placeholder="Enter age"
              hintText="Must be between 0 and 120"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medium</h3>
            <NumberInput
              label="Medium Number Input"
              value={0}
              onChange={() => {}}
              placeholder="Medium size"
              size={NumberInputSize.MEDIUM}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Large</h3>
            <NumberInput
              label="Large Number Input"
              value={0}
              onChange={() => {}}
              placeholder="Large size"
              size={NumberInputSize.LARGE}
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
            <NumberInput
              label="Default State"
              value={0}
              onChange={() => {}}
              placeholder="Default input"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <NumberInput
              label="Disabled Input"
              value={42}
              onChange={() => {}}
              placeholder="Disabled input"
              disabled
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Error</h3>
            <NumberInput
              label="Error Input"
              value={0}
              onChange={() => {}}
              placeholder="Error input"
              error
              errorMessage="This field is required"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Help Text</h3>
            <NumberInput
              label="Help Input"
              value={0}
              onChange={() => {}}
              placeholder="With help text"
              helpIconHintText="This is additional help information"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Sublabel</h3>
            <NumberInput
              label="Sublabel Input"
              value={0}
              onChange={() => {}}
              sublabel="This is a sublabel"
              placeholder="With sublabel"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required</h3>
            <NumberInput
              label="Required Input"
              value={0}
              onChange={() => {}}
              placeholder="Required field"
              required
            />
          </div>
        </div>
      </div>

      {/* Step Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Step Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 0.1</h3>
            <NumberInput
              label="Decimal Step"
              value={0}
              onChange={() => {}}
              placeholder="0.1 increments"
              step={0.1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 0.5</h3>
            <NumberInput
              label="Half Step"
              value={0}
              onChange={() => {}}
              placeholder="0.5 increments"
              step={0.5}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 1</h3>
            <NumberInput
              label="Whole Numbers"
              value={0}
              onChange={() => {}}
              placeholder="1 increments"
              step={1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 5</h3>
            <NumberInput
              label="Step by 5"
              value={0}
              onChange={() => {}}
              placeholder="5 increments"
              step={5}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 10</h3>
            <NumberInput
              label="Step by 10"
              value={0}
              onChange={() => {}}
              placeholder="10 increments"
              step={10}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Step 100</h3>
            <NumberInput
              label="Step by 100"
              value={0}
              onChange={() => {}}
              placeholder="100 increments"
              step={100}
            />
          </div>
        </div>
      </div>

      {/* Min/Max Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Min/Max Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Min Only</h3>
            <NumberInput
              label="Min 0"
              value={0}
              onChange={() => {}}
              placeholder="Min 0"
              min={0}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Max Only</h3>
            <NumberInput
              label="Max 100"
              value={0}
              onChange={() => {}}
              placeholder="Max 100"
              max={100}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Min & Max</h3>
            <NumberInput
              label="0 to 100"
              value={50}
              onChange={() => {}}
              placeholder="0 to 100"
              min={0}
              max={100}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Age Range</h3>
            <NumberInput
              label="Age (0-120)"
              value={25}
              onChange={() => {}}
              placeholder="Enter age"
              min={0}
              max={120}
              step={1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Percentage</h3>
            <NumberInput
              label="Percentage (0-100)"
              value={50}
              onChange={() => {}}
              placeholder="0-100%"
              min={0}
              max={100}
              step={1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Temperature</h3>
            <NumberInput
              label="Temperature (°C)"
              value={20}
              onChange={() => {}}
              placeholder="-50 to 50°C"
              min={-50}
              max={50}
              step={0.1}
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
            <NumberInput
              label="Controlled"
              value={playgroundValue}
              onChange={(e) => setPlaygroundValue(Number(e.target.value))}
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
              <NumberInput
                label="Click the container"
                value={0}
                onChange={() => {}}
                placeholder="Click outside the input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* All Sizes with Different States */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Sizes with States</h2>
        <div className="space-y-8">
          {([NumberInputSize.MEDIUM, NumberInputSize.LARGE] as const).map((size) => (
            <div key={size} className="space-y-4">
              <h3 className="text-lg font-semibold">{size === NumberInputSize.MEDIUM ? "MEDIUM" : "LARGE"} Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NumberInput
                  label="Default"
                  value={0}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} default`}
                  size={size}
                />
                <NumberInput
                  label="With Step"
                  value={0}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} with step`}
                  size={size}
                  step={5}
                />
                <NumberInput
                  label="Error"
                  value={0}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} error`}
                  size={size}
                  error
                  errorMessage="Error message"
                />
                <NumberInput
                  label="Disabled"
                  value={42}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} disabled`}
                  size={size}
                  disabled
                />
                <NumberInput
                  label="Required"
                  value={0}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} required`}
                  size={size}
                  required
                />
                <NumberInput
                  label="With Hint"
                  value={0}
                  onChange={() => {}}
                  placeholder={`${size === NumberInputSize.MEDIUM ? "md" : "lg"} with hint`}
                  size={size}
                  hintText="This is a hint"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Real-world Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quantity</h3>
            <NumberInput
              label="Quantity"
              value={1}
              onChange={() => {}}
              placeholder="Enter quantity"
              min={1}
              max={999}
              step={1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Price</h3>
            <NumberInput
              label="Price ($)"
              value={0}
              onChange={() => {}}
              placeholder="0.00"
              min={0}
              step={0.01}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rating</h3>
            <NumberInput
              label="Rating"
              value={5}
              onChange={() => {}}
              placeholder="1-5 stars"
              min={1}
              max={5}
              step={0.5}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Weight</h3>
            <NumberInput
              label="Weight (kg)"
              value={0}
              onChange={() => {}}
              placeholder="Enter weight"
              min={0}
              step={0.1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Distance</h3>
            <NumberInput
              label="Distance (km)"
              value={0}
              onChange={() => {}}
              placeholder="Enter distance"
              min={0}
              step={0.1}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Score</h3>
            <NumberInput
              label="Score"
              value={0}
              onChange={() => {}}
              placeholder="0-100"
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberInputDemo; 