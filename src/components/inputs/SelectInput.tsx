import {} from "@shopify/flash-list";
import { format } from "date-fns";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  ListRenderItem,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useThemeColors } from "~/hooks/useThemeColors";
import { lightThemeColors } from "~/styles/colors";
import ActionSheetContainer from "../general/ActionSheetContainer";
import SectionDivider from "../general/SectionDivider";
import SelectInputArrowIcon from "../svgs/SelectInputArrow";

export type SelectOptionType = { label: string; value: string | number };

interface Props extends TextInputProps {
  errorMessage?: string | undefined | null;
  infoText?: string | undefined | null;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
  wrapperStyles?: ViewStyle;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onSelectOption?: (option: SelectOptionType) => void;
  selectedOption?: Date;
  minDate?: Date;
  maxDate?: Date;
  options: Array<SelectOptionType>;
  disabled?: boolean;
}

export default function SelectInput(props: Props) {
  const { modal, accentPrimary, text, input, input_disabled } =
      useThemeColors(),
    inputThemeColors = props.editable !== false ? input : input_disabled;
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  // const [selected, setSelected] = useState<string | null>(null);
  const isError = Boolean(props.errorMessage);
  const isInfoText = Boolean(props.infoText);
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const isSuccess = Boolean(value) && !isError && !isFocused;
  const optionsSheetRef = useRef<ActionSheetRef>(null);
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );
  const [selectedLabel, setSelectedLabel] = useState<string | number | null>(
    null
  );
  const insets = useSafeAreaInsets();
  const isNoData = !Boolean(props.options?.length),
    isDisabled = props.disabled || isNoData;

  const outlineStateColor = useMemo(() => {
    switch (true) {
      case isError:
        return inputThemeColors.errorColor;
      case isFocused:
        return inputThemeColors.infoColor;
      case isSuccess:
        return inputThemeColors.successColor;
      default:
        return inputThemeColors.borderColor;
    }
  }, [isFocused, value, isError]);

  const onDayPress = (day: DateData) => {
    // setSelected('');
    // props.onChangeText?.(text);
  };

  const onSelectOption = (option: SelectOptionType) => {
    props.onSelectOption?.(option);
    setSelectedLabel(option.label);
    setSelectedValue(option.value);
    optionsSheetRef.current?.hide();
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const keyExtractor = useCallback(
    (item: SelectOptionType, index: number) =>
      `${index} - ${item.label} - ${item.value}`,
    []
  );

  const renderOptionItem: ListRenderItem<SelectOptionType> = useCallback(
    ({ item, index }) => {
      const isSelected = item.value === selectedValue;
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onSelectOption(item)}
        >
          <View
            style={[
              styles.itemCheck,
              {
                borderColor: input.placeholderColor,
                backgroundColor: isSelected
                  ? input.successColor
                  : "transparent",
              },
            ]}
          />
          <Text style={styles.itemLabel}>{item.label}</Text>
        </TouchableOpacity>
      );
    },
    [selectedValue]
  );

  useEffect(() => {
    if (props.selectedOption) {
      const value = format(new Date(props.selectedOption), "yyyy-MM-dd");
      setValue(value);
    }
  }, [props.selectedOption]);

  return (
    <>
      <View style={styles.container}>
        <Text
          onPress={() => inputRef?.current?.focus()}
          style={[
            styles.label,
            {
              color: isError
                ? inputThemeColors.errorColor
                : inputThemeColors.labelColor,
            },
          ]}
        >
          {props.label ?? "Select"}
        </Text>
        <TouchableOpacity
          onPress={() => optionsSheetRef.current?.show()}
          style={[
            styles.wrapper,
            {
              borderColor: outlineStateColor,
              backgroundColor: inputThemeColors.backgroundColor,
            },
          ]}
          disabled={isDisabled}
        >
          <View style={styles.leftElement}>{props.leftElement}</View>

          <TextInput
            pointerEvents="none"
            autoCorrect={false}
            autoCapitalize={"none"}
            autoComplete={"off"}
            {...props}
            ref={inputRef}
            placeholder={isNoData ? "No options available" : props.placeholder}
            cursorColor={inputThemeColors.cursorColor}
            style={[styles.textinput, { color: inputThemeColors.textColor }]}
            placeholderTextColor={inputThemeColors.placeholderColor}
            editable={false}
            value={`${selectedLabel ?? ""}`}
          />
          <View style={styles.rightElement}>
            <SelectInputArrowIcon color={inputThemeColors.iconColor} />
          </View>
        </TouchableOpacity>

        {isInfoText || isError ? (
          <View style={[styles.bottom]}>
            {isError ? (
              <Text
                style={[
                  styles.errorMessage,
                  {
                    color: inputThemeColors.errorColor,
                  },
                ]}
              >
                {props.errorMessage}*
              </Text>
            ) : null}
            {isInfoText ? (
              <Text
                style={[
                  styles.infoText,
                  {
                    color: inputThemeColors.infoColor,
                  },
                ]}
              >
                {props.infoText}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
      <ActionSheet
        id={"SelectInputOptionsSheet"}
        ref={optionsSheetRef}
        safeAreaInsets={{ top: 0, bottom: 0, left: 0, right: 0 }}
        closable={false}
        backgroundInteractionEnabled={false}
        closeOnPressBack={false}
        isModal={true}
        useBottomSafeAreaPadding
      >
        <ActionSheetContainer title="Select option" sheetRef={optionsSheetRef}>
          <FlatList
            data={props.options}
            renderItem={renderOptionItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={{
              ...styles.contentContainer,
              // paddingBottom: insets.bottom,
            }}
            ItemSeparatorComponent={() => (
              <SectionDivider style={styles.itemSeperator} />
            )}
            // estimatedItemSize={10}
          />
        </ActionSheetContainer>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
  },
  listContainer: {
    rowGap: 4,
    flexGrow: 1,
    flex: 1,
    flexShrink: 0,
  },
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    // justifyContent: "center",
    alignItems: "center",
    columnGap: 4,
    paddingHorizontal: 8,
  },
  label: { fontSize: 16, paddingLeft: 12, fontFamily: "montserratMedium" },
  textinput: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
  },
  leftElement: {},
  rightElement: {},
  errorMessage: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(20.3),
  },
  infoText: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(20.3),
    color: lightThemeColors.grey500,
  },
  bottom: {
    rowGap: verticalScale(4),
  },
  modalBackdrop: {
    backgroundColor: "#000000",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalWrapper: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  calendarWrapper: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    // marginHorizontal: 10,
    borderRadius: 8,
    rowGap: 24,
  },
  calendarButtons: {
    flexDirection: "row",
    columnGap: 16,
    width: "100%",
  },
  contentContainer: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  itemLabel: {
    fontSize: 16,
  },
  itemCheck: { height: 12, width: 12, borderRadius: 10, borderWidth: 1 },
  itemSeperator: {
    marginVertical: 24,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 0,
  },
});
