import {
  ButtonV2,
  ButtonTypeV2,
  ButtonSizeV2,
  ButtonSubTypeV2,
  addSnackbar,
} from "blend-v1";
import { SingleSelect, TextInput, Switch } from "blend-v1";
import { Hash, X, Plus, Download, Upload, Settings } from "lucide-react";
import { useState } from "react";

const ButtonDemo = () => {
  const [playgroundText, setPlaygroundText] = useState("Click me");
  const [playgroundType, setPlaygroundType] = useState<ButtonTypeV2>(
    ButtonTypeV2.PRIMARY
  );
  const [playgroundSize, setPlaygroundSize] = useState<ButtonSizeV2>(
    ButtonSizeV2.MEDIUM
  );
  const [playgroundSubType, setPlaygroundSubType] = useState<ButtonSubTypeV2>(
    ButtonSubTypeV2.DEFAULT
  );
  const [showLeadingIcon, setShowLeadingIcon] = useState(false);
  const [showTrailingIcon, setShowTrailingIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  // Options for selects
  const typeOptions = [
    { value: ButtonTypeV2.PRIMARY, label: "Primary" },
    { value: ButtonTypeV2.SECONDARY, label: "Secondary" },
    { value: ButtonTypeV2.DANGER, label: "Danger" },
    { value: ButtonTypeV2.SUCCESS, label: "Success" },
  ];

  const sizeOptions = [
    { value: ButtonSizeV2.SMALL, label: "Small" },
    { value: ButtonSizeV2.MEDIUM, label: "Medium" },
    { value: ButtonSizeV2.LARGE, label: "Large" },
  ];

  const subTypeOptions = [
    { value: ButtonSubTypeV2.DEFAULT, label: "Default" },
    { value: ButtonSubTypeV2.ICON_ONLY, label: "Icon Only" },
    { value: ButtonSubTypeV2.INLINE, label: "Inline" },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextInput
              label="Text"
              value={playgroundText}
              onChange={(e) => setPlaygroundText(e.target.value)}
              placeholder="Enter button text"
            />

            <SingleSelect
              label="Type"
              items={[{ items: typeOptions }]}
              selected={playgroundType}
              onSelect={(value) => setPlaygroundType(value as ButtonTypeV2)}
              placeholder="Select type"
            />

            <SingleSelect
              label="Size"
              items={[{ items: sizeOptions }]}
              selected={playgroundSize}
              onSelect={(value) => setPlaygroundSize(value as ButtonSizeV2)}
              placeholder="Select size"
            />

            <SingleSelect
              label="Sub Type"
              items={[{ items: subTypeOptions }]}
              selected={playgroundSubType}
              onSelect={(value) =>
                setPlaygroundSubType(value as ButtonSubTypeV2)
              }
              placeholder="Select sub type"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Leading Icon"
              checked={showLeadingIcon}
              onChange={() => setShowLeadingIcon(!showLeadingIcon)}
            />
            <Switch
              label="Trailing Icon"
              checked={showTrailingIcon}
              onChange={() => setShowTrailingIcon(!showTrailingIcon)}
            />
            <Switch
              label="Loading"
              checked={isLoading}
              onChange={() => setIsLoading(!isLoading)}
            />
            <Switch
              label="Disabled"
              checked={isDisabled}
              onChange={() => setIsDisabled(!isDisabled)}
            />
            <Switch
              label="Full Width"
              checked={fullWidth}
              onChange={() => setFullWidth(!fullWidth)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
            <ButtonV2
              text={
                playgroundSubType === ButtonSubTypeV2.ICON_ONLY
                  ? undefined
                  : playgroundText
              }
              buttonType={playgroundType}
              size={playgroundSize}
              subType={playgroundSubType}
              leadingIcon={showLeadingIcon ? <Hash size={16} /> : undefined}
              trailingIcon={showTrailingIcon ? <X size={16} /> : undefined}
              loading={isLoading}
              disabled={isDisabled}
              fullWidth={fullWidth}
              onClick={() => {
                addSnackbar({
                  header: "Button clicked!",
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Button Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Button Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(ButtonTypeV2).map((type) => (
            <div key={type} className="space-y-3">
              <h3 className="text-sm font-medium capitalize">{type}</h3>
              <div className="space-y-2">
                <ButtonV2
                  text="Button"
                  buttonType={type}
                  onClick={() => {
                    addSnackbar({
                      header: `${type} button clicked!`,
                    });
                  }}
                />
                <ButtonV2
                  text="With Icon"
                  buttonType={type}
                  leadingIcon={<Plus size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: `${type} button with icon clicked!`,
                    });
                  }}
                />
                <ButtonV2
                  buttonType={type}
                  leadingIcon={<Settings size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: `${type} icon button clicked!`,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(ButtonSizeV2).map((size) => (
            <div key={size} className="space-y-3">
              <h3 className="text-sm font-medium capitalize">{size}</h3>
              <div className="space-y-2">
                <ButtonV2
                  text="Button"
                  size={size}
                  onClick={() => {
                    addSnackbar({
                      header: `${size} button clicked!`,
                    });
                  }}
                />
                <ButtonV2
                  text="With Icon"
                  size={size}
                  leadingIcon={
                    <Download
                      size={
                        size === ButtonSizeV2.SMALL
                          ? 14
                          : size === ButtonSizeV2.MEDIUM
                            ? 16
                            : 18
                      }
                    />
                  }
                  onClick={() => {
                    addSnackbar({
                      header: `${size} button with icon clicked!`,
                    });
                  }}
                />
                <ButtonV2
                  size={size}
                  leadingIcon={
                    <Upload
                      size={
                        size === ButtonSizeV2.SMALL
                          ? 14
                          : size === ButtonSizeV2.MEDIUM
                            ? 16
                            : 18
                      }
                    />
                  }
                  onClick={() => {
                    addSnackbar({
                      header: `${size} icon button clicked!`,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sub Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(ButtonSubTypeV2).map((subType) => (
            <div key={subType} className="space-y-3">
              <h3 className="text-sm font-medium capitalize">
                {subType.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="space-y-2">
                <ButtonV2
                  text={
                    subType === ButtonSubTypeV2.ICON_ONLY ? undefined : "Button"
                  }
                  subType={subType}
                  leadingIcon={
                    subType === ButtonSubTypeV2.ICON_ONLY ? (
                      <Settings size={16} />
                    ) : (
                      <Plus size={16} />
                    )
                  }
                  onClick={() => {
                    addSnackbar({
                      header: `${subType} button clicked!`,
                    });
                  }}
                />
                <ButtonV2
                  text={
                    subType === ButtonSubTypeV2.ICON_ONLY ? undefined : "Danger"
                  }
                  buttonType={ButtonTypeV2.DANGER}
                  subType={subType}
                  leadingIcon={
                    subType === ButtonSubTypeV2.ICON_ONLY ? (
                      <X size={16} />
                    ) : (
                      <X size={16} />
                    )
                  }
                  onClick={() => {
                    addSnackbar({
                      header: `${subType} danger button clicked!`,
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* States */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Default</h3>
            <ButtonV2
              text="Button"
              onClick={() => {
                addSnackbar({
                  header: "Default button clicked!",
                });
              }}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Loading</h3>
            <ButtonV2 text="Loading" loading={true} />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Disabled</h3>
            <ButtonV2 text="Disabled" disabled={true} />
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Full Width</h3>
            <ButtonV2
              text="Full Width"
              fullWidth={true}
              onClick={() => {
                addSnackbar({
                  header: "Full width button clicked!",
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ButtonV2
            text="Download"
            leadingIcon={<Download size={16} />}
            onClick={() => {
              addSnackbar({
                header: "Download started!",
              });
            }}
          />
          <ButtonV2
            text="Upload"
            trailingIcon={<Upload size={16} />}
            onClick={() => {
              addSnackbar({
                header: "Upload started!",
              });
            }}
          />
          <ButtonV2
            text="Settings"
            buttonType={ButtonTypeV2.SECONDARY}
            leadingIcon={<Settings size={16} />}
            onClick={() => {
              addSnackbar({
                header: "Settings opened!",
              });
            }}
          />
          <ButtonV2
            text="Delete"
            buttonType={ButtonTypeV2.DANGER}
            leadingIcon={<X size={16} />}
            onClick={() => {
              addSnackbar({
                header: "Delete confirmed!",
              });
            }}
          />
        </div>
      </div>

      {/* All Combinations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Combinations</h2>
        <div className="space-y-8">
          {Object.values(ButtonTypeV2).map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{type} Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.values(ButtonSizeV2).map((size) => (
                  <div key={size} className="space-y-2">
                    <h4 className="text-xs font-medium capitalize text-gray-600">
                      {size}
                    </h4>
                    <div className="space-y-1">
                      <ButtonV2
                        text="S"
                        buttonType={type}
                        size={size}
                        onClick={() => {
                          addSnackbar({
                            header: `${type} ${size} button clicked!`,
                          });
                        }}
                      />
                      <ButtonV2
                        text="M"
                        buttonType={type}
                        size={size}
                        leadingIcon={
                          <Plus
                            size={
                              size === ButtonSizeV2.SMALL
                                ? 14
                                : size === ButtonSizeV2.MEDIUM
                                  ? 16
                                  : 18
                            }
                          />
                        }
                        onClick={() => {
                          addSnackbar({
                            header: `${type} ${size} button with icon clicked!`,
                          });
                        }}
                      />
                      <ButtonV2
                        buttonType={type}
                        size={size}
                        leadingIcon={
                          <Settings
                            size={
                              size === ButtonSizeV2.SMALL
                                ? 14
                                : size === ButtonSizeV2.MEDIUM
                                  ? 16
                                  : 18
                            }
                          />
                        }
                        onClick={() => {
                          addSnackbar({
                            header: `${type} ${size} icon button clicked!`,
                          });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
