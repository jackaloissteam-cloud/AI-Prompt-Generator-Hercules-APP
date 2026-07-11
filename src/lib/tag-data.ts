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