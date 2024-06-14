import React, { RefObject, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "~/hooks/useThemeColors";
import { useAppSelector } from "~/redux/store";
import PrimaryButton from "../buttons/PrimaryButtom";
import EventTagsSelect, { SelectTagsType } from "../event/EventTagsSelect";
import ActionSheetContainer from "../general/ActionSheetContainer";
import DateInput from "./DateInput";
import SelectInput from "./SelectInput";

export type FilterReqsType = {
  filterBy: string;
  fromValue?: string | null;
  toValue?: string | null;
  fromDate?: Date | null;
  toDate?: Date | null;
  tags?: Array<string> | null;
};
interface Props extends SheetProps {
  onApplyFilter: (filters: FilterReqsType) => void;
  sheetRef: RefObject<ActionSheetRef>;
  sheetId: string;
}

export default function EventsFilterSheet(props: Props) {
  const { main, input } = useThemeColors();
  const ref = props.sheetRef ?? useRef<ActionSheetRef>(null);
  const filterByOptionsSheetRef = useRef<ActionSheetRef>(null);
  const [filterByOptionValue, setFilterByOptionValue] = useState<string | null>(
    null
  );
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedTags, setSelectedTags] = useState<SelectTagsType | null>(null);
  const insets = useSafeAreaInsets();
  const eventSelector = useAppSelector((state) => state.event);

  const isShowDateInputs =
    filterByOptionValue === "start_datetime" ||
    filterByOptionValue === "end_datetime";

  const isApplyEnabled =
    Boolean(filterByOptionValue) ||
    (Boolean(fromDate) && Boolean(toDate)) ||
    Boolean(selectedTags?.length);

  const onApplyFilter = () => {
    props.onApplyFilter({
      filterBy: filterByOptionValue!,
      fromDate,
      toDate,
      tags: selectedTags,
    });
    setFilterByOptionValue(null);
    setFromDate(null);
    setToDate(null);
    setSelectedTags(null);

    ref.current?.hide();
  };
  return (
    <>
      <ActionSheet
        id={props.sheetId ?? "EventsFilterSheet"}
        ref={ref}
        safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        closable={false}
        backgroundInteractionEnabled={false}
        closeOnPressBack={false}
        isModal={true}
        useBottomSafeAreaPadding={true}
      >
        <ActionSheetContainer
          title="Filter Events"
          sheetRef={ref}
          // @ts-ignore
          style={[styles.container, { backgroundColor: main.background }]}
          headerStyle={{ backgroundColor: input.backgroundColor }}
        >
          <ScrollView contentContainerStyle={styles.wrapper}>
            <SelectInput
              label="Filter By"
              placeholder="Select filter option"
              options={filterByOptions}
              onSelectOption={(option) =>
                setFilterByOptionValue(option.value.toString())
              }
            />
            {isShowDateInputs ? (
              <>
                <DateInput
                  label="From"
                  onSelectDate={(value) => setFromDate(new Date(value))}
                  selectedDate={fromDate!}
                />
                <DateInput
                  label="To"
                  onSelectDate={(value) => setToDate(new Date(value))}
                  selectedDate={toDate!}
                />
              </>
            ) : null}

            {filterByOptionValue === "tags" ? (
              <EventTagsSelect
                label="Select tags"
                placeholder="Select filter option"
                onSelectTags={setSelectedTags}
              />
            ) : null}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <PrimaryButton
              title="Apply filter"
              disabled={!isApplyEnabled}
              onPress={onApplyFilter}
            />
          </View>
        </ActionSheetContainer>
      </ActionSheet>
      {/* <FilterByOptionsSheet
        sheetId="FilterByOptionsSheet"
        sheetRef={filterByOptionsSheetRef}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    rowGap: 16,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 0,
  },
});

const filterByOptions = [
  { label: "Start Date", value: "start_datetime" },
  { label: "End Date", value: "end_datetime" },
  { label: "Tags", value: "tags" },
];
