import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchGraphQL,
  GET_ASTRO_POSTS,
  GET_POSTS_BY_TAG,
  GET_SINGLE_POST,
  PostsResponse,
  SinglePostResponse,
} from "@/lib/graphql";

export function useAstroPosts(first: number = 20) {
  return useQuery({
    queryKey: ["astroPosts", first],
    queryFn: () => fetchGraphQL<PostsResponse>(GET_ASTRO_POSTS, { first }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePostsByTag(tag: string, first: number = 20) {
  return useQuery({
    queryKey: ["postsByTag", tag, first],
    queryFn: () => fetchGraphQL<PostsResponse>(GET_POSTS_BY_TAG, { tag, first }),
    staleTime: 1000 * 60 * 5,
    enabled: !!tag,
  });
}

export function useInfiniteAstroPosts(first: number = 24) {
  return useInfiniteQuery({
    queryKey: ["astroPostsInfinite", first],
    queryFn: ({ pageParam }) =>
      fetchGraphQL<PostsResponse>(GET_ASTRO_POSTS, {
        first,
        after: pageParam ?? null,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.posts.pageInfo.hasNextPage
        ? lastPage.posts.pageInfo.endCursor
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useInfinitePostsByTag(tag: string, first: number = 24) {
  return useInfiniteQuery({
    queryKey: ["postsByTagInfinite", tag, first],
    queryFn: ({ pageParam }) =>
      fetchGraphQL<PostsResponse>(GET_POSTS_BY_TAG, {
        tag,
        first,
        after: pageParam ?? null,
      }),
    enabled: !!tag,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.posts.pageInfo.hasNextPage
        ? lastPage.posts.pageInfo.endCursor
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSinglePost(slug: string) {
  return useQuery({
    queryKey: ["singlePost", slug],
    queryFn: () => fetchGraphQL<SinglePostResponse>(GET_SINGLE_POST, { slug }),
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
}

