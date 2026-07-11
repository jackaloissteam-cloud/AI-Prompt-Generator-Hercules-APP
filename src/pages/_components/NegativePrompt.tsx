import { X } from "lucide-react";

type Props = {
  selected: string[];
  presets: string[];
  onChange: (selected: string[]) => void;
};

export default function NegativePrompt({ selected, presets, onChange }: Props) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="text-xs font-bold uppercase tracking-widest text-destructive">
          Negative Prompt
        </span>
        <span className="text-xs text-muted-foreground">— prevents unwanted results</span>
        {selected.length > 0 && (
          <span className="ml-auto text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">
            {selected.length} active
          </span>
        )}
      </div>
      <div className="p-3 flex flex-wrap gap-2">
        {presets.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all cursor-pointer ${
                isSelected
                  ? "bg-destructive/20 border-destructive text-destructive"
                  : "border-border text-muted-foreground bg-transparent hover:border-destructive/50 hover:text-destructive/80"
              }`}
            >
              {isSelected && <X className="w-3 h-3 shrink-0" />}
              <span>{tag}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}