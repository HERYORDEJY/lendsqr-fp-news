import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { ViewStyle } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import SvgClose from "~/components/svgs/SvgClose";
import SvgSearch from "~/components/svgs/SvgSearch";
import { useThemeColors } from "~/hooks/useThemeColors";
import { useAppSelector } from "~/redux/store";
import { lightThemeColors } from "~/styles/colors";
import FilterFunnelIcon from "../svgs/FilterFunnelIcon";

interface Props extends TextInputProps {
  onClear?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeHolderColor?: any;
  placeHolder?: string;
  setEventList?: any;
  searchText?: string;
  setLoading?: any;
  setShowHeader?: any;
  value?: any;
  searchEvents?: (searchText: any) => Promise<void>;
  onSearch: (searchQuery: string) => void;
  containerStyles?: ViewStyle;
  onFilter?: (filter?: string) => void;
}

export default function SearchInput(props: Props) {
  const themeSelector = useAppSelector((state) => state.theme);
  const { input } = useThemeColors();
  const [value, setValue] = useState(props?.value);
  const dispatch = useDispatch();
  const { icon } = useThemeColors();

  const onChangeText = (text: string) => {
    // if (!Boolean(text?.trim())) {
    //   return;
    // }

    setValue(text);
    props.onSearch?.(text);
  };

  const onClear = () => {
    setValue("");
    props.onSearch?.("");
  };

  const onFilter = () => {
    onClear();
    props.onFilter?.("");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: input?.backgroundColor },
        //@ts-ignore
        props.containerStyles,
      ]}
    >
      <View style={styles.wrapper}>
        <SvgSearch color={input?.iconColor} />
        <TextInput
          {...props}
          style={[styles.txtInput, { color: input?.textColor }, props.style]}
          placeholder={props.placeHolder}
          value={value}
          onChangeText={onChangeText}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={() => props?.searchEvents?.(value)}
          cursorColor={input.cursorColor}
          placeholderTextColor={input.placeholderColor}
        />
        {value ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{ paddingRight: 5, paddingLeft: 10 }}
              onPress={onClear}
            >
              <SvgClose />
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              props?.searchEvents?.(value);
            }}
            >
            <Text style={{ color: "#ff5533", paddingLeft: 10 }}>search</Text>
          </TouchableOpacity> */}
          </View>
        ) : null}
      </View>
      {props.onFilter ? (
        <Pressable style={styles.filterButton} onPress={onFilter}>
          <FilterFunnelIcon color={icon.color} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  txtInput: {
    flex: 1,
    marginHorizontal: 17,
    fontSize: 16,
    fontFamily: "montserratRegular",
  },
  container: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: lightThemeColors.grey200,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  filterButton: {
    height: "100%",
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
