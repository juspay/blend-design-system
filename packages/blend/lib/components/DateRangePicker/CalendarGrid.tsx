import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import styled, { CSSObject } from "styled-components";
import { DateRange } from "./types";
import { CalendarTokenType } from "./dateRangePicker.tokens";
import Block from "../Primitives/Block/Block";
import {
  handleCalendarDateClick,
  getDayNames,
  getMonthHeight,
  getVisibleMonths,
  findCurrentMonthIndex,
  getScrollToMonth,
  generateInitialMonths,
  handleLoadMoreMonths,
  handleCalendarScroll,
  createCalendarMonthData,
  calculateDayCellProps,
} from "./utils";
import { useComponentToken } from "../../context/useComponentToken";
import { FOUNDATION_THEME } from "../../tokens";

type CalendarGridProps = {
  selectedRange: DateRange;
  onDateSelect: (range: DateRange) => void;
  today: Date;
  allowSingleDateSelection?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
};

const CONTAINER_HEIGHT = 300;
const MONTH_HEIGHT = getMonthHeight();
const LOAD_THRESHOLD = 100;

const StyledDayCell = styled(Block)<{
  $cellStyles: CSSObject;
  $textColor: string;
  $isDisabled: boolean;
  $isSelected: boolean;
  $calendarToken: CalendarTokenType;
}>`
  ${(props) => props.$cellStyles}
  color: ${(props) => props.$textColor};
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};

  ${(props) =>
    !props.$isDisabled &&
    !props.$isSelected &&
    `
    &:hover {
      border: ${props.$calendarToken.calendar.calendarGrid.day.hover.border};
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.hover.borderRadius};
    }
  `}
`;

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
  (
    {
      selectedRange,
      onDateSelect,
      today,
      allowSingleDateSelection = false,
      disableFutureDates = false,
      disablePastDates = false,
    },
    ref,
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const isInitialized = useRef(false);
    const [isLoadingPast, setIsLoadingPast] = useState(false);
    const [isLoadingFuture, setIsLoadingFuture] = useState(false);
    const [months, setMonths] = useState<{ month: number; year: number }[]>([]);
    const calendarToken = useComponentToken("CALENDAR") as CalendarTokenType;

    // Initialize months
    useEffect(() => {
      const initialMonths = generateInitialMonths(today);
      setMonths(initialMonths);
    }, [today]);

    const dayNames = useMemo(() => getDayNames(), []);

    const { visibleMonths, totalHeight } = getVisibleMonths(
      scrollTop,
      CONTAINER_HEIGHT,
      months,
      MONTH_HEIGHT,
      2,
    );

    // Handle loading more months
    const loadMoreMonths = useCallback(
      async (direction: "past" | "future") => {
        if (direction === "past") setIsLoadingPast(true);
        else setIsLoadingFuture(true);

        const currentScrollTop = scrollContainerRef.current?.scrollTop || 0;

        try {
          const newChunk = await handleLoadMoreMonths(
            months,
            direction,
            isLoadingPast,
            isLoadingFuture,
          );

          if (newChunk) {
            setMonths((prevMonths) => {
              const newMonths =
                direction === "past"
                  ? [...newChunk, ...prevMonths]
                  : [...prevMonths, ...newChunk];

              requestAnimationFrame(() => {
                if (scrollContainerRef.current && direction === "past") {
                  const addedHeight = newChunk.length * MONTH_HEIGHT;
                  scrollContainerRef.current.scrollTop =
                    currentScrollTop + addedHeight;
                }
              });

              return newMonths;
            });
          }
        } finally {
          if (direction === "past") setIsLoadingPast(false);
          else setIsLoadingFuture(false);
        }
      },
      [months, isLoadingPast, isLoadingFuture],
    );

    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const newScrollTop = e.currentTarget.scrollTop;
        const scrollHeight = e.currentTarget.scrollHeight;
        const clientHeight = e.currentTarget.clientHeight;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          setScrollTop(newScrollTop);
        });

        const { shouldLoadPast, shouldLoadFuture } = handleCalendarScroll(
          newScrollTop,
          scrollHeight,
          clientHeight,
          LOAD_THRESHOLD,
        );

        if (shouldLoadPast && !isLoadingPast) {
          loadMoreMonths("past");
        }

        if (shouldLoadFuture && !isLoadingFuture) {
          loadMoreMonths("future");
        }
      },
      [loadMoreMonths, isLoadingPast, isLoadingFuture],
    );

    // Initialize scroll position
    useEffect(() => {
      if (
        !isInitialized.current &&
        scrollContainerRef.current &&
        months.length > 0
      ) {
        const currentMonthIndex = findCurrentMonthIndex(months, today);
        if (currentMonthIndex !== -1) {
          const scrollPosition = getScrollToMonth(
            currentMonthIndex,
            MONTH_HEIGHT,
          );

          requestAnimationFrame(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = scrollPosition;
              setScrollTop(scrollPosition);
              isInitialized.current = true;
            }
          });
        }
      }
    }, [months, today]);

    useEffect(() => {
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);

    const handleDateClick = useCallback(
      (
        year: number,
        month: number,
        day: number,
        isDoubleClick: boolean = false,
      ) => {
        const clickedDate = new Date(year, month, day);
        const newRange = handleCalendarDateClick(
          clickedDate,
          selectedRange,
          allowSingleDateSelection,
          today,
          disableFutureDates,
          disablePastDates,
          isDoubleClick,
        );

        if (newRange) {
          onDateSelect(newRange);
        }
      },
      [
        selectedRange,
        allowSingleDateSelection,
        today,
        disableFutureDates,
        disablePastDates,
        onDateSelect,
      ],
    );

    const renderMonthCalendar = useCallback(
      (year: number, month: number, monthIndex: number) => {
        const monthData = createCalendarMonthData(
          year,
          month,
          monthIndex,
          MONTH_HEIGHT,
        );

        return (
          <Block
            key={monthData.key}
            style={{
              ...calendarToken.calendar.calendarGrid.month.container,
              top: monthData.topOffset,
              left: 0,
              right: 0,
              height: monthData.monthHeight,
            }}
          >
            <Block
              style={{ ...calendarToken.calendar.calendarGrid.month.header }}
            >
              {monthData.monthName} {year}
            </Block>

            {monthData.weeks.map(
              (week: (number | null)[], weekIndex: number) => (
                <Block
                  style={{ ...calendarToken.calendar.calendarGrid.week.row }}
                  key={weekIndex}
                >
                  {week.map((day: number | null, dayIndex: number) => {
                    if (day === null) {
                      return (
                        <Block
                          style={{
                            ...calendarToken.calendar.calendarGrid.day.empty,
                          }}
                          key={dayIndex}
                        />
                      );
                    }

                    const date = new Date(year, month, day);
                    const cellProps = calculateDayCellProps(
                      date,
                      selectedRange,
                      today,
                      disableFutureDates,
                      disablePastDates,
                      calendarToken,
                    );

                    const isSelected =
                      cellProps.dateStates.isStart ||
                      cellProps.dateStates.isEnd ||
                      cellProps.dateStates.isSingleDate;

                    return (
                      <StyledDayCell
                        key={`${year}-${month}-${day}`}
                        $cellStyles={cellProps.styles as CSSObject}
                        $textColor={String(cellProps.textColor || "")}
                        $isDisabled={cellProps.dateStates.isDisabled}
                        $isSelected={isSelected}
                        $calendarToken={calendarToken}
                        onClick={() => handleDateClick(year, month, day, false)}
                        onDoubleClick={() =>
                          handleDateClick(year, month, day, true)
                        }
                      >
                        {day}
                        {cellProps.showTodayIndicator && (
                          <Block
                            style={{
                              ...calendarToken.calendar.calendarGrid.day
                                .todayIndicator,
                            }}
                          />
                        )}
                      </StyledDayCell>
                    );
                  })}
                </Block>
              ),
            )}
          </Block>
        );
      },
      [
        selectedRange,
        today,
        disableFutureDates,
        disablePastDates,
        handleDateClick,
        calendarToken,
      ],
    );

    const renderLoader = (position: "top" | "bottom") => (
      <Block
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: position === "top" ? "sticky" : "relative",
          top: position === "top" ? 0 : "auto",
          zIndex: 5,
          padding: "16px",
        }}
      >
        <Block
          style={{
            width: FOUNDATION_THEME.unit[20],
            height: FOUNDATION_THEME.unit[20],
            border: `2px solid ${FOUNDATION_THEME.colors.gray[200]}`,
            borderTop: `2px solid ${FOUNDATION_THEME.colors.primary[500]}`,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </Block>
    );

    return (
      <Block
        style={{ ...calendarToken.calendar.calendarGrid.container }}
        ref={ref}
      >
        <Block style={{ ...calendarToken.calendar.calendarGrid.week.header }}>
          {dayNames.map((day, index) => (
            <Block
              style={{ ...calendarToken.calendar.calendarGrid.week.dayName }}
              key={index}
            >
              {day}
            </Block>
          ))}
        </Block>

        <Block
          ref={scrollContainerRef}
          style={{ ...calendarToken.calendar.calendarGrid.container }}
          onScroll={handleScroll}
        >
          {isLoadingPast && renderLoader("top")}

          <Block style={{ height: totalHeight, position: "relative" }}>
            {visibleMonths.map(({ year, month, index }) =>
              renderMonthCalendar(year, month, index),
            )}
          </Block>

          {isLoadingFuture && renderLoader("bottom")}
        </Block>
      </Block>
    );
  },
);

CalendarGrid.displayName = "CalendarGrid";

export default CalendarGrid;
