import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.8,
      images: projects.flatMap((p) => p.images.map((img) => `${site.url}${img.src.src}`)),
    },
  ];
}
