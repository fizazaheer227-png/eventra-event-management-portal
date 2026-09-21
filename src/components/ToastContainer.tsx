import React from 'react';
import { useEvents } from '../context/EventContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEvents();

  if (toasts.length === 0) return null;

  return (
    <div id="eventra-toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 translate-y-0 animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-emerald-900/90 text-white border-emerald-700/60 shadow-emerald-950/20'
                : isError
                ? 'bg-rose-900/90 text-white border-rose-700/60 shadow-rose-950/20'
                : 'bg-slate-900/90 text-white border-slate-700/60 shadow-slate-950/20'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-orange-400" />}
            </div>
            <div className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </div>
            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-white/70 hover:text-white transition-colors p-0.5 rounded-lg hover:bg-white/10"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
