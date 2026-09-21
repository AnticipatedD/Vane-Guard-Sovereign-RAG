import React from 'react';

export interface CodeExampleProps {
  title?: string;
  code?: string;
}

export const CodeExampleSelector: React.FC<CodeExampleProps> = ({ title = "API Example", code = "" }) => {
  return (
    <div className="code-example-selector p-4 rounded-lg bg-slate-900 text-white">
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <pre className="text-xs overflow-x-auto">
        <code>{code || '// Select a code sample to display'}</code>
      </pre>
    </div>
  );
};
