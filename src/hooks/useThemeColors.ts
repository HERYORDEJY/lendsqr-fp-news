import { useAppSelector } from '~/store';

export function useThemeColors() {
  const themeSelector = useAppSelector(state => state.theme);

  return {
    mode: themeSelector.mode,

    colors: themeSelector.colors,
    text: themeSelector.colors.text,
    list: themeSelector.colors.list,
    input: themeSelector.colors.input,
    button: themeSelector.colors.button,
    input_disabled: themeSelector.colors.input_disabled,
    dropdown: themeSelector.colors.dropdown,
    dropdown_disabled: themeSelector.colors.dropdown_disabled,
    button_disabled: themeSelector.colors.button_disabled,
    main: themeSelector.colors.main,
    modal: themeSelector.colors.modal,
    tabBar: themeSelector.colors.tabBar,
    accentPrimary: themeSelector.colors.primary,
    section: themeSelector.colors.section,
    tag: themeSelector.colors.tag,
    tag_disabled: themeSelector.colors.tag_disabled,
    icon: themeSelector.colors.icon,
    card: themeSelector.colors.card,
    divider: themeSelector.colors.divider,
  };
}

export function useThemeStore() {
  return useAppSelector(state => state.theme);
}
