import React from 'react';
import { TemplateId } from '../types/cv';
import {
  FileText,
  ShieldCheck,
  MoveVertical,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Lock,
  Layers,
  Award,
  Zap,
  ChevronRight,
  Sliders,
  Type,
  Layout,
  Download,
} from 'lucide-react';

interface Props {
  onStartBuilder: (templateId?: TemplateId) => void;
  onLoadSampleAndStart: () => void;
}

const TEMPLATE_SHOWCASE: {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  badge: string;
}[] = [
  {
    id: 'modern_executive',
    name: 'Modern Executive',
    category: 'Leadership & Corporate',
    badge: 'Popular',
    description: 'Crisp header accent line, structured chronological milestones, clean unboxed metadata with subtle typographic separators.',
  },
  {
    id: 'oxford_classic',
    name: 'Oxford Classic',
    category: 'Academic, Law & Medicine',
    badge: 'Timeless',
    description: 'Prestigious centered serif layout with traditional horizontal rule dividers, formal italicized dates, and academic elegance.',
  },
  {
    id: 'creative_sidebar',
    name: 'Creative Sidebar',
    category: 'Product, Design & Strategy',
    badge: 'High-Impact',
    description: 'Modern two-column architecture featuring an accent sidebar for competencies, contact details, and education alongside a spacious career stream.',
  },
  {
    id: 'tech_minimalist',
    name: 'Tech Minimalist',
    category: 'Engineering & Architecture',
    badge: 'Developer',
    description: 'High-density layout engineered for engineers and architects with monospaced accent tags, GitHub repository links, and zero clutter.',
  },
  {
    id: 'nordic_clean',
    name: 'Nordic Clean',
    category: 'Editorial & Creative',
    badge: 'Minimalist',
    description: 'Airy numbered chapter divisions (01 / Overview, 02 / Experience) with generous modern whitespace and sophisticated calm lines.',
  },
  {
    id: 'compact_ats',
    name: 'Silicon Valley ATS',
    category: 'Recruiting & ATS Safe',
    badge: 'ATS 100%',
    description: 'Engineered specifically for Applicant Tracking Systems with single-column text flow, standard bullet points, and maximum machine scannability.',
  },
];

export const LandingPage: React.FC<Props> = ({
  onStartBuilder,
  onLoadSampleAndStart,
}) => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans-main flex flex-col">
      {/* Top Bar Navigation conforming to Top Bar Contract */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200 sticky top-0 z-30">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-tight text-neutral-950 font-display-main">
            Veritas CV Studio
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-600">
          <a href="#capabilities" className="hover:text-neutral-950 transition-colors">
            Capabilities
          </a>
          <a href="#templates" className="hover:text-neutral-950 transition-colors">
            Templates
          </a>
          <a href="#how-it-works" className="hover:text-neutral-950 transition-colors">
            How It Works
          </a>
          <a href="#privacy" className="hover:text-neutral-950 transition-colors">
            Privacy Model
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() => onStartBuilder()}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <span>Open CV Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 max-w-6xl mx-auto w-full text-center">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium mb-6 border border-neutral-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Client-Side Private · Zero Server Storage</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-950 max-w-4xl mx-auto leading-[1.1] text-balance">
          Professional CV Creation
        </h1>

        <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Craft executive-grade resumes across 6 curated archetypes, preview live in real-time and download matching PDF documents — with absolute privacy.
        </p>

        {/* CTA Group */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onStartBuilder()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-all shadow-md cursor-pointer active:scale-[0.99]"
          >
            <span>Create Your CV Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs text-neutral-500">
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm text-neutral-900">6 Archetypes</span>
            <span>Tailored for every industry</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm text-neutral-900">Drag & Drop</span>
            <span>Custom section hierarchy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm text-neutral-900">PDF Document</span>
            <span>Preview-matched PDF export</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm text-neutral-900">Zero Server Data</span>
            <span>100% ephemeral privacy</span>
          </div>
        </div>
      </section>

      {/* Core Capabilities Bento Grid */}
      <section id="capabilities" className="px-6 py-20 bg-white border-t border-b border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              System Capabilities
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 mt-1">
              Engineered for Discerning Professionals
            </h2>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Unlike generic resume builders that force a single rigid format, Veritas provides dynamic multi-page structure, drag-and-drop customization, and direct PDF generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Multi-Page Wizard */}
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">Multi-Page Form Wizard</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Step-by-step pages for Personal Details, Executive Summary, Work History, Education, Skills, and Projects. Avoids the cognitive overload of an endless single form.
              </p>
            </div>

            {/* Bento Card 2: Drag & Drop Hierarchy */}
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">Drag-and-Drop Hierarchy</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Seamlessly rearrange top-level sections (e.g., place Education before Experience for graduates) or reorder individual positions with grab handles and arrow controls.
              </p>
            </div>

            {/* Bento Card 3: Preview-matched PDF */}
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">Preview-Matched PDF Export</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Generates a polished PDF with the same typography, colors, layout, section order, and headshot shown in your live preview.
              </p>
            </div>

            {/* Bento Card 4: Curated Archetypes (Spans 2 cols on md) */}
            <div className="md:col-span-2 p-6 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Layout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-950">6 Specialized Architectural Archetypes</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                From Oxford Classic serif typography for legal and academic positions, to Silicon Valley ATS for automated hiring systems, to Tech Minimalist for systems engineers — switch templates instantly without losing entered content.
              </p>
            </div>

            {/* Bento Card 5: Ephemeral Privacy */}
            <div className="p-6 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-emerald-950">Strict Ephemeral Privacy</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                No user accounts, no tracking cookies, and no server databases. Your sensitive career history exists only in your browser session and can be wiped instantly with 1 click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" className="px-6 py-20 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Curated Archetypes
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 mt-1">
            Choose Your Design Direction
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Every template is crafted to highlight your achievements with clear typographic contrast and zero AI slop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATE_SHOWCASE.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-neutral-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded">
                    {tmpl.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-neutral-950 group-hover:text-neutral-800">
                  {tmpl.name}
                </h3>

                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              {/* <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onStartBuilder(tmpl.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:underline cursor-pointer"
                >
                  <span>Build with this template</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Editorial Flow */}
      <section id="how-it-works" className="px-6 py-20 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Workflow Protocol
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              From Milestones to PDF Document in Minutes
            </h2>
            <p className="text-sm text-neutral-400 mt-2">
              A structured multi-page journey designed to eliminate blank-page paralysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-neutral-800/80 rounded-xl border border-neutral-700/80 space-y-3">
              <span className="text-xs font-mono-main text-neutral-400">01 / Input</span>
              <h3 className="text-base font-bold text-white">Add Career Data</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Step-by-step forms for personal details, summary, roles, degrees, skills, projects, and certifications.
              </p>
            </div>

            <div className="p-5 bg-neutral-800/80 rounded-xl border border-neutral-700/80 space-y-3">
              <span className="text-xs font-mono-main text-neutral-400">02 / Arrange</span>
              <h3 className="text-base font-bold text-white">Drag &amp; Drop Reorder</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Customize section priority, toggle visibility.
              </p>
            </div>

            <div className="p-5 bg-neutral-800/80 rounded-xl border border-neutral-700/80 space-y-3">
              <span className="text-xs font-mono-main text-neutral-400">03 / Refine</span>
              <h3 className="text-base font-bold text-white">Palette &amp; Font Styling</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Choose from 8 curated accent palettes and 5 editorial typography pairings with real-time live preview.
              </p>
            </div>

            <div className="p-5 bg-neutral-800/80 rounded-xl border border-neutral-700/80 space-y-3">
              <span className="text-xs font-mono-main text-neutral-400">04 / Export</span>
              <h3 className="text-base font-bold text-white">Download PDF</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Instant preview-matched PDF generation, plus an optional automatic data wipe to preserve your personal privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Architecture Comparison Section */}
      <section id="privacy" className="px-6 py-20 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-10 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Lock className="w-4 h-4" />
              <span>Privacy Constitution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
              Why We Never Store Your Resume On A Server
            </h2>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Standard commercial resume websites collect phone numbers, compensation histories, and emails to build marketing profiles. Veritas operates on a strict zero-retention philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Veritas CV Studio Model
              </div>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Client-Side:</strong> All form data and PDF generation executes strictly within your browser.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Accounts Required:</strong> No login walls, passwords, or credit card funnels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Session Purge:</strong> One-click &quot;Delete All CV Data Now&quot; button wipes all browser state.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                Typical Commercial CV Sites
              </div>
              <ul className="space-y-2 text-xs text-neutral-500">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold select-none">✕</span>
                  <span>Store permanent records of your employment history in cloud databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold select-none">✕</span>
                  <span>Require mandatory email registrations and newsletters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold select-none">✕</span>
                  <span>Hold your exported file hostage behind recurring monthly subscriptions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <div className="p-8 sm:p-12 bg-neutral-950 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to create your executive CV?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg leading-relaxed">
              Start with empty fields or load a pre-filled sample profile to test templates immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onStartBuilder()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-neutral-950 bg-white hover:bg-neutral-100 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Launch Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onLoadSampleAndStart}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer border border-neutral-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Load Sample Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="mt-auto px-6 py-8 bg-white border-t border-neutral-200 text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">Veritas CV Studio</span>
            <span>·</span>
            <span>Client-Side Privacy Engine</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => onStartBuilder()}
              className="hover:text-neutral-900 transition-colors cursor-pointer"
            >
              CV Builder
            </button>
            <a href="#templates" className="hover:text-neutral-900 transition-colors">
              Templates
            </a>
            <a href="#privacy" className="hover:text-neutral-900 transition-colors">
              Privacy Guarantee
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
