import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { SectionType } from '../types';

interface AdminToolbarProps {
  onRegenerate: (section: SectionType) => void;
  loadingSection: SectionType | null;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onRegenerate, loadingSection }) => {
  return (
    <div className="fixed top-24 right-4 z-40 bg-white/90 backdrop-blur-md border border-greenstreet-200 shadow-xl rounded-xl p-4 w-64 hidden lg:block">
      <div className="flex items-center gap-2 mb-3 text-greenstreet-800 border-b border-gray-100 pb-2">
        <Sparkles size={18} className="text-yellow-500" />
        <span className="font-semibold text-sm">AI Content Studio</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Regenerate site copy instantly using Gemini 2.5 Flash.
      </p>
      
      <div className="space-y-2">
        {Object.values(SectionType).map((section) => (
          <button
            key={section}
            onClick={() => onRegenerate(section)}
            disabled={loadingSection !== null}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-greenstreet-50 rounded-lg border border-gray-200 transition-colors disabled:opacity-50"
          >
            <span>{section.replace('_', ' ')}</span>
            {loadingSection === section ? (
              <RefreshCw className="animate-spin text-greenstreet-600" size={14} />
            ) : (
              <Sparkles size={14} className="text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminToolbar;
