export type TagCategory =
  | "character"
  | "appearance"
  | "clothing"
  | "pose"
  | "environment"
  | "lighting"
  | "style";

export type Tag = {
  id: number;
  name: string;
  category: TagCategory;
  weight: number;
};

export const CATEGORY_LABELS: Record<TagCategory, string> = {
  character: "Character",
  appearance: "Appearance",
  clothing: "Clothing",
  pose: "Pose",
  environment: "Environment",
  lighting: "Lighting",
  style: "Style",
};

let _id = 0;
const tag = (name: string, category: TagCategory): Tag => ({
  id: ++_id,
  name,
  category,
  weight: 1.0,
});

export const DEFAULT_TAGS: Tag[] = [
  // Character
  tag("digital woman", "character"),
  tag("cyberpunk girl", "character"),
  tag("space explorer", "character"),
  tag("warrior princess", "character"),
  tag("elegant lady", "character"),
  tag("fantasy elf", "character"),
  tag("young man", "character"),
  tag("mysterious stranger", "character"),

  // Appearance
  tag("long blonde hair", "appearance"),
  tag("short dark hair", "appearance"),
  tag("curly red hair", "appearance"),
  tag("blue eyes", "appearance"),
  tag("brown eyes", "appearance"),
  tag("brown skin tone", "appearance"),
  tag("freckles", "appearance"),
  tag("chubby body", "appearance"),
  tag("athletic build", "appearance"),
  tag("50 years old", "appearance"),
  tag("young 20s", "appearance"),

  // Clothing
  tag("spaghetti strap shirt", "clothing"),
  tag("shirt and pants", "clothing"),
  tag("battle armor", "clothing"),
  tag("elegant dress", "clothing"),
  tag("streetwear", "clothing"),
  tag("cyberpunk jacket", "clothing"),
  tag("fantasy robe", "clothing"),
  tag("swimwear", "clothing"),
  tag("business suit", "clothing"),
  tag("nude", "clothing"),
  tag("minimalistic", "clothing"),

  // Pose
  tag("standing", "pose"),
  tag("sitting", "pose"),
  tag("walking", "pose"),
  tag("looking at camera", "pose"),
  tag("arms up", "pose"),
  tag("dynamic action pose", "pose"),
  tag("spreading legs", "pose"),
  tag("leaning against wall", "pose"),
  tag("crouching", "pose"),

  // Environment
  tag("cyberpunk city", "environment"),
  tag("enchanted forest", "environment"),
  tag("space station", "environment"),
  tag("studio background", "environment"),
  tag("beach at sunset", "environment"),
  tag("ancient ruins", "environment"),
  tag("futuristic interior", "environment"),
  tag("mountain landscape", "environment"),

  // Lighting
  tag("cinematic lighting", "lighting"),
  tag("neon glow", "lighting"),
  tag("soft natural light", "lighting"),
  tag("golden hour", "lighting"),
  tag("dramatic shadows", "lighting"),
  tag("rim lighting", "lighting"),
  tag("studio lighting", "lighting"),
  tag("moonlight", "lighting"),

  // Style
  tag("photorealistic", "style"),
  tag("digital art", "style"),
  tag("anime style", "style"),
  tag("hyperrealistic", "style"),
  tag("oil painting", "style"),
  tag("concept art", "style"),
  tag("fantasy illustration", "style"),
  tag("8K render", "style"),

  // Perchance Art Styles
  tag("Traditional Japanese", "style"),
  tag("Nihonga Painting", "style"),
  tag("Claymation", "style"),
  tag("Cartoon", "style"),
  tag("Cursed Photo", "style"),
  tag("MTG Card", "style"),
  tag("Crayon Drawing", "style"),
  tag("Pencil", "style"),
  tag("Tattoo Design", "style"),
  tag("Waifu", "style"),
  tag("YuGiOh Art", "style"),
  tag("Fantasy World Map", "style"),
  tag("Fantasy City Map", "style"),
  tag("Old World Map", "style"),
  tag("3D Isometric Icon", "style"),
  tag("Flat Style Icon", "style"),
  tag("Flat Style Logo", "style"),
  tag("Game Art Icon", "style"),
  tag("Digital Painting Icon", "style"),
  tag("Concept Art Icon", "style"),
  tag("Cute 3D Icon", "style"),
  tag("Cute 3D Icon Set", "style"),
  tag("Vintage Anime", "style"),
  tag("Neon Vintage Anime", "style"),
  tag("Manga", "style"),
  tag("Vintage Pulp Art", "style"),
  tag("50s Infomercial Anime", "style"),
  tag("3D Pokemon", "style"),
  tag("Painted Pokemon", "style"),
  tag("2D Pokemon", "style"),
  tag("Illustration", "style"),
  tag("Cute Illustration", "style"),
  tag("Flat Illustration", "style"),
  tag("Watercolor", "style"),
  tag("1990s Photo", "style"),
  tag("1980s Photo", "style"),
  tag("1970s Photo", "style"),
  tag("1960s Photo", "style"),
  tag("1950s Photo", "style"),
  tag("1940s Photo", "style"),
  tag("1930s Photo", "style"),
  tag("1920s Photo", "style"),
  tag("Furry - Cinematic", "style"),
  tag("Furry - Painted", "style"),
  tag("Furry - Drawn", "style"),
  tag("Cute Figurine", "style"),
  tag("3D Emoji", "style"),
  tag("Fantasy Landscape", "style"),
  tag("Fantasy Portrait", "style"),
  tag("Studio Ghibli", "style"),
  tag("50s Enamel Sign", "style"),
  tag("Vintage Comic", "style"),
  tag("Franco-Belgian Comic", "style"),
  tag("Tintin Comic", "style"),
  tag("Medieval", "style"),
  tag("Pixel Art", "style"),
  tag("Furry - Oil", "style"),
  tag("Anime", "style"),
  tag("Drawn Anime", "style"),
  tag("Anime Screencap", "style"),
  tag("Cute Anime", "style"),
  tag("Soft Anime", "style"),
  tag("Fantasy Painting", "style"),
  tag("Oil Painting - Realism", "style"),
  tag("Oil Painting - Old", "style"),
  tag("Oil Painting - 70s Pulp", "style"),
  tag("Professional Photo", "style"),
  tag("3D Disney Character", "style"),
  tag("2D Disney Character", "style"),
  tag("Disney Sketch", "style"),
  tag("Concept Sketch", "style"),
  tag("Painterly", "style"),
  tag("Painted Anime", "style"),
  tag("Casual Photo", "style"),
  tag("Cinematic", "style"),
  tag("Digital Painting", "style"),
];

export const NEGATIVE_PRESETS: string[] = [
  "blurry", "low quality", "bad anatomy", "extra limbs",
  "deformed", "ugly", "watermark", "text", "pixelated",
  "overexposed", "underexposed", "bad proportions",
  "duplicate", "cropped", "out of frame",
];

export const CATEGORIES: TagCategory[] = [
  "character", "appearance", "clothing", "pose",
  "environment", "lighting", "style",
];

export type SelectedTag = Tag & { weight: number };

export function buildPrompt(selectedTags: SelectedTag[]): string {
  const byCategory: Partial<Record<TagCategory, SelectedTag[]>> = {};
  for (const t of selectedTags) {
    if (!byCategory[t.category]) byCategory[t.category] = [];
    byCategory[t.category]!.push(t);
  }
  const parts: string[] = [];
  const fmt = (t: SelectedTag) =>
    t.weight !== 1.0 ? `(${t.name}:${t.weight.toFixed(1)})` : t.name;

  if (byCategory.character)    parts.push(byCategory.character.map(fmt).join(", "));
  if (byCategory.appearance)   parts.push(byCategory.appearance.map(fmt).join(", "));
  if (byCategory.clothing)     parts.push("wearing " + byCategory.clothing.map(fmt).join(", "));
  if (byCategory.pose)         parts.push(byCategory.pose.map(fmt).join(", "));
  if (byCategory.environment)  parts.push(byCategory.environment.map(fmt).join(", "));
  if (byCategory.lighting)     parts.push(byCategory.lighting.map(fmt).join(", "));
  if (byCategory.style)        parts.push(byCategory.style.map(fmt).join(", "));
  return parts.join(", ");
}