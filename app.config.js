export default {
  "expo": {
    "name": "gramergameDevelopmentV2",
    "slug": "gramergameV2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "bundleIdentifier": "com.hm.grammergame",
      "supportsTablet": true,
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST
    },
    "android": {
      "permissions": ["android.permission.SCHEDULE_EXACT_ALARM"],
      "package": "com.hm.grammergame",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
      "plugins": [
        "expo-router",
        "@react-native-google-signin/google-signin",
        "expo-localization",
        [ "expo-notifications",
        {
          "color": "#ffffff",
          "mode": "development"
        }]
        
      ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
    }
  }
}