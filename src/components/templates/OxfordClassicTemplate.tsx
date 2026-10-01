import React from 'react';
import { CVData } from '../../types/cv';
import { THEME_COLORS, FONT_CLASSES, SPACING_CLASSES } from '../../utils/themeStyles';

interface Props {
  data: CVData;
}

export const OxfordClassicTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const colors = THEME_COLORS[design.colorTheme] || THEME_COLORS.navy;
  const fontClass = FONT_CLASSES[design.fontTheme] || 'font-serif-main';
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.standard;

  const activeSections = design.sectionOrder.filter((s) => s.enabled);

  const contactList: string[] = [];
  if (personalInfo.email) contactList.push(personalInfo.email);
  if (personalInfo.phone) contactList.push(personalInfo.phone);
  if (personalInfo.location) contactList.push(personalInfo.location);
  if (personalInfo.website) contactList.push(personalInfo.website.replace(/^https?:\/\//, ''));
  if (personalInfo.linkedin) contactList.push(personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/'));
  if (personalInfo.github) contactList.push(personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'git/'));

  return (
    <div className={`w-full bg-white text-neutral-900 ${fontClass} ${spacing.padding}`}>
      {/* Centered Traditional Header */}
      <header className="text-center pb-4 mb-4 border-b border-neutral-300">
        {design.showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-neutral-300 mx-auto mb-3 shadow-xs"
            referrerPolicy="no-referrer"
          />
        )}
        <h1 className={`text-3xl sm:text-4xl font-semibold tracking-wide uppercase ${colors.primary}`}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm font-medium text-neutral-700 tracking-wider uppercase mt-1">
            {personalInfo.jobTitle}
          </p>
        )}
        {contactList.length > 0 && (
          <div className="mt-2 text-xs text-neutral-600 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
            {contactList.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>{item}</span>
                {idx < contactList.length - 1 && <span className="text-neutral-400">♦</span>}
              </React.Fragment>
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
                  <div className="text-center mb-2">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <p className={`text-xs sm:text-sm text-neutral-800 text-justify ${spacing.lineHeight}`}>
                    {data.summary}
                  </p>
                </section>
              );

            case 'experience':
              if (data.experience.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="text-center mb-2.5">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-neutral-900">{exp.role}</span>
                          <span className="text-xs text-neutral-600 italic tabular-nums">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline text-xs text-neutral-700 italic mb-1">
                          <span>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.bullets.length > 0 && (
                          <ul className="space-y-1 text-xs text-neutral-800">
                            {exp.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-400 select-none">•</span>
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
                <section key={sec.key}>
                  <div className="text-center mb-2.5">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-neutral-900">
                            {edu.institution}
                          </span>
                          <span className="text-xs text-neutral-600 italic tabular-nums">
                            {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-700 italic">
                          <span>{edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')}</span>
                          {edu.location && <span>, {edu.location}</span>}
                          {edu.gpa && <span className="not-italic"> · Qualification: {edu.gpa}</span>}
                        </div>
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-xs text-neutral-800">
                            {edu.highlights.map((h, i) =>
                              h.trim() ? (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-400 select-none">•</span>
                                  <span>{h}</span>
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

            case 'skills':
              if (data.skillCategories.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="text-center mb-2">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <div className="space-y-1 text-xs text-neutral-800">
                    {data.skillCategories.map((cat) =>
                      cat.skills.length > 0 ? (
                        <div key={cat.id} className="flex gap-2">
                          <span className="font-bold shrink-0">{cat.name}:</span>
                          <span>{cat.skills.join(', ')}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </section>
              );

            case 'languages':
              if (data.languages.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="text-center mb-2">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <p className="text-xs text-center text-neutral-800">
                    {data.languages.map((l) => `${l.language} (${l.proficiency})`).join('  ·  ')}
                  </p>
                </section>
              );

            case 'projects':
              if (data.projects.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="text-center mb-2.5">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-bold text-neutral-900">{proj.title}</span>
                          {proj.link && (
                            <span className="text-xs text-neutral-500 italic">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className={`text-xs text-neutral-800 mt-0.5 ${spacing.lineHeight}`}>
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (data.certifications.length === 0) return null;
              return (
                <section key={sec.key}>
                  <div className="text-center mb-2">
                    <h2 className={`text-xs font-bold uppercase tracking-widest ${colors.primary}`}>
                      {sec.label}
                    </h2>
                    <div className="w-16 h-px bg-neutral-300 mx-auto mt-1" />
                  </div>
                  <div className="space-y-1 text-xs text-neutral-800">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="flex justify-between">
                        <span>
                          <strong className="font-semibold">{c.name}</strong> — {c.issuer}
                        </span>
                        <span className="text-neutral-500 italic">{c.date}</span>
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
