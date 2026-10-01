import React from 'react';
import { CVData } from '../../types/cv';
import { SPACING_CLASSES } from '../../utils/themeStyles';

interface Props {
  data: CVData;
}

export const CompactAtsTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.compact;
  const activeSections = design.sectionOrder.filter((s) => s.enabled);

  const contactItems: string[] = [];
  if (personalInfo.phone) contactItems.push(personalInfo.phone);
  if (personalInfo.email) contactItems.push(personalInfo.email);
  if (personalInfo.location) contactItems.push(personalInfo.location);
  if (personalInfo.linkedin) contactItems.push(personalInfo.linkedin.replace(/^https?:\/\//, ''));
  if (personalInfo.github) contactItems.push(personalInfo.github.replace(/^https?:\/\//, ''));
  if (personalInfo.website) contactItems.push(personalInfo.website.replace(/^https?:\/\//, ''));

  return (
    <div className={`w-full bg-white text-black font-sans-main ${spacing.padding}`}>
      {/* Header */}
      <header className="border-b border-black pb-3 mb-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
          {personalInfo.fullName || 'FIRST LAST'}
        </h1>
        {personalInfo.jobTitle && (
          <div className="text-sm font-semibold uppercase text-neutral-800 mt-0.5">
            {personalInfo.jobTitle}
          </div>
        )}
        {contactItems.length > 0 && (
          <div className="text-xs text-neutral-800 mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5">
            {contactItems.map((c, i) => (
              <span key={i}>
                {c}
                {i < contactItems.length - 1 && <span className="ml-2 text-neutral-500">|</span>}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Sections */}
      <div className={spacing.sectionGap}>
        {activeSections.map((sec) => {
          switch (sec.key) {
            case 'summary':
              if (!data.summary.trim()) return null;
              return (
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-1.5">
                    {sec.label}
                  </h2>
                  <p className={`text-xs text-neutral-900 ${spacing.lineHeight}`}>
                    {data.summary}
                  </p>
                </section>
              );

            case 'experience':
              if (data.experience.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-2">
                    {sec.label}
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-bold">{exp.role}</span> — <span className="font-semibold">{exp.company}</span>
                            {exp.location && <span>, {exp.location}</span>}
                          </div>
                          <span className="tabular-nums font-medium shrink-0">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        {exp.bullets.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-xs text-neutral-900 pl-4 list-disc">
                            {exp.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className={spacing.lineHeight}>
                                  {b}
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
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-2">
                    {sec.label}
                  </h2>
                  <div className="space-y-1.5 text-xs">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <span className="font-bold">{edu.institution}</span>
                          <span> — {(edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')).trim()}</span>
                          {edu.gpa && <span> (Qualification: {edu.gpa})</span>}
                        </div>
                        <span className="tabular-nums font-medium shrink-0">
                          {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'skills':
              if (data.skillCategories.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-1.5">
                    {sec.label}
                  </h2>
                  <div className="space-y-1 text-xs">
                    {data.skillCategories.map((cat) => (
                      <div key={cat.id} className="flex gap-2">
                        <span className="font-bold shrink-0">{cat.name}:</span>
                        <span>{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (data.projects.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-2">
                    {sec.label}
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="text-xs">
                        <div className="flex justify-between font-bold">
                          <span>{proj.title}{proj.role ? ` (${proj.role})` : ''}</span>
                          {proj.link && <span className="font-normal underline">{proj.link}</span>}
                        </div>
                        {proj.description && <p className={`mt-0.5 text-neutral-800 ${spacing.lineHeight}`}>{proj.description}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (data.certifications.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-400 pb-0.5 mb-1.5">
                    {sec.label}
                  </h2>
                  <div className="space-y-1 text-xs">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span>{c.name} — {c.issuer}</span>
                        <span className="tabular-nums">{c.date}</span>
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
