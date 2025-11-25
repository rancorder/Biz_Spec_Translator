import TabPanel from './TabPanel';

interface TranslateResult {
  technical_spec: string;
  feasibility: string;
  estimation: string;
  prototype_code: string;
}

interface ResultDisplayProps {
  result: TranslateResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const tabs = [
    {
      id: 'technical_spec',
      label: '技術仕様',
      icon: '📝',
      content: result.technical_spec,
    },
    {
      id: 'feasibility',
      label: '実装可能性',
      icon: '⚠️',
      content: result.feasibility,
    },
    {
      id: 'estimation',
      label: '工数見積',
      icon: '⏱️',
      content: result.estimation,
    },
    {
      id: 'prototype_code',
      label: 'プロトタイプ',
      icon: '💻',
      content: result.prototype_code,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-white mb-2">
          ✨ 変換結果
        </h2>
        <p className="text-gray-400">
          以下の4つの観点で技術仕様を生成しました
        </p>
      </div>

      {/* タブパネル */}
      <TabPanel tabs={tabs} />

      {/* ダウンロードボタン */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => {
            const blob = new Blob(
              [
                `# 技術仕様書\n\n${result.technical_spec}\n\n`,
                `# 実装可能性評価\n\n${result.feasibility}\n\n`,
                `# 工数見積もり\n\n${result.estimation}\n\n`,
                `# プロトタイプコード\n\n${result.prototype_code}`,
              ],
              { type: 'text/plain' }
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bizspec-result.txt';
            a.click();
          }}
          className="px-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:scale-105 transition-transform"
        >
          💾 テキストでダウンロード
        </button>
      </div>
    </div>
  );
}
