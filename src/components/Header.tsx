import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Trash2, Eye, FileText, Home, Menu } from 'lucide-react';

interface Props {
  onNavigateHome: () => void;
  onLoadSample: () => void;
  onClearData: () => void;
  onOpenPrivacy: () => void;
  onTogglePreview: () => void;
  isPreviewVisible: boolean;
  onExportClick: () => void;
}

export const Header: React.FC<Props> = ({
  onNavigateHome,
  onLoadSample,
  onClearData,
  onOpenPrivacy,
  onTogglePreview,
  isPreviewVisible,
  onExportClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const runMobileAction = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-neutral-200 sticky top-0 z-30">
      {/* Zone 1: Single text element brand wordmark */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="whitespace-nowrap text-sm sm:text-base font-bold tracking-tight text-neutral-950 font-display-main hover:opacity-80 transition-opacity cursor-pointer text-left"
          title="Back to Home"
        >
          Veritas CV Studio
        </button>
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[11px] font-medium text-emerald-800 border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>Zero Server Storage</span>
        </div>
      </div>

      {/* Zone 2: Clean navigation / utilities */}
      <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-neutral-600">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-neutral-400" />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={onLoadSample}
          className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          <span>Load Sample Profile</span>
        </button>

        <button
          type="button"
          onClick={onClearData}
          className="flex items-center gap-1.5 hover:text-red-700 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5 text-neutral-400" />
          <span>Clear All Data</span>
        </button>

        <button
          type="button"
          onClick={onOpenPrivacy}
          className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>Privacy Guarantee</span>
        </button>

        <button
          type="button"
          onClick={onTogglePreview}
          className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-neutral-400" />
          <span>{isPreviewVisible ? 'Hide Split Preview' : 'Show Split Preview'}</span>
        </button>
      </nav>

      {/* Zone 3: Primary action */}
      <div className="flex items-center gap-2.5">
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-header-menu"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="p-2 text-neutral-600 hover:text-neutral-900 rounded-md border border-neutral-200"
          >
            <Menu className="w-4 h-4" />
          </button>
          {isMobileMenuOpen && (
            <div
              id="mobile-header-menu"
              className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-neutral-200 bg-white p-1.5 shadow-xl"
            >
              <button type="button" onClick={() => runMobileAction(onNavigateHome)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                <Home className="w-4 h-4 text-neutral-400" /> Home
              </button>
              <button type="button" onClick={() => runMobileAction(onLoadSample)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                <Sparkles className="w-4 h-4 text-neutral-400" /> Load Sample Profile
              </button>
              <button type="button" onClick={() => runMobileAction(onClearData)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                <Trash2 className="w-4 h-4 text-neutral-400" /> Clear All Data
              </button>
              <button type="button" onClick={() => runMobileAction(onOpenPrivacy)} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100">
                <ShieldCheck className="w-4 h-4 text-neutral-400" /> Privacy Guarantee
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onExportClick}
          aria-label="Download PDF"
          className="inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
        >
          <FileText className="w-3.5 h-3.5 text-blue-300" />
          <span className="hidden sm:inline">Download PDF</span>
        </button>
      </div>
    </header>
  );
};

