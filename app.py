# app.py - Main Flask Application and API Endpoints

from flask import Flask, request, jsonify
from services.validation import validate_mission_proximity
from services.rewards import calculate_and_finalize_reward
from ml.model_service import predict_improvement_score
import os

app = Flask(__name__)

# --- Configuration ---
# Set the maximum distance allowed between before/after photos (25 meters)
MAX_DISTANCE_M = 25 
UPLOAD_FOLDER = 'mission_uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# --- Database Placeholder (In a real app, this connects to PostgreSQL) ---
# Simulates database interaction functions
def save_mission_details(data):
    # This function would save geo-tags, user_id, and photo paths to your database
    return "mission_123"

@app.route('/api/missions/submit', methods=['POST'])
def submit_mission():
    """
    API endpoint to handle new mission submissions, verification, and reward processing.
    """
    # 1. Retrieve data and files
    user_id = request.form.get('user_id')
    lat_before = float(request.form.get('lat_before'))
    lon_before = float(request.form.get('lon_before'))
    lat_after = float(request.form.get('lat_after'))
    lon_after = float(request.form.get('lon_after'))
    pollution_level = request.form.get('pollution_level')
    
    # Check for required photo files 
    if 'photo_before' not in request.files or 'photo_after' not in request.files:
        return jsonify({"error": "Missing one or both photos"}), 400

    photo_before = request.files['photo_before']
    photo_after = request.files['photo_after']

    # Save photos temporarily (or to AWS S3/Cloud Storage in production)
    path_before = os.path.join(app.config['UPLOAD_FOLDER'], 'before_' + photo_before.filename)
    path_after = os.path.join(app.config['UPLOAD_FOLDER'], 'after_' + photo_after.filename)
    photo_before.save(path_before)
    photo_after.save(path_after)
    
    # 2. Run Geo-Validation (Task 2)
    is_valid_geo, geo_message = validate_mission_proximity(
        lat_before, lon_before, lat_after, lon_after, MAX_DISTANCE_M
    )

    if not is_valid_geo:
        # In a real app, clean up files and log error
        return jsonify({"error": f"Geo-Validation Failed: {geo_message}"}), 400

    # 3. Run ML Inference (Task 3) - ASYNCHRONOUSLY
    # NOTE: For simplicity, this is synchronous. In production, this should be sent 
    # to a background queue (Celery/Redis) to avoid blocking the main API.
    try:
        improvement_score = predict_improvement_score(path_before, path_after)
    except Exception as e:
        # Log error in ML model, set mission status to PENDING_MANUAL_REVIEW
        return jsonify({"error": f"ML Processing Failed: {str(e)}"}), 500

    # 4. Finalize Reward (Task 4)
    if improvement_score > 0.6: # Assume 0.6 is the threshold for success
        reward_points = calculate_and_finalize_reward(
            user_id, improvement_score, pollution_level, mission_id=save_mission_details(request.form)
        )
        status = "APPROVED"
        message = f"Mission approved! Earned {reward_points} EcoPoints."
    else:
        status = "REJECTED"
        message = "Mission rejected. Insufficient cleanup detected by ML model."
    
    # 5. Return Result
    return jsonify({
        "status": status,
        "message": message,
        "score": improvement_score
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)