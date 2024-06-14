import { Platform } from "react-native";

export const isAndroidDevice = Platform.OS === "android";
export const isIosDevice = Platform.OS === "ios";
