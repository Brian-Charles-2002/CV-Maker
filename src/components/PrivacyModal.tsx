import React from 'react';
import { ShieldCheck, Lock, Trash2, CheckCircle2, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onWipeData: () => void;
}

export const PrivacyModal: React.FC<Props> = ({ isOpen, onClose, onWipeData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-neutral-900 text-base">User Privacy Architecture</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs text-neutral-600 leading-relaxed">
          <p>
            Veritas CV Studio is engineered under strict client-side ephemeral principles:
          </p>

          <div className="space-y-2 pt-1">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Server Persistence:</strong> No backend database, telemetry, or cloud storage collects your contact info, employment history, or credentials.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pure Client Processing:</strong> PDF rendering is completed exclusively in your browser&apos;s local memory sandbox.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Instant Wipe Guarantee:</strong> Clicking &quot;Delete All CV Data&quot; clears the active browser state immediately.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onWipeData();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Wipe All Data Now</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
          >
            Got it, thanks
          </button>
        </div>
      </div>
    </div>
  );
};
