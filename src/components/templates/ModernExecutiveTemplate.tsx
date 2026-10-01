import React from 'react';
import { CVData } from '../../types/cv';
import { THEME_COLORS, FONT_CLASSES, SPACING_CLASSES } from '../../utils/themeStyles';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props {
  data: CVData;
}

export const ModernExecutiveTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const colors = THEME_COLORS[design.colorTheme] || THEME_COLORS.navy;
  const fontClass = FONT_CLASSES[design.fontTheme] || FONT_CLASSES.sans;
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.standard;

  const activeSections = design.sectionOrder.filter((s) => s.enabled);

  return (
    <div className={`w-full bg-white text-neutral-900 ${fontClass} ${spacing.padding}`}>
      {/* Top Accent Bar */}
      <div className={`h-1.5 w-full ${colors.primaryBg} mb-6`} />

      {/* Header */}
      <header className="border-b border-neutral-200 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${colors.primary}`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-base sm:text-lg font-medium text-neutral-600">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {design.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-neutral-200 shrink-0"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Contact Links */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-neutral-400" />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      <div className={spacing.sectionGap}>
        {activeSections.map((sec) => {
          switch (sec.key) {
            case 'summary':
              if (!data.summary.trim()) return null;
              return (
                <section key={sec.key}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2.5`}>
                    {sec.label}
                  </h2>
                  <p className={`text-xs sm:text-sm text-neutral-700 ${spacing.lineHeight}`}>
                    {data.summary}
                  </p>
                </section>
              );

            case 'experience':
              if (data.experience.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-3`}>
                    {sec.label}
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-sm font-bold text-neutral-900">{exp.role}</span>
                            <span className="text-neutral-400">·</span>
                            <span className={`text-sm font-semibold ${colors.primary}`}>{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="text-neutral-400">·</span>
                                <span className="text-xs text-neutral-500">{exp.location}</span>
                              </>
                            )}
                          </div>
                          <span className="text-xs text-neutral-500 tabular-nums shrink-0">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        {exp.bullets.length > 0 && (
                          <ul className="mt-1.5 space-y-1 text-xs text-neutral-700">
                            {exp.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-400 mt-1 select-none">›</span>
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
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-3`}>
                    {sec.label}
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                          <div>
                            <span className="text-sm font-bold text-neutral-900">
                              {(edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')).trim()}
                            </span>
                            <div className="text-xs text-neutral-600">
                              <span>{edu.institution}</span>
                              {edu.location && <span> · {edu.location}</span>}
                              {edu.gpa && <span className="font-medium text-neutral-800"> · Qualification: {edu.gpa}</span>}
                            </div>
                          </div>
                          <span className="text-xs text-neutral-500 tabular-nums shrink-0">
                            {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                          </span>
                        </div>
                        {edu.highlights && edu.highlights.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-xs text-neutral-600">
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
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2.5`}>
                    {sec.label}
                  </h2>
                  <div className="space-y-1.5 text-xs">
                    {data.skillCategories.map((cat) =>
                      cat.skills.length > 0 ? (
                        <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                          <span className="font-semibold text-neutral-900 shrink-0 sm:w-44">
                            {cat.name}:
                          </span>
                          <span className="text-neutral-700">
                            {cat.skills.join('  ·  ')}
                          </span>
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
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2`}>
                    {sec.label}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-700">
                    {data.languages.map((l, i) => (
                      <span key={l.id} className="flex items-center gap-1.5">
                        <span className="font-semibold text-neutral-900">{l.language}</span>
                        <span className="text-neutral-500">({l.proficiency})</span>
                        {i < data.languages.length - 1 && <span className="text-neutral-300">·</span>}
                      </span>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (data.projects.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-3`}>
                    {sec.label}
                  </h2>
                  <div className={spacing.itemGap}>
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-neutral-900">{proj.title}</span>
                            {proj.role && <span className="text-xs text-neutral-500">· {proj.role}</span>}
                          </div>
                          {proj.link && (
                            <span className="text-xs text-neutral-500 underline truncate max-w-xs">
                              {proj.link.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                        {proj.technologies && (
                          <p className="text-xs text-neutral-500 italic mt-0.5">
                            Built with: {proj.technologies}
                          </p>
                        )}
                        {proj.description && (
                          <p className={`text-xs text-neutral-700 mt-1 ${spacing.lineHeight}`}>
                            {proj.description}
                          </p>
                        )}
                        {proj.bullets && proj.bullets.length > 0 && (
                          <ul className="mt-1 space-y-0.5 text-xs text-neutral-700">
                            {proj.bullets.map((b, i) =>
                              b.trim() ? (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-neutral-400 select-none">›</span>
                                  <span>{b}</span>
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

            case 'certifications':
              if (data.certifications.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2.5`}>
                    {sec.label}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {data.certifications.map((c) => (
                      <div key={c.id} className="border-l-2 border-neutral-200 pl-2.5 py-0.5">
                        <div className="font-semibold text-neutral-900">{c.name}</div>
                        <div className="text-neutral-500">
                          {c.issuer} · {c.date}
                          {c.credentialId && ` (ID: ${c.credentialId})`}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );

            default: {
              const customSec = data.customSections.find((cs) => cs.id === sec.key);
              if (!customSec || customSec.items.length === 0) return null;
              return (
                <section key={sec.key}>
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2.5`}>
                    {customSec.title}
                  </h2>
                  <div className={spacing.itemGap}>
                    {customSec.items.map((it) => (
                      <div key={it.id}>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-semibold text-neutral-900">{it.title}</span>
                          {it.date && <span className="text-xs text-neutral-500 tabular-nums">{it.date}</span>}
                        </div>
                        {it.subtitle && <p className="text-xs text-neutral-500">{it.subtitle}</p>}
                        {it.description && (
                          <p className={`text-xs text-neutral-700 mt-1 ${spacing.lineHeight}`}>{it.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            }
          }
        })}
      </div>
    </div>
  );
};
