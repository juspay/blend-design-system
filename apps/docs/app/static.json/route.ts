import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// Cache this route forever since it's static
export const revalidate = false;

// Use staticGET for static export instead of regular GET
export const { staticGET: GET } = createFromSource(source);
