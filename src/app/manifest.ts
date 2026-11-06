import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "DDS Reformas",
    description: "Construção, reformas e retrofit em Alphaville e região.",
    start_url: "/",
    display: "browser",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "pt-BR",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
