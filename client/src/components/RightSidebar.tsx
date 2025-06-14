import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Flame, Mic } from "lucide-react";
import type { User, Hashtag } from "@shared/schema";

export default function RightSidebar() {
  const { data: trending = [] } = useQuery<Hashtag[]>({
    queryKey: ["/api/trending/hashtags"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mock suggested users for now - in a real app this would come from an API
  const suggestedUsers: User[] = [];

  // Mock live rooms for now
  const liveRooms = [
    { id: 1, title: "Tech Talk Tuesday", listeners: 2300, live: true, category: "tech" },
    { id: 2, title: "Bollywood Music Jam", listeners: 1800, live: true, category: "music" },
  ];

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* Trending Section */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Flame className="w-5 h-5 text-orange-500 mr-2" />
              Trending in India
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trending.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">No trending topics yet</p>
              </div>
            ) : (
              trending.map((hashtag) => (
                <div
                  key={hashtag.id}
                  className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <p className="font-semibold text-foreground">#{hashtag.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {hashtag.count?.toLocaleString()} Chirps
                  </p>
                </div>
              ))
            )}
            
            {/* Default trending topics when no data */}
            {trending.length === 0 && (
              <>
                <div className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <p className="font-semibold text-foreground">#TechIndia</p>
                  <p className="text-sm text-muted-foreground">15.2K Chirps</p>
                </div>
                <div className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <p className="font-semibold text-foreground">#MonsoonVibes</p>
                  <p className="text-sm text-muted-foreground">8.7K Chirps</p>
                </div>
                <div className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <p className="font-semibold text-foreground">#DigitalIndia</p>
                  <p className="text-sm text-muted-foreground">12.1K Chirps</p>
                </div>
                <div className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <p className="font-semibold text-foreground">#StartupLife</p>
                  <p className="text-sm text-muted-foreground">6.3K Chirps</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Active ChirpRooms */}
        <Card className="glassmorphic rounded-2xl border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Mic className="w-5 h-5 text-purple-500 mr-2" />
              Live ChirpRooms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveRooms.map((room) => (
              <div
                key={room.id}
                className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 p-3 rounded-lg transition-colors border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full pulse-animation"></div>
                  <Badge variant="secondary" className="text-purple-600 text-xs">
                    LIVE
                  </Badge>
                </div>
                <p className="font-semibold text-foreground text-sm">{room.title}</p>
                <p className="text-xs text-muted-foreground">
                  {room.listeners.toLocaleString()} listening
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggested Users */}
        {suggestedUsers.length > 0 && (
          <Card className="glassmorphic rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">Who to follow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.profileImageUrl || undefined} />
                      <AvatarFallback>
                        {user.firstName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-muted-foreground text-xs">@{user.username}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-emerald-gradient text-white hover:scale-105 transition-transform"
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </aside>
  );
}
