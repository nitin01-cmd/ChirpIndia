import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Egg, Sparkles, Users, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-saffron-gradient rounded-full flex items-center justify-center">
              <Egg className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-saffron to-emerald bg-clip-text text-transparent">
              ChirpIndia
            </span>
          </div>
          <Button
            onClick={() => window.location.href = "/api/login"}
            className="bg-saffron-gradient hover:scale-105 transition-transform text-white font-semibold px-6 py-2 rounded-full"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-saffron via-emerald to-royal-blue bg-clip-text text-transparent">
            Your Voice, Our Vibe 🇮🇳
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From Kashmir to Kanyakumari, express your thoughts in every tongue. 
            Real talk. Real trends. Real India.
          </p>
          <Button
            onClick={() => window.location.href = "/api/login"}
            size="lg"
            className="bg-saffron-gradient hover:scale-105 transition-transform text-white font-semibold px-8 py-4 rounded-full text-lg floating-btn"
          >
            Join ChirpIndia
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="glassmorphic chirp-card border-0">
            <CardHeader>
              <div className="w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Voice Chirps</CardTitle>
              <CardDescription>
                Share your thoughts with voice messages in your native language
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glassmorphic chirp-card border-0">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-gradient rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">FlashChirps</CardTitle>
              <CardDescription>
                Quick video stories that capture moments in 15 seconds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="glassmorphic chirp-card border-0">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-gradient rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">ChirpRooms</CardTitle>
              <CardDescription>
                Join live audio conversations about topics you love
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Indian Cultural Elements */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Celebrating Indian Digital Culture
          </h2>
          <div className="flex justify-center space-x-8 text-4xl mb-8">
            <span className="animate-bounce">🪔</span>
            <span className="animate-bounce delay-100">🎵</span>
            <span className="animate-bounce delay-200">🏛️</span>
            <span className="animate-bounce delay-300">🎨</span>
            <span className="animate-bounce delay-500">🍛</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with millions across India. Share festival moments, discuss cricket, 
            celebrate achievements, and build communities that reflect our incredible diversity.
          </p>
        </div>
      </main>
    </div>
  );
}
