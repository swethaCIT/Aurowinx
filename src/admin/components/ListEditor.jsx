import { useState } from "react";
import { X, Plus } from "lucide-react";

// Simple "add/remove tag" editor for text[] job fields
// (responsibilities, skills, preferred, tools).
export default function ListEditor({ label, items, onChange }) {
  const [draft, setDraft] = useState("");

  const addItem = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>

      {items.length > 0 && (
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span
              key={i}
              className="group flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 py-1.5 pl-3 pr-1.5 text-xs font-medium text-indigo-700"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="flex h-4 w-4 items-center justify-center rounded-full text-indigo-400 transition-colors hover:bg-indigo-600 hover:text-white"
                aria-label={`Remove ${item}`}
              >
                <X size={11} strokeWidth={2.5} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add"
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
        <button
          type="button"
          onClick={addItem}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <Plus size={14} strokeWidth={2.5} /> Add
        </button>
      </div>
    </div>
  );
}
