import React, { useState } from 'react';
import { ViewState } from '../../types';

export const DataModelViz: React.FC = () => {
  const [step, setStep] = useState<ViewState>(ViewState.REAL_WORLD);
  const [modelType, setModelType] = useState<'relational' | 'tree' | 'network'>('relational');

  const steps = [
    { id: ViewState.REAL_WORLD, label: '1. 现实世界' },
    { id: ViewState.CONCEPTUAL, label: '2. 概念模型 (信息世界)' },
    { id: ViewState.LOGICAL, label: '3. 数据模型 (机器世界)' }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white p-4 rounded-xl shadow-sm">
      {/* Progress Stepper */}
      <div className="flex justify-between items-center mb-6 px-8 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-0 transform -translate-y-1/2"></div>
        {steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            className={`relative z-10 px-4 py-1 rounded-full text-sm font-bold border-2 transition-all ${
              step === s.id
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'bg-white border-slate-300 text-slate-500 hover:border-indigo-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Visualization Area */}
      <div className="flex-1 border border-slate-100 rounded-lg bg-slate-50 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 600 350" className="w-full h-full">
          {/* Transition Group for Real World */}
          <g style={{ opacity: step === ViewState.REAL_WORLD ? 1 : 0, transition: 'opacity 0.5s' }}>
            {/* A person stick figure or icon */}
            <circle cx="300" cy="120" r="40" className="fill-orange-200 stroke-orange-500" strokeWidth="3" />
            <path d="M300,160 L300,260 M300,200 L240,180 M300,200 L360,180 M300,260 L260,320 M300,260 L340,320" 
                  className="stroke-orange-500" strokeWidth="5" fill="none" />
            <text x="300" y="60" textAnchor="middle" className="text-lg font-bold fill-slate-700">真实的学生: 张伟</text>
            <text x="180" y="150" className="text-sm fill-slate-500">身高: 180cm</text>
            <text x="420" y="150" className="text-sm fill-slate-500">爱好: 篮球</text>
          </g>

          {/* Transition Group for Conceptual (E-R) */}
          <g style={{ opacity: step === ViewState.CONCEPTUAL ? 1 : 0, transition: 'opacity 0.5s' }}>
            {/* Entity Rectangle */}
            <rect x="250" y="150" width="100" height="50" rx="2" className="fill-blue-100 stroke-blue-600" strokeWidth="2" />
            <text x="300" y="180" textAnchor="middle" className="font-bold fill-blue-800">学生 (实体)</text>
            
            {/* Attributes Ovals */}
            <ellipse cx="200" cy="80" rx="40" ry="20" className="fill-white stroke-slate-500" />
            <text x="200" y="85" textAnchor="middle" className="text-xs">学号</text>
            <line x1="220" y1="95" x2="260" y2="150" className="stroke-slate-400" />

            <ellipse cx="300" cy="60" rx="40" ry="20" className="fill-white stroke-slate-500" />
            <text x="300" y="65" textAnchor="middle" className="text-xs">姓名</text>
            <line x1="300" y1="80" x2="300" y2="150" className="stroke-slate-400" />

            <ellipse cx="400" cy="80" rx="40" ry="20" className="fill-white stroke-slate-500" />
            <text x="400" y="85" textAnchor="middle" className="text-xs">专业</text>
            <line x1="380" y1="95" x2="340" y2="150" className="stroke-slate-400" />
            
            <text x="300" y="320" textAnchor="middle" className="fill-slate-500 text-sm">抽象：忽略身高/爱好，保留业务属性</text>
          </g>

          {/* Transition Group for Logical (Table/Tree) */}
          <g style={{ opacity: step === ViewState.LOGICAL ? 1 : 0, transition: 'opacity 0.5s' }}>
            {modelType === 'relational' && (
              <g>
                <foreignObject x="100" y="80" width="400" height="200">
                  <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex flex-col items-center">
                    <table className="min-w-full text-center border border-collapse border-slate-400 bg-white text-sm">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="border border-slate-300 p-2">学号 (PK)</th>
                          <th className="border border-slate-300 p-2">姓名</th>
                          <th className="border border-slate-300 p-2">专业</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-2">202301</td>
                          <td className="border border-slate-300 p-2">张伟</td>
                          <td className="border border-slate-300 p-2">计算机</td>
                        </tr>
                         <tr>
                          <td className="border border-slate-300 p-2">...</td>
                          <td className="border border-slate-300 p-2">...</td>
                          <td className="border border-slate-300 p-2">...</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mt-2 text-slate-500 text-xs">关系模型：二维表结构</div>
                  </div>
                </foreignObject>
              </g>
            )}

            {modelType === 'tree' && (
              <g>
                 <rect x="250" y="50" width="100" height="40" className="fill-green-100 stroke-green-600" rx="4"/>
                 <text x="300" y="75" textAnchor="middle" className="text-xs">系: 计算机</text>
                 
                 <line x1="300" y1="90" x2="200" y2="150" className="stroke-slate-400" />
                 <line x1="300" y1="90" x2="400" y2="150" className="stroke-slate-400" />
                 
                 <rect x="150" y="150" width="100" height="40" className="fill-white stroke-green-600" rx="4"/>
                 <text x="200" y="175" textAnchor="middle" className="text-xs">学生: 张伟</text>
                 
                 <rect x="350" y="150" width="100" height="40" className="fill-white stroke-green-600" rx="4"/>
                 <text x="400" y="175" textAnchor="middle" className="text-xs">学生: 李四</text>

                 <text x="300" y="280" textAnchor="middle" className="fill-slate-500 text-xs">层次模型：倒立的树，父子关系明确</text>
              </g>
            )}
            
             {modelType === 'network' && (
              <g>
                 <rect x="250" y="50" width="100" height="40" className="fill-purple-100 stroke-purple-600" rx="4"/>
                 <text x="300" y="75" textAnchor="middle" className="text-xs">课程: 数据库</text>
                 
                 <rect x="100" y="180" width="100" height="40" className="fill-white stroke-purple-600" rx="4"/>
                 <text x="150" y="205" textAnchor="middle" className="text-xs">学生: 张伟</text>
                 
                 <rect x="400" y="180" width="100" height="40" className="fill-white stroke-purple-600" rx="4"/>
                 <text x="450" y="205" textAnchor="middle" className="text-xs">学生: 李四</text>

                 {/* Many to many links */}
                 <path d="M280,90 L150,180" className="stroke-purple-400" strokeDasharray="4"/>
                 <path d="M320,90 L450,180" className="stroke-purple-400" strokeDasharray="4"/>
                 <path d="M150,220 L200,280" className="stroke-purple-400"/>
                 <rect x="180" y="280" width="80" height="30" className="fill-purple-50 stroke-purple-400"/>
                 <text x="220" y="300" textAnchor="middle" className="text-[10px]">另一门课...</text>

                 <text x="300" y="330" textAnchor="middle" className="fill-slate-500 text-xs">网状模型：复杂的多对多连接</text>
              </g>
            )}
          </g>
        </svg>

        {/* Logical Type Switcher */}
        {step === ViewState.LOGICAL && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button onClick={() => setModelType('relational')} className={`text-xs px-2 py-1 rounded border ${modelType==='relational'?'bg-blue-100 border-blue-500':'bg-white'}`}>关系(Table)</button>
            <button onClick={() => setModelType('tree')} className={`text-xs px-2 py-1 rounded border ${modelType==='tree'?'bg-green-100 border-green-500':'bg-white'}`}>层次(Tree)</button>
            <button onClick={() => setModelType('network')} className={`text-xs px-2 py-1 rounded border ${modelType==='network'?'bg-purple-100 border-purple-500':'bg-white'}`}>网状(Net)</button>
          </div>
        )}
      </div>
    </div>
  );
};