import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Egg, Sparkles, Users, Zap, Mic, Languages, Heart, Globe, Video, MessageSquare, TrendingUp, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-saffron/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center shadow-lg">
              <Egg className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-saffron via-emerald to-royal-blue bg-clip-text text-transparent">
                ChirpIndia
              </span>
              <p className="text-xs text-muted-foreground">Where India Speaks</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden md:flex bg-emerald/20 text-emerald border-emerald/30">
              🚀 Join 50K+ Users
            </Badge>
            <Button
              onClick={() => window.location.href = "/api/login"}
              className="bg-saffron-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-saffron/20 to-emerald/20 text-saffron border-saffron/30 mb-4">
              🎉 Celebrating Unity in Diversity
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-saffron via-emerald via-purple-600 to-royal-blue bg-clip-text text-transparent leading-tight">
            Your Voice, Our Vibe 🇮🇳
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            From the snow-capped peaks of Kashmir to the vibrant beaches of Kanyakumari, 
            connect with your fellow Indians. Share stories in 22+ languages, celebrate festivals together, 
            debate cricket matches, and build the digital Bharat of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              onClick={() => window.location.href = "/api/login"}
              size="lg"
              className="bg-saffron-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-full text-lg floating-btn shadow-lg hover:shadow-xl"
            >
              Join ChirpIndia Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald text-emerald hover:bg-emerald hover:text-white transition-all duration-300 px-8 py-4 rounded-full text-lg"
            >
              Explore Features
            </Button>
          </div>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald" />
              <span>50K+ Active Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>28 States Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Languages className="w-4 h-4 text-purple-500" />
              <span>22+ Languages</span>
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-saffron-gradient rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Voice Chirps</CardTitle>
              <CardDescription className="text-center">
                Share your thoughts with voice messages in Hindi, Tamil, Bengali, or any of the 22+ Indian languages. 
                Your voice, your language, your story.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">🎤 Try voice recording in your mother tongue</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-gradient rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Video className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">FlashChirps</CardTitle>
              <CardDescription className="text-center">
                Create 15-second video stories capturing your daily moments - from morning chai to evening aarti, 
                from street food adventures to startup hustle.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-green-700 dark:text-green-300">📱 Instagram-style stories for India</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-gradient rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">ChirpRooms</CardTitle>
              <CardDescription className="text-center">
                Join live audio conversations about cricket matches, Bollywood gossip, startup discussions, 
                or spiritual talks. Connect with like-minded Indians.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">🎧 Live audio like Clubhouse for India</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Languages className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Smart Translation</CardTitle>
              <CardDescription className="text-center">
                AI-powered translation between Indian languages. Write in Hindi, reach Tamil speakers. 
                Break language barriers, unite India digitally.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-pink-700 dark:text-pink-300">🔄 Real-time language bridge</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Regional Trends</CardTitle>
              <CardDescription className="text-center">
                Discover what's trending in your state, city, or region. From local festivals to regional politics, 
                stay connected with your community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">📍 Hyperlocal content discovery</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphic chirp-card border-0 group hover:shadow-2xl transition-all duration-500">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl mb-2">Cultural Safety</CardTitle>
              <CardDescription className="text-center">
                AI-moderated content respecting Indian values and cultural sensitivities. 
                A safe space for meaningful conversations and authentic connections.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 text-center">
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">🛡️ Family-friendly platform</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Indian Cultural Elements */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Celebrating Digital Bharat
          </h2>
          <div className="flex justify-center space-x-4 md:space-x-8 text-4xl md:text-5xl mb-8">
            <span className="animate-bounce hover:scale-125 transition-transform cursor-pointer">🪔</span>
            <span className="animate-bounce delay-100 hover:scale-125 transition-transform cursor-pointer">🎵</span>
            <span className="animate-bounce delay-200 hover:scale-125 transition-transform cursor-pointer">🏛️</span>
            <span className="animate-bounce delay-300 hover:scale-125 transition-transform cursor-pointer">🎨</span>
            <span className="animate-bounce delay-500 hover:scale-125 transition-transform cursor-pointer">🍛</span>
            <span className="animate-bounce delay-700 hover:scale-125 transition-transform cursor-pointer">🕉️</span>
            <span className="animate-bounce delay-1000 hover:scale-125 transition-transform cursor-pointer">🏏</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            From Diwali celebrations in Delhi to Durga Puja in Kolkata, from Onam in Kerala to Baisakhi in Punjab - 
            ChirpIndia brings together the incredible tapestry of Indian culture. Share festival moments, discuss cricket matches, 
            celebrate achievements, debate movies, and build communities that reflect our beautiful diversity.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glassmorphic rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🏏</div>
              <h4 className="font-semibold mb-2">Cricket Central</h4>
              <p className="text-sm text-muted-foreground">Live discussions during IPL, World Cup, and every boundary</p>
            </div>
            <div className="glassmorphic rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🎬</div>
              <h4 className="font-semibold mb-2">Bollywood & Beyond</h4>
              <p className="text-sm text-muted-foreground">From Bollywood to regional cinema, discuss your favorite films</p>
            </div>
            <div className="glassmorphic rounded-xl p-6 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2">Startup Stories</h4>
              <p className="text-sm text-muted-foreground">Connect with entrepreneurs building the future of India</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="glassmorphic rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Join India's Fastest Growing Social Platform</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-saffron mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Chirps Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">28</div>
              <div className="text-sm text-muted-foreground">States Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">22+</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center glassmorphic rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-saffron to-emerald bg-clip-text text-transparent">
            Ready to Join the Conversation?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of India's digital revolution. Share your voice, connect with millions, and help build the future of social media in India.
          </p>
          <Button
            onClick={() => window.location.href = "/api/login"}
            size="lg"
            className="bg-saffron-gradient hover:scale-105 transition-all duration-300 text-white font-semibold px-12 py-4 rounded-full text-xl floating-btn shadow-xl hover:shadow-2xl"
          >
            Start Your Journey 🚀
          </Button>
        </div>
      </main>
    </div>
  );
}
