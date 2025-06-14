import {
  users,
  posts,
  likes,
  comments,
  reposts,
  follows,
  hashtags,
  postHashtags,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment,
  type PostWithAuthor,
  type UserWithCounts,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, or, ilike } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  updateUserProfile(id: string, data: Partial<User>): Promise<User>;
  getUserWithCounts(id: string): Promise<UserWithCounts | undefined>;
  
  // Post operations
  createPost(post: InsertPost): Promise<Post>;
  getPost(id: number): Promise<PostWithAuthor | undefined>;
  getHomeFeed(userId: string, limit?: number, offset?: number): Promise<PostWithAuthor[]>;
  getUserPosts(userId: string, limit?: number, offset?: number): Promise<PostWithAuthor[]>;
  searchPosts(query: string, limit?: number): Promise<PostWithAuthor[]>;
  deletePost(id: number, userId: string): Promise<boolean>;
  
  // Like operations
  likePost(userId: string, postId: number): Promise<void>;
  unlikePost(userId: string, postId: number): Promise<void>;
  isPostLiked(userId: string, postId: number): Promise<boolean>;
  
  // Comment operations
  createComment(comment: InsertComment): Promise<Comment>;
  getPostComments(postId: number): Promise<(Comment & { user: User })[]>;
  deleteComment(id: number, userId: string): Promise<boolean>;
  
  // Repost operations
  repost(userId: string, postId: number): Promise<void>;
  unrepost(userId: string, postId: number): Promise<void>;
  isPostReposted(userId: string, postId: number): Promise<boolean>;
  
  // Follow operations
  followUser(followerId: string, followingId: string): Promise<void>;
  unfollowUser(followerId: string, followingId: string): Promise<void>;
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  getFollowers(userId: string): Promise<User[]>;
  getFollowing(userId: string): Promise<User[]>;
  
  // Hashtag operations
  getTrendingHashtags(limit?: number): Promise<(typeof hashtags.$inferSelect)[]>;
  
  // Search operations
  searchUsers(query: string, limit?: number): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async updateUserProfile(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUserWithCounts(id: string): Promise<UserWithCounts | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const [followersCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(follows)
      .where(eq(follows.followingId, id));

    const [followingCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(follows)
      .where(eq(follows.followerId, id));

    const [postsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts)
      .where(eq(posts.authorId, id));

    return {
      ...user,
      _count: {
        followers: followersCount?.count || 0,
        following: followingCount?.count || 0,
        posts: postsCount?.count || 0,
      },
    };
  }

  // Post operations
  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async getPost(id: number): Promise<PostWithAuthor | undefined> {
    const [post] = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.id, id));

    if (!post || !post.users) return undefined;

    const [likesCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(likes)
      .where(eq(likes.postId, id));

    const [commentsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(comments)
      .where(eq(comments.postId, id));

    const [repostsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(reposts)
      .where(eq(reposts.postId, id));

    return {
      ...post.posts,
      author: post.users,
      likes: [],
      comments: [],
      reposts: [],
      _count: {
        likes: likesCount?.count || 0,
        comments: commentsCount?.count || 0,
        reposts: repostsCount?.count || 0,
      },
    };
  }

  async getHomeFeed(userId: string, limit = 20, offset = 0): Promise<PostWithAuthor[]> {
    // Get posts from followed users and own posts
    const feedPosts = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(follows, eq(follows.followingId, posts.authorId))
      .where(
        or(
          eq(follows.followerId, userId),
          eq(posts.authorId, userId)
        )
      )
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    const postsWithCounts = await Promise.all(
      feedPosts.map(async (post) => {
        if (!post.users) return null;

        const [likesCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(likes)
          .where(eq(likes.postId, post.posts.id));

        const [commentsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(comments)
          .where(eq(comments.postId, post.posts.id));

        const [repostsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(reposts)
          .where(eq(reposts.postId, post.posts.id));

        return {
          ...post.posts,
          author: post.users,
          likes: [],
          comments: [],
          reposts: [],
          _count: {
            likes: likesCount?.count || 0,
            comments: commentsCount?.count || 0,
            reposts: repostsCount?.count || 0,
          },
        };
      })
    );

    return postsWithCounts.filter(Boolean) as PostWithAuthor[];
  }

  async getUserPosts(userId: string, limit = 20, offset = 0): Promise<PostWithAuthor[]> {
    const userPosts = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.authorId, userId))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    const postsWithCounts = await Promise.all(
      userPosts.map(async (post) => {
        if (!post.users) return null;

        const [likesCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(likes)
          .where(eq(likes.postId, post.posts.id));

        const [commentsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(comments)
          .where(eq(comments.postId, post.posts.id));

        const [repostsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(reposts)
          .where(eq(reposts.postId, post.posts.id));

        return {
          ...post.posts,
          author: post.users,
          likes: [],
          comments: [],
          reposts: [],
          _count: {
            likes: likesCount?.count || 0,
            comments: commentsCount?.count || 0,
            reposts: repostsCount?.count || 0,
          },
        };
      })
    );

    return postsWithCounts.filter(Boolean) as PostWithAuthor[];
  }

  async searchPosts(query: string, limit = 20): Promise<PostWithAuthor[]> {
    const searchResults = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(ilike(posts.content, `%${query}%`))
      .orderBy(desc(posts.createdAt))
      .limit(limit);

    const postsWithCounts = await Promise.all(
      searchResults.map(async (post) => {
        if (!post.users) return null;

        const [likesCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(likes)
          .where(eq(likes.postId, post.posts.id));

        const [commentsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(comments)
          .where(eq(comments.postId, post.posts.id));

        const [repostsCount] = await db
          .select({ count: sql<number>`count(*)` })
          .from(reposts)
          .where(eq(reposts.postId, post.posts.id));

        return {
          ...post.posts,
          author: post.users,
          likes: [],
          comments: [],
          reposts: [],
          _count: {
            likes: likesCount?.count || 0,
            comments: commentsCount?.count || 0,
            reposts: repostsCount?.count || 0,
          },
        };
      })
    );

    return postsWithCounts.filter(Boolean) as PostWithAuthor[];
  }

  async deletePost(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(posts)
      .where(and(eq(posts.id, id), eq(posts.authorId, userId)))
      .returning();
    return result.length > 0;
  }

  // Like operations
  async likePost(userId: string, postId: number): Promise<void> {
    await db.insert(likes).values({ userId, postId }).onConflictDoNothing();
  }

  async unlikePost(userId: string, postId: number): Promise<void> {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
  }

  async isPostLiked(userId: string, postId: number): Promise<boolean> {
    const [like] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));
    return !!like;
  }

  // Comment operations
  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async getPostComments(postId: number): Promise<(Comment & { user: User })[]> {
    const postComments = await db
      .select()
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.createdAt));

    return postComments
      .filter(c => c.users)
      .map(c => ({ ...c.comments, user: c.users! }));
  }

  async deleteComment(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(comments)
      .where(and(eq(comments.id, id), eq(comments.userId, userId)))
      .returning();
    return result.length > 0;
  }

  // Repost operations
  async repost(userId: string, postId: number): Promise<void> {
    await db.insert(reposts).values({ userId, postId }).onConflictDoNothing();
  }

  async unrepost(userId: string, postId: number): Promise<void> {
    await db
      .delete(reposts)
      .where(and(eq(reposts.userId, userId), eq(reposts.postId, postId)));
  }

  async isPostReposted(userId: string, postId: number): Promise<boolean> {
    const [repost] = await db
      .select()
      .from(reposts)
      .where(and(eq(reposts.userId, userId), eq(reposts.postId, postId)));
    return !!repost;
  }

  // Follow operations
  async followUser(followerId: string, followingId: string): Promise<void> {
    await db.insert(follows).values({ followerId, followingId }).onConflictDoNothing();
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    await db
      .delete(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
  }

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const [follow] = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, followerId), eq(follows.followingId, followingId)));
    return !!follow;
  }

  async getFollowers(userId: string): Promise<User[]> {
    const followers = await db
      .select()
      .from(follows)
      .leftJoin(users, eq(follows.followerId, users.id))
      .where(eq(follows.followingId, userId));

    return followers.filter(f => f.users).map(f => f.users!);
  }

  async getFollowing(userId: string): Promise<User[]> {
    const following = await db
      .select()
      .from(follows)
      .leftJoin(users, eq(follows.followingId, users.id))
      .where(eq(follows.followerId, userId));

    return following.filter(f => f.users).map(f => f.users!);
  }

  // Hashtag operations
  async getTrendingHashtags(limit = 10): Promise<(typeof hashtags.$inferSelect)[]> {
    return await db
      .select()
      .from(hashtags)
      .orderBy(desc(hashtags.count))
      .limit(limit);
  }

  // Search operations
  async searchUsers(query: string, limit = 20): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(
        or(
          ilike(users.username, `%${query}%`),
          ilike(users.firstName, `%${query}%`),
          ilike(users.lastName, `%${query}%`)
        )
      )
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
