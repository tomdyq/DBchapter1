import React from 'react';
import { chapters } from '../data';

interface SidebarProps {
  currentChapterId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentChapterId, onSelect }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-20 shadow-xl">
      <div className="p-6 border-b border-slate-700 bg-slate-800">
        <h1 className="text-xl font-bold tracking-wider">数据库系统</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase">Chapter 1: 绪论</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id} className="mb-1">
              <button
                onClick={() => onSelect(chapter.id)}
                className={`w-full text-left px-6 py-3 transition-all duration-200 flex items-center group ${
                  currentChapterId === chapter.id
                    ? 'bg-indigo-600 border-r-4 border-indigo-300'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs mr-3 font-bold ${
                   currentChapterId === chapter.id ? 'bg-white text-indigo-600' : 'bg-slate-700'
                }`}>
                  {chapter.id}
                </div>
                <div>
                  <span className="block text-sm font-semibold">{chapter.subTitle}</span>
                  <span className="text-xs opacity-70 block truncate w-32">{chapter.title.split(' ')[1]}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 bg-slate-800 text-xs text-slate-400 border-t border-slate-700">
        可视化互动教学系统 v1.0
      </div>
    </aside>
  );
};