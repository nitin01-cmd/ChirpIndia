import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Home, Compass, TrendingUp, Play, Mic, User, LogOut, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Sidebar() {
  const { user } = useAuth();
  const [location] = useLocation();

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const getDisplayName = (firstName?: string | null, lastName?: string | null, username?: string | null) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName) return firstName;
    if (lastName) return lastName;
    return username || "Unknown User";
  };

  if (!user) return null;

  const menuItems = [
    { icon: Home, label: "Home", path: "/", active: location === "/" },
    { icon: Compass, label: "Explore", path: "/explore", active: location === "/explore" },
    { icon: TrendingUp, label: "Trending", path: "/trending", active: location === "/trending" },
    { icon: Play, label: "FlashChirps", path: "/flashchirps", active: location === "/flashchirps" },
    { icon: Mic, label: "ChirpRooms", path: "/rooms", active: location === "/rooms" },
    { icon: User, label: "Profile", path: "/profile", active: location === "/profile" },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* User Profile Card */}
        <Card className="glassmorphic rounded-2xl p-6 border-0">
          <div className="text-center">
            <Avatar className="w-16 h-16 mx-auto mb-3 border-2 border-saffron">
              <AvatarImage src={user.profileImageUrl || undefined} />
              <AvatarFallback className="bg-saffron-gradient text-white text-lg">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-foreground">
              {getDisplayName(user.firstName, user.lastName, user.username)}
            </h3>
            <p className="text-muted-foreground text-sm">
              @{user.username || user.id}
            </p>
            <div className="flex justify-center space-x-4 mt-3 text-sm">
              <span className="text-muted-foreground">
                <strong>{user._count?.following || 0}</strong> Following
              </span>
              <span className="text-muted-foreground">
                <strong>{user._count?.followers || 0}</strong> Followers
              </span>
            </div>
          </div>
        </Card>

        {/* Navigation Menu */}
        <Card className="glassmorphic rounded-2xl p-4 border-0">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={item.active ? "default" : "ghost"}
                    className={`w-full justify-start space-x-3 ${
                      item.active
                        ? "bg-saffron-gradient text-white hover:bg-saffron-gradient"
                        : "hover:bg-white/20 dark:hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </Card>

        {/* Chirp Button */}
        <Button className="w-full bg-saffron-gradient text-white font-semibold py-3 rounded-full hover:scale-105 transition-transform floating-btn mb-4">
          <i className="fas fa-plus mr-2"></i>
          New Chirp
        </Button>

        {/* Settings and Logout */}
        <Card className="glassmorphic rounded-2xl p-4 border-0">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 hover:bg-white/20 dark:hover:bg-white/10"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.location.href = "/api/logout"}
              className="w-full justify-start space-x-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Button>
          </div>
        </Card>
      </div>
    </aside>
  );
}
