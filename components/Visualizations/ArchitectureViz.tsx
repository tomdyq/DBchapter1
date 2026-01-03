import React, { useState } from 'react';

export const ArchitectureViz: React.FC = () => {
  const [changeType, setChangeType] = useState<'none' | 'physical' | 'logical'>('none');

  // Animation states for lines
  const lineClass = "stroke-slate-400 stroke-2 transition-all duration-700";
  const activeLineClass = "stroke-green-500 stroke-4 transition-all duration-700";

  return (
    <div className="flex flex-col h-full w-full bg-white p-4 rounded-xl shadow-sm items-center">
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setChangeType('physical')}
          className="px-3 py-2 bg-rose-50 text-rose-700 border border-rose-200 rounded text-sm hover:bg-rose-100 transition-colors"
        >
          模拟：更换物理硬盘 (内模式改变)
        </button>
        <button 
          onClick={() => setChangeType('logical')}
          className="px-3 py-2 bg-sky-50 text-sky-700 border border-sky-200 rounded text-sm hover:bg-sky-100 transition-colors"
        >
          模拟：增加数据字段 (模式改变)
        </button>
        <button 
          onClick={() => setChangeType('none')}
          className="px-3 py-2 bg-slate-100 text-slate-600 rounded text-sm hover:bg-slate-200"
        >
          重置
        </button>
      </div>

      <svg viewBox="0 0 500 400" className="w-full h-full max-w-[600px]">
        {/* Level 1: External Schema */}
        <g transform="translate(0, 0)">
           <rect x="50" y="20" width="120" height="60" rx="5" className="fill-indigo-100 stroke-indigo-500 stroke-2"/>
           <text x="110" y="55" textAnchor="middle" className="text-sm font-bold fill-indigo-800">外模式 A (应用1)</text>
           
           <rect x="330" y="20" width="120" height="60" rx="5" className="fill-indigo-100 stroke-indigo-500 stroke-2"/>
           <text x="390" y="55" textAnchor="middle" className="text-sm font-bold fill-indigo-800">外模式 B (应用2)</text>
        </g>

        {/* Mapping 1: External / Conceptual */}
        <g>
          <path d="M110,80 L200,150" className={changeType === 'logical' ? activeLineClass : lineClass} />
          <path d="M390,80 L300,150" className={changeType === 'logical' ? activeLineClass : lineClass} />
          {changeType === 'logical' && (
             <text x="250" y="110" textAnchor="middle" className="text-xs fill-green-600 font-bold bg-white">
                映像调整: 屏蔽逻辑差异
             </text>
          )}
        </g>

        {/* Level 2: Conceptual Schema */}
        <g transform="translate(0, 0)">
           {/* If logical change, this box glows or shakes slightly */}
           <rect 
             x="150" y="150" width="200" height="80" rx="5" 
             className={`fill-blue-100 stroke-blue-600 stroke-2 transition-all duration-500 ${changeType === 'logical' ? 'stroke-dashed' : ''}`}
           />
           <text x="250" y="180" textAnchor="middle" className="text-sm font-bold fill-blue-900">模式 (Conceptual)</text>
           <text x="250" y="200" textAnchor="middle" className="text-xs fill-blue-700">全体数据的逻辑结构</text>
           {changeType === 'logical' && (
              <text x="250" y="220" textAnchor="middle" className="text-[10px] fill-rose-500 font-bold">↑ 结构已变更</text>
           )}
        </g>

         {/* Mapping 2: Conceptual / Internal */}
         <g>
          <path d="M250,230 L250,300" className={changeType === 'physical' ? activeLineClass : lineClass} />
          {changeType === 'physical' && (
             <text x="320" y="265" textAnchor="middle" className="text-xs fill-green-600 font-bold">
                映像调整: 屏蔽存储差异
             </text>
          )}
        </g>

        {/* Level 3: Internal Schema */}
        <g transform="translate(0, 0)">
           <path 
             d="M180,300 L320,300 L320,360 L180,360 Z" 
             className={`fill-slate-200 stroke-slate-600 stroke-2 transition-transform duration-500 ${changeType === 'physical' ? 'translate-y-2 fill-rose-100 stroke-rose-500' : ''}`}
           />
           {/* Cylinder effect */}
           <ellipse cx="250" cy="300" rx="70" ry="10" className={`fill-slate-300 stroke-slate-600 ${changeType === 'physical' ? 'fill-rose-200 stroke-rose-500' : ''}`}/>
           
           <text x="250" y="340" textAnchor="middle" className="text-sm font-bold fill-slate-800">内模式 (存储)</text>
        </g>

      </svg>
      
      <div className="w-full bg-slate-50 p-3 rounded text-sm text-slate-700 mt-2 border-l-4 border-indigo-500">
        {changeType === 'none' && "系统正常运行中。数据的逻辑结构与物理存储通过两层映像连接。"}
        {changeType === 'physical' && "物理独立性演示：底层存储发生改变（如更换磁盘阵列），但通过调整【模式/内模式映像】，中间的逻辑模式不需要改变，应用程序也不受影响。"}
        {changeType === 'logical' && "逻辑独立性演示：逻辑结构发生改变（如增加列），但通过调整【外模式/模式映像】，应用程序（外模式）不需要修改。"}
      </div>
    </div>
  );
};