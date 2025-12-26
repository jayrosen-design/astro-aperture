import { useQuery } from "@tanstack/react-query";
import { fetchGraphQL } from "@/lib/graphql";

export const GET_GEAR_LIST = `
  query GetGearList {
    cameras: products(where: { category: "cameras", status: "PUBLISH" }) {
      nodes {
        id
        name
        image { sourceUrl }
        ... on ExternalProduct {
          price
          externalUrl
          buttonText
        }
      }
    }
    lenses: products(where: { category: "camera-lens", status: "PUBLISH" }) {
      nodes {
        id
        name
        image { sourceUrl }
        ... on ExternalProduct {
          price
          externalUrl
          buttonText
        }
      }
    }
    cameraAccessories: products(where: { category: "camera-accessories", status: "PUBLISH" }) {
      nodes {
        id
        name
        image { sourceUrl }
        ... on ExternalProduct {
          price
          externalUrl
          buttonText
        }
      }
    }
    telescopes: products(where: { category: "telescopes", status: "PUBLISH" }) {
      nodes {
        id
        name
        image { sourceUrl }
        ... on ExternalProduct {
          price
          externalUrl
          buttonText
        }
      }
    }
    telescopeAccessories: products(where: { category: "telescope-accessories", status: "PUBLISH" }) {
      nodes {
        id
        name
        image { sourceUrl }
        ... on ExternalProduct {
          price
          externalUrl
          buttonText
        }
      }
    }
  }
`;

export interface GearProduct {
  id: string;
  name: string;
  image: {
    sourceUrl: string;
  } | null;
  price?: string;
  externalUrl?: string;
  buttonText?: string;
}

export interface GearListResponse {
  cameras: { nodes: GearProduct[] };
  lenses: { nodes: GearProduct[] };
  cameraAccessories: { nodes: GearProduct[] };
  telescopes: { nodes: GearProduct[] };
  telescopeAccessories: { nodes: GearProduct[] };
}

export function useGear() {
  return useQuery({
    queryKey: ["gear"],
    queryFn: () => fetchGraphQL<GearListResponse>(GET_GEAR_LIST),
  });
}
