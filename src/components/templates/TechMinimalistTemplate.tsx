import React from 'react';
import { CVData } from '../../types/cv';
import { THEME_COLORS, SPACING_CLASSES } from '../../utils/themeStyles';

interface Props {
  data: CVData;
}

export const TechMinimalistTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const colors = THEME_COLORS[design.colorTheme] || THEME_COLORS.slate;
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.compact;

  const activeSections = design.sectionOrder.filter((s) => s.enabled);

  return (
    <div className={`w-full bg-white text-neutral-900 font-sans-main ${spacing.padding}`}>
      {/* Header */}
      <header className="border-b-2 border-neutral-900 pb-4 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="flex items-center gap-3">
            {design.showPhoto && personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-14 h-14 rounded-md object-cover border border-neutral-700 shrink-0"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
                {personalInfo.fullName || 'developer_name'}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-mono-main text-neutral-600 mt-0.5">
                  $ {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="font-mono-main text-xs text-neutral-600 flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.location && <span>[{personalInfo.location}]</span>}
            {personalInfo.github && <span>gh/{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
            {personalInfo.linkedin && <span>in/{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={spacing.sectionGap}>
        {activeSections.map((sec) => {
          switch (sec.key) {
            case 'summary':
              if (!data.summary.trim()) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    # {sec.label}
                  </div>
                  <p className={`text-xs sm:text-sm text-neutral-700 ${spacing.lineHeight}`}>
                    {data.summary}
                  </p>
                </section>
              );

            case 'skills':
              if (data.skillCategories.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    # Technical_Stack
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id} className="bg-neutral-50 p-2 border border-neutral-200">
                        <div className="font-mono-main font-semibold text-neutral-900 text-[11px] mb-1">
                          {cat.name}
                        </div>
                        <div className="text-neutral-700 text-xs">
                          {cat.skills.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'experience':
              if (data.experience.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                    # Professional_Experience
                  </div>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-bold text-sm text-neutral-950">{exp.role}</span>
                            <span className="text-neutral-400">@</span>
                            <span className={`font-semibold text-sm ${colors.primary}`}>{exp.company}</span>
                            {exp.location && <span className="text-xs text-neutral-500 font-mono-main">[{exp.location}]</span>}
                          </div>
                          <span className="font-mono-main text-xs text-neutral-500 tabular-nums">
                            {exp.startDate} - {exp.isCurrent ? 'Current' : exp.endDate}
                          </span>
                        </div>
                        {exp.bullets.length > 0 && (
                          <ul className="mt-1 space-y-1 text-xs text-neutral-700">
                            {exp.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="font-mono-main text-neutral-400 select-none">-</span>
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

            case 'projects':
              if (data.projects.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                    # Featured_Open_Source_&_Projects
                  </div>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-sm text-neutral-900">{proj.title}</span>
                          {proj.link && (
                            <span className="font-mono-main text-xs text-neutral-500 underline truncate max-w-xs">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        {proj.technologies && (
                          <div className="font-mono-main text-[11px] text-neutral-500">
                            Stack: [{proj.technologies}]
                          </div>
                        )}
                        {proj.description && (
                          <p className={`text-xs text-neutral-700 mt-1 ${spacing.lineHeight}`}>
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (data.education.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    # Education
                  </div>
                  <div className="space-y-2">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline text-xs">
                        <div>
                          <span className="font-bold text-neutral-900">{edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')}</span>
                          <span className="text-neutral-600"> · {edu.institution}</span>
                          {edu.gpa && <span className="font-mono-main text-neutral-500"> (Qualification: {edu.gpa})</span>}
                        </div>
                        <span className="font-mono-main text-neutral-500 tabular-nums shrink-0">
                          {edu.endDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (data.certifications.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="font-mono-main text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    # Certifications
                  </div>
                  <div className="space-y-1 text-xs">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span>{c.name} · {c.issuer}</span>
                        <span className="font-mono-main text-neutral-500">{c.date}</span>
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
