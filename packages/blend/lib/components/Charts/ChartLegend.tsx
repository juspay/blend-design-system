import { RotateCcw } from "lucide-react";
import { capitaliseCamelCase } from "./ChartUtils";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import React, { useState, useRef, useCallback } from "react";
import { DropdownMenu } from "radix-ui";
import { useDebounce } from "../../hooks/useDebounce";
import { ChartLegendsProps } from "./types";
import Block from "../../components/Primitives/Block/Block";
import Text from "../../components/Text/Text";
import { FOUNDATION_THEME } from "../../tokens";

const ChartLegendsComponent: React.FC<ChartLegendsProps> = ({
  keys,
  handleLegendClick,
  handleLegendEnter,
  handleLegendLeave,
  colors,
  chartContainerRef,
  selectedKeys,
  setSelectedKeys,
  hoveredKey,
  stacked = false,
}) => {
  const lastWidth = useRef<number>(0);
  const legendItemsContainerRef = useRef<HTMLDivElement>(null!);
  const [cuttOffIndex, setCuttOffIndex] = useState<number>(keys.length);

  const handleResize = useCallback(() => {
    if (!legendItemsContainerRef.current) return;
    const { right: containerRight } =
      legendItemsContainerRef.current.getBoundingClientRect();
    const BUFFER = 120;
    const legendItems = Array.from(legendItemsContainerRef.current.children);

    let currentIndex = 0;
    for (const item of legendItems) {
      const itemRight = item.getBoundingClientRect().right;
      if (itemRight + BUFFER > containerRight) {
        if (cuttOffIndex >= currentIndex) {
          setCuttOffIndex(currentIndex);
          return;
        }
      }
      currentIndex++;
    }
    if (currentIndex !== cuttOffIndex) {
      setCuttOffIndex(currentIndex);
    }
  }, [cuttOffIndex]);

  const debouncedResize = useDebounce(handleResize, 100);

  useResizeObserver(chartContainerRef, ({ width }) => {
    if (width && width !== lastWidth.current) {
      lastWidth.current = width;
      debouncedResize();
    }
  });

  const getItemOpacity = (dataKey: string) => {
    if (hoveredKey) {
      return hoveredKey === dataKey ? 1 : 0.4;
    }
    if (selectedKeys && selectedKeys.length > 0) {
      return selectedKeys.includes(dataKey) ? 1 : 0.4;
    }
    return 1;
  };

  if (stacked)
    return (
      <StackedLegends
        keys={keys}
        activeKeys={selectedKeys}
        handleLegendClick={handleLegendClick}
        colors={colors}
        handleLegendEnter={handleLegendEnter}
        handleLegendLeave={handleLegendLeave}
        hoveredKey={hoveredKey}
        selectedKeys={selectedKeys}
      />
    );

  return (
    <Block
      display="flex"
      alignItems="center"
      gap={FOUNDATION_THEME.unit[32]}
      justifyContent="space-between"
    >
      <Block
        ref={legendItemsContainerRef}
        display="flex"
        height={FOUNDATION_THEME.unit[28]}
        alignItems="center"
        overflowX="hidden"
        overflowY="visible"
        whiteSpace="nowrap"
        style={{ flex: 1 }}
      >
        {keys.slice(0, cuttOffIndex).map((dataKey, index) => (
          <Block
            height={FOUNDATION_THEME.unit[16]}
            display="flex"
            alignItems="center"
            gap={FOUNDATION_THEME.unit[8]}
            cursor="pointer"
            paddingRight={FOUNDATION_THEME.unit[16]}
            transition="all 300ms"
            key={dataKey}
            onClick={() => handleLegendClick(dataKey)}
            onMouseEnter={() => handleLegendEnter(dataKey)}
            onMouseLeave={handleLegendLeave}
            opacity={getItemOpacity(dataKey)}
          >
            <Block
              width={FOUNDATION_THEME.unit[12]}
              height={FOUNDATION_THEME.unit[12]}
              borderRadius={FOUNDATION_THEME.border.radius[4]}
              flexShrink={0}
              backgroundColor={colors[index]}
            />
            <Text
              fontSize={14}
              fontWeight={FOUNDATION_THEME.font.weight[500]}
              truncate={true}
              color={FOUNDATION_THEME.colors.gray[500]}
            >
              {capitaliseCamelCase(dataKey)}
            </Text>
          </Block>
        ))}
        {cuttOffIndex < keys.length && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Block
                display="flex"
                alignItems="center"
                gap={8}
                style={{ fontSize: 14, fontWeight: 500 }}
                height="100%"
                color={FOUNDATION_THEME.colors.gray[600]}
                _hover={{
                  color: "#333",
                }}
              >
                + {keys.length - cuttOffIndex} more
              </Block>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content asChild>
              <Block
                backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                zIndex={50}
                borderRadius={FOUNDATION_THEME.border.radius[4]}
                boxShadow={FOUNDATION_THEME.shadows.lg}
                border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                minWidth={180}
              >
                {keys.slice(cuttOffIndex).map((dataKey) => (
                  <Block
                    padding={FOUNDATION_THEME.unit[8]}
                    paddingLeft={FOUNDATION_THEME.unit[16]}
                    paddingRight={FOUNDATION_THEME.unit[16]}
                    style={{ fontSize: 14 }}
                    _hover={{
                      backgroundColor: FOUNDATION_THEME.colors.gray[100],
                    }}
                    color={FOUNDATION_THEME.colors.gray[500]}
                    cursor="pointer"
                    key={dataKey}
                    onClick={() => handleLegendClick(dataKey)}
                    onMouseEnter={() => handleLegendEnter(dataKey)}
                    onMouseLeave={handleLegendLeave}
                    opacity={getItemOpacity(dataKey)}
                  >
                    {capitaliseCamelCase(dataKey)}
                  </Block>
                ))}
              </Block>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Block>
      {selectedKeys &&
        selectedKeys.length > 0 &&
        selectedKeys.length !== keys.length && (
          <Block
            style={{ fontSize: 14 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color={FOUNDATION_THEME.colors.primary[600]}
            _hover={{
              color: FOUNDATION_THEME.colors.primary[700],
              backgroundColor: FOUNDATION_THEME.colors.primary[50],
            }}
            borderRadius={FOUNDATION_THEME.border.radius[4]}
            height={FOUNDATION_THEME.unit[20]}
            width={FOUNDATION_THEME.unit[20]}
            flexShrink={0}
            onClick={() => setSelectedKeys([])}
          >
            <RotateCcw
              style={{
                width: "12px",
                height: "12px",
              }}
            />
          </Block>
        )}
    </Block>
  );
};

const StackedLegends: React.FC<{
  keys: string[];
  activeKeys: string[] | null;
  handleLegendClick: (dataKey: string) => void;
  colors: string[];
  handleLegendEnter: (dataKey: string) => void;
  handleLegendLeave: () => void;
  hoveredKey: string | null;
  selectedKeys: string[];
}> = ({
  keys,
  activeKeys,
  handleLegendClick,
  colors,
  handleLegendEnter,
  handleLegendLeave,
  hoveredKey,
  selectedKeys,
}) => {
  const getItemOpacity = (key: string) => {
    if (hoveredKey) {
      return hoveredKey === key ? 1 : 0.4;
    }
    if (selectedKeys && selectedKeys.length > 0) {
      return selectedKeys.includes(key) ? 1 : 0.4;
    }
    return 1;
  };

  return (
    <Block
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={8}
    >
      {keys.map((key, index) => (
        <Block
          height={FOUNDATION_THEME.unit[16]}
          display="flex"
          alignItems="center"
          gap={FOUNDATION_THEME.unit[8]}
          cursor="pointer"
          paddingRight={FOUNDATION_THEME.unit[16]}
          transition="all 300ms"
          key={key}
          onClick={() => handleLegendClick(key)}
          onMouseEnter={() => handleLegendEnter(key)}
          onMouseLeave={handleLegendLeave}
          opacity={getItemOpacity(key)}
        >
          <Block
            backgroundColor={colors[index]}
            width={FOUNDATION_THEME.unit[12]}
            height={FOUNDATION_THEME.unit[12]}
            borderRadius={FOUNDATION_THEME.border.radius[4]}
            flexShrink={0}
          />
          <Text
            color={
              activeKeys && activeKeys.includes(key)
                ? "#333"
                : FOUNDATION_THEME.colors.gray[600]
            }
          >
            {capitaliseCamelCase(key)}
          </Text>
        </Block>
      ))}
    </Block>
  );
};

ChartLegendsComponent.displayName = "ChartLegends";

export const ChartLegends = React.memo(ChartLegendsComponent);
