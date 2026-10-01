import React from 'react';
import { CVData } from '../../types/cv';
import { THEME_COLORS, FONT_CLASSES, SPACING_CLASSES } from '../../utils/themeStyles';

interface Props {
  data: CVData;
}

export const NordicCleanTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const colors = THEME_COLORS[design.colorTheme] || THEME_COLORS.slate;
  const fontClass = FONT_CLASSES[design.fontTheme] || FONT_CLASSES.sans;
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.generous;

  const activeSections = design.sectionOrder.filter((s) => s.enabled);

  return (
    <div className={`w-full bg-[#fcfcfc] text-neutral-900 ${fontClass} ${spacing.padding}`}>
      {/* Header */}
      <header className="pb-8 mb-8 border-b border-neutral-200">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            {design.showPhoto && personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-16 h-16 rounded-full object-cover border border-neutral-300 shadow-xs shrink-0"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950">
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className={`text-sm font-medium tracking-wide mt-1.5 ${colors.primary}`}>
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="text-xs text-neutral-500 space-y-1 sm:text-right">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div>{personalInfo.website.replace(/^https?:\/\//, '')}</div>}
          </div>
        </div>
      </header>

      {/* Sections with Nordic numbered styling */}
      <div className={spacing.sectionGap}>
        {activeSections.map((sec, idx) => {
          const sectionNum = String(idx + 1).padStart(2, '0');

          switch (sec.key) {
            case 'summary':
              if (!data.summary.trim()) return null;
              return (
                <section key={sec.key} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs text-neutral-400 font-mono-main block">{sectionNum} /</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                      {sec.label}
                    </h2>
                  </div>
                  <div className="md:col-span-9">
                    <p className={`text-xs sm:text-sm text-neutral-700 font-light ${spacing.lineHeight}`}>
                      {data.summary}
                    </p>
                  </div>
                </section>
              );

            case 'experience':
              if (data.experience.length === 0) return null;
              return (
                <section key={sec.key} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs text-neutral-400 font-mono-main block">{sectionNum} /</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                      {sec.label}
                    </h2>
                  </div>
                  <div className={`md:col-span-9 ${spacing.itemGap}`}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <span className="text-sm font-semibold text-neutral-900">{exp.role}</span>
                          <span className="text-xs text-neutral-400 tabular-nums">
                            {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-600 mb-1">
                          <span className="font-medium">{exp.company}</span>
                          {exp.location && <span> · {exp.location}</span>}
                        </div>
                        {exp.bullets.length > 0 && (
                          <ul className="space-y-1 text-xs text-neutral-600 font-light mt-1.5">
                            {exp.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-300 select-none">—</span>
                                  <span className={spacing.lineHeight}>{b}</span>
                                </li>
                              ) : null
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (data.education.length === 0) return null;
              return (
                <section key={sec.key} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs text-neutral-400 font-mono-main block">{sectionNum} /</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                      {sec.label}
                    </h2>
                  </div>
                  <div className={`md:col-span-9 ${spacing.itemGap}`}>
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold text-neutral-900">{edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')}</span>
                          <span className="text-xs text-neutral-400 tabular-nums">{edu.endDate}</span>
                        </div>
                        <div className="text-xs text-neutral-500">
                          {edu.institution}{edu.location ? ` · ${edu.location}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              if (data.skillCategories.length === 0) return null;
              return (
                <section key={sec.key} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs text-neutral-400 font-mono-main block">{sectionNum} /</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                      {sec.label}
                    </h2>
                  </div>
                  <div className="md:col-span-9 space-y-1.5 text-xs">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id} className="flex gap-2">
                        <span className="font-medium text-neutral-900 shrink-0 w-36">{cat.name}:</span>
                        <span className="text-neutral-600">{cat.skills.join(' · ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (data.projects.length === 0) return null;
              return (
                <section key={sec.key} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <span className="text-xs text-neutral-400 font-mono-main block">{sectionNum} /</span>
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                      {sec.label}
                    </h2>
                  </div>
                  <div className={`md:col-span-9 ${spacing.itemGap}`}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold text-neutral-900">{proj.title}</span>
                          {proj.link && <span className="text-xs text-neutral-400 underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                        </div>
                        {proj.description && (
                          <p className={`text-xs text-neutral-600 mt-1 ${spacing.lineHeight}`}>{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
