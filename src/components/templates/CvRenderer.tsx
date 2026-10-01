import React from 'react';
import { CVData } from '../../types/cv';
import { ModernExecutiveTemplate } from './ModernExecutiveTemplate';
import { OxfordClassicTemplate } from './OxfordClassicTemplate';
import { CreativeSidebarTemplate } from './CreativeSidebarTemplate';
import { TechMinimalistTemplate } from './TechMinimalistTemplate';
import { NordicCleanTemplate } from './NordicCleanTemplate';
import { CompactAtsTemplate } from './CompactAtsTemplate';

interface Props {
  data: CVData;
  id?: string;
  isPrintMode?: boolean;
}

export const CvRenderer: React.FC<Props> = ({ data, id = 'cv-print-target', isPrintMode = false }) => {
  const template = data.design.template;

  const renderTemplate = () => {
    switch (template) {
      case 'oxford_classic':
        return <OxfordClassicTemplate data={data} />;
      case 'creative_sidebar':
        return <CreativeSidebarTemplate data={data} />;
      case 'tech_minimalist':
        return <TechMinimalistTemplate data={data} />;
      case 'nordic_clean':
        return <NordicCleanTemplate data={data} />;
      case 'compact_ats':
        return <CompactAtsTemplate data={data} />;
      case 'modern_executive':
      default:
        return <ModernExecutiveTemplate data={data} />;
    }
  };

  return (
    <div
      id={id}
      className={`cv-preview-sheet w-full bg-white transition-all ${
        isPrintMode ? '' : 'shadow-xl rounded-sm border border-neutral-200'
      }`}
      style={{
        minHeight: '297mm', // A4 height proportion
        boxSizing: 'border-box',
      }}
    >
      {renderTemplate()}
    </div>
  );
};
