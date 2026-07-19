import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { CATEGORY_LABELS, type Tag, type SelectedTag, type TagCategory } from "@/lib/tag-data.ts";
import WeightSlider from "./WeightSlider.tsx";

// Per-category color accent classes (Tailwind arbitrary values)
const CATEGORY_ACCENT: Record<TagCategory, string> = {
  character:   "border-[oklch(0.72_0.2_310)] text-[oklch(0.72_0.2_310)]",
  appearance:  "border-[oklch(0.62_0.22_190)] text-[oklch(0.62_0.22_190)]",
  clothing:    "border-[oklch(0.7_0.18_45)] text-[oklch(0.7_0.18_45)]",
  pose:        "border-[oklch(0.65_0.22_150)] text-[oklch(0.65_0.22_150)]",
  environment: "border-[oklch(0.68_0.2_260)] text-[oklch(0.68_0.2_260)]",
  lighting:    "border-[oklch(0.72_0.18_80)] text-[oklch(0.72_0.18_80)]",
  style:       "border-[oklch(0.7_0.2_340)] text-[oklch(0.7_0.2_340)]",
};

const CATEGORY_SELECTED_BG: Record<TagCategory, string> = {
  character:   "bg-[oklch(0.72_0.2_310/0.18)] border-[oklch(0.72_0.2_310)] text-[oklch(0.82_0.15_310)]",
  appearance:  "bg-[oklch(0.62_0.22_190/0.18)] border-[oklch(0.62_0.22_190)] text-[oklch(0.72_0.18_190)]",
  clothing:    "bg-[oklch(0.7_0.18_45/0.18)] border-[oklch(0.7_0.18_45)] text-[oklch(0.8_0.14_45)]",
  pose:        "bg-[oklch(0.65_0.22_150/0.18)] border-[oklch(0.65_0.22_150)] text-[oklch(0.75_0.18_150)]",
  environment: "bg-[oklch(0.68_0.2_260/0.18)] border-[oklch(0.68_0.2_260)] text-[oklch(0.78_0.16_260)]",
  lighting:    "bg-[oklch(0.72_0.18_80/0.18)] border-[oklch(0.72_0.18_80)] text-[oklch(0.82_0.14_80)]",
  style:       "bg-[oklch(0.7_0.2_340/0.18)] border-[oklch(0.7_0.2_340)] text-[oklch(0.8_0.16_340)]",
};

type Props = {
  category: TagCategory;
  tags: Tag[];
  selectedTags: SelectedTag[];
  onToggle: (tag: Tag) => void;
  onWeightChange: (tagId: number, weight: number) => void;
  animationDelay: number;
};

export default function TagPanel({ category, tags, selectedTags, onToggle, onWeightChange, animationDelay }: Props) {
  const selectedInCategory = selectedTags.filter((t) => t.category === category);

  return (
    <motion.div
      className="rounded-xl border border-border bg-card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: animationDelay, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className={`text-xs font-bold uppercase tracking-widest ${CATEGORY_ACCENT[category]}`}>
          {CATEGORY_LABELS[category]}
        </span>
        {selectedInCategory.length > 0 && (
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
            {selectedInCategory.length} selected
          </span>
        )}
      </div>
      <div className="p-3 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const sel = selectedTags.find((t) => t.id === tag.id);
          const isSelected = !!sel;
          return (
            <div key={tag.id} className="flex flex-col items-start gap-1">
              <button
                onClick={() => onToggle(tag)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
                  isSelected ? CATEGORY_SELECTED_BG[category]
                  : "border-border text-muted-foreground bg-transparent hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {isSelected ? <X className="w-3 h-3 shrink-0" /> : <Plus className="w-3 h-3 shrink-0" />}
                <span>{tag.name}</span>
                {isSelected && sel!.weight !== 1.0 && (
                  <span className="text-xs opacity-70">{sel!.weight.toFixed(1)}</span>
                )}
              </button>
              {isSelected && (
                <WeightSlider weight={sel!.weight} onChange={(w) => onWeightChange(tag.id, w)} />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}