import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="confirmation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        id="confirmation-modal-panel"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden transform animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5 text-slate-900 font-semibold text-lg font-heading">
              <div
                className={`p-2 rounded-xl ${
                  confirmVariant === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <span>{title}</span>
            </div>
            <button
              id="close-confirmation-modal-btn"
              onClick={onCancel}
              className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-4 text-stone-600 text-sm leading-relaxed">{message}</p>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              id="confirmation-cancel-btn"
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              id="confirmation-confirm-btn"
              type="button"
              onClick={onConfirm}
              className={`px-5 py-2 text-sm font-medium rounded-xl text-white shadow-xs transition-all ${
                confirmVariant === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                  : 'bg-orange-600 hover:bg-orange-500 shadow-orange-600/20'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
