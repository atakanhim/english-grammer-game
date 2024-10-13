export default {
  "expo": {
    "name": "gramerGameV5",
    "slug": "gramergameV2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/logon.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "android": {
      "permissions": ["android.permission.SCHEDULE_EXACT_ALARM"],
      "package": "com.hm.grammergame",
      "googleServicesFile":  "./grammergamejson.json",
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
      "eas": {
        "projectId": "cd558549-80a2-4300-95fc-63080beba4c7"
      }
    }
  }
}