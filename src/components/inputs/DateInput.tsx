import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { DateData } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { useThemeColors } from "~/hooks/useThemeColors";
import { useAppSelector } from "~/redux/store";
import { lightThemeColors } from "~/styles/colors";
import PrimaryButton from "../buttons/PrimaryButtom";
import SecondaryButton from "../buttons/SecondaryButton";
import CalendarIcon from "../svgs/CalendarIcon";

interface Props extends TextInputProps {
  errorMessage?: string | undefined | null;
  infoText?: string | undefined | null;
  label?: string;
  inputStyles?: TextInputProps["style"];
  containerStyles?: ViewStyle;
  wrapperStyles?: ViewStyle;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onSelectDate?: (
    date: Date
    //| { timestamp: number; utcOffset: number }
  ) => void;
  selectedDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

export default function DateInput(props: Props) {
  const themeSelector = useAppSelector((state) => state.theme);
  const { modal, accentPrimary, text } = useThemeColors(),
    inputThemeColors =
      props.editable !== false
        ? themeSelector.colors.input
        : themeSelector.colors.input_disabled;
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selected, setSelected] = useState<{
    timestamp: number;
    utcOffset: number;
  } | null>(null);
  const isError = Boolean(props.errorMessage);
  const isInfoText = Boolean(props.infoText);
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const isSuccess = Boolean(value) && !isError && !isFocused;

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

  const onSelectDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;

    setSelected({ timestamp, utcOffset });
  };

  const onConfirm = (selectedDate?: Date) => {
    // if (selectedDate) {
    setValue(format(new Date(`${selectedDate}`), "yyyy-MM-dd"));
    props.onSelectDate?.(new Date(`${selectedDate}`));
    // } else {
    //   setValue(format(new Date(selected?.timestamp!), "yyyy-MM-dd"));
    //   props.onSelectDate?.(selected!);
    // }
    setShowCalendar(false);
  };

  const onCancel = () => {
    setShowCalendar(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  useEffect(() => {
    if (props.selectedDate) {
      const value = format(new Date(props.selectedDate), "yyyy-MM-dd");
      setValue(value);
    }
  }, [props.selectedDate]);

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
          {props.label ?? "Date"}
        </Text>
        <TouchableOpacity
          onPress={() => setShowCalendar(true)}
          style={[
            styles.wrapper,
            {
              borderColor: outlineStateColor,
              backgroundColor: inputThemeColors.backgroundColor,
            },
          ]}
        >
          <View style={styles.leftElement}>{props.leftElement}</View>

          <TextInput
            pointerEvents="none"
            autoCorrect={false}
            autoCapitalize={"none"}
            autoComplete={"off"}
            {...props}
            ref={inputRef}
            placeholder={props.placeholder}
            cursorColor={inputThemeColors.cursorColor}
            style={[styles.textinput, { color: inputThemeColors.textColor }]}
            placeholderTextColor={inputThemeColors.placeholderColor}
            editable={false}
            value={value ?? undefined}
          />
          <View style={styles.rightElement}>
            <CalendarIcon color={inputThemeColors.iconColor} />
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
      {/* @ts-ignore */}

      <DateTimePickerModal
        isVisible={showCalendar}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
        isDarkModeEnabled={false}
        accentColor={accentPrimary}
        pickerComponentStyleIOS={
          {
            // backgroundColor: "#666"
          }
        }
        buttonTextColorIOS={accentPrimary}
        minimumDate={props.minDate}
        maximumDate={props.maxDate}
        date={props.selectedDate ? new Date(props.selectedDate) : new Date()}
      />

      {1 + 1 == 3 && Platform.OS === "ios" ? (
        <Modal visible={showCalendar} transparent>
          <View
            style={{
              position: "absolute",
              backgroundColor: modal.backdrop,
              width: "100%",
              height: "100%",
            }}
          />
          <TouchableWithoutFeedback
            // onPress={() => setShowCalendar(false)}
            style={[styles.modalBackdrop]}
          >
            <View style={[styles.modalWrapper]}>
              <View
                style={[
                  styles.calendarWrapper,
                  { backgroundColor: modal.background },
                ]}
              >
                <RNDateTimePicker
                  // @ts-ignore
                  onChange={onSelectDate}
                  value={
                    props.selectedDate
                      ? new Date(props.selectedDate)
                      : selected?.timestamp
                      ? new Date(selected.timestamp)
                      : new Date()
                  }
                  minimumDate={props.minDate}
                  maximumDate={props.maxDate}
                  display="inline"
                  accentColor={accentPrimary}
                />
                <View style={styles.calendarButtons}>
                  <SecondaryButton
                    title="Cancel"
                    containerStyle={{ flex: 1 }}
                    onPress={onCancel}
                  />
                  <PrimaryButton
                    title="Confirm"
                    containerStyle={{ flex: 1 }}
                    onPress={onConfirm}
                    disabled={!Boolean(selected?.timestamp)}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
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
});
