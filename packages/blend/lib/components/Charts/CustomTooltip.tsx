import { ChartType, CustomTooltipProps, NewNestedDataPoint } from "./types";
import { capitaliseCamelCase, formatNumber } from "./ChartUtils";
import Block from "../../components/Primitives/Block/Block";
import Text from "../../components/Text/Text";

import {
  Payload,
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { FOUNDATION_THEME } from "../../tokens";

interface AuxItem {
  label: string;
  val: string | number;
}

export const CustomTooltip = ({
  active,
  payload,
  label,
  hoveredKey,
  originalData,
  setHoveredKey,
  chartType,
  selectedKeys,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const getColor = (key: string) => {
    const payloadItem = payload.find((item) => item.dataKey === key);
    return payloadItem ? payloadItem.color : "#AD46FF";
  };

  return (
    <Block
      backgroundColor={FOUNDATION_THEME.colors.gray[0]}
      boxShadow={FOUNDATION_THEME.shadows.lg}
      display="flex"
      flexDirection="column"
      gap={12}
      borderRadius={FOUNDATION_THEME.border.radius[8]}
      padding={12}
      paddingLeft={10}
      border={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
      minWidth={220}
      maxWidth={200}
      // className="debug"
    >
      {chartType === ChartType.LINE && (
        <LineChartTooltip
          active={active}
          payload={payload}
          selectedKeys={selectedKeys}
          setHoveredKey={setHoveredKey}
          originalData={originalData}
          hoveredKey={hoveredKey}
          label={label}
          getColor={getColor}
        />
      )}
      {chartType === ChartType.BAR && (
        <BarChartTooltip
          originalData={originalData}
          label={label}
          getColor={getColor}
        />
      )}
      {chartType === ChartType.PIE && (
        <PieChartTooltip
          active={active}
          payload={payload}
          selectedKeys={selectedKeys}
          setHoveredKey={setHoveredKey}
          originalData={originalData}
          hoveredKey={hoveredKey}
        />
      )}
    </Block>
  );
};

const BarChartTooltip = ({
  originalData,
  label,
  getColor,
}: {
  originalData: NewNestedDataPoint[];
  label: string;
  getColor: (key: string) => string | undefined;
}) => {
  const relevantData = originalData.find((item) => item.name === label)?.data;
  return (
    <>
      <Block>
        <Block display="flex" flexDirection="column">
          <Text
            fontSize={14}
            fontWeight={600}
            color={FOUNDATION_THEME.colors.gray[900]}
          >
            {capitaliseCamelCase(label)}
          </Text>
        </Block>

        <Block display="flex" flexDirection="column" marginTop={12} gap={12}>
          {relevantData &&
            Object.keys(relevantData)
              .filter((key) => key !== "name")
              .map((key, index) => (
                <Block
                  display="flex"
                  flexDirection="column"
                  key={`bar-${index}`}
                  alignItems="flex-start"
                >
                  <Block display="flex" alignItems="center" gap={8}>
                    <Block
                      backgroundColor={getColor(key) || "#AD46FF"}
                      width={4}
                      height={16}
                      borderRadius={FOUNDATION_THEME.border.radius[8]}
                    />
                    <Text
                      fontSize={12}
                      fontWeight={500}
                      color={FOUNDATION_THEME.colors.gray[400]}
                    >
                      {capitaliseCamelCase(key)}
                    </Text>
                  </Block>
                  <Block paddingLeft={10} width="100%">
                    <Text
                      fontSize={12}
                      fontWeight={600}
                      color={FOUNDATION_THEME.colors.gray[900]}
                      truncate={true}
                    >
                      {relevantData[key].primary.val}
                    </Text>
                  </Block>
                </Block>
              ))}
        </Block>
      </Block>
    </>
  );
};

const LineChartTooltip = ({
  originalData,
  hoveredKey,
  label,
  getColor,
  active,
  payload,
  selectedKeys,
  setHoveredKey,
}: {
  originalData: NewNestedDataPoint[];
  hoveredKey: string | null;
  label: string;
  getColor: (key: string) => string | undefined;
  active: boolean;
  payload: Payload<ValueType, NameType>[];
  selectedKeys: string[];
  setHoveredKey: (key: string) => void;
}) => {
  if (active && hoveredKey == null) {
    if (selectedKeys.length > 0) {
      setHoveredKey(selectedKeys[0]);
    } else {
      setHoveredKey(Object.keys(originalData[0].data)[0]);
    }
  }

  if (!active || !payload || !payload.length || !hoveredKey || !label) {
    return null;
  }

  const getRelevantData = () => {
    const currentDataPoint = originalData.find((item) => item.name === label);

    if (
      !currentDataPoint ||
      !currentDataPoint.data ||
      !currentDataPoint.data[hoveredKey]
    ) {
      return null;
    }

    return currentDataPoint.data[hoveredKey];
  };
  const relevantData = getRelevantData();
  if (!relevantData) {
    return null;
  }
  return (
    <>
      <Block position="relative" paddingLeft={8}>
        <Block
          backgroundColor={getColor(hoveredKey) || "#AD46FF"}
          position="absolute"
          top={FOUNDATION_THEME.unit[2]}
          left={0}
          width={FOUNDATION_THEME.unit[4]}
          height={FOUNDATION_THEME.unit[16]}
          borderRadius={FOUNDATION_THEME.border.radius[8]}
          transition="all 75ms"
        />
        <Block display="flex" flexDirection="column">
          <Text
            fontSize={14}
            fontWeight={FOUNDATION_THEME.font.weight[600]}
            color={FOUNDATION_THEME.colors.gray[900]}
          >
            {capitaliseCamelCase(hoveredKey)}
          </Text>
          <Text
            fontSize={12}
            fontWeight={FOUNDATION_THEME.font.weight[500]}
            color={FOUNDATION_THEME.colors.gray[400]}
          >
            {capitaliseCamelCase(label)}
          </Text>
        </Block>
      </Block>

      <Block display="flex" flexDirection="column" paddingLeft={8}>
        <Text
          fontSize={12}
          fontWeight={FOUNDATION_THEME.font.weight[500]}
          color={FOUNDATION_THEME.colors.gray[400]}
        >
          {relevantData.primary.label}
        </Text>
        <Text
          fontSize={12}
          fontWeight={FOUNDATION_THEME.font.weight[600]}
          color={FOUNDATION_THEME.colors.gray[900]}
          truncate={true}
        >
          {relevantData.primary.val}
        </Text>
      </Block>

      {relevantData.aux && relevantData.aux.length > 0 && (
        <Block
          gap={FOUNDATION_THEME.unit[4]}
          paddingTop={FOUNDATION_THEME.unit[12]}
          paddingLeft={FOUNDATION_THEME.unit[8]}
          borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
          display="flex"
          flexDirection="column"
        >
          {relevantData.aux.map((auxItem: AuxItem, index: number) => (
            <Block
              key={`aux-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={FOUNDATION_THEME.unit[8]}
            >
              <Text
                fontSize={12}
                color={FOUNDATION_THEME.colors.gray[500]}
                truncate={true}
              >
                {auxItem.label}
              </Text>
              <Text
                fontSize={12}
                fontWeight={FOUNDATION_THEME.font.weight[600]}
                color={FOUNDATION_THEME.colors.gray[700]}
              >
                {typeof auxItem.val === "number"
                  ? formatNumber(auxItem.val)
                  : auxItem.val}
              </Text>
            </Block>
          ))}
        </Block>
      )}
    </>
  );
};

const PieChartTooltip = ({
  originalData,
  hoveredKey,
  active,
  payload,
  selectedKeys,
  setHoveredKey,
}: {
  originalData: NewNestedDataPoint[];
  hoveredKey: string | null;
  active: boolean;
  payload: Payload<ValueType, NameType>[];
  selectedKeys: string[];
  setHoveredKey: (key: string) => void;
}) => {
  if (active && hoveredKey == null) {
    if (selectedKeys.length > 0) {
      setHoveredKey(selectedKeys[0]);
    } else {
      setHoveredKey(Object.keys(originalData[0].data)[0]);
    }
  }

  if (!active || !payload || !payload.length || !hoveredKey) {
    return null;
  }

  let name = payload[0].name as string;
  if (!name) name = Object.keys(originalData[0].data)[0];

  const data = originalData[0].data[name];

  return (
    <>
      <Block position="relative" paddingLeft={8}>
        <Block
          backgroundColor={payload[0].payload.fill}
          position="absolute"
          top={FOUNDATION_THEME.unit[2]}
          left={0}
          width={FOUNDATION_THEME.unit[4]}
          height={FOUNDATION_THEME.unit[16]}
          borderRadius={FOUNDATION_THEME.border.radius[8]}
          transition="all 75ms"
        />
        <Block display="flex" flexDirection="column">
          <Text
            fontSize={14}
            fontWeight={FOUNDATION_THEME.font.weight[600]}
            color={FOUNDATION_THEME.colors.gray[900]}
          >
            {capitaliseCamelCase(name)}
          </Text>
          <Text
            fontSize={12}
            fontWeight={FOUNDATION_THEME.font.weight[500]}
            color={FOUNDATION_THEME.colors.gray[400]}
          >
            {capitaliseCamelCase(originalData[0].name)}
          </Text>
        </Block>
      </Block>

      <Block display="flex" flexDirection="column" paddingLeft={8}>
        <Text
          fontSize={12}
          fontWeight={FOUNDATION_THEME.font.weight[500]}
          color={FOUNDATION_THEME.colors.gray[400]}
        >
          {capitaliseCamelCase(data.primary.label)}
        </Text>
        <Text
          fontSize={12}
          fontWeight={FOUNDATION_THEME.font.weight[600]}
          color={FOUNDATION_THEME.colors.gray[900]}
          truncate={true}
        >
          {data.primary.val}
        </Text>
      </Block>

      {data.aux && data.aux.length > 0 && (
        <Block
          gap={FOUNDATION_THEME.unit[4]}
          paddingTop={FOUNDATION_THEME.unit[12]}
          paddingLeft={FOUNDATION_THEME.unit[8]}
          borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
          display="flex"
          flexDirection="column"
        >
          {data.aux.map((auxItem: AuxItem, index: number) => (
            <Block
              key={`aux-${index}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={FOUNDATION_THEME.unit[8]}
            >
              <Text
                fontSize={12}
                color={FOUNDATION_THEME.colors.gray[500]}
                truncate={true}
              >
                {auxItem.label}
              </Text>
              <Text
                fontSize={12}
                fontWeight={FOUNDATION_THEME.font.weight[600]}
                color={FOUNDATION_THEME.colors.gray[700]}
              >
                {typeof auxItem.val === "number"
                  ? formatNumber(auxItem.val)
                  : auxItem.val}
              </Text>
            </Block>
          ))}
        </Block>
      )}
    </>
  );
};
