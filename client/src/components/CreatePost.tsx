import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Image, Mic, BarChart3, Smile, Video, MapPin, Calendar, Languages, Clock, Globe } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function CreatePost() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);

  // Indian emoji collections
  const indianEmojis = {
    festivals: ["🪔", "🎆", "🕉️", "🙏", "🎊", "🌺", "🧿", "🔱"],
    food: ["🍛", "🥘", "🫖", "🥭", "🌶️", "🧈", "🍚", "🥜"],
    culture: ["🏛️", "🐘", "🦚", "🎵", "🪘", "🪕", "🎨", "📿"],
    nature: ["🌴", "🏔️", "🌊", "🦋", "🌸", "🌿", "☀️", "🌙"]
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" }
  ];

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

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPanel(false);
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const getPlaceholders = () => {
    const placeholders = [
      "What's happening in your city? 🏙️",
      "Share your festival moments! 🎆",
      "Cricket thoughts? 🏏",
      "What's cooking today? 🍛",
      "Morning chai thoughts? ☕",
      "Bollywood review? 🎬",
      "Startup updates? 🚀",
      "Travel stories? ✈️"
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  };

  if (!user) return null;

  return (
    <Card className="glassmorphic rounded-2xl border-0 overflow-hidden">
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <Avatar className="w-12 h-12 border-2 border-emerald">
              <AvatarImage src={user?.profileImageUrl || undefined} />
              <AvatarFallback className="bg-emerald-gradient text-white">
                {getInitials(user?.firstName, user?.lastName)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {/* Language Selector */}
              <div className="flex items-center space-x-2 mb-3">
                <Languages className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm bg-transparent border-none focus:outline-none text-muted-foreground"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
                <Badge variant="outline" className="text-xs">
                  Auto-translate enabled
                </Badge>
              </div>

              <Textarea
                placeholder={getPlaceholders()}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent resize-none text-lg placeholder-muted-foreground focus:outline-none border-none shadow-none min-h-[100px]"
                maxLength={280}
              />

              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 text-blue-500 transition-colors"
                    title="Add Image"
                  >
                    <Image className="w-5 h-5" />
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-full transition-colors ${
                      isRecording 
                        ? "bg-red-100 dark:bg-red-900/20 text-red-500" 
                        : "hover:bg-green-100 dark:hover:bg-green-900/20 text-green-500"
                    }`}
                    title="Voice Chirp"
                  >
                    <Mic className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 text-purple-500 transition-colors"
                    title="FlashChirp Video"
                  >
                    <Video className="w-5 h-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/20 text-orange-500 transition-colors"
                    title="Add Poll"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                    className="p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/20 text-yellow-500 transition-colors"
                    title="Indian Emojis"
                  >
                    <Smile className="w-5 h-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/20 text-pink-500 transition-colors"
                    title="Add Location"
                  >
                    <MapPin className="w-5 h-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/20 text-indigo-500 transition-colors"
                    title="Schedule Post"
                  >
                    <Clock className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-sm transition-colors ${
                    content.length > 250 ? "text-red-500" : 
                    content.length > 200 ? "text-yellow-500" : "text-muted-foreground"
                  }`}>
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
      </div>

      {/* Indian Emoji Panel */}
      {showEmojiPanel && (
        <>
          <Separator />
          <div className="p-4 bg-gradient-to-r from-orange-50/50 to-green-50/50 dark:from-orange-900/10 dark:to-green-900/10">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">🎊 Festivals</h4>
                <div className="flex flex-wrap gap-2">
                  {indianEmojis.festivals.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:scale-125 transition-transform p-1 rounded hover:bg-white/50"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">🍛 Food</h4>
                <div className="flex flex-wrap gap-2">
                  {indianEmojis.food.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:scale-125 transition-transform p-1 rounded hover:bg-white/50"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">🏛️ Culture</h4>
                <div className="flex flex-wrap gap-2">
                  {indianEmojis.culture.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:scale-125 transition-transform p-1 rounded hover:bg-white/50"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">🌴 Nature</h4>
                <div className="flex flex-wrap gap-2">
                  {indianEmojis.nature.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => addEmoji(emoji)}
                      className="text-xl hover:scale-125 transition-transform p-1 rounded hover:bg-white/50"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Voice Recording Indicator */}
      {isRecording && (
        <>
          <Separator />
          <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Recording voice chirp... Speak in your preferred language
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsRecording(false)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Stop
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
