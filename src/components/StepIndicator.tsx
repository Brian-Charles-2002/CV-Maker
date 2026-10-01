import React from 'react';
import { WizardStepId } from '../types/cv';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Sliders,
  Download,
} from 'lucide-react';

interface Props {
  currentStep: WizardStepId;
  onSelectStep: (step: WizardStepId) => void;
  completedSteps?: Partial<Record<WizardStepId, boolean>>;
}

export const WIZARD_STEPS: {
  id: WizardStepId;
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'personal', title: 'Personal Info', shortLabel: 'Personal', icon: User },
  { id: 'summary', title: 'Summary Statement', shortLabel: 'Summary', icon: FileText },
  { id: 'experience', title: 'Work Experience', shortLabel: 'Experience', icon: Briefcase },
  { id: 'education', title: 'Education', shortLabel: 'Education', icon: GraduationCap },
  { id: 'skills', title: 'Skills & Languages', shortLabel: 'Skills', icon: Wrench },
  { id: 'projects', title: 'Projects & Certs', shortLabel: 'Projects', icon: FolderGit2 },
  { id: 'sections', title: 'Section Order', shortLabel: 'Order', icon: Sliders },
  { id: 'design_export', title: 'Templates & Export', shortLabel: 'Export', icon: Download },
];

export const StepIndicator: React.FC<Props> = ({ currentStep, onSelectStep, completedSteps = {} }) => {
  const currentIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full bg-white border-b border-neutral-200">
      {/* Mobile step bar */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-main text-neutral-500">
            Step {currentIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="text-xs font-bold text-neutral-900 truncate">
            {WIZARD_STEPS[currentIndex]?.title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {WIZARD_STEPS.map((s, idx) => (
            <button
              type="button"
              key={s.id}
              onClick={() => onSelectStep(s.id)}
              aria-label={`Go to step ${idx + 1}: ${s.title}`}
              aria-current={currentStep === s.id ? 'step' : undefined}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentStep === s.id
                  ? 'bg-neutral-900 scale-125'
                  : completedSteps[s.id]
                  ? 'bg-neutral-400'
                  : 'bg-neutral-200'
              }`}
              title={s.title}
            />
          ))}
        </div>
      </div>

      {/* Desktop compact step tracker */}
      <div className="hidden md:flex items-center justify-between gap-6 px-6 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-xs font-mono-main text-neutral-500">
            Step {currentIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="text-neutral-300">·</span>
          <span className="truncate text-xs font-bold text-neutral-900">
            {WIZARD_STEPS[currentIndex]?.title}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Choose a step">
          {WIZARD_STEPS.map((step, idx) => (
            <button
              type="button"
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              aria-label={`Go to step ${idx + 1}: ${step.title}`}
              aria-current={currentStep === step.id ? 'step' : undefined}
              title={step.title}
              className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${
                currentStep === step.id
                  ? 'scale-125 bg-neutral-900'
                  : completedSteps[step.id]
                  ? 'bg-neutral-400 hover:bg-neutral-600'
                  : 'bg-neutral-200 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
