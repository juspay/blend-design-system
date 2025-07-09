import { ChartLegendPosition, ChartsProps, ChartType } from "./types";
import { ResponsiveContainer } from "recharts";
import { DEFAULT_COLORS } from "./utils";
import { ChartHeader } from "./ChartHeader";
import { ChartLegends } from "./ChartLegend";
import { useRef, useState } from "react";
import { renderChart } from "./renderChart";
import { transformNestedData } from "./ChartUtils";
import Block from "../../components/Primitives/Block/Block";
import { FOUNDATION_THEME } from "../../tokens";

const Charts: React.FC<ChartsProps> = ({
  chartType = ChartType.LINE,
  data,
  colors,
  xAxisLabel,
  yAxisLabel,
  slot1,
  slot2,
  slot3,
  legendPosition = ChartLegendPosition.TOP,
  chartHeaderSlot,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null!);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  if (!colors || colors.length === 0) colors = DEFAULT_COLORS;
  const flattenedData = transformNestedData(data, selectedKeys);

  const lineKeys = data.length > 0 ? Object.keys(data[0].data) : [];

  const handleLegendClick = (key: string) => {
    if (chartType === ChartType.PIE) return;
    setSelectedKeys((prevActiveKeys) => {
      if (prevActiveKeys.includes(key)) {
        return prevActiveKeys.filter((k) => k !== key);
      } else {
        return [...prevActiveKeys, key];
      }
    });
  };

  const handleLegendEnter = (key: string) => {
    if (selectedKeys.length === 0 || selectedKeys.length === lineKeys.length) {
      setHoveredKey(key);
    }
  };

  const handleLegendLeave = () => {
    setHoveredKey(null);
  };

  const showHorizontallyStackedLegends = () => {
    return !(
      chartType === ChartType.PIE &&
      legendPosition === ChartLegendPosition.RIGHT
    );
  };

  return (
    <Block
      ref={chartContainerRef}
      width="100%"
      height="100%"
      border={`1px solid ${FOUNDATION_THEME.colors.gray[300]}`}
      borderRadius={FOUNDATION_THEME.border.radius[8]}
      backgroundColor={FOUNDATION_THEME.colors.gray[0]}
    >
      <ChartHeader
        slot1={slot1}
        slot2={slot2}
        slot3={slot3}
        chartHeaderSlot={chartHeaderSlot}
      />
      {showHorizontallyStackedLegends() ? (
        <Block
          padding={FOUNDATION_THEME.unit[20]}
          paddingLeft={FOUNDATION_THEME.unit[16]}
          paddingRight={FOUNDATION_THEME.unit[16]}
          display="flex"
          flexDirection="column"
          gap={FOUNDATION_THEME.unit[24]}
        >
          <ChartLegends
            chartContainerRef={chartContainerRef}
            keys={lineKeys}
            colors={colors}
            handleLegendClick={handleLegendClick}
            handleLegendEnter={handleLegendEnter}
            handleLegendLeave={handleLegendLeave}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            hoveredKey={hoveredKey}
            activeKeys={selectedKeys}
            stacked={false}
          />
          <Block>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart({
                flattenedData,
                chartType,
                hoveredKey,
                lineKeys,
                colors,
                setHoveredKey,
                xAxisLabel,
                yAxisLabel,
                data,
                selectedKeys,
              })}
            </ResponsiveContainer>
          </Block>
        </Block>
      ) : (
        <Block
          padding={FOUNDATION_THEME.unit[20]}
          paddingLeft={FOUNDATION_THEME.unit[16]}
          paddingRight={FOUNDATION_THEME.unit[16]}
          display="flex"
          gap={FOUNDATION_THEME.unit[24]}
        >
          <Block style={{ flex: 1, width: "100%" }}>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart({
                flattenedData,
                chartType,
                hoveredKey,
                lineKeys,
                colors,
                setHoveredKey,
                xAxisLabel,
                yAxisLabel,
                data,
                selectedKeys,
              })}
            </ResponsiveContainer>
          </Block>
          <Block
            width="25%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ChartLegends
              chartContainerRef={chartContainerRef}
              keys={lineKeys}
              colors={colors}
              handleLegendClick={handleLegendClick}
              handleLegendEnter={handleLegendEnter}
              handleLegendLeave={handleLegendLeave}
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              hoveredKey={hoveredKey}
              activeKeys={selectedKeys}
              stacked={true}
            />
          </Block>
        </Block>
      )}
    </Block>
  );
};

Charts.displayName = "Charts";

export default Charts;
