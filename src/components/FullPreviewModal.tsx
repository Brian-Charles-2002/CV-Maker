import React, { useState } from 'react';
import { CVData } from '../types/cv';
import { CvRenderer } from './templates/CvRenderer';
import { exportPreviewToPdf, downloadPdf } from '../utils/pdfExport';
import { X, ZoomIn, ZoomOut, FileText, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
}

export const FullPreviewModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  if (!isOpen) return null;

  const baseFileName = (data.personalInfo.fullName || 'Resume')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');

  const handlePdf = async () => {
    setIsExportingPdf(true);
    try {
      const blob = await exportPreviewToPdf();
      downloadPdf(blob, `${baseFileName}_CV.pdf`);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-900/90 backdrop-blur-xs">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 sm:px-6 py-3 bg-neutral-950 border-b border-neutral-800 text-white shrink-0">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="whitespace-nowrap text-xs sm:text-sm font-bold tracking-tight">Full Document Preview</span>
          <span className="text-xs text-neutral-400 hidden sm:inline">
            A4 Print-Ready Presentation
          </span>
        </div>

        {/* Center zoom controls */}
        <div className="order-3 flex basis-full items-center justify-center gap-2 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-800 text-xs sm:order-none sm:basis-auto">
          <button
            type="button"
            onClick={() => setZoom(Math.max(60, zoom - 15))}
            className="p-1 hover:text-white text-neutral-400"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="tabular-nums font-mono-main text-[11px] w-10 text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(140, zoom + 15))}
            className="p-1 hover:text-white text-neutral-400"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right actions: PDF download and close */}
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={handlePdf}
            disabled={isExportingPdf}
            aria-label="Download PDF"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 bg-white hover:bg-neutral-100 rounded-md transition-colors cursor-pointer disabled:opacity-50"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-700" />
            )}
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          <div className="h-4 w-px bg-neutral-800 mx-1" />

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 cursor-pointer"
            title="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable canvas */}
      <div className="flex-1 overflow-auto p-2 sm:p-8 flex justify-center items-start bg-neutral-900/60">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease',
          }}
          className="w-full max-w-[210mm] shadow-2xl"
        >
          <CvRenderer data={data} id="modal-cv-target" />
        </div>
      </div>
    </div>
  );
};

