import { useState } from "react";
import {
  Alert,
  AlertVariant,
  AlertStyle,
  AlertActionPlacement,
  SingleSelect,
  Switch,
  TextInput,
} from "blend-v1";
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";

const AlertDemo = () => {
  const [visibleAlerts, setVisibleAlerts] = useState<Set<string>>(new Set());

  // Playground state
  const [playgroundHeading, setPlaygroundHeading] = useState("Alert Heading");
  const [playgroundDescription, setPlaygroundDescription] = useState(
    "This is a sample alert description that demonstrates the alert component."
  );
  const [playgroundVariant, setPlaygroundVariant] = useState<AlertVariant>(
    AlertVariant.PRIMARY
  );
  const [playgroundStyle, setPlaygroundStyle] = useState<AlertStyle>(
    AlertStyle.SUBTLE
  );
  const [playgroundActionPlacement, setPlaygroundActionPlacement] = useState<AlertActionPlacement>(
    AlertActionPlacement.RIGHT
  );
  const [showIcon, setShowIcon] = useState(true);
  const [showPrimaryAction, setShowPrimaryAction] = useState(false);
  const [showSecondaryAction, setShowSecondaryAction] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const toggleAlert = (id: string) => {
    const newVisible = new Set(visibleAlerts);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleAlerts(newVisible);
  };

  const handleClose = (id: string) => {
    const newVisible = new Set(visibleAlerts);
    newVisible.delete(id);
    setVisibleAlerts(newVisible);
  };

  const handlePrimaryAction = () => {
    console.log("Primary action clicked");
  };

  const handleSecondaryAction = () => {
    console.log("Secondary action clicked");
  };

  // Options for selects
  const variantOptions = [
    { value: AlertVariant.PRIMARY, label: "Primary" },
    { value: AlertVariant.SUCCESS, label: "Success" },
    { value: AlertVariant.WARNING, label: "Warning" },
    { value: AlertVariant.ERROR, label: "Error" },
    { value: AlertVariant.PURPLE, label: "Purple" },
    { value: AlertVariant.ORANGE, label: "Orange" },
    { value: AlertVariant.NEUTRAL, label: "Neutral" },
  ];

  const styleOptions = [
    { value: AlertStyle.SUBTLE, label: "Subtle" },
    { value: AlertStyle.NO_FILL, label: "No Fill" },
  ];

  const actionPlacementOptions = [
    { value: AlertActionPlacement.RIGHT, label: "Right" },
    { value: AlertActionPlacement.BOTTOM, label: "Bottom" },
  ];

  const getIconForVariant = (variant: AlertVariant) => {
    switch (variant) {
      case AlertVariant.SUCCESS:
        return <CheckCircle size={16} />;
      case AlertVariant.WARNING:
        return <AlertTriangle size={16} />;
      case AlertVariant.ERROR:
        return <AlertCircle size={16} />;
      case AlertVariant.PURPLE:
        return <HelpCircle size={16} />;
      case AlertVariant.ORANGE:
        return <AlertTriangle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TextInput
              label="Heading"
              value={playgroundHeading}
              onChange={(e) => setPlaygroundHeading(e.target.value)}
              placeholder="Enter alert heading"
            />

            <TextInput
              label="Description"
              value={playgroundDescription}
              onChange={(e) => setPlaygroundDescription(e.target.value)}
              placeholder="Enter alert description"
            />

            <SingleSelect
              label="Variant"
              items={[{ items: variantOptions }]}
              selected={playgroundVariant}
              onSelect={(value) => setPlaygroundVariant(value as AlertVariant)}
              placeholder="Select variant"
            />

            <SingleSelect
              label="Style"
              items={[{ items: styleOptions }]}
              selected={playgroundStyle}
              onSelect={(value) => setPlaygroundStyle(value as AlertStyle)}
              placeholder="Select style"
            />

            <SingleSelect
              label="Action Placement"
              items={[{ items: actionPlacementOptions }]}
              selected={playgroundActionPlacement}
              onSelect={(value) => setPlaygroundActionPlacement(value as AlertActionPlacement)}
              placeholder="Select action placement"
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Switch
              label="Show Icon"
              checked={showIcon}
              onChange={() => setShowIcon(!showIcon)}
            />
            <Switch
              label="Primary Action"
              checked={showPrimaryAction}
              onChange={() => setShowPrimaryAction(!showPrimaryAction)}
            />
            <Switch
              label="Secondary Action"
              checked={showSecondaryAction}
              onChange={() => setShowSecondaryAction(!showSecondaryAction)}
            />
            <Switch
              label="Close Button"
              checked={showCloseButton}
              onChange={() => setShowCloseButton(!showCloseButton)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-4">
            <div className="w-full max-w-2xl">
              <Alert
                heading={playgroundHeading}
                description={playgroundDescription}
                variant={playgroundVariant}
                style={playgroundStyle}
                icon={showIcon ? getIconForVariant(playgroundVariant) : undefined}
                primaryAction={
                  showPrimaryAction
                    ? {
                        label: "Primary Action",
                        onClick: handlePrimaryAction,
                      }
                    : undefined
                }
                secondaryAction={
                  showSecondaryAction
                    ? {
                        label: "Secondary Action",
                        onClick: handleSecondaryAction,
                      }
                    : undefined
                }
                onClose={showCloseButton ? () => console.log("Alert closed") : undefined}
                actionPlacement={playgroundActionPlacement}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Basic Alerts - All Variants */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Basic Alerts - All Variants
        </h2>
        <div className="space-y-4">
          <Alert
            heading="Primary Alert"
            description="This is a primary alert with subtle styling. It's used for general information and important updates."
            variant={AlertVariant.PRIMARY}
            style={AlertStyle.SUBTLE}
            icon={<Info size={16} />}
          />

          <Alert
            heading="Success Alert"
            description="This is a success alert indicating a successful operation or positive outcome."
            variant={AlertVariant.SUCCESS}
            style={AlertStyle.SUBTLE}
            icon={<CheckCircle size={16} />}
          />

          <Alert
            heading="Warning Alert"
            description="This is a warning alert for situations that require attention but aren't critical."
            variant={AlertVariant.WARNING}
            style={AlertStyle.SUBTLE}
            icon={<AlertTriangle size={16} />}
          />

          <Alert
            heading="Error Alert"
            description="This is an error alert for critical issues that need immediate attention."
            variant={AlertVariant.ERROR}
            style={AlertStyle.SUBTLE}
            icon={<AlertCircle size={16} />}
          />

          <Alert
            heading="Purple Alert"
            description="This is a purple alert for special notifications or premium features."
            variant={AlertVariant.PURPLE}
            style={AlertStyle.SUBTLE}
            icon={<HelpCircle size={16} />}
          />

          <Alert
            heading="Orange Alert"
            description="This is an orange alert for attention-grabbing notifications."
            variant={AlertVariant.ORANGE}
            style={AlertStyle.SUBTLE}
            icon={<AlertTriangle size={16} />}
          />

          <Alert
            heading="Neutral Alert"
            description="This is a neutral alert for general information without specific emphasis."
            variant={AlertVariant.NEUTRAL}
            style={AlertStyle.SUBTLE}
            icon={<Info size={16} />}
          />
        </div>
      </div>

      {/* No Fill Style */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          No Fill Style
        </h2>
        <div className="space-y-4">
          <Alert
            heading="Primary No Fill"
            description="This alert uses the no-fill style for a cleaner, border-only appearance."
            variant={AlertVariant.PRIMARY}
            style={AlertStyle.NO_FILL}
            icon={<Info size={16} />}
          />

          <Alert
            heading="Success No Fill"
            description="No fill style with success variant for a subtle success message."
            variant={AlertVariant.SUCCESS}
            style={AlertStyle.NO_FILL}
            icon={<CheckCircle size={16} />}
          />

          <Alert
            heading="Error No Fill"
            description="No fill style with error variant for critical information."
            variant={AlertVariant.ERROR}
            style={AlertStyle.NO_FILL}
            icon={<AlertCircle size={16} />}
          />
        </div>
      </div>

      {/* Alerts with Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Alerts with Actions
        </h2>
        <div className="space-y-4">
          <Alert
            heading="Action Required"
            description="This alert has primary and secondary actions positioned on the right."
            variant={AlertVariant.PRIMARY}
            style={AlertStyle.SUBTLE}
            icon={<Info size={16} />}
            primaryAction={{
              label: "Accept",
              onClick: handlePrimaryAction,
            }}
            secondaryAction={{
              label: "Decline",
              onClick: handleSecondaryAction,
            }}
            actionPlacement={AlertActionPlacement.RIGHT}
          />

          <Alert
            heading="Bottom Actions"
            description="This alert has actions positioned at the bottom for better mobile experience."
            variant={AlertVariant.SUCCESS}
            style={AlertStyle.SUBTLE}
            icon={<CheckCircle size={16} />}
            primaryAction={{
              label: "View Details",
              onClick: handlePrimaryAction,
            }}
            secondaryAction={{
              label: "Dismiss",
              onClick: handleSecondaryAction,
            }}
            actionPlacement={AlertActionPlacement.BOTTOM}
          />

          <Alert
            heading="Single Action"
            description="This alert has only a primary action for simple interactions."
            variant={AlertVariant.WARNING}
            style={AlertStyle.SUBTLE}
            icon={<AlertTriangle size={16} />}
            primaryAction={{
              label: "Learn More",
              onClick: handlePrimaryAction,
            }}
          />
        </div>
      </div>

      {/* Dismissible Alerts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Dismissible Alerts
        </h2>
        <div className="space-y-4">
          {visibleAlerts.has("dismissible-1") && (
            <Alert
              heading="Dismissible Alert"
              description="This alert can be dismissed using the close button. Click the X to remove it."
              variant={AlertVariant.PRIMARY}
              style={AlertStyle.SUBTLE}
              icon={<Info size={16} />}
              onClose={() => handleClose("dismissible-1")}
            />
          )}

          {visibleAlerts.has("dismissible-2") && (
            <Alert
              heading="Dismissible with Actions"
              description="This alert has both actions and a close button. The close button appears on the right when actions are present."
              variant={AlertVariant.SUCCESS}
              style={AlertStyle.SUBTLE}
              icon={<CheckCircle size={16} />}
              primaryAction={{
                label: "Save",
                onClick: handlePrimaryAction,
              }}
              onClose={() => handleClose("dismissible-2")}
              actionPlacement={AlertActionPlacement.RIGHT}
            />
          )}

          {visibleAlerts.has("dismissible-3") && (
            <Alert
              heading="Bottom Close Button"
              description="This alert has the close button positioned at the bottom when no actions are provided."
              variant={AlertVariant.WARNING}
              style={AlertStyle.SUBTLE}
              icon={<AlertTriangle size={16} />}
              onClose={() => handleClose("dismissible-3")}
              actionPlacement={AlertActionPlacement.BOTTOM}
            />
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => toggleAlert("dismissible-1")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {visibleAlerts.has("dismissible-1") ? "Hide" : "Show"} Basic Dismissible
            </button>
            <button
              onClick={() => toggleAlert("dismissible-2")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {visibleAlerts.has("dismissible-2") ? "Hide" : "Show"} With Actions
            </button>
            <button
              onClick={() => toggleAlert("dismissible-3")}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              {visibleAlerts.has("dismissible-3") ? "Hide" : "Show"} Bottom Close
            </button>
          </div>
        </div>
      </div>

      {/* Alerts without Icons */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Alerts without Icons
        </h2>
        <div className="space-y-4">
          <Alert
            heading="No Icon Alert"
            description="This alert doesn't have an icon, demonstrating the clean layout without visual indicators."
            variant={AlertVariant.PRIMARY}
            style={AlertStyle.SUBTLE}
          />

          <Alert
            heading="Text Only Alert"
            description="A simple alert with just text content, no icon, no actions, and no close button."
            variant={AlertVariant.NEUTRAL}
            style={AlertStyle.NO_FILL}
          />
        </div>
      </div>

      {/* Interactive Examples */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Interactive Examples
        </h2>
        <div className="space-y-4">
          <Alert
            heading="Interactive Alert"
            description="This alert demonstrates all features: icon, actions, and close functionality. Try clicking the actions or close button to see console logs."
            variant={AlertVariant.PURPLE}
            style={AlertStyle.SUBTLE}
            icon={<HelpCircle size={16} />}
            primaryAction={{
              label: "Primary Action",
              onClick: () => {
                console.log("Primary action clicked from interactive example");
                alert("Primary action clicked!");
              },
            }}
            secondaryAction={{
              label: "Secondary Action",
              onClick: () => {
                console.log("Secondary action clicked from interactive example");
                alert("Secondary action clicked!");
              },
            }}
            onClose={() => {
              console.log("Alert closed from interactive example");
              alert("Alert closed!");
            }}
            actionPlacement={AlertActionPlacement.RIGHT}
          />
        </div>
      </div>
    </div>
  );
};

export default AlertDemo; 