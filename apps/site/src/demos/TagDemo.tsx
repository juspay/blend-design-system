import {
  Tag,
  TagColor,
  TagVariant,
  TagSize,
  TagShape,
  addSnackbar,
} from "blend-v1";
import { SingleSelect, TextInput, Switch } from "blend-v1";
import { Hash, X, Plus, Star } from "lucide-react";
import { useState } from "react";

const TagDemo = () => {
  const [playgroundText, setPlaygroundText] = useState("Playground Tag");
  const [playgroundColor, setPlaygroundColor] = useState<TagColor>(
    TagColor.PRIMARY
  );
  const [playgroundVariant, setPlaygroundVariant] = useState<TagVariant>(
    TagVariant.SUBTLE
  );
  const [playgroundSize, setPlaygroundSize] = useState<TagSize>(TagSize.SM);
  const [playgroundShape, setPlaygroundShape] = useState<TagShape>(
    TagShape.SQUARICAL
  );
  const [showLeftSlot, setShowLeftSlot] = useState(false);
  const [showRightSlot, setShowRightSlot] = useState(false);

  // Options for selects
  const colorOptions = [
    { value: TagColor.NEUTRAL, label: "Neutral" },
    { value: TagColor.PRIMARY, label: "Primary" },
    { value: TagColor.SUCCESS, label: "Success" },
    { value: TagColor.ERROR, label: "Error" },
    { value: TagColor.WARNING, label: "Warning" },
    { value: TagColor.PURPLE, label: "Purple" },
  ];

  const variantOptions = [
    { value: TagVariant.NO_FILL, label: "No Fill" },
    { value: TagVariant.ATTENTIVE, label: "Attentive" },
    { value: TagVariant.SUBTLE, label: "Subtle" },
  ];

  const sizeOptions = [
    { value: TagSize.XS, label: "Extra Small" },
    { value: TagSize.SM, label: "Small" },
    { value: TagSize.MD, label: "Medium" },
    { value: TagSize.LG, label: "Large" },
  ];

  const shapeOptions = [
    { value: TagShape.SQUARICAL, label: "Squarical" },
    { value: TagShape.ROUNDED, label: "Rounded" },
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
              placeholder="Enter tag text"
            />

            <SingleSelect
              label="Color"
              items={[{ items: colorOptions }]}
              selected={playgroundColor}
              onSelect={(value) => setPlaygroundColor(value as TagColor)}
              placeholder="Select color"
            />

            <SingleSelect
              label="Variant"
              items={[{ items: variantOptions }]}
              selected={playgroundVariant}
              onSelect={(value) => setPlaygroundVariant(value as TagVariant)}
              placeholder="Select variant"
            />

            <SingleSelect
              label="Size"
              items={[{ items: sizeOptions }]}
              selected={playgroundSize}
              onSelect={(value) => setPlaygroundSize(value as TagSize)}
              placeholder="Select size"
            />

            <SingleSelect
              label="Shape"
              items={[{ items: shapeOptions }]}
              selected={playgroundShape}
              onSelect={(value) => setPlaygroundShape(value as TagShape)}
              placeholder="Select shape"
            />
          </div>

          <div className="flex items-center gap-6">
            <Switch
              label="Left Slot"
              checked={showLeftSlot}
              onChange={() => setShowLeftSlot(!showLeftSlot)}
            />
            <Switch
              label="Right Slot"
              checked={showRightSlot}
              onChange={() => setShowRightSlot(!showRightSlot)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200">
            <Tag
              text={playgroundText}
              color={playgroundColor}
              variant={playgroundVariant}
              size={playgroundSize}
              shape={playgroundShape}
              leftSlot={showLeftSlot ? <Hash size={12} /> : undefined}
              rightSlot={showRightSlot ? <X size={12} /> : undefined}
              onClick={() => {
                addSnackbar({
                  header: "Tag clicked!",
                  // description: "This is a tag",
                });
              }}
            />
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Variants</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Object.values(TagVariant).map((variant) => (
            <div key={variant} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{variant}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(TagColor).map((color) => (
                  <Tag
                    key={`${variant}-${color}`}
                    text={color.charAt(0).toUpperCase() + color.slice(1)}
                    variant={variant}
                    color={color}
                    leftSlot={<Hash size={12} />}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(TagSize).map((size) => (
            <div key={size} className="space-y-3">
              <h3 className="text-sm font-medium uppercase">{size}</h3>
              <div className="space-y-2">
                <Tag
                  text="Primary"
                  size={size}
                  color={TagColor.PRIMARY}
                  leftSlot={
                    <Hash
                      size={
                        size === TagSize.XS
                          ? 10
                          : size === TagSize.SM
                            ? 12
                            : size === TagSize.MD
                              ? 14
                              : 16
                      }
                    />
                  }
                />
                <Tag
                  text="Success"
                  size={size}
                  color={TagColor.SUCCESS}
                  leftSlot={
                    <Plus
                      size={
                        size === TagSize.XS
                          ? 10
                          : size === TagSize.SM
                            ? 12
                            : size === TagSize.MD
                              ? 14
                              : 16
                      }
                    />
                  }
                />
                <Tag
                  text="Error"
                  size={size}
                  color={TagColor.ERROR}
                  rightSlot={
                    <X
                      size={
                        size === TagSize.XS
                          ? 10
                          : size === TagSize.SM
                            ? 12
                            : size === TagSize.MD
                              ? 14
                              : 16
                      }
                    />
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shapes */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Shapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(TagShape).map((shape) => (
            <div key={shape} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">{shape}</h3>
              <div className="grid grid-cols-2 gap-3">
                <Tag
                  text="Primary"
                  shape={shape}
                  color={TagColor.PRIMARY}
                  leftSlot={<Hash size={12} />}
                />
                <Tag
                  text="Success"
                  shape={shape}
                  color={TagColor.SUCCESS}
                  leftSlot={<Plus size={12} />}
                />
                <Tag
                  text="Error"
                  shape={shape}
                  color={TagColor.ERROR}
                  rightSlot={<X size={12} />}
                />
                <Tag
                  text="Warning"
                  shape={shape}
                  color={TagColor.WARNING}
                  leftSlot={<Star size={12} />}
                />
                <Tag
                  text="Purple"
                  shape={shape}
                  color={TagColor.PURPLE}
                  leftSlot={<Hash size={12} />}
                />
                <Tag
                  text="Neutral"
                  shape={shape}
                  color={TagColor.NEUTRAL}
                  leftSlot={<Hash size={12} />}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Tag
            text="Clickable"
            color={TagColor.PRIMARY}
            onClick={() => {
              addSnackbar({
                header: "Primary tag clicked!",
              });
            }}
          />
          <Tag
            text="Removable"
            color={TagColor.SUCCESS}
            rightSlot={<X size={12} />}
            onClick={() => {
              addSnackbar({
                header: "Success tag clicked!",
              });
            }}
          />
          <Tag
            text="With Icon"
            color={TagColor.WARNING}
            leftSlot={<Star size={12} />}
            onClick={() => {
              addSnackbar({
                header: "Warning tag clicked!",
              });
            }}
          />
          <Tag
            text="Split Left"
            color={TagColor.ERROR}
            splitTagPosition="left"
            onClick={() => {
              addSnackbar({
                header: "Split left tag clicked!",
              });
            }}
          />
          <Tag
            text="Split Right"
            color={TagColor.PURPLE}
            splitTagPosition="right"
            onClick={() => {
              addSnackbar({
                header: "Split right tag clicked!",
              });
            }}
          />
        </div>
      </div>

      {/* All Combinations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">All Combinations</h2>
        <div className="space-y-8">
          {Object.values(TagVariant).map((variant) => (
            <div key={variant} className="space-y-4">
              <h3 className="text-lg font-semibold capitalize">
                {variant} Variant
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.values(TagColor).map((color) => (
                  <div key={color} className="space-y-2">
                    <h4 className="text-xs font-medium capitalize text-gray-600">
                      {color}
                    </h4>
                    <div className="space-y-1">
                      <Tag
                        text="S"
                        variant={variant}
                        color={color}
                        size={TagSize.SM}
                        leftSlot={<Hash size={12} />}
                      />
                      <Tag
                        text="M"
                        variant={variant}
                        color={color}
                        size={TagSize.MD}
                        leftSlot={<Hash size={14} />}
                      />
                      <Tag
                        text="L"
                        variant={variant}
                        color={color}
                        size={TagSize.LG}
                        leftSlot={<Hash size={16} />}
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

export default TagDemo;
