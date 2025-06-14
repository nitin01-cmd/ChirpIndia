import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Flame, Mic, Calendar, MapPin, Star, Users, Globe, Clock, ChevronRight, TrendingUp, Radio } from "lucide-react";
import type { User, Hashtag } from "@shared/schema";

export default function RightSidebar() {
  const { data: trending = [] } = useQuery<Hashtag[]>({
    queryKey: ["/api/trending/hashtags"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Regional trending topics with Indian context
  const regionalTrends = [
    { 
      hashtag: "IPL2024", 
      count: 234567, 
      category: "Sports", 
      location: "All India",
      icon: "🏏",
      growth: "+45%"
    },
    { 
      hashtag: "MumbaiRains", 
      count: 89234, 
      category: "Weather", 
      location: "Mumbai",
      icon: "🌧️",
      growth: "+230%"
    },
    { 
      hashtag: "DelhiMetro", 
      count: 67890, 
      category: "Transport", 
      location: "Delhi",
      icon: "🚇",
      growth: "+12%"
    },
    { 
      hashtag: "BengaluruTraffic", 
      count: 45623, 
      category: "City Life", 
      location: "Bengaluru",
      icon: "🚗",
      growth: "+8%"
    },
    { 
      hashtag: "KeralaFood", 
      count: 34567, 
      category: "Food", 
      location: "Kerala",
      icon: "🥥",
      growth: "+67%"
    }
  ];

  // Live ChirpRooms with Indian themes
  const liveRooms = [
    { 
      id: 1, 
      title: "Cricket Discussion: India vs Australia", 
      listeners: 12340, 
      host: "SportsGuru2024",
      category: "Sports",
      duration: "2h 15m",
      participants: 45,
      isLive: true,
      language: "Hindi/English"
    },
    { 
      id: 2, 
      title: "Bollywood Music Night", 
      listeners: 8765, 
      host: "MusicMania",
      category: "Entertainment",
      duration: "1h 30m",
      participants: 32,
      isLive: true,
      language: "Hindi"
    },
    { 
      id: 3, 
      title: "Startup Funding Stories", 
      listeners: 5432, 
      host: "TechTalks",
      category: "Business",
      duration: "45m",
      participants: 28,
      isLive: true,
      language: "English"
    },
    { 
      id: 4, 
      title: "Regional Cinema Reviews", 
      listeners: 3210, 
      host: "CinemaLover",
      category: "Movies",
      duration: "1h 10m",
      participants: 19,
      isLive: true,
      language: "Tamil"
    }
  ];

  // Upcoming events with Indian cultural context
  const upcomingEvents = [
    {
      id: 1,
      title: "Diwali Celebration 2024",
      date: "Nov 12, 2024",
      time: "6:00 PM",
      location: "Virtual",
      attendees: 2340,
      category: "Festival"
    },
    {
      id: 2,
      title: "Tech Conference Mumbai",
      date: "Dec 5, 2024",
      time: "10:00 AM",
      location: "Mumbai",
      attendees: 567,
      category: "Technology"
    },
    {
      id: 3,
      title: "India Cultural Exchange",
      date: "Nov 25, 2024",
      time: "4:00 PM",
      location: "Virtual",
      attendees: 890,
      category: "Culture"
    }
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {/* Enhanced Trending Section */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Flame className="w-5 h-5 text-orange-500 mr-2" />
                Trending in India
              </div>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {regionalTrends.map((trend, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-3 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{trend.icon}</span>
                      <p className="font-semibold text-foreground">#{trend.hashtag}</p>
                      <Badge variant="secondary" className="text-xs px-1 py-0 text-green-600 bg-green-100 dark:bg-green-900/30">
                        {trend.growth}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trend.count.toLocaleString()} Chirps • {trend.category}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {trend.location}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Live ChirpRooms */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center">
                <Radio className="w-5 h-5 text-purple-500 mr-2" />
                Live ChirpRooms
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-purple-600 hover:text-purple-700">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveRooms.map((room) => (
              <div
                key={room.id}
                className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-3 rounded-lg transition-all duration-200 border border-purple-200/50 dark:border-purple-800/50 group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full pulse-animation"></div>
                    <Badge variant="secondary" className="text-red-600 text-xs bg-red-100 dark:bg-red-900/30">
                      LIVE
                    </Badge>
                    <span className="text-xs text-muted-foreground">{room.language}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                
                <p className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                  {room.title}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {room.listeners.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {room.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  Hosted by @{room.host}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-3 rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm mb-1">
                      {event.title}
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {event.date} • {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {event.attendees.toLocaleString()} interested
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Regional Weather & News */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Globe className="w-5 h-5 text-green-500 mr-2" />
              India Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">Delhi Weather</p>
                <span className="text-2xl">☀️</span>
              </div>
              <p className="text-xs text-muted-foreground">32°C • Clear skies</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">Perfect day for outdoor activities!</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">Stock Market</p>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-xs text-muted-foreground">Sensex: +2.3% • Nifty: +1.8%</p>
              <p className="text-xs text-green-600 dark:text-green-400">Markets showing strong performance</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm">Featured Story</p>
                <span className="text-lg">📰</span>
              </div>
              <p className="text-xs text-muted-foreground">India's Digital Revolution</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">How social media is changing India</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">ChirpIndia Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-saffron">50K+</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald">1.2M</p>
                  <p className="text-xs text-muted-foreground">Daily Chirps</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-500">28</p>
                  <p className="text-xs text-muted-foreground">States</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-500">22+</p>
                  <p className="text-xs text-muted-foreground">Languages</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
