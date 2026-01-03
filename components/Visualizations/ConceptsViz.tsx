import React, { useState } from 'react';

const concepts = [
  {
    id: 'data',
    label: '数据 (Data)',
    desc: '描述事物的符号记录。如：2023, "张三", mp3音频。',
    color: 'fill-blue-200 stroke-blue-500',
    r: 60
  },
  {
    id: 'db',
    label: '数据库 (DB)',
    desc: '长期存储、有组织、可共享的大量数据的集合。',
    color: 'fill-green-200 stroke-green-500',
    r: 110
  },
  {
    id: 'dbms',
    label: '管理系统 (DBMS)',
    desc: '位于用户与OS之间的数据管理软件（如MySQL, Oracle）。',
    color: 'fill-yellow-200 stroke-yellow-500',
    r: 160
  },
  {
    id: 'dbs',
    label: '数据库系统 (DBS)',
    desc: '包含DB、DBMS、应用系统、DBA（数据库管理员）的整体。',
    color: 'fill-purple-200 stroke-purple-500',
    r: 210
  }
];

export const ConceptsViz: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('dbs');

  const activeConcept = concepts.find(c => c.id === activeId);

  return (
    <div className="flex flex-col items-center h-full w-full bg-white p-4 rounded-xl shadow-sm">
      <div className="flex-1 w-full flex justify-center items-center relative">
        <svg viewBox="0 0 500 500" className="w-full h-full max-h-[400px]">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Render circles from outside in (DBS -> Data) */}
          {[...concepts].reverse().map((concept) => {
            const isActive = activeId === concept.id;
            return (
              <g 
                key={concept.id} 
                onClick={() => setActiveId(concept.id)}
                className="cursor-pointer transition-all duration-300"
                style={{ opacity: isActive ? 1 : 0.6 }}
              >
                <circle
                  cx="250"
                  cy="250"
                  r={concept.r}
                  className={`${concept.color} transition-all duration-500`}
                  strokeWidth={isActive ? 4 : 2}
                  filter={isActive ? 'url(#glow)' : ''}
                />
                {/* Label on the path */}
                <text
                  x="250"
                  y={250 - concept.r + 20}
                  textAnchor="middle"
                  className="text-xs font-bold fill-slate-700 pointer-events-none select-none"
                >
                  {concept.label}
                </text>
              </g>
            );
          })}
          
          {/* Central Icon for Data */}
          <text x="250" y="255" textAnchor="middle" fontSize="24" className="pointer-events-none">📄</text>
        </svg>

        {/* Info Box Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 transform translate-y-0 opacity-100">
          <h3 className="font-bold text-lg text-slate-800 mb-1">{activeConcept?.label}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{activeConcept?.desc}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {concepts.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeId === c.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {c.label.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
};