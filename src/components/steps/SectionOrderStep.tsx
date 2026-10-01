import React, { useState } from 'react';
import { SectionConfig, CustomSection } from '../../types/cv';
import { GripVertical, Eye, EyeOff, ChevronUp, ChevronDown, Plus, Trash2, Sliders } from 'lucide-react';

interface Props {
  sections: SectionConfig[];
  customSections: CustomSection[];
  onSectionsChange: (sections: SectionConfig[]) => void;
  onCustomSectionsChange: (custom: CustomSection[]) => void;
}

export const SectionOrderStep: React.FC<Props> = ({
  sections,
  customSections,
  onSectionsChange,
  onCustomSectionsChange,
}) => {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [newCustomTitle, setNewCustomTitle] = useState('');

  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    const newSecs = [...sections];
    const [moved] = newSecs.splice(fromIndex, 1);
    newSecs.splice(toIndex, 0, moved);
    onSectionsChange(newSecs);
  };

  const toggleSection = (index: number) => {
    const newSecs = [...sections];
    newSecs[index] = { ...newSecs[index], enabled: !newSecs[index].enabled };
    onSectionsChange(newSecs);
  };

  const updateLabel = (index: number, newLabel: string) => {
    const newSecs = [...sections];
    newSecs[index] = { ...newSecs[index], label: newLabel };
    onSectionsChange(newSecs);
  };

  const addCustomSection = () => {
    const title = newCustomTitle.trim() || 'Custom Section';
    const id = `custom-${Date.now()}`;
    const newConfig: SectionConfig = {
      key: id,
      label: title,
      enabled: true,
      isCustom: true,
    };
    const newCustom: CustomSection = {
      id,
      title,
      items: [
        {
          id: `item-${Date.now()}`,
          title: 'Sample Highlight',
          subtitle: 'Organization or Project',
          date: '2024',
          description: 'Key contribution or publication summary.',
        },
      ],
    };

    onSectionsChange([...sections, newConfig]);
    onCustomSectionsChange([...customSections, newCustom]);
    setNewCustomTitle('');
  };

  const removeCustomSection = (key: string) => {
    onSectionsChange(sections.filter((s) => s.key !== key));
    onCustomSectionsChange(customSections.filter((c) => c.id !== key));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Section Layout & Drag-and-Drop Reorder
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Drag sections to rearrange their exact presentation order on the exported CV. Toggle visibility or customize section titles.
        </p>
      </div>

      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center gap-3 text-xs text-neutral-600">
        <Sliders className="w-4 h-4 text-neutral-500 shrink-0" />
        <span>
          <strong>Pro-tip:</strong> Recent graduates often place &quot;Education &amp; Academics&quot; above &quot;Work Experience&quot;. Experienced leaders typically lead with &quot;Work Experience&quot; and &quot;Skills&quot;.
        </span>
      </div>

      {/* Drag & Drop Section List */}
      <div className="space-y-2.5">
        {sections.map((sec, idx) => (
          <div
            key={sec.key}
            draggable
            onDragStart={() => setDraggedIdx(idx)}
            onDragOver={(e) => {
              e.preventDefault();
              if (draggedIdx === null || draggedIdx === idx) return;
              moveSection(draggedIdx, idx);
              setDraggedIdx(idx);
            }}
            onDragEnd={() => setDraggedIdx(null)}
            className={`flex items-center justify-between p-3.5 bg-white border rounded-lg transition-all ${
              draggedIdx === idx
                ? 'border-neutral-900 shadow-md bg-neutral-50 scale-[1.01]'
                : 'border-neutral-200 shadow-xs hover:border-neutral-300'
            } ${!sec.enabled ? 'opacity-50 bg-neutral-50/70' : ''}`}
          >
            {/* Left: Drag handle + label */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className="cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                title="Drag to reposition section"
              >
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="text-xs font-mono-main text-neutral-400 w-6">
                #{idx + 1}
              </div>

              <input
                type="text"
                value={sec.label}
                onChange={(e) => updateLabel(idx, e.target.value)}
                className="font-semibold text-sm text-neutral-900 px-2 py-1 border-b border-transparent hover:border-neutral-300 focus:border-neutral-900 focus:outline-hidden w-full max-w-sm"
              />

              {sec.isCustom && (
                <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  Custom
                </span>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => toggleSection(idx)}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                  sec.enabled
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-neutral-400 hover:bg-neutral-200'
                }`}
                title={sec.enabled ? 'Hide section from CV' : 'Show section on CV'}
              >
                {sec.enabled ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                <span className="hidden sm:inline text-xs">{sec.enabled ? 'Visible' : 'Hidden'}</span>
              </button>

              <div className="h-4 w-px bg-neutral-200 mx-1" />

              <button
                type="button"
                onClick={() => moveSection(idx, idx - 1)}
                disabled={idx === 0}
                className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-neutral-100"
                title="Move up"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(idx, idx + 1)}
                disabled={idx === sections.length - 1}
                className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-neutral-100"
                title="Move down"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {sec.isCustom && (
                <button
                  type="button"
                  onClick={() => removeCustomSection(sec.key)}
                  className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100 ml-1"
                  title="Delete custom section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
