import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Repeat2, Share, CheckCircle } from "lucide-react";
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
    <Card className="glassmorphic rounded-2xl p-6 chirp-card border-0">
      <div className="flex space-x-4">
        <Avatar className="w-12 h-12 border-2 border-saffron">
          <AvatarImage src={post.author.profileImageUrl || undefined} />
          <AvatarFallback className="bg-saffron-gradient text-white">
            {getInitials(post.author.firstName, post.author.lastName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-foreground">
              {getDisplayName(post.author.firstName, post.author.lastName, post.author.username)}
            </h4>
            {post.author.verified && (
              <CheckCircle className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-muted-foreground text-sm">
              @{post.author.username || post.author.id}
            </span>
            <span className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true })}
            </span>
          </div>

          <p className="text-foreground leading-relaxed mb-4">
            {post.content}
          </p>

          {/* Media Content */}
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="rounded-xl w-full h-48 object-cover mb-4"
            />
          )}

          {post.type === "audio" && post.audioUrl && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-4">
                <Button size="sm" className="w-12 h-12 bg-purple-500 rounded-full hover:bg-purple-600">
                  <i className="fas fa-play text-white"></i>
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
                <Badge variant="secondary" className="text-purple-600">
                  🎵 Voice Chirp
                </Badge>
              </div>
            </div>
          )}

          {post.type === "video" && post.videoUrl && (
            <div className="relative rounded-xl overflow-hidden mb-4 group cursor-pointer">
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform mx-auto mb-2">
                    <i className="fas fa-play text-gray-800 dark:text-white ml-1"></i>
                  </div>
                  <Badge className="bg-blue-gradient text-white">
                    FlashChirp
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between text-muted-foreground">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post._count.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => repostMutation.mutate()}
              disabled={repostMutation.isPending}
              className={`flex items-center space-x-2 hover:text-emerald transition-colors ${
                reposted ? "text-emerald" : ""
              }`}
            >
              <Repeat2 className="w-4 h-4" />
              <span>{post._count.reposts}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => likeMutation.mutate()}
              disabled={likeMutation.isPending}
              className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
                liked ? "text-red-500" : ""
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span>{post._count.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:text-blue-500 transition-colors"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
