# ml/model_service.py

import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

# --- ML Model Initialization ---
# Load the model only ONCE when the service starts
try:
    # NOTE: You MUST replace 'cleanup_validator.h5' with your actual model file
    CLEANUP_MODEL = load_model('ml/cleanup_validator.h5')
    MODEL_READY = True
except Exception as e:
    print(f"WARNING: Could not load ML model: {e}")
    MODEL_READY = False

def preprocess_images(path_before, path_after):
    """Loads and prepares images for the CNN model."""
    if not MODEL_READY:
        raise Exception("ML Model is not loaded.")
        
    IMG_SIZE = (224, 224)
    # Load and resize images
    img_before = Image.open(path_before).resize(IMG_SIZE)
    img_after = Image.open(path_after).resize(IMG_SIZE)
    
    # Convert to array, stack, and normalize (typical CNN input format)
    input_data = np.stack([np.array(img_before), np.array(img_after)], axis=0) / 255.0
    input_data = np.expand_dims(input_data, axis=0) 
    
    return input_data

def predict_improvement_score(path_before, path_after):
    """Runs inference on the images to generate ImprovementScore."""
    input_tensor = preprocess_images(path_before, path_after)
    
    # Model predicts probability (score between 0.0 and 1.0)
    prediction = CLEANUP_MODEL.predict(input_tensor)
    improvement_score = prediction[0][0]
    
    return float(improvement_score)