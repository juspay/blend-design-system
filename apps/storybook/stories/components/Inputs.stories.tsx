import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  TextInput,
  NumberInput,
  SearchInput,
  TextArea,
  TextInputSize,
  NumberInputSize,
  Button,
  ButtonType,
} from "blend-v1";
import {
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  DollarSign,
  Calendar,
  Search,
  MapPin,
  Building2,
  CreditCard,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

const meta: Meta<typeof TextInput> = {
  title: "Components/Inputs",
  component: TextInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A comprehensive collection of input components for form building including TextInput, NumberInput, SearchInput, and TextArea with support for validation, error handling, and custom slots.

## Features
- **TextInput**: Basic text input with validation and slots
- **NumberInput**: Numeric input with min/max validation
- **SearchInput**: Search-specific input with filtering
- **TextArea**: Multi-line text input with resize options
- Two sizes (Medium, Large) for most components
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Left and right slot content for icons and actions
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Usage

\`\`\`tsx
import { TextInput, NumberInput, SearchInput, TextArea, TextInputSize } from 'blend-v1';

// Basic text input
<TextInput 
  label="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your name"
/>

// Number input with validation
<NumberInput
  label="Age"
  value={age}
  onChange={(e) => setAge(parseInt(e.target.value))}
  min={18}
  max={120}
  size={NumberInputSize.LARGE}
/>

// Search input
<SearchInput
  placeholder="Search..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  leftSlot={<SearchIcon />}
/>

// Text area
<TextArea
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter description..."
  rows={4}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input",
    },
    value: {
      control: "text",
      description: "Current value of the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    size: {
      control: "select",
      options: Object.values(TextInputSize),
      description: "Size of the input",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    error: {
      control: "boolean",
      description: "Whether the input has an error",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    sublabel: {
      control: "text",
      description: "Additional label text",
    },
    hintText: {
      control: "text",
      description: "Hint text below the input",
    },
    helpIconHintText: {
      control: "text",
      description: "Help tooltip text",
    },
    errorMessage: {
      control: "text",
      description: "Error message when error is true",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Default story
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <TextInput
        label="Full Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your full name"
        hintText="This will be displayed on your profile"
      />
    );
  },
};

// All input types showcase
export const InputTypes: Story = {
  render: () => {
    const [textValue, setTextValue] = useState("");
    const [numberValue, setNumberValue] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            TextInput
          </h4>
          <TextInput
            label="Email Address"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="you@example.com"
            leftSlot={<Mail size={18} />}
            hintText="We'll never share your email"
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            NumberInput
          </h4>
          <NumberInput
            label="Age"
            value={numberValue}
            onChange={(e) => setNumberValue(parseInt(e.target.value) || 0)}
            placeholder="Enter your age"
            min={18}
            max={120}
            hintText="Must be 18 or older"
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            SearchInput
          </h4>
          <SearchInput
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            leftSlot={<Search size={18} />}
            rightSlot={
              searchValue && (
                <Button
                  buttonType={ButtonType.SECONDARY}
                  text=""
                  leadingIcon={X}
                  onClick={() => setSearchValue("")}
                />
              )
            }
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            TextArea
          </h4>
          <TextArea
            label="Description"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Enter a detailed description..."
            rows={4}
            hintText="Provide as much detail as possible"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of all available input types: TextInput, NumberInput, SearchInput, and TextArea with their specific features and use cases.",
      },
    },
  },
};

// Input sizes
export const InputSizes: Story = {
  render: () => {
    const [mediumValue, setMediumValue] = useState("");
    const [largeValue, setLargeValue] = useState("");
    const [mediumNumber, setMediumNumber] = useState(0);
    const [largeNumber, setLargeNumber] = useState(0);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            TextInput Sizes
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <TextInput
              label="Medium Size (Default)"
              value={mediumValue}
              onChange={(e) => setMediumValue(e.target.value)}
              placeholder="Medium input..."
              size={TextInputSize.MEDIUM}
              leftSlot={<User size={18} />}
            />
            <TextInput
              label="Large Size"
              value={largeValue}
              onChange={(e) => setLargeValue(e.target.value)}
              placeholder="Large input..."
              size={TextInputSize.LARGE}
              leftSlot={<User size={20} />}
            />
          </div>
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            NumberInput Sizes
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <NumberInput
              label="Medium Size (Default)"
              value={mediumNumber}
              onChange={(e) => setMediumNumber(parseInt(e.target.value) || 0)}
              placeholder="0"
              size={NumberInputSize.MEDIUM}
            />
            <NumberInput
              label="Large Size"
              value={largeNumber}
              onChange={(e) => setLargeNumber(parseInt(e.target.value) || 0)}
              placeholder="0"
              size={NumberInputSize.LARGE}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different sizes available for TextInput and NumberInput components. Both support Medium (default) and Large sizes.",
      },
    },
  },
};

// Input states and validation
export const InputStates: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState("");
    const [errorValue, setErrorValue] = useState("invalid-email");
    const [disabledValue] = useState("Disabled input");
    const [requiredValue, setRequiredValue] = useState("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <TextInput
          label="Normal State"
          value={normalValue}
          onChange={(e) => setNormalValue(e.target.value)}
          placeholder="Type something..."
          hintText="This is a normal input field"
          leftSlot={<User size={18} />}
        />

        <TextInput
          label="Error State"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
          placeholder="Enter valid email"
          error={true}
          errorMessage="Please enter a valid email address"
          leftSlot={<Mail size={18} />}
          rightSlot={<AlertCircle size={18} color="#dc2626" />}
        />

        <TextInput
          label="Required Field"
          value={requiredValue}
          onChange={(e) => setRequiredValue(e.target.value)}
          placeholder="This field is required"
          required={true}
          hintText="Required fields are marked with an asterisk"
          leftSlot={<Lock size={18} />}
        />

        <TextInput
          label="Disabled State"
          value={disabledValue}
          onChange={() => {}}
          placeholder="Cannot edit this"
          disabled={true}
          hintText="This field is currently disabled"
          leftSlot={<User size={18} />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different input states: normal, error, required, and disabled. Error state shows custom error messages and visual indicators.",
      },
    },
  },
};

// Input with slots and help
export const WithSlotsAndHelp: Story = {
  render: () => {
    const [passwordValue, setPasswordValue] = useState("");
    const [priceValue, setPriceValue] = useState(0);
    const [urlValue, setUrlValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <TextInput
          label="Password"
          sublabel="Choose a strong password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Enter password"
          leftSlot={<Lock size={18} />}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          helpIconHintText="Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters"
          hintText="Use a mix of letters, numbers, and symbols"
        />

        <NumberInput
          label="Product Price"
          sublabel="USD"
          value={priceValue}
          onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)}
          placeholder="0.00"
          min={0}
          step={0.01}
          helpIconHintText="This is the selling price that customers will see"
          hintText="Enter price in US dollars"
        />

        <TextInput
          label="Website URL"
          sublabel="Your portfolio or company website"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          placeholder="https://example.com"
          leftSlot={<Globe size={18} />}
          rightSlot={
            urlValue && (
              <Button
                buttonType={ButtonType.SECONDARY}
                text="Verify"
                trailingIcon={Check}
                onClick={() => alert("URL verified!")}
              />
            )
          }
          helpIconHintText="We'll use this to verify your business or portfolio"
          hintText="Include https:// for external links"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Inputs with left and right slots for icons and interactive elements, plus help tooltips and sublabels for additional context.",
      },
    },
  },
};

// Search input variations
export const SearchInputVariations: Story = {
  render: () => {
    const [basicSearch, setBasicSearch] = useState("");
    const [productSearch, setProductSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Basic Search
          </h4>
          <SearchInput
            placeholder="Search..."
            value={basicSearch}
            onChange={(e) => setBasicSearch(e.target.value)}
            leftSlot={<Search size={18} />}
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Product Search
          </h4>
          <SearchInput
            placeholder="Search products, brands, categories..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            leftSlot={<Search size={18} />}
            rightSlot={
              productSearch && (
                <div style={{ display: "flex", gap: "4px" }}>
                  <Button
                    buttonType={ButtonType.SECONDARY}
                    text=""
                    leadingIcon={X}
                    onClick={() => setProductSearch("")}
                  />
                </div>
              )
            }
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Location Search
          </h4>
          <SearchInput
            placeholder="Search cities, states, countries..."
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            leftSlot={<MapPin size={18} />}
            rightSlot={
              locationSearch && (
                <Button
                  buttonType={ButtonType.SECONDARY}
                  text="Clear"
                  onClick={() => setLocationSearch("")}
                />
              )
            }
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Different SearchInput configurations for various use cases: basic search, product search, and location search.",
      },
    },
  },
};

// TextArea variations
export const TextAreaVariations: Story = {
  render: () => {
    const [description, setDescription] = useState("");
    const [feedback, setFeedback] = useState("");
    const [notes, setNotes] = useState("");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "500px",
        }}
      >
        <TextArea
          label="Product Description"
          sublabel="Detailed description for customers"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your product features, benefits, and specifications..."
          rows={4}
          hintText="Include key features and benefits"
          helpIconHintText="A good description helps customers understand your product better"
        />

        <TextArea
          label="Customer Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your experience..."
          rows={6}
          resize="vertical"
          hintText="Your feedback helps us improve"
        />

        <TextArea
          label="Internal Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes..."
          rows={3}
          resize="none"
          disabled={false}
          hintText="These notes are only visible to team members"
          required={false}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "TextArea component with different configurations: varying rows, resize options, and use cases for different content types.",
      },
    },
  },
};
