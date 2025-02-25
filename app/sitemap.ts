import { createClient } from "@/utils/supabase/client";
import { MetadataRoute } from "next/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://localhost:3000";

  const routes = ["", "/account"];

  const staticPages = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const supabase = createClient();
  const { data: profiles } = await supabase.from("profiles").select("username");
  if (!profiles) throw new Error("No data");

  const userPages =
    profiles?.map((profile) => ({
      url: `${BASE_URL}/${profile.username}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  return [...staticPages, ...userPages];
}
