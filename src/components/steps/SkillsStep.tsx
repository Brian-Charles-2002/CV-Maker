import React, { useState } from 'react';
import { SkillCategory, LanguageItem } from '../../types/cv';
import { Plus, Trash2, X, Globe2, Wrench } from 'lucide-react';

interface Props {
  categories: SkillCategory[];
  languages: LanguageItem[];
  onSkillsChange: (cats: SkillCategory[]) => void;
  onLanguagesChange: (langs: LanguageItem[]) => void;
}

export const SkillsStep: React.FC<Props> = ({
  categories,
  languages,
  onSkillsChange,
  onLanguagesChange,
}) => {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  // Skill category management
  const addCategory = () => {
    const newCat: SkillCategory = {
      id: `skills-${Date.now()}`,
      name: 'New Skill Category',
      skills: [],
    };
    onSkillsChange([...categories, newCat]);
  };

  const updateCategoryName = (id: string, name: string) => {
    onSkillsChange(
      categories.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };

  const removeCategory = (id: string) => {
    onSkillsChange(categories.filter((c) => c.id !== id));
  };

  const addSkillToCategory = (catId: string) => {
    const skillText = (newSkillInput[catId] || '').trim();
    if (!skillText) return;

    onSkillsChange(
      categories.map((c) => {
        if (c.id === catId) {
          // split if user pasted comma-separated
          const splitSkills = skillText
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && !c.skills.includes(s));
          return { ...c, skills: [...c.skills, ...splitSkills] };
        }
        return c;
      })
    );
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const removeSkillFromCategory = (catId: string, skillToRemove: string) => {
    onSkillsChange(
      categories.map((c) => {
        if (c.id === catId) {
          return {
            ...c,
            skills: c.skills.filter((s) => s !== skillToRemove),
          };
        }
        return c;
      })
    );
  };

  // Language management
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    onLanguagesChange([...languages, newLang]);
  };

  const updateLanguage = (id: string, updated: Partial<LanguageItem>) => {
    onLanguagesChange(
      languages.map((l) => (l.id === id ? { ...l, ...updated } : l))
    );
  };

  const removeLanguage = (id: string) => {
    onLanguagesChange(languages.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Skill Categories Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">Skills & Competencies</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Organize skills into logical domains (e.g. Languages, Platforms, Methodologies).
            </p>
          </div>
          <button
            type="button"
            onClick={addCategory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors shadow-xs cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="p-6 border border-dashed border-neutral-300 rounded-lg text-center bg-white">
            <Wrench className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-700">No skill categories configured</p>
            <button
              type="button"
              onClick={addCategory}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md"
            >
              Add First Category
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 bg-white border border-neutral-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateCategoryName(cat.id, e.target.value)}
                    placeholder="Category Name (e.g. ICT & Digital Systems)"
                    className="font-bold text-sm text-neutral-900 px-2 py-1 border-b border-transparent hover:border-neutral-300 focus:border-neutral-900 focus:outline-hidden w-full max-w-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeCategory(cat.id)}
                    className="p-1 text-neutral-400 hover:text-red-600 rounded transition-colors"
                    title="Remove category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-neutral-100 text-neutral-800 rounded-md group"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkillFromCategory(cat.id, skill)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {cat.skills.length === 0 && (
                    <span className="text-xs text-neutral-400 italic">No skills in this category yet.</span>
                  )}
                </div>

                {/* Add new skill inline */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSkillInput[cat.id] || ''}
                    onChange={(e) =>
                      setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkillToCategory(cat.id);
                      }
                    }}
                    placeholder="Type skill name (press Enter or click Add)..."
                    className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                  <button
                    type="button"
                    onClick={() => addSkillToCategory(cat.id)}
                    className="px-3 py-1.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-md cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="pt-4 border-t border-neutral-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-neutral-900">Languages</h3>
            <p className="text-sm text-neutral-500">
              Languages spoken and written proficiency levels.
            </p>
          </div>
          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Language</span>
          </button>
        </div>

        {languages.length === 0 ? (
          <div className="p-4 border border-dashed border-neutral-300 rounded-lg text-center bg-white text-xs text-neutral-500">
            <Globe2 className="w-5 h-5 mx-auto text-neutral-400 mb-1" />
            <span>No languages listed yet. Click &quot;Add Language&quot; to include bilingual proficiency.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="p-3 bg-white border border-neutral-200 rounded-lg flex items-center justify-between gap-2"
              >
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
                  placeholder="e.g. English, Shona, Ndebele"
                  className="w-1/2 px-2 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateLanguage(lang.id, {
                      proficiency: e.target.value as LanguageItem['proficiency'],
                    })
                  }
                  className="w-1/3 px-2 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang.id)}
                  className="p-1 text-neutral-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
