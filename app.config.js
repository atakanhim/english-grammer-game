export default {
  "expo": {
    "name": "gramerGameV31",
    "slug": "gramergameV31",
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
      "googleServicesFile":  "../DOCUMENTS/grammergamejson.json", // process.env.GRAMMERGAME_JSON,// for local build,eas icin ise boyle build,
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
        "projectId": "bc284ef0-722d-4ace-99f3-dc241fb0f640"
      }
    }
  }
}