package com.externalkeyboardapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.view.KeyEvent
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ExternalKeyboardApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    // Capturar eventos de teclado
    /**
     * Handle key events.
     */
    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        if (event.action == KeyEvent.ACTION_DOWN) {
            // Log the key event
            val keyCode = event.keyCode
            val keyName = KeyEvent.keyCodeToString(keyCode)
            Log.d("KeyEvent", "Key code: ${keyCode}, Key: ${keyName}")

            // Send key event to React Native
            sendKeyEventToReactNative(keyCode, keyName)
        }
        return super.dispatchKeyEvent(event)
    }

    private fun sendKeyEventToReactNative(keyCode: Int, keyName: String) {
        val reactContext: ReactContext = reactInstanceManager.currentReactContext ?: return

        if (reactContext.hasActiveCatalystInstance()) {
            val params = Arguments.createMap()
            params.putInt("keyCode", keyCode)
            params.putString("keyName", keyName)

            // Especificar explicitamente o tipo RCTDeviceEventEmitter
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("keyboardEvent", params)
        }
    }
}
