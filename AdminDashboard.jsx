import React, { useState } from 'react';
import { 
  Leaf, 
  Users,
  Target,
  MapPin,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Award,
  Eye,
  Filter,
  Search,
  Download,
  Calendar
} from 'lucide-react';

// Mock data for submitted missions
const pendingMissions = [
  {
    id: 1,
    user: 'Alex Petrosyan',
    zone: 'Republic Square',
    zoneId: 1,
    submittedAt: '2024-12-12 14:30',
    beforePhoto: 'https://images.unsplash.com/photo-1637681316418-dd7a4b6e545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xsdXRlZCUyMGFyZWElMjB0cmFzaHxlbnwxfHx8fDE3NjU1MDgwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    afterPhoto: 'https://images.unsplash.com/photo-1679409750331-066039993ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHBhcmslMjBhZnRlcnxlbnwxfHx8fDE3NjU1MDgwODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    points: 35,
    status: 'pending',
    gpsMatch: true
  },
  {
    id: 2,
    user: 'Maria Sargsyan',
    zone: 'Victory Park',
    zoneId: 7,
    submittedAt: '2024-12-12 13:15',
    beforePhoto: 'https://images.unsplash.com/photo-1762805543693-5aaa00fadc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY2xlYW51cCUyMHN0cmVldHxlbnwxfHx8fDE3NjU1MDgwODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    afterPhoto: 'https://images.unsplash.com/photo-1663584215475-c9a7125237ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGVudmlyb25tZW50JTIwbmF0dXJlfGVufDF8fHx8MTc2NTQzMDE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    points: 30,
    status: 'pending',
    gpsMatch: true
  },
  {
    id: 3,
    user: 'Davit Karapetyan',
    zone: 'Cascade Complex',
    zoneId: 4,
    submittedAt: '2024-12-12 11:45',
    beforePhoto: 'https://images.unsplash.com/photo-1637681316418-dd7a4b6e545e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xsdXRlZCUyMGFyZWElMjB0cmFzaHxlbnwxfHx8fDE3NjU1MDgwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    afterPhoto: 'https://images.unsplash.com/photo-1679409750331-066039993ba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHBhcmslMjBhZnRlcnxlbnwxfHx8fDE3NjU1MDgwODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    points: 15,
    status: 'pending',
    gpsMatch: false
  },
  {
    id: 4,
    user: 'Ani Hovhannisyan',
    zone: 'Northern Avenue',
    zoneId: 3,
    submittedAt: '2024-12-12 10:20',
    beforePhoto: 'https://images.unsplash.com/photo-1762805543693-5aaa00fadc28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY2xlYW51cCUyMHN0cmVldHxlbnwxfHx8fDE3NjU1MDgwODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    afterPhoto: 'https://images.unsplash.com/photo-1663584215475-c9a7125237ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGVudmlyb25tZW50JTIwbmF0dXJlfGVufDF8fHx8MTc2NTQzMDE5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    points: 20,
    status: 'pending',
    gpsMatch: true
  },
];

const topUsers = [
  { name: 'Alex Petrosyan', missions: 28, points: 1240 },
  { name: 'Maria Sargsyan', missions: 24, points: 1050 },
  { name: 'Davit Karapetyan', missions: 19, points: 820 },
  { name: 'Ani Hovhannisyan', missions: 16, points: 710 },
  { name: 'Armen Grigoryan', missions: 14, points: 640 },
];

export default function App() {
  const [activeNav, setActiveNav] = useState('missions');
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [missions, setMissions] = useState(pendingMissions);

  const handleApprove = (missionId: number) => {
    setMissions(missions.map(m => 
      m.id === missionId ? { ...m, status: 'approved' } : m
    ));
    alert('Mission approved! User has been awarded EcoPoints.');
  };

  const handleReject = (missionId: number) => {
    setMissions(missions.map(m => 
      m.id === missionId ? { ...m, status: 'rejected' } : m
    ));
    alert('Mission rejected. User has been notified.');
  };

  const stats = {
    totalMissions: 342,
    pendingMissions: missions.filter(m => m.status === 'pending').length,
    approvedToday: 18,
    avgPollutionLevel: 62,
    pollutionChange: -8,
    totalUsers: 1247,
    activeUsers: 892,
    totalPoints: 45820
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg">
              <Leaf className="size-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-emerald-600">Clarity Map</div>
              <div className="text-gray-500">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveNav('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === 'dashboard'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="size-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveNav('missions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === 'missions'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Target className="size-5" />
            <span>Missions</span>
            {stats.pendingMissions > 0 && (
              <span className="ml-auto bg-red-500 text-white px-2 py-0.5 rounded-full">
                {stats.pendingMissions}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveNav('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === 'users'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="size-5" />
            <span>Users</span>
          </button>

          <button
            onClick={() => setActiveNav('zones')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === 'zones'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MapPin className="size-5" />
            <span>Zones</span>
          </button>

          <button
            onClick={() => setActiveNav('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeNav === 'settings'
                ? 'bg-emerald-50 text-emerald-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="size-5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Admin Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
              AD
            </div>
            <div>
              <div className="text-gray-900">Admin User</div>
              <div className="text-gray-500">admin@clarity.am</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900">
                  {activeNav === 'missions' ? 'Mission Review' : 
                   activeNav === 'users' ? 'User Management' :
                   activeNav === 'zones' ? 'Zone Management' :
                   activeNav === 'settings' ? 'Settings' : 'Dashboard'}
                </h1>
                <p className="text-gray-600">
                  {activeNav === 'missions' ? 'Review and approve submitted cleanup missions' : 
                   'Manage your Clarity Map platform'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                  <Download className="size-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Missions */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="size-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="size-4" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="text-gray-900 mb-1">{stats.totalMissions}</div>
              <p className="text-gray-600">Total Missions</p>
              <div className="mt-2 text-blue-600">
                {stats.approvedToday} approved today
              </div>
            </div>

            {/* Pollution Level */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="size-6 text-amber-600" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingDown className="size-4" />
                  <span>{stats.pollutionChange}%</span>
                </div>
              </div>
              <div className="text-gray-900 mb-1">{stats.avgPollutionLevel}%</div>
              <p className="text-gray-600">Avg Pollution Level</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${stats.avgPollutionLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="size-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="size-4" />
                  <span>+5%</span>
                </div>
              </div>
              <div className="text-gray-900 mb-1">{stats.totalUsers}</div>
              <p className="text-gray-600">Total Users</p>
              <div className="mt-2 text-purple-600">
                {stats.activeUsers} active this week
              </div>
            </div>

            {/* Total Points Awarded */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Award className="size-6 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="size-4" />
                  <span>+18%</span>
                </div>
              </div>
              <div className="text-gray-900 mb-1">{stats.totalPoints.toLocaleString()}</div>
              <p className="text-gray-600">Total EcoPoints</p>
              <div className="mt-2 text-emerald-600">
                Awarded to community
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Missions List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search missions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Filter className="size-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Mission Cards */}
              <div className="space-y-4">
                {missions.filter(m => m.status === 'pending').map((mission) => (
                  <div
                    key={mission.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                  >
                    {/* Mission Header */}
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-gray-900 mb-1">{mission.zone}</h3>
                          <div className="flex items-center gap-3 text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="size-4" />
                              <span>{mission.user}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>{mission.submittedAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {mission.gpsMatch ? (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
                              <CheckCircle className="size-4" />
                              <span>GPS Match</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg">
                              <AlertCircle className="size-4" />
                              <span>GPS Warning</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Before/After Photos */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-gray-600 mb-2">Before Photo</div>
                          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                            <img
                              src={mission.beforePhoto}
                              alt="Before"
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <Eye className="size-8 text-white" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-2">After Photo</div>
                          <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                            <img
                              src={mission.afterPhoto}
                              alt="After"
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                              <Eye className="size-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mission Details */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-5 text-gray-600" />
                          <span className="text-gray-700">Zone #{mission.zoneId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="size-5 text-emerald-600" />
                          <span className="text-emerald-600">{mission.points} Points</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 bg-gray-50 flex gap-3">
                      <button
                        onClick={() => handleReject(mission.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition"
                      >
                        <XCircle className="size-5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApprove(mission.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition shadow-lg shadow-emerald-600/30"
                      >
                        <CheckCircle className="size-5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                ))}

                {missions.filter(m => m.status === 'pending').length === 0 && (
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
                    <CheckCircle className="size-16 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending missions to review at the moment.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Top Users & Stats */}
            <div className="space-y-6">
              {/* Pending Count */}
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="size-6" />
                  </div>
                  <div>
                    <div className="text-white mb-1">{stats.pendingMissions}</div>
                    <div className="text-amber-100">Pending Review</div>
                  </div>
                </div>
                <p className="text-amber-100">
                  Please review and approve missions to award EcoPoints
                </p>
              </div>

              {/* Top Users Leaderboard */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {topUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                          index === 0 ? 'bg-amber-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' :
                          'bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-900 truncate">{user.name}</div>
                        <div className="text-gray-500">{user.missions} missions</div>
                      </div>
                      <div className="text-emerald-600">{user.points}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <MapPin className="size-5 text-emerald-600" />
                    <span>Add New Zone</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Users className="size-5 text-blue-600" />
                    <span>View All Users</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                    <Download className="size-5 text-purple-600" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
