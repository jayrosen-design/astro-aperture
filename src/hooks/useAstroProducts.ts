import { useQuery } from "@tanstack/react-query";
import {
  fetchGraphQL,
  GET_ASTRO_PRODUCTS,
  ProductsResponse,
} from "@/lib/graphql";

export function useAstroProducts(first: number = 50) {
  return useQuery({
    queryKey: ["astroProducts", first],
    queryFn: () =>
      fetchGraphQL<ProductsResponse>(GET_ASTRO_PRODUCTS, { first }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
