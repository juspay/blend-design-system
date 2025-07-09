  import { useState } from "react";
import {
  StatCard,
  StatCardVariant,
  ChangeType,
  SingleSelect,
  Switch,
  TextInput,
} from "blend-v1";
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Settings,
  Download,
  Upload,
  Activity,
  Target,
  Star,
} from "lucide-react";

const StatCardDemo = () => {
  // Playground state
  const [playgroundVariant, setPlaygroundVariant] = useState<StatCardVariant>(
    StatCardVariant.NUMBER
  );
  const [playgroundTitle, setPlaygroundTitle] = useState("Total Revenue");
  const [playgroundValue, setPlaygroundValue] = useState("$12,345");
  const [playgroundSubtitle, setPlaygroundSubtitle] = useState("vs last month");
  const [showChange, setShowChange] = useState(true);
  const [changeType, setChangeType] = useState<ChangeType>(ChangeType.INCREASE);
  const [changeValue, setChangeValue] = useState(12.5);
  const [showTitleIcon, setShowTitleIcon] = useState(true);
  const [showActionIcon, setShowActionIcon] = useState(false);
  const [showHelpIcon, setShowHelpIcon] = useState(false);
  const [progressValue, setProgressValue] = useState(75);

  // Sample chart data
  const sampleLineData = [
    { value: 100, label: "Jan", date: "2024-01" },
    { value: 120, label: "Feb", date: "2024-02" },
    { value: 110, label: "Mar", date: "2024-03" },
    { value: 140, label: "Apr", date: "2024-04" },
    { value: 130, label: "May", date: "2024-05" },
    { value: 160, label: "Jun", date: "2024-06" },
    { value: 150, label: "Jul", date: "2024-07" },
  ];

  const sampleBarData = [
    { value: 80, label: "Mon", date: "2024-01-01" },
    { value: 95, label: "Tue", date: "2024-01-02" },
    { value: 70, label: "Wed", date: "2024-01-03" },
    { value: 110, label: "Thu", date: "2024-01-04" },
    { value: 85, label: "Fri", date: "2024-01-05" },
    { value: 120, label: "Sat", date: "2024-01-06" },
    { value: 90, label: "Sun", date: "2024-01-07" },
  ];

  // Options for selects
  const variantOptions = [
    { value: StatCardVariant.NUMBER, label: "Number" },
    { value: StatCardVariant.LINE, label: "Line Chart" },
    { value: StatCardVariant.BAR, label: "Bar Chart" },
    { value: StatCardVariant.PROGRESS_BAR, label: "Progress Bar" },
  ];

  const changeTypeOptions = [
    { value: ChangeType.INCREASE, label: "Increase" },
    { value: ChangeType.DECREASE, label: "Decrease" },
  ];

  const getIconForVariant = (variant: StatCardVariant) => {
    switch (variant) {
      case StatCardVariant.LINE:
        return <TrendingUp size={16} />;
      case StatCardVariant.BAR:
        return <BarChart3 size={16} />;
      case StatCardVariant.PROGRESS_BAR:
        return <Target size={16} />;
      default:
        return <DollarSign size={16} />;
    }
  };

  const getActionIcon = () => {
    return <Settings size={16} />;
  };

  return (
    <div className="p-8 space-y-12">
      {/* Playground Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Playground</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SingleSelect
              label="Variant"
              items={[{ items: variantOptions }]}
              selected={playgroundVariant}
              onSelect={(value) => setPlaygroundVariant(value as StatCardVariant)}
              placeholder="Select variant"
            />

            <TextInput
              label="Title"
              value={playgroundTitle}
              onChange={(e) => setPlaygroundTitle(e.target.value)}
              placeholder="Enter title"
            />

            <TextInput
              label="Value"
              value={playgroundValue}
              onChange={(e) => setPlaygroundValue(e.target.value)}
              placeholder="Enter value"
            />

            <TextInput
              label="Subtitle"
              value={playgroundSubtitle}
              onChange={(e) => setPlaygroundSubtitle(e.target.value)}
              placeholder="Enter subtitle"
            />

            <SingleSelect
              label="Change Type"
              items={[{ items: changeTypeOptions }]}
              selected={changeType}
              onSelect={(value) => setChangeType(value as ChangeType)}
              placeholder="Select change type"
            />

            <TextInput
              label="Change Value"
              value={changeValue.toString()}
              onChange={(e) => setChangeValue(parseFloat(e.target.value) || 0)}
              placeholder="Enter change value"
              type="number"
            />

            {playgroundVariant === StatCardVariant.PROGRESS_BAR && (
              <TextInput
                label="Progress Value"
                value={progressValue.toString()}
                onChange={(e) => setProgressValue(parseInt(e.target.value) || 0)}
                placeholder="Enter progress value"
                type="number"
              />
            )}
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <Switch
              label="Show Change"
              checked={showChange}
              onChange={() => setShowChange(!showChange)}
            />
            <Switch
              label="Show Title Icon"
              checked={showTitleIcon}
              onChange={() => setShowTitleIcon(!showTitleIcon)}
            />
            <Switch
              label="Show Action Icon"
              checked={showActionIcon}
              onChange={() => setShowActionIcon(!showActionIcon)}
            />
            <Switch
              label="Show Help Icon"
              checked={showHelpIcon}
              onChange={() => setShowHelpIcon(!showHelpIcon)}
            />
          </div>

          <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-4">
            <div className="w-full max-w-md">
              <StatCard
                title={playgroundTitle}
                value={playgroundValue}
                subtitle={playgroundSubtitle}
                variant={playgroundVariant}
                change={
                  showChange
                    ? {
                        value: changeValue,
                        type: changeType,
                      }
                    : undefined
                }
                titleIcon={showTitleIcon ? getIconForVariant(playgroundVariant) : undefined}
                actionIcon={showActionIcon ? getActionIcon() : undefined}
                helpIconText={
                  showHelpIcon
                    ? "This metric shows the total revenue generated over the selected period."
                    : undefined
                }
                chartData={
                  playgroundVariant === StatCardVariant.LINE
                    ? sampleLineData
                    : playgroundVariant === StatCardVariant.BAR
                    ? sampleBarData
                    : undefined
                }
                progressValue={
                  playgroundVariant === StatCardVariant.PROGRESS_BAR
                    ? progressValue
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* StatCard Variants */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">StatCard Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Number Variant</h3>
            <StatCard
              title="Total Revenue"
              value="$12,345"
              subtitle="vs last month"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 12.5,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<DollarSign size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Line Chart</h3>
            <StatCard
              title="Revenue Trend"
              value="$8,234"
              subtitle="last 7 days"
              variant={StatCardVariant.LINE}
              change={{
                value: 8.2,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<TrendingUp size={16} />}
              chartData={sampleLineData}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bar Chart</h3>
            <StatCard
              title="Daily Sales"
              value="$1,234"
              subtitle="today's sales"
              variant={StatCardVariant.BAR}
              change={{
                value: -2.1,
                type: ChangeType.DECREASE,
              }}
              titleIcon={<BarChart3 size={16} />}
              chartData={sampleBarData}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Progress Bar</h3>
            <StatCard
              title="Goal Progress"
              value="75%"
              subtitle="target: 100%"
              variant={StatCardVariant.PROGRESS_BAR}
              titleIcon={<Target size={16} />}
              progressValue={75}
            />
          </div>
        </div>
      </div>

      {/* Change Indicators */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Change Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Positive Change</h3>
            <StatCard
              title="Active Users"
              value="2,847"
              subtitle="vs last week"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 15.3,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<Users size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Negative Change</h3>
            <StatCard
              title="Bounce Rate"
              value="23.4%"
              subtitle="vs last week"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 5.2,
                type: ChangeType.DECREASE,
              }}
              titleIcon={<TrendingDown size={16} />}
            />
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">With Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Title Icon Only</h3>
            <StatCard
              title="Downloads"
              value="1,234"
              subtitle="this month"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 8.7,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<Download size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Action Icon</h3>
            <StatCard
              title="Uploads"
              value="567"
              subtitle="this month"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 12.1,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<Upload size={16} />}
              actionIcon={<Settings size={16} />}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Help Icon</h3>
            <StatCard
              title="Conversion Rate"
              value="3.2%"
              subtitle="vs last month"
              variant={StatCardVariant.NUMBER}
              change={{
                value: 0.5,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<Activity size={16} />}
              helpIconText="Conversion rate is the percentage of visitors who complete a desired action."
            />
          </div>
        </div>
      </div>

      {/* Chart Variants with Data */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Chart Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Line Chart - Trending Up</h3>
            <StatCard
              title="Revenue Growth"
              value="$45,678"
              subtitle="last 30 days"
              variant={StatCardVariant.LINE}
              change={{
                value: 23.4,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<TrendingUp size={16} />}
              chartData={sampleLineData}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bar Chart - Daily Metrics</h3>
            <StatCard
              title="Daily Orders"
              value="234"
              subtitle="today's orders"
              variant={StatCardVariant.BAR}
              change={{
                value: 12.8,
                type: ChangeType.INCREASE,
              }}
              titleIcon={<BarChart3 size={16} />}
              chartData={sampleBarData}
            />
          </div>
        </div>
      </div>

      {/* Progress Variants */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Progress Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Low Progress</h3>
            <StatCard
              title="Task Completion"
              value="25%"
              subtitle="4 of 16 tasks"
              variant={StatCardVariant.PROGRESS_BAR}
              titleIcon={<Target size={16} />}
              progressValue={25}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medium Progress</h3>
            <StatCard
              title="Project Milestone"
              value="60%"
              subtitle="3 of 5 phases"
              variant={StatCardVariant.PROGRESS_BAR}
              titleIcon={<Star size={16} />}
              progressValue={60}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">High Progress</h3>
            <StatCard
              title="Sales Target"
              value="90%"
              subtitle="$9,000 of $10,000"
              variant={StatCardVariant.PROGRESS_BAR}
              titleIcon={<DollarSign size={16} />}
              progressValue={90}
            />
          </div>
        </div>
      </div>

      {/* Interactive Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Interactive Examples</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value="$124,567"
                subtitle="this quarter"
                variant={StatCardVariant.NUMBER}
                change={{
                  value: 18.7,
                  type: ChangeType.INCREASE,
                }}
                titleIcon={<DollarSign size={16} />}
                actionIcon={<Settings size={16} />}
              />

              <StatCard
                title="Active Users"
                value="12,847"
                subtitle="current users"
                variant={StatCardVariant.LINE}
                change={{
                  value: 12.3,
                  type: ChangeType.INCREASE,
                }}
                titleIcon={<Users size={16} />}
                chartData={sampleLineData}
              />

              <StatCard
                title="Conversion Rate"
                value="3.8%"
                subtitle="vs last month"
                variant={StatCardVariant.NUMBER}
                change={{
                  value: 0.4,
                  type: ChangeType.INCREASE,
                }}
                titleIcon={<Activity size={16} />}
                helpIconText="Percentage of visitors who complete a purchase."
              />

              <StatCard
                title="Monthly Goal"
                value="85%"
                subtitle="$85,000 of $100,000"
                variant={StatCardVariant.PROGRESS_BAR}
                titleIcon={<Target size={16} />}
                progressValue={85}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCardDemo; 