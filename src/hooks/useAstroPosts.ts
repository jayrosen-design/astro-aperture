import { useQuery } from "@tanstack/react-query";
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
    queryFn: () =>
      fetchGraphQL<PostsResponse>(GET_ASTRO_POSTS, { first }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePostsByTag(tag: string, first: number = 20) {
  return useQuery({
    queryKey: ["postsByTag", tag, first],
    queryFn: () =>
      fetchGraphQL<PostsResponse>(GET_POSTS_BY_TAG, { tag, first }),
    staleTime: 1000 * 60 * 5,
    enabled: !!tag,
  });
}

export function useSinglePost(slug: string) {
  return useQuery({
    queryKey: ["singlePost", slug],
    queryFn: () =>
      fetchGraphQL<SinglePostResponse>(GET_SINGLE_POST, { slug }),
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });
}
