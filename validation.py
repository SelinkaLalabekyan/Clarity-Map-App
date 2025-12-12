# services/validation.py

from geopy.distance import geodesic

def validate_mission_proximity(lat1, lon1, lat2, lon2, max_distance_m):
    """
    Calculates the distance between 'Before' and 'After' photo coordinates.
    Returns True if distance is within the maximum allowed threshold.
    """
    coord_before = (lat1, lon1)
    coord_after = (lat2, lon2)
    distance = geodesic(coord_before, coord_after).meters
    
    if distance > max_distance_m:
        return False, f"Distance {distance:.2f}m exceeds {max_distance_m}m limit."
    
    return True, "GPS Proximity Match"