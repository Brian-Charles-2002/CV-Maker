import React from 'react';
import { CVData } from '../../types/cv';
import { THEME_COLORS, FONT_CLASSES, SPACING_CLASSES } from '../../utils/themeStyles';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface Props {
  data: CVData;
}

export const CreativeSidebarTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, design } = data;
  const colors = THEME_COLORS[design.colorTheme] || THEME_COLORS.navy;
  const fontClass = FONT_CLASSES[design.fontTheme] || FONT_CLASSES.sans;
  const spacing = SPACING_CLASSES[design.spacing] || SPACING_CLASSES.standard;

  return (
    <div className={`w-full bg-white text-neutral-900 ${fontClass} flex flex-col md:flex-row min-h-[1000px]`}>
      {/* Left Sidebar */}
      <aside className={`w-full md:w-72 ${colors.primaryLightBg} p-6 sm:p-8 flex flex-col gap-6 border-r border-neutral-200`}>
        {/* Profile Avatar / Name */}
        <div className="space-y-3">
          {design.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-2xl object-cover shadow-sm mx-auto md:mx-0 border-2 border-white"
              referrerPolicy="no-referrer"
            />
          )}
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${colors.primary}`}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm font-semibold text-neutral-600 mt-1">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-xs text-neutral-700">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-300 pb-1`}>
            Contact
          </h3>
          <div className="space-y-1.5 pt-1">
            {personalInfo.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 break-all">
                <Github className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education in Sidebar */}
        {data.education.length > 0 && (
          <div className="space-y-2 text-xs">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-300 pb-1`}>
              Education
            </h3>
            <div className="space-y-2.5 pt-1">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-neutral-900">{edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ')}</div>
                  <div className="text-neutral-500 text-[11px]">{edu.institution}</div>
                  <div className="text-neutral-500 text-[11px] tabular-nums">{edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills in Sidebar */}
        {data.skillCategories.length > 0 && (
          <div className="space-y-2 text-xs">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-300 pb-1`}>
              Expertise
            </h3>
            <div className="space-y-2 pt-1">
              {data.skillCategories.map((cat) => (
                <div key={cat.id}>
                  <div className="font-semibold text-neutral-800 text-[11px] mb-0.5">{cat.name}</div>
                  <div className="text-neutral-600 text-[11px] leading-tight">
                    {cat.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages in Sidebar */}
        {data.languages.length > 0 && (
          <div className="space-y-2 text-xs">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-300 pb-1`}>
              Languages
            </h3>
            <div className="space-y-1 pt-1">
              {data.languages.map((l) => (
                <div key={l.id} className="flex justify-between items-center text-[11px]">
                  <span className="font-medium text-neutral-800">{l.language}</span>
                  <span className="text-neutral-500">{l.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Right Content Area */}
      <main className={`flex-1 p-6 sm:p-10 ${spacing.sectionGap}`}>
        {/* Summary */}
        {data.summary.trim() && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2`}>
              Executive Summary
            </h2>
            <p className={`text-xs sm:text-sm text-neutral-700 ${spacing.lineHeight}`}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-3`}>
              Work Experience
            </h2>
            <div className={spacing.itemGap}>
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-neutral-200 pl-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <span className="text-sm font-bold text-neutral-900">{exp.role}</span>
                    <span className="text-xs text-neutral-500 tabular-nums">
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 font-medium mb-1">
                    <span>{exp.company}</span>
                    {exp.location && <span> · {exp.location}</span>}
                  </div>
                  {exp.bullets.length > 0 && (
                    <ul className="space-y-1 text-xs text-neutral-700">
                      {exp.bullets.map((b, i) =>
                        b.trim() ? (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-neutral-400 select-none">›</span>
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
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-3`}>
              Projects & Initiatives
            </h2>
            <div className={spacing.itemGap}>
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-neutral-900">{proj.title}</span>
                    {proj.role && <span className="text-xs text-neutral-500">{proj.role}</span>}
                  </div>
                  {proj.technologies && (
                    <p className="text-xs text-neutral-500 italic">Built with: {proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className={`text-xs text-neutral-700 mt-1 ${spacing.lineHeight}`}>{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${colors.primary} border-b border-neutral-200 pb-1 mb-2`}>
              Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <div className="font-semibold text-neutral-900">{c.name}</div>
                  <div className="text-neutral-500">{c.issuer} · {c.date}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
