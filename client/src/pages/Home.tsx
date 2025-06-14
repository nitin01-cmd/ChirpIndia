import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { PostWithAuthor } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  const { data: posts = [], isLoading: feedLoading, error } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/posts/feed"],
    enabled: isAuthenticated,
  });

  // Handle unauthorized errors
  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-saffron-gradient rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <span className="text-2xl">🐦</span>
          </div>
          <p className="text-lg text-muted-foreground">Loading ChirpIndia...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <main className="lg:col-span-2">
        <div className="space-y-6">
          {/* Create Post */}
          <CreatePost />

          {/* Feed */}
          {feedLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glassmorphic rounded-2xl p-6 border-0">
                  <div className="flex space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-32 w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glassmorphic rounded-2xl p-12 text-center border-0">
              <div className="text-6xl mb-4">🐦</div>
              <h3 className="text-xl font-semibold mb-2">Your feed is empty</h3>
              <p className="text-muted-foreground mb-6">
                Follow some users to see their chirps in your feed!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
