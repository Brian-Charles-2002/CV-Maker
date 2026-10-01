import React from 'react';
import { Sparkles, FileText, Check } from 'lucide-react';

interface Props {
  summary: string;
  onChange: (value: string) => void;
  jobTitle?: string;
}

const SAMPLE_STARTERS = [
  {
    role: 'Engineering & Tech Leadership',
    text: 'Engineering leader with 10+ years of expertise scaling distributed systems, cloud infrastructure, and cross-functional agile teams. Proven track record reducing infrastructure costs while maintaining 99.99% availability and accelerating feature velocity across multi-region deployments.',
  },
  {
    role: 'Product & Executive Management',
    text: 'Strategic product leader skilled at bridging technical architecture with market growth. Experienced in leading discovery-to-launch lifecycles for high-growth SaaS products, growing annual recurring revenue, and cultivating data-driven product analytics cultures.',
  },
  {
    role: 'Full-Stack Software Engineer',
    text: 'Results-driven software engineer specialized in modern TypeScript, React, and high-performance backend microservices. Passionate about clean code, test-driven development, modular UI design systems, and low-latency API architecture.',
  },
  {
    role: 'Academic & Scientific Researcher',
    text: 'Dedicated researcher with an extensive publication record in peer-reviewed journals. Experienced in quantitative methodology, computational data pipelines, interdisciplinary research grant proposals, and undergraduate laboratory mentorship.',
  },
];

export const SummaryStep: React.FC<Props> = ({ summary, onChange }) => {
  const [appliedIndex, setAppliedIndex] = React.useState<number | null>(null);

  const applyStarter = (text: string, idx: number) => {
    onChange(text);
    setAppliedIndex(idx);
    setTimeout(() => setAppliedIndex(null), 2000);
  };

  const wordCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-neutral-900">Executive Summary</h2>
        <p className="text-sm text-neutral-500 mt-1">
          A concise 2–4 sentence synthesis of your primary domain value, career trajectory, and quantified achievements.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-semibold text-neutral-700">
            Professional Summary Statement
          </label>
          <span className="text-xs text-neutral-400 tabular-nums">
            {wordCount} words {wordCount > 90 ? '(recommended: 40–80 words)' : ''}
          </span>
        </div>
        <textarea
          rows={6}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Summarize your professional experience in Zimbabwe, leadership scope, and core strengths..."
          className="w-full p-3.5 text-sm bg-white border border-neutral-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 leading-relaxed"
        />
      </div>

      {/* Suggested Starter Inspirations */}
      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
          <Sparkles className="w-4 h-4 text-neutral-600" />
          <span>Need inspiration? Click any starter to adapt:</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SAMPLE_STARTERS.map((s, idx) => (
            <div
              key={idx}
              className="p-3 bg-white border border-neutral-200 rounded-md text-xs hover:border-neutral-400 transition-colors flex flex-col justify-between gap-2.5"
            >
              <div>
                <div className="font-semibold text-neutral-900 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{s.role}</span>
                </div>
                <p className="text-neutral-600 line-clamp-3 leading-normal">{s.text}</p>
              </div>
              <button
                type="button"
                onClick={() => applyStarter(s.text, idx)}
                className="self-start text-[11px] font-medium text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {appliedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Applied</span>
                  </>
                ) : (
                  'Use this starter'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
