type Props = {
  weight: number;
  onChange: (weight: number) => void;
};

// Renders a range slider for adjusting a tag's Stable Diffusion weight (0.5–2.0)
export default function WeightSlider({ weight, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 px-1">
      <input
        type="range"
        min={0.5}
        max={2.0}
        step={0.1}
        value={weight}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24 h-1 accent-primary cursor-pointer"
        title={`Weight: ${weight.toFixed(1)}`}
      />
      <span className="text-xs text-muted-foreground w-6">{weight.toFixed(1)}</span>
    </div>
  );
}