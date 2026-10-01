import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
} from 'docx';
import { CVData, ColorTheme } from '../types/cv';

const COLOR_MAP: Record<ColorTheme, string> = {
  navy: '1E3A8A',
  slate: '334155',
  emerald: '065F46',
  burgundy: '881337',
  indigo: '3730A3',
  teal: '115E59',
  charcoal: '1F2937',
  cobalt: '1D4ED8',
};

export async function exportCVToDocx(cv: CVData): Promise<Blob> {
  const accentHex = COLOR_MAP[cv.design.colorTheme] || '1E3A8A';
  const template = cv.design.template || 'modern_executive';
  const paragraphs: (Paragraph | Table)[] = [];

  // Parse photo if present and enabled
  let photoImageRun: ImageRun | null = null;
  if (cv.design.showPhoto && cv.personalInfo.photoUrl) {
    try {
      const url = cv.personalInfo.photoUrl;
      const commaIdx = url.indexOf(',');
      if (commaIdx > -1 && !url.includes('image/svg+xml')) {
        const base64 = url.substring(commaIdx + 1);
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        photoImageRun = new ImageRun({
          data: bytes,
          transformation: {
            width: 70,
            height: 70,
          },
          type: 'png',
        });
      }
    } catch (e) {
      console.warn('Could not parse photo for docx', e);
    }
  }

  const isClassicHeader = template === 'oxford_classic';
  const isNordicLayout = template === 'nordic_clean';
  const isCompactLayout = template === 'compact_ats';
  const isCreativeSidebar = template === 'creative_sidebar';
  const usesAccentBar = template === 'modern_executive' || template === 'tech_minimalist' || template === 'creative_sidebar';

  if (usesAccentBar) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 120 },
        border: {
          bottom: {
            color: accentHex,
            space: 0,
            style: BorderStyle.SINGLE,
            size: 10,
          },
        },
      })
    );
  }

  const nameSize = isClassicHeader ? 34 : isNordicLayout ? 32 : isCompactLayout ? 28 : 44;
  const titleSize = isClassicHeader ? 17 : isNordicLayout ? 18 : isCompactLayout ? 16 : 26;
  const titleAlign = isClassicHeader ? AlignmentType.CENTER : isCreativeSidebar ? AlignmentType.LEFT : AlignmentType.LEFT;

  if (photoImageRun && !isClassicHeader && !isCreativeSidebar) {
    paragraphs.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: isNordicLayout ? 75 : 80, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    spacing: { after: 80 },
                    children: [
                      new TextRun({
                        text: cv.personalInfo.fullName || 'Untitled Resume',
                        bold: true,
                        size: nameSize,
                        color: accentHex,
                        font: 'Calibri',
                      }),
                    ],
                  }),
                  cv.personalInfo.jobTitle
                    ? new Paragraph({
                        spacing: { after: 120 },
                        children: [
                          new TextRun({
                            text: cv.personalInfo.jobTitle,
                            size: titleSize,
                            color: '475569',
                            font: 'Calibri',
                          }),
                        ],
                      })
                    : new Paragraph({}),
                ],
              }),
              new TableCell({
                width: { size: isNordicLayout ? 25 : 20, type: WidthType.PERCENTAGE },
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [photoImageRun],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    paragraphs.push(
      new Paragraph({
        alignment: titleAlign,
        spacing: { after: isClassicHeader ? 80 : isCompactLayout ? 60 : 100 },
        children: [
          new TextRun({
            text: cv.personalInfo.fullName || 'Untitled Resume',
            bold: true,
            size: nameSize,
            color: accentHex,
            font: 'Calibri',
          }),
        ],
      })
    );

    if (cv.personalInfo.jobTitle) {
      paragraphs.push(
        new Paragraph({
          alignment: titleAlign,
          spacing: { after: isClassicHeader ? 120 : isCompactLayout ? 90 : 140 },
          children: [
            new TextRun({
              text: cv.personalInfo.jobTitle,
              size: titleSize,
              color: '475569',
              font: 'Calibri',
            }),
          ],
        })
      );
    }
  }

  // Contact items separated by dots
  const contactParts: string[] = [];
  if (cv.personalInfo.email) contactParts.push(cv.personalInfo.email);
  if (cv.personalInfo.phone) contactParts.push(cv.personalInfo.phone);
  if (cv.personalInfo.location) contactParts.push(cv.personalInfo.location);
  if (cv.personalInfo.website) contactParts.push(cv.personalInfo.website);
  if (cv.personalInfo.linkedin) contactParts.push(cv.personalInfo.linkedin);
  if (cv.personalInfo.github) contactParts.push(cv.personalInfo.github);

  if (contactParts.length > 0) {
    const contactSpacing = isClassicHeader ? 180 : isCompactLayout ? 120 : 280;
    const contactBorder = isClassicHeader || isCreativeSidebar
      ? {
          bottom: {
            color: 'CBD5E1',
            space: 4,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        }
      : {
          bottom: {
            color: accentHex,
            space: 6,
            style: BorderStyle.SINGLE,
            size: 12,
          },
        };

    paragraphs.push(
      new Paragraph({
        spacing: { after: contactSpacing },
        border: contactBorder,
        alignment: isClassicHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [
          new TextRun({
            text: contactParts.join('  |  '),
            size: isCompactLayout ? 15 : 19,
            color: '64748B',
            font: 'Calibri',
          }),
        ],
      })
    );
  }

  // Section Heading Helper
  const createSectionHeader = (title: string) => {
    const headerSize = template === 'oxford_classic' ? 18 : template === 'compact_ats' ? 14 : 24;
    const spacingBefore = template === 'oxford_classic' ? 180 : template === 'compact_ats' ? 120 : 240;
    const align = template === 'oxford_classic' ? AlignmentType.CENTER : AlignmentType.LEFT;
    const boldLabel = template === 'compact_ats' ? false : true;

    return new Paragraph({
      heading: template === 'oxford_classic' ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2,
      alignment: align,
      spacing: { before: spacingBefore, after: 120 },
      border: {
        bottom: {
          color: 'CBD5E1',
          space: 4,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: boldLabel,
          size: headerSize,
          color: accentHex,
          font: 'Calibri',
        }),
      ],
    });
  };

  // Render sections following cv.design.sectionOrder
  const activeSections = cv.design.sectionOrder.filter((s) => s.enabled);

  for (const section of activeSections) {
    switch (section.key) {
      case 'summary':
        if (cv.summary.trim()) {
          paragraphs.push(createSectionHeader('Professional Summary'));
          paragraphs.push(
            new Paragraph({
              spacing: { after: 200, line: 320 },
              children: [
                new TextRun({
                  text: cv.summary,
                  size: 21,
                  font: 'Calibri',
                  color: '1E293B',
                }),
              ],
            })
          );
        }
        break;

      case 'experience':
        if (cv.experience && cv.experience.length > 0) {
          paragraphs.push(createSectionHeader('Work Experience'));
          for (const exp of cv.experience) {
            const dateStr = `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`;
            const headerTable = new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { style: BorderStyle.NONE },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 70, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: exp.role,
                              bold: true,
                              size: 22,
                              color: '0F172A',
                              font: 'Calibri',
                            }),
                            new TextRun({
                              text: `  ·  ${exp.company}`,
                              bold: false,
                              size: 21,
                              color: '334155',
                              font: 'Calibri',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 30, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.RIGHT,
                          children: [
                            new TextRun({
                              text: dateStr,
                              size: 19,
                              color: '64748B',
                              italics: true,
                              font: 'Calibri',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
            paragraphs.push(headerTable);

            if (exp.location) {
              paragraphs.push(
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: exp.location,
                      size: 18,
                      color: '64748B',
                      font: 'Calibri',
                    }),
                  ],
                })
              );
            }

            for (const bullet of exp.bullets) {
              if (bullet.trim()) {
                paragraphs.push(
                  new Paragraph({
                    bullet: { level: 0 },
                    spacing: { after: 40, line: 280 },
                    children: [
                      new TextRun({
                        text: bullet,
                        size: 20,
                        color: '1E293B',
                        font: 'Calibri',
                      }),
                    ],
                  })
                );
              }
            }

            // Margin after each job entry
            paragraphs.push(new Paragraph({ spacing: { after: 120 } }));
          }
        }
        break;

      case 'education':
        if (cv.education && cv.education.length > 0) {
          paragraphs.push(createSectionHeader('Education'));
          for (const edu of cv.education) {
            const dateStr = `${edu.startDate ? edu.startDate + ' - ' : ''}${edu.endDate}`;
            const qualificationText = edu.qualification || [edu.degree, edu.fieldOfStudy].filter(Boolean).join(' in ');
            const qualificationParts = qualificationText.includes(' in ') && !edu.qualification ? qualificationText.split(' in ') : [qualificationText];

            paragraphs.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  ...(qualificationParts.length > 1
                    ? [
                        new TextRun({
                          text: qualificationParts[0],
                          bold: true,
                          size: 22,
                          color: '0F172A',
                          font: 'Calibri',
                        }),
                        new TextRun({
                          text: ` in ${qualificationParts.slice(1).join(' in ')}`,
                          size: 21,
                          color: '334155',
                          font: 'Calibri',
                        }),
                      ]
                    : [
                        new TextRun({
                          text: qualificationText,
                          bold: true,
                          size: 22,
                          color: '0F172A',
                          font: 'Calibri',
                        }),
                      ]),
                ],
              })
            );

            paragraphs.push(
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `${edu.institution}${edu.location ? ', ' + edu.location : ''}  |  ${dateStr}`,
                    size: 19,
                    color: '64748B',
                    font: 'Calibri',
                  }),
                  edu.gpa
                    ? new TextRun({
                        text: `  (Qualification: ${edu.gpa})`,
                        size: 19,
                        color: '475569',
                        bold: true,
                        font: 'Calibri',
                      })
                    : new TextRun({ text: '' }),
                ],
              })
            );

            if (edu.highlights && edu.highlights.length > 0) {
              for (const hl of edu.highlights) {
                if (hl.trim()) {
                  paragraphs.push(
                    new Paragraph({
                      bullet: { level: 0 },
                      spacing: { after: 30 },
                      children: [
                        new TextRun({
                          text: hl,
                          size: 19,
                          color: '334155',
                          font: 'Calibri',
                        }),
                      ],
                    })
                  );
                }
              }
            }

            paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
          }
        }
        break;

      case 'skills':
        if (cv.skillCategories && cv.skillCategories.length > 0) {
          paragraphs.push(createSectionHeader('Skills & Competencies'));
          for (const cat of cv.skillCategories) {
            if (cat.skills.length > 0) {
              paragraphs.push(
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: `${cat.name}: `,
                      bold: true,
                      size: 20,
                      color: '0F172A',
                      font: 'Calibri',
                    }),
                    new TextRun({
                      text: cat.skills.join(', '),
                      size: 20,
                      color: '334155',
                      font: 'Calibri',
                    }),
                  ],
                })
              );
            }
          }
          paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
        }
        break;

      case 'languages':
        if (cv.languages && cv.languages.length > 0) {
          paragraphs.push(createSectionHeader('Languages'));
          const langRuns = cv.languages.map((l, i) => {
            return `${l.language} (${l.proficiency})${i < cv.languages.length - 1 ? '  ·  ' : ''}`;
          });
          paragraphs.push(
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: langRuns.join(''),
                  size: 20,
                  color: '334155',
                  font: 'Calibri',
                }),
              ],
            })
          );
        }
        break;

      case 'projects':
        if (cv.projects && cv.projects.length > 0) {
          paragraphs.push(createSectionHeader('Projects'));
          for (const proj of cv.projects) {
            paragraphs.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: proj.title,
                    bold: true,
                    size: 21,
                    color: '0F172A',
                    font: 'Calibri',
                  }),
                  proj.role
                    ? new TextRun({
                        text: `  ·  ${proj.role}`,
                        size: 20,
                        color: '475569',
                        font: 'Calibri',
                      })
                    : new TextRun({ text: '' }),
                ],
              })
            );

            if (proj.technologies) {
              paragraphs.push(
                new Paragraph({
                  spacing: { after: 40 },
                  children: [
                    new TextRun({
                      text: `Technologies: ${proj.technologies}`,
                      size: 19,
                      color: '64748B',
                      italics: true,
                      font: 'Calibri',
                    }),
                  ],
                })
              );
            }

            if (proj.description) {
              paragraphs.push(
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: proj.description,
                      size: 20,
                      color: '1E293B',
                      font: 'Calibri',
                    }),
                  ],
                })
              );
            }

            if (proj.bullets && proj.bullets.length > 0) {
              for (const b of proj.bullets) {
                if (b.trim()) {
                  paragraphs.push(
                    new Paragraph({
                      bullet: { level: 0 },
                      spacing: { after: 30 },
                      children: [
                        new TextRun({
                          text: b,
                          size: 19,
                          color: '334155',
                          font: 'Calibri',
                        }),
                      ],
                    })
                  );
                }
              }
            }

            paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
          }
        }
        break;

      case 'certifications':
        if (cv.certifications && cv.certifications.length > 0) {
          paragraphs.push(createSectionHeader('Certifications'));
          for (const cert of cv.certifications) {
            paragraphs.push(
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: cert.name,
                    bold: true,
                    size: 20,
                    color: '0F172A',
                    font: 'Calibri',
                  }),
                  new TextRun({
                    text: `  ·  ${cert.issuer} (${cert.date})`,
                    size: 19,
                    color: '475569',
                    font: 'Calibri',
                  }),
                  cert.credentialId
                    ? new TextRun({
                        text: `  ·  ID: ${cert.credentialId}`,
                        size: 18,
                        color: '64748B',
                        font: 'Calibri',
                      })
                    : new TextRun({ text: '' }),
                ],
              })
            );
          }
          paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
        }
        break;

      default:
        // Custom section handling
        const customSec = cv.customSections.find((cs) => cs.id === section.key);
        if (customSec && customSec.items.length > 0) {
          paragraphs.push(createSectionHeader(customSec.title));
          for (const item of customSec.items) {
            paragraphs.push(
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: item.title,
                    bold: true,
                    size: 21,
                    color: '0F172A',
                    font: 'Calibri',
                  }),
                  item.subtitle
                    ? new TextRun({
                        text: `  ·  ${item.subtitle}`,
                        size: 20,
                        color: '475569',
                        font: 'Calibri',
                      })
                    : new TextRun({ text: '' }),
                  item.date
                    ? new TextRun({
                        text: `  ·  ${item.date}`,
                        size: 19,
                        color: '64748B',
                        italics: true,
                        font: 'Calibri',
                      })
                    : new TextRun({ text: '' }),
                ],
              })
            );
            if (item.description) {
              paragraphs.push(
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: item.description,
                      size: 20,
                      color: '1E293B',
                      font: 'Calibri',
                    }),
                  ],
                })
              );
            }
          }
          paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
        }
        break;
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 in
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
