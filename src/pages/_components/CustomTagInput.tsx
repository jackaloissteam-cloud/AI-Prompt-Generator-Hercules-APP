import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select.tsx";
import { CATEGORIES, CATEGORY_LABELS, type TagCategory } from "@/lib/tag-data.ts";

type Props = {
  onAdd: (name: string, category: TagCategory) => void;
};

export default function CustomTagInput({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TagCategory>("character");

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setName("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
        Add Custom Tag
      </p>
      <div className="flex gap-2 flex-wrap">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="e.g. glowing eyes"
          className="flex-1 min-w-[180px] bg-background"
        />
        <Select value={category} onValueChange={(v) => setCategory(v as TagCategory)}>
          <SelectTrigger className="w-[150px] bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>{CATEGORY_LABELS[cat]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAdd} disabled={!name.trim()} className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Tag
        </Button>
      </div>
    </div>
  );
}