import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Code2, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import type { SelectedTag } from "@/lib/tag-data.ts";

type Props = {
  positivePrompt: string;
  negativePrompt: string;
  selectedCount: number;
  selectedTags: SelectedTag[];
  negativeList: string[];
};

export default function PromptPreview({ positivePrompt, negativePrompt, selectedCount, selectedTags, negativeList }: Props) {
  const [copied, setCopied] = useState(false);
  const [copiedNeg, setCopiedNeg] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showNeg, setShowNeg] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copy = async (text: string, setFn: (v: boolean) => void) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setFn(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setFn(false), 2000);
  };

  // Build JSON export of current prompt config
  const buildExport = () => {
    const tagsByCategory: Record<string, { name: string; weight: number }[]> = {};
    for (const t of selectedTags) {
      if (!tagsByCategory[t.category]) tagsByCategory[t.category] = [];
      tagsByCategory[t.category].push({ name: t.name, weight: t.weight });
    }
    return JSON.stringify({ prompt: positivePrompt, negative_prompt: negativePrompt, tags: tagsByCategory, negative_tags: negativeList }, null, 2);
  };

  return (
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Positive prompt header + copy + show code */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Positive Prompt</span>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{selectedCount} tags</span>
            </div>
            <div className="flex items-center gap-1">
              <Button size="sm" variant="ghost" className="h-7 px-2 gap-1.5 text-xs text-muted-foreground" onClick={() => setShowCode(true)}>
                <Code2 className="w-3.5 h-3.5" /> Show Code
              </Button>
              <Button size="sm" variant="ghost" className="h-7 px-2 gap-1.5 text-xs" onClick={() => copy(positivePrompt, setCopied)} disabled={!positivePrompt}>
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          <div className="min-h-[60px] rounded-lg bg-background border border-border p-3 text-sm text-foreground font-mono leading-relaxed">
            {positivePrompt || <span className="text-muted-foreground italic">Select tags below to build your prompt...</span>}
          </div>
        </div>
        {/* Negative prompt toggle */}
        <button onClick={() => setShowNeg((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-widest text-destructive hover:bg-muted/30 transition-colors cursor-pointer">
          <span>Negative Prompt</span>
          {showNeg ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {showNeg && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="overflow-hidden">
              <div className="px-4 pb-4">
                <div className="flex justify-end mb-2">
                  <Button size="sm" variant="ghost" className="h-7 px-2 gap-1.5 text-xs" onClick={() => copy(negativePrompt, setCopiedNeg)} disabled={!negativePrompt}>
                    {copiedNeg ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedNeg ? "Copied" : "Copy"}
                  </Button>
                </div>
                <div className="min-h-[50px] rounded-lg bg-background border border-border p-3 text-sm font-mono text-destructive">
                  {negativePrompt || <span className="text-muted-foreground italic">No negative tags selected...</span>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* JSON Code Modal */}
      <AnimatePresence>
        {showCode && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCode(false)} />
            <motion.div className="relative z-10 w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden" initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }} transition={{ duration: 0.22, ease: "easeOut" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Prompt JSON Export</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="h-7 px-2 gap-1.5 text-xs" onClick={() => copy(buildExport(), setCopiedCode)}>
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? "Copied!" : "Copy all"}
                  </Button>
                  <button onClick={() => setShowCode(false)} className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 overflow-auto max-h-[65vh]">
                <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap">{buildExport()}</pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}