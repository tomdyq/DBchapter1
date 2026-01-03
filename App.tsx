import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { chapters } from './data';
import { ConceptsViz } from './components/Visualizations/ConceptsViz';
import { DataModelViz } from './components/Visualizations/DataModelViz';
import { ArchitectureViz } from './components/Visualizations/ArchitectureViz';

const App: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<string>(chapters[0].id);

  const activeChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];

  const renderVisualization = () => {
    switch(activeChapterId) {
      case '1.1': return <ConceptsViz />;
      case '1.2': return <DataModelViz />;
      case '1.3': return <ArchitectureViz />;
      default: return <div className="p-10 text-center text-slate-400">Visualization not implemented yet</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentChapterId={activeChapterId} onSelect={setActiveChapterId} />
      
      <main className="ml-64 flex-1 p-8 flex flex-col h-screen overflow-hidden">
        {/* Header Section */}
        <header className="mb-6 pb-4 border-b border-slate-200 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">{activeChapter.title}</h2>
            <p className="text-lg text-indigo-600 font-medium mt-1">{activeChapter.subTitle}</p>
          </div>
          <div className="text-sm bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full border border-indigo-100">
            互动学习模式
          </div>
        </header>

        {/* Content Layout: Top (Viz) / Bottom (Text) or Left/Right depending on screen, keeping it vertical split for standard ed-tech feel */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          
          {/* Left: Visualization Canvas */}
          <section className="flex-[3] flex flex-col min-w-0">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-100 flex-1 p-2 overflow-hidden relative">
                {renderVisualization()}
                
                {/* Interaction Hint */}
                <div className="absolute top-4 left-4 bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-200 flex items-center">
                   <span className="mr-1">💡</span> {activeChapter.interactionGuide}
                </div>
             </div>
             
             {/* Key Points Cards */}
             <div className="grid grid-cols-2 gap-4 mt-6 h-32">
                {activeChapter.keyPoints.slice(0, 2).map((point, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-500 overflow-y-auto">
                    <p className="text-sm text-slate-700 font-medium">{point}</p>
                  </div>
                ))}
                 {activeChapter.keyPoints.slice(2, 4).map((point, idx) => (
                  <div key={idx+2} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 overflow-y-auto">
                    <p className="text-sm text-slate-700 font-medium">{point}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Right: Explanatory Column */}
          <section className="flex-[2] flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
            {/* Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">章节概述</h3>
              <p className="text-slate-700 leading-relaxed">{activeChapter.overview}</p>
            </div>

            {/* Teacher Script - The "Human" element */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm border border-indigo-100 relative">
              <div className="absolute -top-3 -left-3 bg-indigo-600 text-white p-2 rounded-lg shadow-md transform -rotate-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-indigo-900 font-bold mb-3 pl-4">老师讲重点</h3>
              <div className="text-indigo-800 text-sm leading-7 space-y-2">
                 {activeChapter.teacherScript}
              </div>
            </div>

            {/* Student Benefits */}
            <div className="bg-emerald-50 p-6 rounded-xl shadow-sm border border-emerald-100">
               <h3 className="text-emerald-800 font-bold mb-2 flex items-center">
                 <span className="text-xl mr-2">🎓</span> 学习目标
               </h3>
               <p className="text-emerald-700 text-sm">{activeChapter.studentBenefits}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;