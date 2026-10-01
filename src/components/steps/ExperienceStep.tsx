import React from 'react';
import { ExperienceItem } from '../../types/cv';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, Building2, Briefcase } from 'lucide-react';

interface Props {
  experience: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export const ExperienceStep: React.FC<Props> = ({ experience, onChange }) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };
    onChange([newItem, ...experience]);
  };

  const updateItem = (index: number, updated: Partial<ExperienceItem>) => {
    const newItems = [...experience];
    newItems[index] = { ...newItems[index], ...updated };
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= experience.length) return;
    const newItems = [...experience];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    onChange(newItems);
  };

  // Bullet point handlers
  const addBullet = (expIndex: number) => {
    const item = experience[expIndex];
    updateItem(expIndex, { bullets: [...item.bullets, ''] });
  };

  const updateBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const item = experience[expIndex];
    const newBullets = [...item.bullets];
    newBullets[bulletIndex] = text;
    updateItem(expIndex, { bullets: newBullets });
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const item = experience[expIndex];
    updateItem(expIndex, {
      bullets: item.bullets.filter((_, i) => i !== bulletIndex),
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveItem(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">Work Experience</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Chronological work history. Drag items to reorder or use arrows.
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors shadow-xs cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="p-8 border border-dashed border-neutral-300 rounded-lg text-center bg-white">
          <Briefcase className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-neutral-700">No work experience entries yet</p>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Add your most recent position to get started.
          </p>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-md"
          >
            Add First Position
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, expIdx) => (
            <div
              key={exp.id}
              draggable
              onDragStart={(e) => handleDragStart(e, expIdx)}
              onDragOver={(e) => handleDragOver(e, expIdx)}
              onDragEnd={handleDragEnd}
              className={`p-4 sm:p-5 bg-white border rounded-lg transition-all ${
                draggedIndex === expIdx
                  ? 'border-neutral-900 shadow-md bg-neutral-50/50 opacity-90'
                  : 'border-neutral-200 shadow-xs'
              }`}
            >
              {/* Card Header & Reorder Bar */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                    title="Drag to reorder position"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Position #{expIdx + 1}
                  </span>
                  {exp.role && (
                    <span className="text-xs font-bold text-neutral-900 truncate max-w-[200px]">
                      — {exp.role}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(expIdx, expIdx - 1)}
                    disabled={expIdx === 0}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-neutral-100"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(expIdx, expIdx + 1)}
                    disabled={expIdx === experience.length - 1}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-neutral-100"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(expIdx)}
                    className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-100 transition-colors ml-1"
                    title="Delete position"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Job Title / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateItem(expIdx, { role: e.target.value })}
                    placeholder="e.g. Senior Infrastructure Manager"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Company / Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateItem(expIdx, { company: e.target.value })}
                      placeholder="e.g. Econet Wireless Zimbabwe or Delta Corporation"
                      className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateItem(expIdx, { location: e.target.value })}
                    placeholder="e.g. Harare, Zimbabwe (or Remote)"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-neutral-700">
                      Duration
                    </label>
                    <label className="inline-flex items-center gap-1.5 text-[11px] text-neutral-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => updateItem(expIdx, { isCurrent: e.target.checked })}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                      />
                      <span>Present</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateItem(expIdx, { startDate: e.target.value })}
                      placeholder="e.g. 2022"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      disabled={exp.isCurrent}
                      onChange={(e) => updateItem(expIdx, { endDate: e.target.value })}
                      placeholder="e.g. 2024"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md disabled:bg-neutral-100 disabled:text-neutral-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-neutral-700">
                    Key Achievements & Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet(expIdx)}
                    className="text-[11px] font-medium text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add achievement bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-neutral-400 mt-2 text-xs select-none">›</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => updateBullet(expIdx, bIdx, e.target.value)}
                        placeholder="e.g. Improved service uptime across Harare operations by 99.9% through proactive systems monitoring and cross-team support."
                        className="flex-1 p-2 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                      />
                      {exp.bullets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBullet(expIdx, bIdx)}
                          className="p-1 text-neutral-400 hover:text-red-500 mt-1"
                          title="Remove bullet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
