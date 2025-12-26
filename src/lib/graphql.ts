const GRAPHQL_ENDPOINT = "https://jayrosen.design/graphql";

export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL query failed");
  }

  return json.data;
}

// Queries
export const GET_ASTRO_POSTS = `
  query GetAstroPosts($first: Int, $after: String) {
    posts(
      where: { categoryId: 559, orderby: { field: DATE, order: DESC } }
      first: $first
      after: $after
    ) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_POSTS_BY_TAG = `
  query GetPostsByTag($tag: String!, $first: Int) {
    posts(
      where: { 
        categoryId: 559,
        tag: $tag,
        orderby: { field: DATE, order: DESC } 
      }
      first: $first
    ) {
      nodes {
        id
        databaseId
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_ASTRO_PRODUCTS = `
  query GetAstroProducts($first: Int) {
    products(where: { categoryId: 820 }, first: $first) {
      nodes {
        ... on SimpleProduct {
          id
          databaseId
          name
          slug
          price
          regularPrice
          salePrice
          onSale
          link
          image {
            sourceUrl
            altText
          }
          shortDescription
        }
        ... on VariableProduct {
          id
          databaseId
          name
          slug
          price
          regularPrice
          salePrice
          onSale
          link
          image {
            sourceUrl
            altText
          }
          shortDescription
        }
      }
    }
  }
`;

export const GET_SINGLE_POST = `
  query GetSinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      content
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

// Types
export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

export interface Category {
  name: string;
  slug: string;
}

export interface Tag {
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage: FeaturedImage | null;
  categories: {
    nodes: Category[];
  };
  tags: {
    nodes: Tag[];
  };
}

export interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  onSale?: boolean;
  link: string;
  image: {
    sourceUrl: string;
    altText: string;
  } | null;
  shortDescription?: string;
}

export interface PostsResponse {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface ProductsResponse {
  products: {
    nodes: Product[];
  };
}

export interface SinglePostResponse {
  post: Post;
}

// Gallery categories mapping
export const GALLERY_CATEGORIES = [
  { slug: "milky-way", name: "Milky Way", icon: "✨" },
  { slug: "galaxy", name: "Galaxies", icon: "🌀" },
  { slug: "nebula", name: "Nebulae", icon: "🌌" },
  { slug: "cluster", name: "Clusters", icon: "⭐" },
  { slug: "constellation", name: "Constellations", icon: "🔭" },
  { slug: "planets", name: "Planets", icon: "🪐" },
  { slug: "sun", name: "Sun", icon: "☀️" },
  { slug: "moon", name: "Moon", icon: "🌙" },
  { slug: "meteor", name: "Meteors", icon: "☄️" },
  { slug: "aircraft", name: "Aircraft", icon: "✈️" },
] as const;
