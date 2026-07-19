import { useCallback, useState } from "react";
import {
  DEFAULT_TAGS,
  CATEGORIES,
  CATEGORY_LABELS,
  NEGATIVE_PRESETS,
  buildPrompt,
  type SelectedTag,
  type Tag,
  type TagCategory,
} from "@/lib/tag-data";
import TagPanel from "./_components/TagPanel";
import PromptPreview from "./_components/PromptPreview";
import NegativePrompt from "./_components/NegativePrompt";
import CustomTagInput from "./_components/CustomTagInput";
import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const [tags, setTags] = useState<Tag[]>(DEFAULT_TAGS);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [negativePrompt, setNegativePrompt] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<TagCategory | "all">("all");

  const toggleTag = useCallback((tag: Tag) => {
    setSelectedTags((current) => {
      const exists = current.some((item) => item.id === tag.id);

      return exists
        ? current.filter((item) => item.id !== tag.id)
        : [...current, { ...tag }];
    });
  }, []);

  const updateWeight = useCallback((tagId: number, weight: number) => {
    setSelectedTags((current) =>
      current.map((item) =>
        item.id === tagId ? { ...item, weight } : item
      )
    );
  }, []);

  const addCustomTag = useCallback(
    (name: string, category: TagCategory) => {
      const newTag: Tag = {
        id: Date.now(),
        name,
        category,
        weight: 1,
      };

      setTags((current) => [...current, newTag]);
      setSelectedTags((current) => [...current, { ...newTag }]);
    },
    []
  );

  const clearAll = () => {
    setSelectedTags([]);
    setNegativePrompt([]);
  };

  const positivePrompt = buildPrompt(selectedTags);

  const filteredTags =
    activeCategory === "all"
      ? tags
      : tags.filter((tag) => tag.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <h1 className="text-xl font-bold">AI Prompt Generator</h1>
              <p className="text-sm text-muted-foreground">
                Hercules Tag-based Prompt Engine
              </p>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={clearAll}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear all
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`rounded-full border px-4 py-2 text-sm ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card"
              }`}
            >
              All
            </button>

            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            ))}
          </div>

          <CustomTagInput onAddTag={addCustomTag} />

          <TagPanel
            tags={filteredTags}
            selectedTags={selectedTags}
            onToggle={toggleTag}
            onWeightChange={updateWeight}
          />
        </section>

        <aside className="space-y-5">
          <PromptPreview
            positivePrompt={positivePrompt}
            selectedTags={selectedTags}
          />

          <NegativePrompt
            presets={NEGATIVE_PRESETS}
            selected={negativePrompt}
            onChange={setNegativePrompt}
          />
        </aside>
      </main>
    </div>
  );
}
