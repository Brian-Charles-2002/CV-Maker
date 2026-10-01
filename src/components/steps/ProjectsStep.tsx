import React, { useState } from 'react';
import { ProjectItem, CertificationItem } from '../../types/cv';
import { Plus, Trash2, GripVertical, ChevronUp, ChevronDown, FolderGit2, Award } from 'lucide-react';

interface Props {
  projects: ProjectItem[];
  certifications: CertificationItem[];
  onProjectsChange: (items: ProjectItem[]) => void;
  onCertificationsChange: (items: CertificationItem[]) => void;
}

export const ProjectsStep: React.FC<Props> = ({
  projects,
  certifications,
  onProjectsChange,
  onCertificationsChange,
}) => {
  const [draggedProjIdx, setDraggedProjIdx] = useState<number | null>(null);

  // Projects logic
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      link: '',
      technologies: '',
      description: '',
      bullets: [],
    };
    onProjectsChange([...projects, newProj]);
  };

  const updateProject = (index: number, updated: Partial<ProjectItem>) => {
    const newProjs = [...projects];
    newProjs[index] = { ...newProjs[index], ...updated };
    onProjectsChange(newProjs);
  };

  const removeProject = (index: number) => {
    onProjectsChange(projects.filter((_, i) => i !== index));
  };

  const moveProject = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= projects.length) return;
    const newProjs = [...projects];
    const [moved] = newProjs.splice(fromIndex, 1);
    newProjs.splice(toIndex, 0, moved);
    onProjectsChange(newProjs);
  };

  // Certifications logic
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
    };
    onCertificationsChange([...certifications, newCert]);
  };

  const updateCertification = (index: number, updated: Partial<CertificationItem>) => {
    const newCerts = [...certifications];
    newCerts[index] = { ...newCerts[index], ...updated };
    onCertificationsChange(newCerts);
  };

  const removeCertification = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Projects Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neutral-900">Featured Projects & Initiatives</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Open source libraries, major business systems, or portfolio releases.
            </p>
          </div>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors shadow-xs cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="p-6 border border-dashed border-neutral-300 rounded-lg text-center bg-white">
            <FolderGit2 className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-neutral-700">No projects added yet</p>
            <p className="text-xs text-neutral-500 mt-0.5 mb-3">
              Showcase high-impact initiatives, GitHub repos, or published tools.
            </p>
            <button
              type="button"
              onClick={addProject}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 rounded-md"
            >
              Add Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((proj, pIdx) => (
              <div
                key={proj.id}
                draggable
                onDragStart={() => setDraggedProjIdx(pIdx)}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (draggedProjIdx === null || draggedProjIdx === pIdx) return;
                  moveProject(draggedProjIdx, pIdx);
                  setDraggedProjIdx(pIdx);
                }}
                onDragEnd={() => setDraggedProjIdx(null)}
                className={`p-4 bg-white border rounded-lg transition-all ${
                  draggedProjIdx === pIdx ? 'border-neutral-900 shadow-md' : 'border-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="cursor-grab active:cursor-grabbing p-1 text-neutral-400 hover:text-neutral-700">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">
                      Project #{pIdx + 1}
                    </span>
                    {proj.title && (
                      <span className="text-xs font-bold text-neutral-900 truncate max-w-xs">
                        — {proj.title}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveProject(pIdx, pIdx - 1)}
                      disabled={pIdx === 0}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveProject(pIdx, pIdx + 1)}
                      disabled={pIdx === projects.length - 1}
                      className="p-1 text-neutral-400 hover:text-neutral-700 disabled:opacity-30"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProject(pIdx)}
                      className="p-1 text-neutral-400 hover:text-red-600 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(pIdx, { title: e.target.value })}
                      placeholder="e.g. Harare Smart City Dashboard"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Role
                    </label>
                    <input
                      type="text"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(pIdx, { role: e.target.value })}
                      placeholder="e.g. Lead Engineer & Product Owner"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Repository / Demo Link
                    </label>
                    <input
                      type="url"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(pIdx, { link: e.target.value })}
                      placeholder="https://github.com/tmoyo-dev"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Technologies & Stack
                    </label>
                    <input
                      type="text"
                      value={proj.technologies || ''}
                      onChange={(e) => updateProject(pIdx, { technologies: e.target.value })}
                      placeholder="e.g. React, Node.js, PostgreSQL"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Summary / Impact Description
                  </label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(pIdx, { description: e.target.value })}
                    placeholder="Briefly describe the purpose, implementation highlights, and metrics of this project..."
                    className="w-full p-2 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900 leading-normal"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="pt-4 border-t border-neutral-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-neutral-900">Certifications & Licenses</h3>
            <p className="text-sm text-neutral-500">
              Industry credentials (e.g. AWS, CKA, PMP, CPA, Six Sigma).
            </p>
          </div>
          <button
            type="button"
            onClick={addCertification}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors cursor-pointer self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="p-4 border border-dashed border-neutral-300 rounded-lg text-center bg-white text-xs text-neutral-500">
            <Award className="w-5 h-5 mx-auto text-neutral-400 mb-1" />
            <span>No professional certifications added.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert, cIdx) => (
              <div key={cert.id} className="p-3 bg-white border border-neutral-200 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    Cert #{cIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCertification(cIdx)}
                    className="p-1 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cIdx, { name: e.target.value })}
                  placeholder="Certification Name (e.g. CISA or ITIL)"
                  className="w-full px-2 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cIdx, { issuer: e.target.value })}
                    placeholder="Issuing Org (e.g. Institute of Chartered Secretaries Zimbabwe)"
                    className="w-full px-2 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCertification(cIdx, { date: e.target.value })}
                    placeholder="Year / Date (e.g. 2024)"
                    className="w-full px-2 py-1 text-xs bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
