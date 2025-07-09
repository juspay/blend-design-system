import {
  TextInput,
  SingleSelect,
  Switch,
  addSnackbar,
} from "blend-v1";
import { TextInputSize } from "../../../../packages/blend/lib/components/Inputs/TextInput/types";
import { Search, Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import { useState } from "react";

const InputDemo = () => {
  const [playgroundText, setPlaygroundText] = useState("Playground Input");
  const [playgroundSize, setPlaygroundSize] = useState<TextInputSize>(TextInputSize.MEDIUM);
  const [showLeftSlot, setShowLeftSlot] = useState(false);
  const [showRightSlot, setShowRightSlot] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playgroundValue, setPlaygroundValue] = useState("");

  // Options for selects
  const sizeOptions = [
    { value: TextInputSize.MEDIUM, label: "Medium" },
    { value: TextInputSize.LARGE, label: "Large" },
  ];

  const leftSlotOptions = [
    { value: "search", label: "Search", icon: <Search size={16} /> },
    { value: "user", label: "User", icon: <User size={16} /> },
    { value: "mail", label: "Mail", icon: <Mail size={16} /> },
    { value: "lock", label: "Lock", icon: <Lock size={16} /> },
    { value: "phone", label: "Phone", icon: <Phone size={16} /> },
  ];

  const rightSlotOptions = [
    { value: "eye", label: "Eye", icon: <Eye size={16} /> },
    { value: "eye-off", label: "Eye Off", icon: <EyeOff size={16} /> },
    { value: "search", label: "Search", icon: <Search size={16} /> },
  ];

  const [selectedLeftSlot, setSelectedLeftSlot] = useState("search");
  const [selectedRightSlot, setSelectedRightSlot] = useState("eye");

  const getLeftSlotIcon = () => {
    const option = leftSlotOptions.find(opt => opt.value === selectedLeftSlot);
    return option?.icon;
  };

  const getRightSlotIcon = () => {
    const option = rightSlotOptions.find(opt => opt.value === selectedRightSlot);
    return option?.icon;
  };

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextInput
              label="Label"
              value={playgroundText}
              onChange={(e) => setPlaygroundText(e.target.value)}
              placeholder="Enter label text"
            />

            <SingleSelect
              label="Size"
              items={[{ items: sizeOptions }]}
              selected={playgroundSize}
              onSelect={(value) => setPlaygroundSize(value as TextInputSize)}
              placeholder="Select size"
            />

            <SingleSelect
              label="Left Slot"
              items={[{ items: leftSlotOptions }]}
              selected={selectedLeftSlot}
              onSelect={(value) => setSelectedLeftSlot(value as string)}
              placeholder="Select left slot"
            />

            <SingleSelect
              label="Right Slot"
              items={[{ items: rightSlotOptions }]}
              selected={selectedRightSlot}
              onSelect={(value) => setSelectedRightSlot(value as string)}
              placeholder="Select right slot"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Show Left Slot"
              checked={showLeftSlot}
              onChange={() => setShowLeftSlot(!showLeftSlot)}
            />
            <Switch
              label="Show Right Slot"
              checked={showRightSlot}
              onChange={() => setShowRightSlot(!showRightSlot)}
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
              <TextInput
                label="Playground Input"
                value={playgroundValue}
                onChange={(e) => setPlaygroundValue(e.target.value)}
                placeholder="Enter text here..."
                size={playgroundSize}
                leftSlot={showLeftSlot ? getLeftSlotIcon() : undefined}
                rightSlot={showRightSlot ? getRightSlotIcon() : undefined}
                disabled={isDisabled}
                error={hasError}
                errorMessage={hasError ? "This field has an error" : undefined}
                hintText="This is a hint text"
                helpIconHintText="This is help text for the input"
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
            <h3 className="text-lg font-semibold">Default Input</h3>
            <TextInput
              label="Default"
              value=""
              onChange={() => {}}
              placeholder="Enter text..."
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Label</h3>
            <TextInput
              label="Email Address"
              value=""
              onChange={() => {}}
              placeholder="Enter your email"
              leftSlot={<Mail size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required Field</h3>
            <TextInput
              label="Username"
              value=""
              onChange={() => {}}
              placeholder="Enter username"
              required
              leftSlot={<User size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Hint Text</h3>
            <TextInput
              label="Password"
              value=""
              onChange={() => {}}
              placeholder="Enter password"
              leftSlot={<Lock size={16} />}
              rightSlot={<Eye size={16} />}
              hintText="Must be at least 8 characters"
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
            <TextInput
              label="Medium Input"
              value=""
              onChange={() => {}}
              placeholder="Medium size"
                              size={TextInputSize.MEDIUM}
                leftSlot={<User size={16} />}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Large</h3>
              <TextInput
                label="Large Input"
                value=""
                onChange={() => {}}
                placeholder="Large size"
                size={TextInputSize.LARGE}
                leftSlot={<User size={18} />}
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
            <TextInput
              label="Default State"
              value=""
              onChange={() => {}}
              placeholder="Default input"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <TextInput
              label="Disabled Input"
              value="Disabled value"
              onChange={() => {}}
              placeholder="Disabled input"
              disabled
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Error</h3>
            <TextInput
              label="Error Input"
              value=""
              onChange={() => {}}
              placeholder="Error input"
              error
              errorMessage="This field is required"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Help Text</h3>
            <TextInput
              label="Help Input"
              value=""
              onChange={() => {}}
              placeholder="With help text"
              helpIconHintText="This is additional help information"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Sublabel</h3>
            <TextInput
              label="Sublabel Input"
              value=""
              onChange={() => {}}
              sublabel="This is a sublabel"
              placeholder="With sublabel"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Required</h3>
            <TextInput
              label="Required Input"
              value=""
              onChange={() => {}}
              placeholder="Required field"
              required
            />
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">With Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Left Icon</h3>
            <TextInput
              label="Search"
              value=""
              onChange={() => {}}
              placeholder="Search..."
              leftSlot={<Search size={16} />}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Right Icon</h3>
            <TextInput
              label="Password"
              value=""
              onChange={() => {}}
              placeholder="Enter password"
              rightSlot={<Eye size={16} />}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Both Icons</h3>
            <TextInput
              label="Email"
              value=""
              onChange={() => {}}
              placeholder="Enter email"
              leftSlot={<Mail size={16} />}
              rightSlot={<User size={16} />}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Phone Input</h3>
            <TextInput
              label="Phone Number"
              value=""
              onChange={() => {}}
              placeholder="Enter phone number"
              leftSlot={<Phone size={16} />}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Input</h3>
            <TextInput
              label="Username"
              value=""
              onChange={() => {}}
              placeholder="Enter username"
              leftSlot={<User size={16} />}
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lock Input</h3>
            <TextInput
              label="Password"
              value=""
              onChange={() => {}}
              placeholder="Enter password"
              leftSlot={<Lock size={16} />}
              rightSlot={<EyeOff size={16} />}
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
            <TextInput
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
              <TextInput
                label="Click the container"
                value=""
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
          {([TextInputSize.MEDIUM, TextInputSize.LARGE] as const).map((size) => (
            <div key={size} className="space-y-4">
              <h3 className="text-lg font-semibold">{size === TextInputSize.MEDIUM ? "MEDIUM" : "LARGE"} Size</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TextInput
                  label="Default"
                  value=""
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} default`}
                  size={size}
                />
                <TextInput
                  label="With Icon"
                  value=""
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} with icon`}
                  size={size}
                  leftSlot={<User size={size === TextInputSize.MEDIUM ? 16 : 18} />}
                />
                <TextInput
                  label="Error"
                  value=""
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} error`}
                  size={size}
                  error
                  errorMessage="Error message"
                />
                <TextInput
                  label="Disabled"
                  value="Disabled value"
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} disabled`}
                  size={size}
                  disabled
                />
                <TextInput
                  label="Required"
                  value=""
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} required`}
                  size={size}
                  required
                />
                <TextInput
                  label="With Hint"
                  value=""
                  onChange={() => {}}
                  placeholder={`${size === TextInputSize.MEDIUM ? "md" : "lg"} with hint`}
                  size={size}
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

export default InputDemo;
