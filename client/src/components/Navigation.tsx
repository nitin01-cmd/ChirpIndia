import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Egg, Search, Bell, Mail, Moon, Sun } from "lucide-react";

export default function Navigation() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 glassmorphic border-b border-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-saffron-gradient rounded-full flex items-center justify-center">
              <Egg className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-saffron to-emerald bg-clip-text text-transparent">
              ChirpIndia
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search ChirpIndia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 glassmorphic border-border bg-input text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-saffron/50 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </form>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full glassmorphic hover:bg-white/20 dark:hover:bg-white/10 transition-all"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full glassmorphic hover:bg-white/20 dark:hover:bg-white/10 transition-all"
            >
              <Mail className="w-5 h-5 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 rounded-full glassmorphic hover:bg-white/20 dark:hover:bg-white/10 transition-all"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </Button>

            {user && (
              <Avatar className="w-8 h-8 border-2 border-saffron cursor-pointer">
                <AvatarImage src={user.profileImageUrl || undefined} />
                <AvatarFallback className="bg-saffron-gradient text-white text-sm">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
            )}

            {!user && (
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="bg-saffron-gradient hover:scale-105 transition-transform text-white font-semibold px-4 py-2 rounded-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
