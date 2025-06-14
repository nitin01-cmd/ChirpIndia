import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Repeat2, Share, CheckCircle, MapPin, Languages, Play, Volume2, MoreHorizontal, Bookmark, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { PostWithAuthor } from "@shared/schema";
import { isUnauthorizedError } from "@/lib/authUtils";

interface PostCardProps {
  post: PostWithAuthor;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

  const likeMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/posts/${post.id}/like`);
    },
    onSuccess: () => {
      setLiked(!liked);
      queryClient.invalidateQueries({ queryKey: ["/api/posts/feed"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
    },
  });

  const repostMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/posts/${post.id}/repost`);
    },
    onSuccess: () => {
      setReposted(!reposted);
      queryClient.invalidateQueries({ queryKey: ["/api/posts/feed"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to repost",
        variant: "destructive",
      });
    },
  });

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

  return (
    <Card className="glassmorphic rounded-2xl border-0 chirp-card overflow-hidden">
      <div className="p-6">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12 border-2 border-saffron">
            <AvatarImage src={post.author.profileImageUrl || undefined} />
            <AvatarFallback className="bg-saffron-gradient text-white">
              {getInitials(post.author.firstName, post.author.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-foreground hover:underline cursor-pointer">
                  {getDisplayName(post.author.firstName, post.author.lastName, post.author.username)}
                </h4>
                {post.author.verified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
                <span className="text-muted-foreground text-sm">
                  @{post.author.username || post.author.id}
                </span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm hover:underline cursor-pointer">
                  {formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true })}
                </span>
              </div>
              <Button variant="ghost" size="sm" className="p-1 hover:bg-white/20 dark:hover:bg-white/10 rounded-full">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>

            {/* Post Content with enhanced formatting */}
            <div className="mb-4">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {post.content.split(/(\s+)/).map((word, index) => {
                  if (word.startsWith('#')) {
                    return (
                      <span key={index} className="text-blue-500 hover:underline cursor-pointer font-medium">
                        {word}
                      </span>
                    );
                  }
                  if (word.startsWith('@')) {
                    return (
                      <span key={index} className="text-emerald hover:underline cursor-pointer font-medium">
                        {word}
                      </span>
                    );
                  }
                  return word;
                })}
              </p>
              
              {/* Location/Translation tags */}
              <div className="flex items-center space-x-2 mt-2">
                {Math.random() > 0.7 && (
                  <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>Mumbai, Maharashtra</span>
                  </Badge>
                )}
                {Math.random() > 0.8 && (
                  <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                    <Languages className="w-3 h-3" />
                    <span>Translated from Hindi</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* Enhanced Media Content */}
            {post.imageUrl && (
              <div className="rounded-xl overflow-hidden mb-4 border border-border/50">
                <img 
                  src={post.imageUrl} 
                  alt="Post image" 
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </div>
            )}

            {post.type === "audio" && post.audioUrl && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 mb-4 border border-purple-200/50 dark:border-purple-800/50">
                <div className="flex items-center space-x-4">
                  <Button size="sm" className="w-12 h-12 bg-purple-500 rounded-full hover:bg-purple-600 hover:scale-110 transition-all">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </Button>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>0:45</span>
                      <span>2:30</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Badge variant="secondary" className="text-purple-600 flex items-center space-x-1">
                      <span>🎵</span>
                      <span>Voice Chirp</span>
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {post.type === "video" && post.videoUrl && (
              <div className="relative rounded-xl overflow-hidden mb-4 group cursor-pointer border border-border/50">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform mx-auto mb-2 shadow-lg">
                      <Play className="w-6 h-6 text-gray-800 dark:text-white ml-0.5" />
                    </div>
                    <Badge className="bg-blue-gradient text-white shadow-lg">
                      FlashChirp • 15s
                    </Badge>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                    HD
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="opacity-50" />

      {/* Enhanced Action Buttons */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all px-3 py-2 rounded-full group"
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{post._count.comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => repostMutation.mutate()}
            disabled={repostMutation.isPending}
            className={`flex items-center space-x-2 hover:bg-emerald/10 transition-all px-3 py-2 rounded-full group ${
              reposted ? "text-emerald" : "hover:text-emerald"
            }`}
          >
            <Repeat2 className={`w-4 h-4 group-hover:scale-110 transition-transform ${reposted ? "text-emerald" : ""}`} />
            <span className="font-medium">{post._count.reposts}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => likeMutation.mutate()}
            disabled={likeMutation.isPending}
            className={`flex items-center space-x-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all px-3 py-2 rounded-full group ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 group-hover:scale-110 transition-transform ${liked ? "fill-current text-red-500" : ""}`} />
            <span className="font-medium">{post._count.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all px-3 py-2 rounded-full group"
          >
            <Share className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all p-2 rounded-full group"
          >
            <Bookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
