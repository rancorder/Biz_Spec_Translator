import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: string;
}

interface TabPanelProps {
  tabs: Tab[];
}

export default function TabPanel({ tabs }: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || '';

  return (
    <div className="w-full">
      {/* タブヘッダー */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-300
              ${
                activeTab === tab.id
                  ? 'gradient-bg text-white shadow-lg scale-105'
                  : 'glass text-gray-300 hover:text-white hover:scale-105'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ */}
      <div className="glass rounded-2xl p-6 min-h-[400px]">
        <pre className="whitespace-pre-wrap text-gray-100 font-mono text-sm leading-relaxed">
          {activeTabContent}
        </pre>
      </div>

      {/* コピーボタン */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            navigator.clipboard.writeText(activeTabContent);
            alert('📋 コピーしました！');
          }}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          📋 コピー
        </button>
      </div>
    </div>
  );
}
