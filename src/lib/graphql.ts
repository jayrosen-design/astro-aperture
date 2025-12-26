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
  query GetPostsByTag($tag: String!, $first: Int, $after: String) {
    posts(
      where: { 
        categoryId: 559,
        tag: $tag,
        orderby: { field: DATE, order: DESC } 
      }
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

export type GalleryCategory = {
  slug: string;
  name: string;
  icon: string;
  /** optional tag slug to query (when URL slug differs from WP tag) */
  tag?: string;
  /** image URL for category card */
  image?: string;
};

// Gallery categories mapping
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { 
    slug: "milky-way", 
    name: "Milky Way", 
    icon: "✨",
    image: "https://jayrosen.design/wp-content/uploads/2020/10/stacked-again-edit-web.png"
  },
  { 
    slug: "galaxy", 
    name: "Galaxies", 
    icon: "🌀",
    image: "https://jayrosen.design/wp-content/uploads/2022/10/andromeda-500mm-web.jpg"
  },
  { 
    slug: "nebula", 
    name: "Nebulae", 
    icon: "🌌",
    image: "https://jayrosen.design/wp-content/uploads/2024/06/jayrosen_orion.png"
  },
  { 
    slug: "cluster", 
    name: "Clusters", 
    icon: "⭐",
    image: "https://jayrosen.design/wp-content/uploads/2023/12/2023-04-29-09.50.18-3091673463127789266_1769437166-1.jpg"
  },
  { 
    slug: "planets", 
    name: "Planets", 
    icon: "🪐",
    image: "https://jayrosen.design/wp-content/uploads/2022/10/jupiter-edit2.png"
  },
  { 
    slug: "sun", 
    name: "Sun", 
    icon: "☀️",
    image: "https://jayrosen.design/wp-content/uploads/2022/08/2020-08-14-12.47.33-iss-solar-transit.jpg"
  },
  { 
    slug: "moon", 
    name: "Moon", 
    icon: "🌙",
    image: "https://jayrosen.design/wp-content/uploads/2022/08/2020-08-13-18.14.37-moon.jpg"
  },
  { 
    slug: "meteor", 
    name: "Meteors", 
    icon: "☄️",
    image: "https://jayrosen.design/wp-content/uploads/2022/08/2021-07-11-11.19.48-comet-neowise.jpg"
  },
  { 
    slug: "rockets", 
    name: "Rockets", 
    icon: "🚀", 
    tag: "aircraft",
    image: "https://jayrosen.design/wp-content/uploads/2023/01/2022-11-17-10.07.03-2973573642467157247_1769437166.jpg"
  },
  { 
    slug: "videos", 
    name: "Videos", 
    icon: "🎞️", 
    tag: "timelapse",
    image: "https://jayrosen.design/wp-content/uploads/2024/06/milkyway-pano-web-scaled.jpg"
  },
];
