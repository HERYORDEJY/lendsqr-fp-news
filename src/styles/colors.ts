const appLightThemeColors = {
  colorFromLogo: {
    red: '#f13b06',
    gray1: '#343a52',
    offWhite: '#fbfbfa',
    grey2: '#91919e',
    brown: '#e48468',
  },

  error: '#DB371F',
  white: '#FFFFFF',
  black: '#000000',
  info50: '#ccccff',
  info150: '#9999ff',
  info250: '#6666ff',
  info350: '#0000ff',
  info450: '#0000cc',
  info550: '#000099',
  info650: '#000066',

  grey25: '#EAEAEA',
  grey50: '#F9FAFB',
  grey100: '#F0F2F5',
  grey200: '#E4E7EC',
  grey300: '#D0D5DD',
  grey400: '#98A2B3',
  grey500: '#667185',
  grey600: '#475367',
  grey700: '#344054',
  grey800: '#475467',
  grey900: '#101928', //101928

  success50: '#E7F6EC',
  success75: '#B5E3C4',
  success200: '#5FC381',
  success400_base: '#0F973D',
  success500: '#099137',
  success600: '#04802E',

  error200: '#E26E6A',
  error400_base: '#D42620',
  error500: '#CB1A14',

  input: {
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    labelColor: '#333333',
    hintColor: '#CCCCCC',
    errorColor: '#FF0000',
    placeholderColor: '#CCCCCC',
    successColor: '#008000',
    errorTextColor: '#FF0000',
    infoColor: '#1E90FF',
    warningColor: '#FFA500',
    iconColor: '#000000',
    cursorColor: '#000000',
  },
  input_disabled: {
    textColor: '#999999',
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
    labelColor: '#999999',
    hintColor: '#CCCCCC',
    errorColor: '#FF0000',
    placeholderColor: '#CCCCCC',
    successColor: '#008000',
    errorTextColor: '#FF0000',
    infoColor: '#1E90FF',
    warningColor: '#FFA500',
    iconColor: '#666666',
  },
  button: {
    primary: {
      background: '#ff5533',
      border: '#ff5533',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    secondary: {
      background: '#3366FF',
      border: '#3366FF',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    tertiary: {
      background: '#33CC99',
      border: '#33CC99',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
  },
  button_disabled: {
    primary: {
      background: '#ffccaa',
      border: '#ffccaa',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    secondary: {
      background: '#99BBFF',
      border: '#99BBFF',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    tertiary: {
      background: '#88DDAA',
      border: '#88DDAA',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
  },
  list: {
    container: {
      background: '#F5F5F5',
    },
    item: {
      background: {
        default: '#FFFFFF',
        selected: '#ECEFF1',
        inactive: '#E0E0E0',
      },
      border: {
        default: '#CCCCCC',
        disabled: '#DDDDDD',
      },
      title: '#333333',
    },
    header: {
      background: '#E0E0E0',
      border: '#999999',
      title: '#333333',
    },
  },
  main: {
    background: '#FFFFFF',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
  },
  section: {
    container: {
      background: '#FFFFFF',
      border: '#E5E5E5',
    },
    header: {
      background: '#F5F5F5',
      titleColor: '#333333',
      subtitleColor: '#666666',
      border: '#CCCCCC',
    },
    content: {
      background: '#FAFAFA',
    },
    footer: {
      background: '#F0F0F0',
    },
  },
  tag: {
    container: {
      background: {
        default: '#ECECEC',
        selected: '#007AFF',
      },
      border: '#CCCCCC',
    },
    title: {default: '#333333', selected: '#FFFFFF'},
  },
  tag_disabled: {
    container: {
      background: {
        default: '#F2F2F2',
        selected: '#007AFF',
      },
      border: '#CCCCCC',
    },
    title: {default: '#999999', selected: '#FFFFFF'},
  },
  icon: {
    color: '#333333',
    activeColor: '#007AFF',
    inactiveColor: '#999999',
  },
  card: {
    background: '#FFFFFF',
    border: '#E0E0E0',
    title: '#333333',
    text: '#666666',
    buttonBackground: '#007AFF',
    buttonText: '#FFFFFF',
  },
  divider: '#E0E0E0',
};

const appDarkThemeColors = {
  ...appLightThemeColors,
  input: {
    ...appLightThemeColors.input,
    textColor: '#FFFFFF',
    backgroundColor: '#333333',
    borderColor: '#333333',
    labelColor: '#CCCCCC',
    hintColor: '#CCCCCC',
    errorColor: '#FF0000',
    placeholderColor: '#CCCCCC',
    successColor: '#32CD32',
    errorTextColor: '#FF0000',
    infoColor: '#1E90FF',
    warningColor: '#FFA500',
    iconColor: '#FFFFFF',
    cursorColor: '#FFFFFF',
  },
  input_disabled: {
    ...appLightThemeColors.input_disabled,
    textColor: '#666666',
    backgroundColor: '#666666',
    borderColor: '#666666',
    labelColor: '#999999',
    hintColor: '#CCCCCC',
    errorColor: '#FF0000',
    placeholderColor: '#CCCCCC',
    successColor: '#32CD32',
    errorTextColor: '#FF0000',
    infoColor: '#1E90FF',
    warningColor: '#FFA500',
    iconColor: '#CCCCCC',
  },
  button: {
    ...appLightThemeColors.button,
    primary: {
      background: '#ff5533',
      border: '#ff5533',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    secondary: {
      background: '#3366FF',
      border: '#3366FF',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    tertiary: {
      background: '#33CC99',
      border: '#33CC99',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
  },
  button_disabled: {
    ...appLightThemeColors.button_disabled,
    primary: {
      background: '#ff7755',
      border: '#ff7755',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    secondary: {
      background: '#3355AA',
      border: '#3355AA',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
    tertiary: {
      background: '#229977',
      border: '#229977',
      title: '#FFFFFF',
      icon: '#FFFFFF',
      loadingIndicator: '#FFFFFF',
    },
  },
  main: {
    ...appLightThemeColors.main,
    background: '#1A1A1A',
  },
  list: {
    ...appLightThemeColors.list,
    container: {
      background: '#333333',
    },
    item: {
      background: {
        default: '#1A1A1A',
        selected: '#424242',
        inactive: '#555555',
      },
      border: {
        default: '#666666',
        disabled: '#777777',
      },
      title: '#CCCCCC',
    },
    header: {
      background: '#555555',
      border: '#888888',
      title: '#CCCCCC',
    },
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#DDDDDD',
    tertiary: '#BBBBBB',
  },
  section: {
    ...appLightThemeColors.section,
    container: {
      background: '#333333',
      border: '#666666',
    },
    header: {
      background: '#1A1A1A',
      titleColor: '#FFFFFF',
      subtitleColor: '#DDDDDD',
      border: '#444444',
    },
    content: {
      background: '#2A2A2A',
    },
    footer: {
      background: '#262626',
    },
  },
  tag: {
    container: {
      background: {
        default: '#333333',
        selected: '#007AFF',
      },
      border: '#666666',
    },
    title: {default: '#FFFFFF', selected: '#FFFFFF'},
  },
  tag_disabled: {
    container: {
      background: {
        default: '#ff5533', // "#444444",
        selected: '#007AFF',
      },
      border: '#666666',
    },
    title: {default: '#CCCCCC', selected: '#FFFFFF'},
  },
  icon: {
    color: '#FFFFFF',
    activeColor: '#ff5533', // "#007AFF",
    inactiveColor: '#CCCCCC',
  },
  card: {
    background: '#333333',
    border: '#666666',
    title: '#FFFFFF',
    text: '#CCCCCC',
    buttonBackground: '#007AFF',
    buttonText: '#FFFFFF',
  },
  divider: '#666666',
};

export const appThemeColors = {
  LIGHT: appLightThemeColors,
  DARK: appDarkThemeColors,
};
