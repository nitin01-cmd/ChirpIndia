import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Image, Mic, BarChart3, Smile } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function CreatePost() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");

  const createPostMutation = useMutation({
    mutationFn: async (postData: { content: string; type?: string }) => {
      const response = await apiRequest("POST", "/api/posts", postData);
      return response.json();
    },
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["/api/posts/feed"] });
      toast({
        title: "Success",
        description: "Your chirp has been posted!",
      });
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
        description: "Failed to create post",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createPostMutation.mutate({ content: content.trim() });
    }
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  if (!user) return null;

  return (
    <Card className="glassmorphic rounded-2xl p-6 border-0">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12 border-2 border-emerald">
            <AvatarImage src={user.profileImageUrl || undefined} />
            <AvatarFallback className="bg-emerald-gradient text-white">
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="What's chirping in your mind? 🐦"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent resize-none text-lg placeholder-muted-foreground focus:outline-none border-none shadow-none min-h-[80px]"
              maxLength={280}
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-500 transition-colors"
                >
                  <Image className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/20 text-green-500 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 text-purple-500 transition-colors"
                >
                  <BarChart3 className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-yellow-500 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {280 - content.length}
                </span>
                <Button
                  type="submit"
                  disabled={!content.trim() || createPostMutation.isPending}
                  className="bg-emerald-gradient text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {createPostMutation.isPending ? "Posting..." : "Chirp"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
