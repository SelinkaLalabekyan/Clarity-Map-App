import React, { useState } from 'react';
import { 
  Leaf, 
  MapPin, 
  Award,
  AlertCircle,
  Camera,
  Upload,
  CheckCircle,
  ArrowLeft,
  Info,
  Navigation,
  Coins
} from 'lucide-react';

export default function App() {
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock mission data
  const mission = {
    id: 11,
    name: 'Kentron Center',
    severity: 'high',
    reward: 45,
    coordinates: { lat: 40.1851, lng: 44.5089 },
    description: 'High pollution area requiring immediate cleanup',
    estimatedTime: '30-45 minutes',
    difficulty: 'Medium'
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(0);
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onloadend = () => {
        setUploadProgress(100);
        setBeforePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartMission = () => {
    if (beforePhoto) {
      alert('Mission started! Go to the location and start cleaning. Upload the after photo when you\'re done.');
    } else {
      alert('Please upload a before photo first!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-emerald-600 mb-2">Start Cleaning Mission</h1>
            <p className="text-gray-600">
              Upload a before photo and start making a difference in your community
            </p>
          </div>

          {/* Mission Info Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white mb-2">{mission.name}</h2>
                  <div className="flex items-center gap-2 text-emerald-50">
                    <MapPin className="size-4" />
                    <span>Zone #{mission.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Award className="size-5" />
                  <div>
                    <div className="text-white">+{mission.reward}</div>
                    <div className="text-emerald-50">EcoPoints</div>
                  </div>
                </div>
              </div>
              <p className="text-emerald-50">{mission.description}</p>
            </div>

            {/* Zone Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pollution Level */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="size-5 text-red-600" />
                    <span className="text-gray-900">Pollution Level</span>
                  </div>
                  <div className="text-red-600">
                    {mission.severity.toUpperCase()}
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="size-5 text-blue-600" />
                    <span className="text-gray-900">Estimated Time</span>
                  </div>
                  <div className="text-blue-600">
                    {mission.estimatedTime}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="size-5 text-amber-600" />
                    <span className="text-gray-900">Difficulty</span>
                  </div>
                  <div className="text-amber-600">
                    {mission.difficulty}
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Navigation className="size-5 text-emerald-600" />
                      <span className="text-gray-900">GPS Coordinates</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      <div>
                        <span className="text-gray-500">Latitude:</span>
                        <div className="text-emerald-600">{mission.coordinates.lat}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Longitude:</span>
                        <div className="text-emerald-600">{mission.coordinates.lng}</div>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition">
                    Open Map
                  </button>
                </div>
              </div>

              {/* Mission Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="text-gray-900 mb-3">Mission Requirements</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Upload a before photo at the location with GPS verification</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Complete the cleanup activity at the specified zone</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Upload an after photo showing visible improvement</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Wait for admin approval to receive your EcoPoints reward</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Before Photo Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="size-6 text-emerald-600" />
              <h3 className="text-gray-900">Upload Before Photo</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Take a photo of the polluted area before starting your cleanup mission. Make sure GPS location is enabled.
            </p>

            {/* Upload Area */}
            {!beforePhoto ? (
              <label className="block">
                <div className="border-2 border-dashed border-emerald-300 rounded-xl p-12 text-center hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Upload className="size-10 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-gray-900 mb-1">Click to upload or drag and drop</div>
                      <div className="text-gray-500">PNG, JPG up to 10MB</div>
                    </div>
                    <div className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition">
                      Choose Photo
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-4">
                {/* Preview */}
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={beforePhoto}
                    alt="Before photo"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <CheckCircle className="size-5" />
                    <span>Photo Uploaded</span>
                  </div>
                </div>

                {/* Photo Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Camera className="size-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">before-photo.jpg</div>
                      <div className="text-gray-500">GPS verified • Ready for mission</div>
                    </div>
                  </div>
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition">
                      Change Photo
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Uploading...</span>
                  <span className="text-emerald-600">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="size-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-gray-900 mb-2">Important Note</h4>
                <p className="text-gray-600">
                  Before starting the mission, make sure you're at the correct location. Your GPS coordinates must match the zone location (within 25 meters). After completing the cleanup, you'll need to upload an after photo showing the improvement.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition">
              Cancel
            </button>
            <button
              onClick={handleStartMission}
              disabled={!beforePhoto}
              className={`flex-1 px-6 py-4 rounded-xl transition shadow-lg ${
                beforePhoto
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Leaf className="size-5" />
                <span>Start Mission</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

                             