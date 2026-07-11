import { useState, useCallback } from "react";
import {
  DEFAULT_TAGS, CATEGORIES, CATEGORY_LABELS,
  NEGATIVE_PRESETS, buildPrompt,
  type Tag, type SelectedTag, type TagCategory,
} from "@/lib/tag-data.ts";
import TagPanel from "./_components/TagPanel.tsx";
import PromptPreview from "./_components/PromptPreview.tsx";
import NegativePrompt from "./_components/NegativePrompt.tsx";
import CustomTagInput from "./_components/CustomTagInput.tsx";
import { motion } from "motion/react";
import { Sparkles, RotateCcw, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>(DEFAULT_TAGS);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [negativePrompt, setNegativePrompt] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<TagCategory | "all">("all");

  const toggleTag = useCallback((tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) return prev.filter((t) => t.id !== tag.id);
      return [...prev, { ...tag }];
    });
  }, []);

  const updateWeight = useCallback((tagId: number, weight: number) => {
    setSelectedTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, weight } : t))
    );
  }, []);

  const addCustomTag = useCallback((name: string, category: TagCategory) => {
    const newTag: Tag = { id: Date.now(), name, category, weight: 1.0 };
    setTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, { ...newTag }]);
  }, []);

  const clearAll = () => { setSelectedTags([]); setNegativePrompt([]); };
  const positivePrompt = buildPrompt(selectedTags);
  const filteredTags = activeCategory === "all"
    ? tags : tags.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">AI Prompt Generator</h1>
              <p className="text-xs text-muted-foreground">Tag-based prompt engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/source")} className="gap-2 text-muted-foreground">
              <Code2 className="w-4 h-4" /> Source Code
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-2 text-muted-foreground">
              <RotateCcw className="w-4 h-4" /> Clear all
            </Button>
          </div>
        </div>
      </header>
      {/* ... rest of page */}
    </div>
  );
}