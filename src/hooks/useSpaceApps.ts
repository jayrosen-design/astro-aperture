import { useQuery } from "@tanstack/react-query";
import { fetchGraphQL, GET_SPACE_APPS, PostsResponse } from "@/lib/graphql";

export function useSpaceApps() {
  return useQuery({
    queryKey: ["spaceApps"],
    queryFn: () => fetchGraphQL<PostsResponse>(GET_SPACE_APPS),
    staleTime: 1000 * 60 * 5,
  });
}
