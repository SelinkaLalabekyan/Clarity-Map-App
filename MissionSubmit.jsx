import React, { useState } from 'react';
import { 
  Leaf, 
  Camera,
  Upload,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Coins,
  Award,
  Clock
} from 'lucide-react';

interface PhotoData {
  url: string;
  gps: {
    lat: number;
    lng: number;
  };
  timestamp: string;
}

export default function App() {
  const [beforePhoto, setBeforePhoto] = useState<PhotoData | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<PhotoData | null>(null);

  // Mock mission data
  const mission = {
    name: 'Kentron Center',
    zone: 11,
    reward: 45,
    targetLocation: { lat: 40.1851, lng: 44.5089 }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Mock GPS data (in real app, this would come from device GPS)
        const mockGPS = {
          lat: mission.targetLocation.lat + (Math.random() * 0.0002 - 0.0001),
          lng: mission.targetLocation.lng + (Math.random() * 0.0002 - 0.0001)
        };

        const photoData: PhotoData = {
          url: reader.result as string,
          gps: mockGPS,
          timestamp: new Date().toLocaleString()
        };

        if (type === 'before') {
          setBeforePhoto(photoData);
        } else {
          setAfterPhoto(photoData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (beforePhoto && afterPhoto) {
      alert('Mission submitted for review! You will receive your EcoPoints once approved by admin.');
    } else {
      alert('Please upload both before and after photos!');
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Simple distance calculation in meters
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <ArrowLeft className="size-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
                  <Leaf className="size-6 text-emerald-600" />
                </div>
                <span className="text-emerald-600">Clarity Map</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg">
              <Coins className="size-5 text-emerald-600" />
              <span className="text-emerald-600">2,340 Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-emerald-600 mb-2">Upload Mission Photos</h1>
            <p className="text-gray-600">
              {mission.name} - Zone #{mission.zone}
            </p>
          </div>

          {/* Mission Reward Info */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Award className="size-5 text-emerald-600" />
                <span className="text-gray-600">Reward:</span>
                <span className="text-emerald-600">+{mission.reward} EcoPoints</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-blue-600" />
                <span className="text-gray-600">Status:</span>
                <span className="text-blue-600">In Progress</span>
              </div>
            </div>
          </div>

          {/* Before & After Photo Upload Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Before Photo */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <Camera className="size-6" />
                  <h3 className="text-white">Before Photo</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Upload Area */}
                {!beforePhoto ? (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Upload className="size-8 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-gray-900 mb-1">Upload Before Photo</div>
                          <div className="text-gray-500">Click to browse</div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'before')}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    {/* Photo Preview */}
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={beforePhoto.url}
                        alt="Before"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <CheckCircle className="size-4" />
                        <span>Uploaded</span>
                      </div>
                    </div>

                    {/* Change Photo Button */}
                    <label className="block">
                      <div className="w-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition text-center cursor-pointer">
                        Change Photo
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'before')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* GPS Information */}
                {beforePhoto && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <MapPin className="size-5" />
                      <span>GPS Location</span>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Latitude:</span>
                        <span className="text-emerald-600">{beforePhoto.gps.lat.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longitude:</span>
                        <span className="text-emerald-600">{beforePhoto.gps.lng.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance from target:</span>
                        <span className="text-emerald-600">
                          {calculateDistance(
                            beforePhoto.gps.lat,
                            beforePhoto.gps.lng,
                            mission.targetLocation.lat,
                            mission.targetLocation.lng
                          )}m
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-emerald-200">
                        <span>Timestamp:</span>
                        <span className="text-gray-500">{beforePhoto.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}

                {!beforePhoto && (
                  <div className="text-center text-gray-400 py-8">
                    <MapPin className="size-8 mx-auto mb-2 opacity-50" />
                    <p>GPS location will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* After Photo */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                <div className="flex items-center gap-2 text-white">
                  <Camera className="size-6" />
                  <h3 className="text-white">After Photo</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Upload Area */}
                {!afterPhoto ? (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Upload className="size-8 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-gray-900 mb-1">Upload After Photo</div>
                          <div className="text-gray-500">Click to browse</div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, 'after')}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    {/* Photo Preview */}
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={afterPhoto.url}
                        alt="After"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <CheckCircle className="size-4" />
                        <span>Uploaded</span>
                      </div>
                    </div>

                    {/* Change Photo Button */}
                    <label className="block">
                      <div className="w-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition text-center cursor-pointer">
                        Change Photo
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(e, 'after')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* GPS Information */}
                {afterPhoto && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <MapPin className="size-5" />
                      <span>GPS Location</span>
                    </div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex justify-between">
                        <span>Latitude:</span>
                        <span className="text-emerald-600">{afterPhoto.gps.lat.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longitude:</span>
                        <span className="text-emerald-600">{afterPhoto.gps.lng.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance from target:</span>
                        <span className="text-emerald-600">
                          {calculateDistance(
                            afterPhoto.gps.lat,
                            afterPhoto.gps.lng,
                            mission.targetLocation.lat,
                            mission.targetLocation.lng
                          )}m
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-emerald-200">
                        <span>Timestamp:</span>
                        <span className="text-gray-500">{afterPhoto.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )}

                {!afterPhoto && (
                  <div className="text-center text-gray-400 py-8">
                    <MapPin className="size-8 mx-auto mb-2 opacity-50" />
                    <p>GPS location will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!beforePhoto || !afterPhoto}
              className={`flex-1 px-6 py-4 rounded-xl transition shadow-lg ${
                beforePhoto && afterPhoto
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="size-5" />
                <span>Submit for Review</span>
              </div>
            </button>
          </div>

          {/* Helper Text */}
          {beforePhoto && afterPhoto && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-blue-900">
                Great job! Your photos are ready for submission. An admin will review your work and award EcoPoints if approved.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
