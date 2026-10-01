import React from 'react';
import { EducationItem } from '../../types/cv';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, GraduationCap } from 'lucide-react';

interface Props {
  education: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export const EducationStep: React.FC<Props> = ({ education, onChange }) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      qualification: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: [],
    };
    onChange([...education, newItem]);
  };

  const updateItem = (index: number, updated: Partial<EducationItem>) => {
    const newItems = [...education];
    newItems[index] = { ...newItems[index], ...updated };
    onChange(newItems);
  };

  const removeItem = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= education.length) return;
    const newItems = [...education];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    onChange(newItems);
  };

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
          <h2 className="text-xl font-bold tracking-tight text-neutral-900">Education & Academics</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Degrees, academic honors, and institutions. Drag or use arrows to order.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors shadow-xs cursor-pointer self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Degree</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 border border-dashed border-neutral-300 rounded-lg text-center bg-white">
          <GraduationCap className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-neutral-700">No education entries added</p>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Include universities, technical institutes, or academic degrees.
          </p>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-md"
          >
            Add Academic Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, eduIdx) => (
            <div
              key={edu.id}
              draggable
              onDragStart={(e) => handleDragStart(e, eduIdx)}
              onDragOver={(e) => handleDragOver(e, eduIdx)}
              onDragEnd={handleDragEnd}
              className={`p-4 sm:p-5 bg-white border rounded-lg transition-all ${
                draggedIndex === eduIdx
                  ? 'border-neutral-900 shadow-md bg-neutral-50/50'
                  : 'border-neutral-200 shadow-xs'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                    title="Drag to reorder"
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Degree #{eduIdx + 1}
                  </span>
                  {edu.institution && (
                    <span className="text-xs font-bold text-neutral-900 truncate max-w-[200px]">
                      — {edu.institution}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(eduIdx, eduIdx - 1)}
                    disabled={eduIdx === 0}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(eduIdx, eduIdx + 1)}
                    disabled={eduIdx === education.length - 1}
                    className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(eduIdx)}
                    className="p-1 text-neutral-400 hover:text-red-600 rounded ml-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateItem(eduIdx, { institution: e.target.value })}
                    placeholder="e.g. University of Zimbabwe or Midlands State University"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Qualification Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.qualification || ''}
                    onChange={(e) => updateItem(eduIdx, { qualification: e.target.value })}
                    placeholder="e.g. Bachelor of Science (B.Sc.) in Information Systems"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateItem(eduIdx, { location: e.target.value })}
                    placeholder="e.g. Harare, Zimbabwe"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Graduation Year / Dates
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateItem(eduIdx, { startDate: e.target.value })}
                      placeholder="e.g. 2018"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateItem(eduIdx, { endDate: e.target.value })}
                      placeholder="e.g. 2022"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    GPA / Honors (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateItem(eduIdx, { gpa: e.target.value })}
                    placeholder="e.g. 3.9 / 4.0 or First Class Honors"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
