import {
  ButtonV2,
  ButtonGroupV2,
  ButtonTypeV2,
  ButtonSizeV2,
  ButtonSubTypeV2,
  addSnackbar,
} from "blend-v1";
import { SingleSelect, Switch } from "blend-v1";
import {
  Hash,
  X,
  Plus,
  Star,
  Download,
  Upload,
  Settings,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";

const ButtonGroupDemo = () => {
  const [playgroundStacked, setPlaygroundStacked] = useState(false);
  const [playgroundButtonType, setPlaygroundButtonType] =
    useState<ButtonTypeV2>(ButtonTypeV2.PRIMARY);
  const [playgroundSize, setPlaygroundSize] = useState<ButtonSizeV2>(
    ButtonSizeV2.MEDIUM
  );
  const [playgroundSubType, setPlaygroundSubType] = useState<ButtonSubTypeV2>(
    ButtonSubTypeV2.DEFAULT
  );
  const [playgroundCount, setPlaygroundCount] = useState("3");

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

  const countOptions = [
    { value: "2", label: "2 Buttons" },
    { value: "3", label: "3 Buttons" },
    { value: "4", label: "4 Buttons" },
    { value: "5", label: "5 Buttons" },
  ];

  const renderPlaygroundButtons = () => {
    const buttons = [];
    const icons = [Hash, X, Plus, Star, Settings];

    for (let i = 0; i < Number(playgroundCount); i++) {
      const IconComponent = icons[i];
      buttons.push(
        <ButtonV2
          key={i}
          text={
            playgroundSubType === ButtonSubTypeV2.ICON_ONLY
              ? undefined
              : `Button ${i + 1}`
          }
          buttonType={playgroundButtonType}
          size={playgroundSize}
          subType={playgroundSubType}
          leadingIcon={
            playgroundSubType === ButtonSubTypeV2.ICON_ONLY && IconComponent ? (
              <IconComponent size={16} />
            ) : undefined
          }
          onClick={() => {
            addSnackbar({
              header: `Button ${i + 1} clicked!`,
            });
          }}
        />
      );
    }
    return buttons;
  };

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SingleSelect
              label="Button Type"
              items={[{ items: typeOptions }]}
              selected={playgroundButtonType}
              onSelect={(value) =>
                setPlaygroundButtonType(value as ButtonTypeV2)
              }
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

            <SingleSelect
              label="Button Count"
              items={[{ items: countOptions }]}
              selected={playgroundCount}
              onSelect={(value) => setPlaygroundCount(value)}
              placeholder="Select count"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Stacked"
              checked={playgroundStacked}
              onChange={() => setPlaygroundStacked(!playgroundStacked)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
            <ButtonGroupV2 stacked={playgroundStacked}>
              {renderPlaygroundButtons()}
            </ButtonGroupV2>
          </div>
        </div>
      </div>

      {/* Basic Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Basic Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horizontal Group</h3>
            <div className="space-y-4">
              <ButtonGroupV2>
                <ButtonV2
                  text="Save"
                  leadingIcon={<Download size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Save clicked!",
                    });
                  }}
                />
                <ButtonV2
                  text="Cancel"
                  buttonType={ButtonTypeV2.SECONDARY}
                  onClick={() => {
                    addSnackbar({
                      header: "Cancel clicked!",
                    });
                  }}
                />
              </ButtonGroupV2>

              <ButtonGroupV2>
                <ButtonV2
                  text="Edit"
                  buttonType={ButtonTypeV2.PRIMARY}
                  leadingIcon={<Edit size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Edit clicked!",
                    });
                  }}
                />
                <ButtonV2
                  text="View"
                  buttonType={ButtonTypeV2.SECONDARY}
                  leadingIcon={<Eye size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "View clicked!",
                    });
                  }}
                />
                <ButtonV2
                  text="Delete"
                  buttonType={ButtonTypeV2.DANGER}
                  leadingIcon={<Trash2 size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Delete clicked!",
                    });
                  }}
                />
              </ButtonGroupV2>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stacked Group</h3>
            <div className="space-y-4">
              <ButtonGroupV2 stacked>
                <ButtonV2
                  text="Left"
                  onClick={() => {
                    addSnackbar({
                      header: "Left button clicked!",
                    });
                  }}
                />
                <ButtonV2
                  text="Center"
                  onClick={() => {
                    addSnackbar({
                      header: "Center button clicked!",
                    });
                  }}
                />
                <ButtonV2
                  text="Right"
                  onClick={() => {
                    addSnackbar({
                      header: "Right button clicked!",
                    });
                  }}
                />
              </ButtonGroupV2>

              <ButtonGroupV2 stacked>
                <ButtonV2
                  leadingIcon={<Hash size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Hash button clicked!",
                    });
                  }}
                />
                <ButtonV2
                  leadingIcon={<Plus size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Plus button clicked!",
                    });
                  }}
                />
                <ButtonV2
                  leadingIcon={<Star size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Star button clicked!",
                    });
                  }}
                />
                <ButtonV2
                  leadingIcon={<Settings size={16} />}
                  onClick={() => {
                    addSnackbar({
                      header: "Settings button clicked!",
                    });
                  }}
                />
              </ButtonGroupV2>
            </div>
          </div>
        </div>
      </div>

      {/* Button Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Button Types</h2>
        <div className="space-y-6">
          {Object.values(ButtonTypeV2).map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{type}</h3>
              <div className="space-y-4">
                <ButtonGroupV2>
                  <ButtonV2
                    text="First"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} first button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Second"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} second button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Third"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} third button clicked!`,
                      });
                    }}
                  />
                </ButtonGroupV2>

                <ButtonGroupV2 stacked>
                  <ButtonV2
                    text="Left"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} left button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Center"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} center button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Right"
                    buttonType={type}
                    onClick={() => {
                      addSnackbar({
                        header: `${type} right button clicked!`,
                      });
                    }}
                  />
                </ButtonGroupV2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="space-y-6">
          {Object.values(ButtonSizeV2).map((size) => (
            <div key={size} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{size}</h3>
              <div className="space-y-4">
                <ButtonGroupV2>
                  <ButtonV2
                    text="Small"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} small button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Medium"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} medium button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Large"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} large button clicked!`,
                      });
                    }}
                  />
                </ButtonGroupV2>

                <ButtonGroupV2 stacked>
                  <ButtonV2
                    text="Left"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} left button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Center"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} center button clicked!`,
                      });
                    }}
                  />
                  <ButtonV2
                    text="Right"
                    size={size}
                    onClick={() => {
                      addSnackbar({
                        header: `${size} right button clicked!`,
                      });
                    }}
                  />
                </ButtonGroupV2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mixed Types */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Mixed Types</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Primary + Secondary</h3>
            <ButtonGroupV2>
              <ButtonV2
                text="Primary Action"
                buttonType={ButtonTypeV2.PRIMARY}
                onClick={() => {
                  addSnackbar({
                    header: "Primary action clicked!",
                  });
                }}
              />
              <ButtonV2
                text="Secondary Action"
                buttonType={ButtonTypeV2.SECONDARY}
                onClick={() => {
                  addSnackbar({
                    header: "Secondary action clicked!",
                  });
                }}
              />
            </ButtonGroupV2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Success + Danger</h3>
            <ButtonGroupV2>
              <ButtonV2
                text="Approve"
                buttonType={ButtonTypeV2.SUCCESS}
                leadingIcon={<Plus size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Approve clicked!",
                  });
                }}
              />
              <ButtonV2
                text="Reject"
                buttonType={ButtonTypeV2.DANGER}
                leadingIcon={<X size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Reject clicked!",
                  });
                }}
              />
            </ButtonGroupV2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mixed with Icons</h3>
            <ButtonGroupV2>
              <ButtonV2
                text="Download"
                buttonType={ButtonTypeV2.PRIMARY}
                leadingIcon={<Download size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Download clicked!",
                  });
                }}
              />
              <ButtonV2
                text="Upload"
                buttonType={ButtonTypeV2.SECONDARY}
                leadingIcon={<Upload size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Upload clicked!",
                  });
                }}
              />
              <ButtonV2
                buttonType={ButtonTypeV2.DANGER}
                leadingIcon={<Trash2 size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Delete clicked!",
                  });
                }}
              />
            </ButtonGroupV2>
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">File Actions</h3>
            <ButtonGroupV2>
              <ButtonV2
                text="New File"
                buttonType={ButtonTypeV2.PRIMARY}
                leadingIcon={<Plus size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "New file created!",
                  });
                }}
              />
              <ButtonV2
                text="Open"
                buttonType={ButtonTypeV2.SECONDARY}
                leadingIcon={<Eye size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "File opened!",
                  });
                }}
              />
              <ButtonV2
                text="Save"
                buttonType={ButtonTypeV2.SUCCESS}
                leadingIcon={<Download size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "File saved!",
                  });
                }}
              />
            </ButtonGroupV2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Actions</h3>
            <ButtonGroupV2 stacked>
              <ButtonV2
                text="View Profile"
                buttonType={ButtonTypeV2.PRIMARY}
                leadingIcon={<Eye size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Profile viewed!",
                  });
                }}
              />
              <ButtonV2
                text="Edit Profile"
                buttonType={ButtonTypeV2.SECONDARY}
                leadingIcon={<Edit size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Profile edit mode!",
                  });
                }}
              />
              <ButtonV2
                text="Delete Account"
                buttonType={ButtonTypeV2.DANGER}
                leadingIcon={<Trash2 size={16} />}
                onClick={() => {
                  addSnackbar({
                    header: "Delete account confirmed!",
                  });
                }}
              />
            </ButtonGroupV2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonGroupDemo;
