import React, { useState } from 'react';
import { CVData, TemplateId, ColorTheme, FontTheme, SpacingScale } from '../../types/cv';
import { THEME_COLORS } from '../../utils/themeStyles';
import { exportPreviewToPdf, downloadPdf } from '../../utils/pdfExport';
import {
  FileText,
  ShieldCheck,
  Trash2,
  Check,
  Loader2,
  Sparkles,
  Layout,
  Palette,
  Type,
  Maximize2,
  Download,
} from 'lucide-react';

interface Props {
  data: CVData;
  onDesignChange: (design: CVData['design']) => void;
  onClearData: () => void;
  onOpenFullPreview: () => void;
}

const TEMPLATES: { id: TemplateId; name: string; tag: string; description: string }[] = [
  {
    id: 'modern_executive',
    name: 'Modern Executive',
    tag: 'Corporate & Leadership',
    description: 'Header accent line, crisp sans hierarchy, structured chronological milestones.',
  },
  {
    id: 'oxford_classic',
    name: 'Oxford Classic',
    tag: 'Academic, Legal & Medical',
    description: 'Prestigious centered serif layout, divider rules, timeless formal elegance.',
  },
  {
    id: 'creative_sidebar',
    name: 'Creative Sidebar',
    tag: 'High-Impact Two-Column',
    description: 'Left colored sidebar for competencies & contact, spacious right career stream.',
  },
  {
    id: 'tech_minimalist',
    name: 'Tech Minimalist',
    tag: 'Engineering & Architect',
    description: 'Monospaced accent tags, high density, GitHub/repo focus, zero clutter.',
  },
  {
    id: 'nordic_clean',
    name: 'Nordic Clean',
    tag: 'Editorial & Scandinavian',
    description: 'Airy numbered chapter divisions, refined modern whitespace and calm lines.',
  },
  {
    id: 'compact_ats',
    name: 'Silicon Valley ATS',
    tag: '100% ATS Optimized',
    description: 'Single-column text, standard bullet points, maximum machine readability.',
  },
];

const COLOR_OPTIONS: { id: ColorTheme; label: string; swatch: string }[] = [
  { id: 'navy', label: 'Deep Navy', swatch: '#1e3a8a' },
  { id: 'slate', label: 'Slate Gray', swatch: '#0f172a' },
  { id: 'emerald', label: 'Forest Emerald', swatch: '#064e3b' },
  { id: 'burgundy', label: 'Royal Burgundy', swatch: '#4c0519' },
  { id: 'indigo', label: 'Modern Indigo', swatch: '#312e81' },
  { id: 'teal', label: 'Nordic Teal', swatch: '#134e4a' },
  { id: 'charcoal', label: 'Minimal Charcoal', swatch: '#171717' },
  { id: 'cobalt', label: 'Electric Cobalt', swatch: '#1d4ed8' },
];

const FONT_OPTIONS: { id: FontTheme; label: string; preview: string }[] = [
  { id: 'sans', label: 'Plus Jakarta Sans', preview: 'Modern & Clean' },
  { id: 'serif', label: 'Lora Serif', preview: 'Timeless & Editorial' },
  { id: 'display', label: 'Outfit Display', preview: 'Contemporary Design' },
  { id: 'classic', label: 'Cinzel Classic', preview: 'Prestigious & Formal' },
  { id: 'mono', label: 'JetBrains Mono', preview: 'Technical & Precise' },
];

export const TemplateExportStep: React.FC<Props> = ({
  data,
  onDesignChange,
  onClearData,
  onOpenFullPreview,
}) => {
  const { design, personalInfo } = data;
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [autoWipeOnExport, setAutoWipeOnExport] = useState(false);

  const baseFileName = (personalInfo.fullName || 'Resume')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');

  const handlePdfExport = async () => {
    setIsExportingPdf(true);
    setExportMessage('Generating PDF from your preview...');
    try {
      const blob = await exportPreviewToPdf();
      downloadPdf(blob, `${baseFileName}_CV.pdf`);
      setExportMessage('PDF successfully downloaded!');
      if (autoWipeOnExport) {
        setTimeout(() => {
          onClearData();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExportingPdf(false);
      setTimeout(() => setExportMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">
          Template Selection & PDF Download
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Pick from curated executive designs, fine-tune typography and colors, and download a PDF that matches your preview.
        </p>
      </div>

      {/* Export Action Strip */}
      <div className="p-6 bg-neutral-900 text-white rounded-xl shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-200" />
              <span>Ready for Immediate Download</span>
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              Download {personalInfo.fullName ? `${personalInfo.fullName}'s CV` : 'Your Document'}
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Exported as a PDF with the same layout shown in your preview.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenFullPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer self-start border border-neutral-700 shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full Document Preview</span>
          </button>
        </div>

        {exportMessage && (
          <div className="p-3 bg-neutral-800 rounded-lg text-xs text-neutral-100 flex items-center gap-2 border border-neutral-700">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportMessage}</span>
          </div>
        )}

        <div className="pt-2">
          {/* Main PDF Download Button */}
          <button
            type="button"
            onClick={handlePdfExport}
            disabled={isExportingPdf}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-sm rounded-lg transition-all shadow-md cursor-pointer disabled:opacity-50 active:scale-[0.99]"
          >
            {isExportingPdf ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <FileText className="w-5 h-5 text-blue-700" />
            )}
            <span>Download PDF Document</span>
          </button>
        </div>

        {/* Auto Wipe option */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-200">
            <input
              type="checkbox"
              checked={autoWipeOnExport}
              onChange={(e) => setAutoWipeOnExport(e.target.checked)}
              className="rounded border-neutral-700 bg-neutral-800 text-white focus:ring-0"
            />
            <span>Auto-delete all personal data immediately after download</span>
          </label>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-neutral-700" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
            1. Professional Template Archetype
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = design.template === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => onDesignChange({ ...design, template: tmpl.id })}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-neutral-900 bg-white shadow-sm ring-1 ring-neutral-900'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-neutral-900">{tmpl.name}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-500 block mt-0.5">
                    {tmpl.tag}
                  </span>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
                <div className="text-[11px] font-medium text-neutral-900 underline">
                  {isSelected ? 'Currently Selected' : 'Apply Template'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Palette & Typography Customization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Color Palette */}
        <div className="p-4 bg-white border border-neutral-200 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-neutral-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              2. Accent Color Palette
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {COLOR_OPTIONS.map((c) => {
              const isSelected = design.colorTheme === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onDesignChange({ ...design, colorTheme: c.id })}
                  className={`p-2 rounded-md border text-center flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: c.swatch }}
                  />
                  <span className="text-[10px] font-medium text-neutral-700 leading-tight">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Pairings */}
        <div className="p-4 bg-white border border-neutral-200 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-neutral-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              3. Typography Hierarchy
            </h3>
          </div>
          <div className="space-y-1.5">
            {FONT_OPTIONS.map((f) => {
              const isSelected = design.fontTheme === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onDesignChange({ ...design, fontTheme: f.id })}
                  className={`w-full p-2.5 rounded-md border flex items-center justify-between text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-xs font-semibold text-neutral-900">{f.label}</span>
                  <span className="text-[11px] text-neutral-500">{f.preview}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spacing & Density scale */}
      <div className="p-4 bg-white border border-neutral-200 rounded-lg space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
          4. Spacing Density (Page-Fitting)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(['compact', 'standard', 'generous'] as SpacingScale[]).map((scale) => {
            const isSelected = design.spacing === scale;
            return (
              <button
                key={scale}
                type="button"
                onClick={() => onDesignChange({ ...design, spacing: scale })}
                className={`p-2.5 rounded-md border text-center cursor-pointer capitalize text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {scale}
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy Guarantee & Instant Data Purge */}
      <div className="p-5 bg-white border border-emerald-200 rounded-xl space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-sm font-bold text-neutral-900">
            Client-Side Privacy Guarantee
          </h3>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Your personal CV data never touches any remote database or third-party server. All generation, editing, and formatting executes purely in your browser runtime memory. When you are finished with your CV, you can permanently erase all data immediately below.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete and wipe all CV data immediately? This action cannot be undone.'
                )
              ) {
                onClearData();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete All CV Data Now</span>
          </button>
          <span className="text-[11px] text-neutral-400">
            Instantly clears all in-memory inputs, experience, and custom settings.
          </span>
        </div>
      </div>
    </div>
  );
};
