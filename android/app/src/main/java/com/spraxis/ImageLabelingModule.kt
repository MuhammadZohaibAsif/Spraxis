package com.spraxis

import android.net.Uri
import com.facebook.react.bridge.*
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.label.ImageLabeling
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions
import java.io.File

class ImageLabelingModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "ImageLabeling"

    @ReactMethod
    fun detect(imagePath: String, promise: Promise) {
        try {
            val file = File(imagePath)
            val image = InputImage.fromFilePath(
                reactApplicationContext,
                Uri.fromFile(file)
            )

            val labeler = ImageLabeling.getClient(
                ImageLabelerOptions.DEFAULT_OPTIONS
            )

            labeler.process(image)
                .addOnSuccessListener { labels ->
                    val array = Arguments.createArray()

                    labels.forEach { label ->
                        val map = Arguments.createMap()
                        map.putString("text", label.text)
                        map.putDouble("confidence", label.confidence.toDouble())
                        array.pushMap(map)
                    }

                    promise.resolve(array)
                }
                .addOnFailureListener {
                    promise.reject("LABEL_ERROR", it.message)
                }

        } catch (e: Exception) {
            promise.reject("IMAGE_ERROR", e.message)
        }
    }
}