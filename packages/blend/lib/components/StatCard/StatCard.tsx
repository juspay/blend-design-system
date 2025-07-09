import { useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  type TooltipProps,
  Area,
  AreaChart,
} from "recharts";
import { ArrowDown, ArrowUp, CircleHelp } from "lucide-react";
import { Tooltip } from "../Tooltip";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import { ChangeType, StatCardVariant, type StatCardProps } from "./types";
import { useComponentToken } from "../../context/useComponentToken";
import { StatCardTokenType } from "./statcard.tokens";

const StatCard = ({
  title,
  value,
  change,
  subtitle,
  variant,
  chartData,
  progressValue,
  titleIcon,
  actionIcon,
  helpIconText,
}: StatCardProps) => {
  const statCardToken = useComponentToken("STAT_CARD") as StatCardTokenType;

  const gradientId = useMemo(() => 
    `colorGradient-${Math.random().toString(36).slice(2, 11)}`, 
    []
  );

  const normalizedVariant =
    variant === StatCardVariant.PROGRESS_BAR ? "progress" : variant;

  const effectiveVariant =
    (variant === StatCardVariant.LINE || variant === StatCardVariant.BAR) &&
    (!chartData || chartData.length === 0)
      ? StatCardVariant.NUMBER
      : variant;

  const formattedChange = change ? (
    <Block display="flex" alignItems="center">
      {change.type === ChangeType.INCREASE ? (
        <ArrowUp 
          size={parseInt(statCardToken.stats.change.arrow.width?.toString() || "14")} 
          style={{ marginRight: statCardToken.stats.change.arrow.marginRight }} 
        />
      ) : (
        <ArrowDown
          size={parseInt(statCardToken.stats.change.arrow.width?.toString() || "14")}
          style={{ marginRight: statCardToken.stats.change.arrow.marginRight }}
        />
      )}
      <Text as="span">
        {change.value >= 0 ? '+' : ''}{change.value.toFixed(2)}%
      </Text>
    </Block>
  ) : null;

  const isTrendingDown = useMemo(() => {
    if (!chartData || chartData.length < 2) return false;
    return chartData[0].value > chartData[chartData.length - 1].value;
  }, [chartData]);

  const lineColor = isTrendingDown
    ? statCardToken.chart.colors.line.decrease
    : statCardToken.chart.colors.line.increase;
  
  const baseAreaColor = isTrendingDown
    ? statCardToken.chart.colors.area.decrease
    : statCardToken.chart.colors.area.increase;
  
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const areaColor = typeof baseAreaColor === 'string' 
    ? hexToRgba(baseAreaColor, statCardToken.chart.colors.gradient.startOpacity)
    : baseAreaColor;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const currentValue = payload[0].value as number;
    const currentIndex = payload[0].payload?.index as number;
    const previousIndex = Math.max(0, currentIndex - 1);
    const previousValue = chartData?.[previousIndex]?.value || currentValue;

    const diff = currentValue - previousValue;
    const percentage = previousValue ? (diff / previousValue) * 100 : 0;
    const isUp = diff >= 0;

    return (
      <Block
        backgroundColor={statCardToken.chart.tooltip.container.backgroundColor}
        padding={statCardToken.chart.tooltip.container.padding}
        borderRadius={statCardToken.chart.tooltip.container.borderRadius}
      >
        <Text as="span" color={statCardToken.chart.tooltip.text.color} variant="body.sm">
          {`${percentage >= 0 ? '+' : ''}${percentage.toFixed(0)}% ${isUp ? "Up" : "Down"}`}
        </Text>
      </Block>
    );
  };

  const indexedChartData = useMemo(() => {
    return chartData?.map((point, index) => ({
      ...point,
      index,
    }));
  }, [chartData]);

  return (
    <Block
      height={statCardToken.height}
      border={statCardToken.border.default}
      borderRadius={statCardToken.borderRadius}
      overflow="hidden"
      backgroundColor={statCardToken.backgroundColor.default}
      boxShadow={statCardToken.boxShadow}
      padding={statCardToken.padding}
      display="flex"
      flexDirection="column"
      gap={statCardToken.gap}
      data-statcard-variant={normalizedVariant}
    >
      {effectiveVariant !== StatCardVariant.NUMBER && (
        <Block display="flex" gap={statCardToken.header.gap}>
          {titleIcon && (
            <Block
              width={statCardToken.header.titleIcon.width}
              height={statCardToken.header.titleIcon.height}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              {titleIcon}
            </Block>
          )}
          
          <Block
            display="flex"
            flexDirection="column"
            width="100%"
            gap={statCardToken.headerStatGap.gap}
          >
            <Block
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Block
                display="flex"
                alignItems="center"
                gap={statCardToken.header.gap}
              >
                <Text
                  as="span"
                  variant="body.md"
                  fontWeight={statCardToken.header.title[effectiveVariant].fontWeight}
                  color={statCardToken.header.title[effectiveVariant].color}
                >
                  {title}
                </Text>
                {helpIconText && (
                  <Block flexShrink={0} display="flex" alignItems="center" justifyContent="center">
                    <Tooltip content={helpIconText}>
                      <CircleHelp
                        width={parseInt(statCardToken.header.helpIcon.width?.toString() || "16")}
                        height={parseInt(statCardToken.header.helpIcon.height?.toString() || "16")}
                        color={statCardToken.header.helpIcon.color}
                      />
                    </Tooltip>
                  </Block>
                )}
              </Block>
              {actionIcon && (
                <Block
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  {actionIcon}
                </Block>
              )}
            </Block>

            <Block
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Block
                width="100%"
                display="flex"
                alignItems="center"
                gap={statCardToken.stats.gap}
              >
                <Text
                  as="span"
                  variant="heading.xl"
                  fontWeight={statCardToken.stats.value[effectiveVariant].fontWeight}
                  color={statCardToken.stats.value[effectiveVariant].color}
                >
                  {value}
                </Text>
                {formattedChange && (
                  <Block marginLeft={statCardToken.stats.change.marginLeft}>
                    <Text
                      as="span"
                      color={
                        change?.type === ChangeType.INCREASE
                          ? statCardToken.stats.change.text.increase.color
                          : statCardToken.stats.change.text.decrease.color
                      }
                      variant="body.sm"
                      fontWeight={statCardToken.stats.change.text.fontWeight}
                    >
                      {formattedChange}
                    </Text>
                  </Block>
                )}
              </Block>
              <Text
                as="span"
                variant="body.sm"
                color={statCardToken.stats.subtitle[effectiveVariant].color}
                fontWeight={statCardToken.stats.subtitle[effectiveVariant].fontWeight}
              >
                {subtitle}
              </Text>
            </Block>
          </Block>
        </Block>
      )}

      {effectiveVariant === StatCardVariant.NUMBER && (
        <Block
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={statCardToken.header.titleIcon.marginBottom}
          >
            {titleIcon && (
              <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                {titleIcon}
              </Block>
            )}
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              flexGrow={1}
              gap={statCardToken.header.gap}
            >
              <Text
                as="span"
                variant="body.md"
                fontWeight={statCardToken.header.title[effectiveVariant].fontWeight}
                color={statCardToken.header.title[effectiveVariant].color}
              >
                {title}
              </Text>
              {helpIconText && (
                <Block display="flex" alignItems="center" justifyContent="center">
                  <Tooltip content={helpIconText}>
                    <CircleHelp
                      width={parseInt(statCardToken.header.helpIcon.width?.toString() || "16")}
                      height={parseInt(statCardToken.header.helpIcon.height?.toString() || "16")}
                      color={statCardToken.header.helpIcon.color}
                    />
                  </Tooltip>
                </Block>
              )}
            </Block>
          </Block>

          <Block display="flex" flexDirection="column" alignItems="center">
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              gap={statCardToken.stats.gap}
            >
              <Text
                as="span"
                variant="heading.xl"
                fontWeight={statCardToken.stats.value[effectiveVariant].fontWeight}
                color={statCardToken.stats.value[effectiveVariant].color}
              >
                {value}
              </Text>
              {formattedChange && (
                <Block marginLeft={statCardToken.stats.change.marginLeft}>
                  <Text
                    as="span"
                    color={
                      change?.type === ChangeType.INCREASE
                        ? statCardToken.stats.change.text.increase.color
                        : statCardToken.stats.change.text.decrease.color
                    }
                    variant="body.sm"
                    fontWeight={statCardToken.stats.change.text.fontWeight}
                  >
                    {formattedChange}
                  </Text>
                </Block>
              )}
            </Block>
            <Text
              as="span"
              variant="body.sm"
              color={statCardToken.stats.subtitle[effectiveVariant].color}
              fontWeight={statCardToken.stats.subtitle[effectiveVariant].fontWeight}
            >
              {subtitle}
            </Text>
          </Block>
        </Block>
      )}

      {effectiveVariant !== StatCardVariant.NUMBER && (
        <Block height={statCardToken.chart.height}>
          {effectiveVariant === StatCardVariant.LINE && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={indexedChartData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{
                    strokeDasharray: statCardToken.chart.tooltip.cursor.strokeDasharray,
                    stroke: statCardToken.chart.tooltip.cursor.stroke,
                  }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                  animationDuration={350}
                />
                <defs>
                  <linearGradient
                    id={gradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={areaColor} stopOpacity={statCardToken.chart.colors.gradient.startOpacity} />
                    <stop
                      offset="100%"
                      stopColor={statCardToken.chart.colors.gradient.end}
                      stopOpacity={statCardToken.chart.colors.gradient.endOpacity}
                    />
                  </linearGradient>
                </defs>

                <Area
                  animationDuration={350}
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={statCardToken.chart.line.strokeWidth}
                  fill={`url(#${gradientId})`}
                  activeDot={{
                    r: statCardToken.chart.line.activeDot.radius,
                    fill: statCardToken.chart.line.activeDot.fill,
                    stroke: lineColor,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.BAR && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={indexedChartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: statCardToken.chart.tooltip.bar.cursor.fill }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="value"
                  fill={statCardToken.chart.bar.fill}
                  radius={statCardToken.chart.bar.radius as [number, number, number, number]}
                  isAnimationActive={false}
                  activeBar={{
                    fill: statCardToken.chart.bar.activeBar.fill,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.PROGRESS_BAR &&
            progressValue && (
              <Block
                width="100%"
            height={statCardToken.chart.progressBar.height}
            display="flex"
            alignItems="center"
            gap={statCardToken.chart.progressBar.gap}
              >
                <Block
                  width="100%"
                  height="100%"
                  display="flex"
                  flexGrow={1}
                  borderRadius={statCardToken.chart.progressBar.borderRadius}
                  overflow="hidden"
                  >
                    <Block
                      backgroundColor={statCardToken.chart.progressBar.background.fill}
                      height="100%"
                      width={`${progressValue}%`}
                    />
                    <Block
                      backgroundColor={statCardToken.chart.progressBar.background.empty}
                      height="100%"
                      backgroundImage={`repeating-linear-gradient(
                        to right,
                        ${statCardToken.chart.progressBar.background.pattern.color},
                        ${statCardToken.chart.progressBar.background.pattern.color} 5px,
                        transparent 1px,
                        transparent
                      )`}
                      backgroundSize={statCardToken.chart.progressBar.background.pattern.size}
                      style={{ width: `${100 - progressValue}%` }}
                    />
                  </Block>
                  <Text
                    as="span"
                    variant="body.md"
                    fontWeight={statCardToken.chart.progressBar.label.fontWeight}
                    color={statCardToken.chart.progressBar.label.color}
                >
                  {progressValue}%
                </Text>
              </Block>
            )}
        </Block>
      )}
    </Block>
  );
};

StatCard.displayName = "StatCard";

export default StatCard;
