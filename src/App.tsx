/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVData, WizardStepId } from './types/cv';
import { SAMPLE_CV, EMPTY_CV } from './data/sampleData';
import { Header } from './components/Header';
import { StepIndicator, WIZARD_STEPS } from './components/StepIndicator';
import { PersonalInfoStep } from './components/steps/PersonalInfoStep';
import { SummaryStep } from './components/steps/SummaryStep';
import { ExperienceStep } from './components/steps/ExperienceStep';
import { EducationStep } from './components/steps/EducationStep';
import { SkillsStep } from './components/steps/SkillsStep';
import { ProjectsStep } from './components/steps/ProjectsStep';
import { SectionOrderStep } from './components/steps/SectionOrderStep';
import { TemplateExportStep } from './components/steps/TemplateExportStep';
import { CvRenderer } from './components/templates/CvRenderer';
import { FullPreviewModal } from './components/FullPreviewModal';
import { PrivacyModal } from './components/PrivacyModal';
import { LandingPage } from './components/LandingPage';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

const STORAGE_KEY = 'veritas_cv_draft_session';
const NAVIGATION_STORAGE_KEY = 'veritas_cv_navigation_session';

export default function App() {
  const [view, setView] = useState<'landing' | 'builder'>(() => {
    try {
      return sessionStorage.getItem(NAVIGATION_STORAGE_KEY) === 'builder' ? 'builder' : 'landing';
    } catch {
      return 'landing';
    }
  });
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return EMPTY_CV;
  });

  const [currentStep, setCurrentStep] = useState<WizardStepId>(() => {
    try {
      const savedStep = sessionStorage.getItem(`${NAVIGATION_STORAGE_KEY}_step`);
      return WIZARD_STEPS.some((step) => step.id === savedStep)
        ? (savedStep as WizardStepId)
        : 'personal';
    } catch {
      return 'personal';
    }
  });
  const [isSplitPreviewOpen, setIsSplitPreviewOpen] = useState(true);
  const [isFullPreviewOpen, setIsFullPreviewOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to session storage (strictly client-side session only)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch (e) {
      console.warn('Could not save draft to session storage', e);
    }
  }, [cvData]);

  useEffect(() => {
    try {
      sessionStorage.setItem(NAVIGATION_STORAGE_KEY, view);
      sessionStorage.setItem(`${NAVIGATION_STORAGE_KEY}_step`, currentStep);
    } catch (e) {
      console.warn('Could not save navigation state to session storage', e);
    }
  }, [view, currentStep]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoadSample = () => {
    setCvData(SAMPLE_CV);
    showToast('Loaded sample profile. Try selecting different templates!');
  };

  const handleStartFromLanding = (templateId?: CVData['design']['template']) => {
    if (templateId) {
      setCvData((prev) => ({
        ...prev,
        design: {
          ...prev.design,
          template: templateId,
        },
      }));
    }
    setView('builder');
  };

  const handleLoadSampleAndStart = () => {
    setCvData(SAMPLE_CV);
    setView('builder');
    showToast('Loaded sample profile. You can now customize or export your CV!');
  };

  const handleClearData = () => {
    setCvData(EMPTY_CV);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setCurrentStep('personal');
    showToast('All CV data permanently wiped from browser memory.');
  };

  if (view === 'landing') {
    return (
      <LandingPage
        onStartBuilder={handleStartFromLanding}
        onLoadSampleAndStart={handleLoadSampleAndStart}
      />
    );
  }

  const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);
  const nextStep = stepIndex < WIZARD_STEPS.length - 1 ? WIZARD_STEPS[stepIndex + 1] : null;
  const prevStep = stepIndex > 0 ? WIZARD_STEPS[stepIndex - 1] : null;

  // Completion indicators
  const completedSteps: Partial<Record<WizardStepId, boolean>> = {
    personal: Boolean(
      cvData.personalInfo.fullName &&
        cvData.personalInfo.email &&
        cvData.personalInfo.phone
    ),
    summary: Boolean(cvData.summary.trim().length > 10),
    experience: cvData.experience.length > 0,
    education: cvData.education.length > 0,
    skills: cvData.skillCategories.some((c) => c.skills.length > 0),
    projects: true,
    sections: true,
    design_export: true,
  };

  const handleStepChange = (targetStep: WizardStepId) => {
    const targetIndex = WIZARD_STEPS.findIndex((s) => s.id === targetStep);
    const isMovingForward = targetIndex > stepIndex;

    if (isMovingForward && !completedSteps[currentStep]) {
      showToast('Please complete the current step before continuing to the next one.');
      return;
    }

    setCurrentStep(targetStep);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 font-sans-main">
      {/* Top Bar following contract */}
      <Header
        onNavigateHome={() => setView('landing')}
        onLoadSample={handleLoadSample}
        onClearData={handleClearData}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onTogglePreview={() => setIsSplitPreviewOpen(!isSplitPreviewOpen)}
        isPreviewVisible={isSplitPreviewOpen}
        onExportClick={() => handleStepChange('design_export')}
      />

      {/* Stepper Navigation */}
      <StepIndicator
        currentStep={currentStep}
        onSelectStep={(step) => handleStepChange(step)}
        completedSteps={completedSteps}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50 bg-neutral-950 text-white px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-neutral-800 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Workspace: Multi-Page Form + Real-time Live Preview */}
      <main className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Left Column: Multi-Step Form View */}
        <section
          className={`flex-1 p-3 sm:p-8 lg:p-10 transition-all lg:overflow-y-auto ${
            isSplitPreviewOpen ? 'lg:max-w-2xl xl:max-w-3xl' : 'max-w-4xl mx-auto w-full'
          }`}
        >
          <div className="bg-white rounded-xl border border-neutral-200/80 shadow-xs p-4 sm:p-8 space-y-8">
            {/* Step Components */}
            {currentStep === 'personal' && (
              <PersonalInfoStep
                data={cvData.personalInfo}
                onChange={(personalInfo) =>
                  setCvData((prev) => ({ ...prev, personalInfo }))
                }
                showPhoto={cvData.design.showPhoto}
                onPhotoChange={(photoUrl, showPhoto) =>
                  setCvData((prev) => ({
                    ...prev,
                    personalInfo: {
                      ...prev.personalInfo,
                      photoUrl,
                    },
                    design: {
                      ...prev.design,
                      showPhoto,
                    },
                  }))
                }
              />
            )}

            {currentStep === 'summary' && (
              <SummaryStep
                summary={cvData.summary}
                onChange={(summary) => setCvData({ ...cvData, summary })}
                jobTitle={cvData.personalInfo.jobTitle}
              />
            )}

            {currentStep === 'experience' && (
              <ExperienceStep
                experience={cvData.experience}
                onChange={(experience) => setCvData({ ...cvData, experience })}
              />
            )}

            {currentStep === 'education' && (
              <EducationStep
                education={cvData.education}
                onChange={(education) => setCvData({ ...cvData, education })}
              />
            )}

            {currentStep === 'skills' && (
              <SkillsStep
                categories={cvData.skillCategories}
                languages={cvData.languages}
                onSkillsChange={(skillCategories) => setCvData({ ...cvData, skillCategories })}
                onLanguagesChange={(languages) => setCvData({ ...cvData, languages })}
              />
            )}

            {currentStep === 'projects' && (
              <ProjectsStep
                projects={cvData.projects}
                certifications={cvData.certifications}
                onProjectsChange={(projects) => setCvData({ ...cvData, projects })}
                onCertificationsChange={(certifications) =>
                  setCvData({ ...cvData, certifications })
                }
              />
            )}

            {currentStep === 'sections' && (
              <SectionOrderStep
                sections={cvData.design.sectionOrder}
                customSections={cvData.customSections}
                onSectionsChange={(sectionOrder) =>
                  setCvData({
                    ...cvData,
                    design: { ...cvData.design, sectionOrder },
                  })
                }
                onCustomSectionsChange={(customSections) =>
                  setCvData({ ...cvData, customSections })
                }
              />
            )}

            {currentStep === 'design_export' && (
              <TemplateExportStep
                data={cvData}
                onDesignChange={(design) => setCvData({ ...cvData, design })}
                onClearData={handleClearData}
                onOpenFullPreview={() => setIsFullPreviewOpen(true)}
              />
            )}

            {/* Stepper Navigation Buttons (Next / Prev) */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {prevStep ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prevStep.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous: {prevStep.shortLabel}</span>
                </button>
              ) : (
                <div />
              )}

              {nextStep ? (
                <button
                  type="button"
                  onClick={() => handleStepChange(nextStep.id)}
                  disabled={!completedSteps[currentStep]}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
                    completedSteps[currentStep]
                      ? 'text-white bg-neutral-900 hover:bg-neutral-800 cursor-pointer'
                      : 'text-neutral-400 bg-neutral-200 cursor-not-allowed'
                  }`}
                >
                  <span>Continue to {nextStep.shortLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsFullPreviewOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen Review</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Live Responsive Document Canvas */}
        {isSplitPreviewOpen && (
          <aside className="hidden lg:flex flex-1 flex-col bg-neutral-200/70 border-l border-neutral-300 p-6 overflow-y-auto items-center">
            {/* Live Canvas Bar */}
            <div className="w-full max-w-[210mm] mb-3 flex items-center justify-between px-1 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-800">Live Document Canvas</span>
                <span className="text-neutral-400">·</span>
                <span className="capitalize">{cvData.design.template.replace('_', ' ')}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullPreviewOpen(true)}
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-800 hover:text-neutral-950 underline cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Expand Fullscreen</span>
              </button>
            </div>

            {/* Rendered CV Component */}
            <div className="w-full max-w-[210mm] transition-all">
              <CvRenderer data={cvData} id="cv-print-target" />
            </div>
          </aside>
        )}
      </main>

      {/* Floating Mobile Preview Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsFullPreviewOpen(true)}
          aria-label="View CV preview"
          title="View CV preview"
          className="flex h-11 w-11 items-center justify-center bg-neutral-900 text-white rounded-full shadow-xl hover:bg-neutral-800 transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Modals */}
      <FullPreviewModal
        isOpen={isFullPreviewOpen}
        onClose={() => setIsFullPreviewOpen(false)}
        data={cvData}
      />

      {/* A fixed A4 renderer ensures every PDF uses the exact live-preview layout. */}
      <div className="fixed left-[-10000px] top-0 w-[210mm] pointer-events-none" aria-hidden="true">
        <CvRenderer data={cvData} id="pdf-export-target" isPrintMode />
      </div>

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        onWipeData={handleClearData}
      />
    </div>
  );
}
