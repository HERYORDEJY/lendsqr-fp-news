# LendsqrFpNews

### This is a React Native Developer Assessment app, from [LendsqrFpNews](https://docs.google.com/document/d/e/2PACX-1vT0icxfibgjWxBZezHgGFhwVSZj1-3S8ewFZ5g0FgC_N1nA4QeXXLV_Nix4JfB6Ap3BX4BDHmwZWRnU/pub)

Built using using the (bare) [`React Native CLI`](https://github.com/react-native-community/cli).

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Installation

Clone the repo on a local directory.

```bash
git clone git@github.com:HERYORDEJY-DEV/LendsqrFpNews.git
```

Install dependencies, run the following command from the _root_ of the cloned project:

- with _yarn_

```bash
yarn install
```

- with _npm_

```bash
yarn install
```

Then start Metro,

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
# to install pods (cocoapods)
npx pod-install
```

- with Xcode

  - open the ios directory of the app in the (new) terminal, i.e. `cd ios`
  - enter the command `xed .` to open Xcode directly for the app
  - at the top bar of the Xcode environment, select your destination simulator (or device) for build and the press the _play_ button by the left side of the top-menu bar

- with terminal

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Project Structure

- src
  - |--- assets
    - |--- fonts
    - |--- images
    - |--- svgs
  - |--- contextAPI
  - |--- screens
  - |--- navigation
  - |--- components
  - |--- hooks
  - |--- utils
  - |--- styles

## Screens

### Authentication Screens

- Login Screen
- Sign Up
  - Bio update
  - Google sign up

### Main Screens

- News List
- News Details
- Bookmarked News List
- Profile

## Features

- Bookmark News
- Light & Dark Theme switch

## Screenshots

### iOS

| ![Screenshot Android 1](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-1.1.png?raw=true) |   ![Screenshot Android 2](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-1.2.png?raw=true)   |
| :---------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|                                               _iOS - Login screen_                                                |                                                _iOS - Sign up screen_                                                 |
| ![Screenshot Android 3](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-1.3.png?raw=true) |   ![Screenshot Android 4](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-2.1.png?raw=true)   |
|   :-----------------------------------------------------------------------------------------------------------:   | :-------------------------------------------------------------------------------------------------------------------: |
|                                          _iOS - Sign up (google) screen_                                          |                                               _iOS - News List screen_                                                |
| ![Screenshot Android 5](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-2.2.png?raw=true) |   ![Screenshot Android 6](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-2.3.png?raw=true)   |
|   :-----------------------------------------------------------------------------------------------------------:   | :-------------------------------------------------------------------------------------------------------------------: |
|                                            _iOS - News Details screen_                                            |                                      _iOS - Bookmarked News List (empty) screen_                                      |
| ![Screenshot Android 7](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-2.4.png?raw=true) |    ![Screenshot Android 8](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/ios-3.png?raw=true)    |
|   :-----------------------------------------------------------------------------------------------------------:   | :-------------------------------------------------------------------------------------------------------------------: |
|                                        _iOS - Bookmarked News List screen_                                        |                                                _iOS - Profile screen_                                                 |

### Android

| ![Screenshot Android 1](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-1.0.png?raw=true) | ![Screenshot Android 2](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-1.2.png?raw=true) |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|                                               _Android - Splash screen_                                               |                                               _Android - Login screen_                                                |
| ![Screenshot Android 3](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-1.3.png?raw=true) | ![Screenshot Android 4](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-1.4.png?raw=true) |
|     :-----------------------------------------------------------------------------------------------------------:     | :-------------------------------------------------------------------------------------------------------------------: |
|                                              _Android - Sign up screen_                                               |                                          _Android - Sign up (google) screen_                                          |
| ![Screenshot Android 5](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-2.0.png?raw=true) | ![Screenshot Android 6](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-2.1.png?raw=true) |
|     :-----------------------------------------------------------------------------------------------------------:     | :-------------------------------------------------------------------------------------------------------------------: |
|                                             _Android - News List screen_                                              |                                            _Android - News Details screen_                                            |
| ![Screenshot Android 7](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-2.3.png?raw=true) | ![Screenshot Android 8](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-2.4.png?raw=true) |
|     :-----------------------------------------------------------------------------------------------------------:     | :-------------------------------------------------------------------------------------------------------------------: |
|                                    _Android - Bookmarked News List (empty) screen_                                    |                                     _Android - News Details (bookmarked) screen_                                      |
| ![Screenshot Android 9](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-2.5.png?raw=true) | ![Screenshot Android 10](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/android-3.png?raw=true)  |
|     :-----------------------------------------------------------------------------------------------------------:     | :-------------------------------------------------------------------------------------------------------------------: |
|                                        _Android - Bookmarked News List screen_                                        |                                              _Android - Profile screen_                                               |

### others

| ![Screenshot Error](https://github.com/HERYORDEJY/lendsqr-fp-news/blob/main/screenshots/error.png?raw=true) |
| :---------------------------------------------------------------------------------------------------------: |
|                                               _Error screen_                                                |
