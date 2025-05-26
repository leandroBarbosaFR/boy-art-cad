import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "lravb4kh",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});