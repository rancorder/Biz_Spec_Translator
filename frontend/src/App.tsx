import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

interface TranslateResult {
  technical_spec: string;
  feasibility: string;
  estimation: string;
  prototype_code: string;
}

function App() {
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (input: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_requirement: input,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'APIエラーが発生しました');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Translation error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'ビジネス要望の変換中にエラーが発生しました'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 背景グラデーション */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20 -z-10"></div>

      {/* ヘッダー */}
      <header className="pt-12 pb-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              🤖 BizSpec Translator
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              ビジネス要望を技術仕様に自動変換
            </p>
            <p className="text-sm text-gray-500">
              Powered by Claude AI
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-6 pb-12">
        {/* 入力フォーム */}
        <InputForm onSubmit={handleTranslate} loading={loading} />

        {/* エラー表示 */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-900/20 border border-red-500 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-bold text-red-400 mb-1">エラーが発生しました</h3>
                  <p className="text-red-300 text-sm">{error}</p>
                  <p className="text-red-400 text-xs mt-2">
                    💡 ヒント: バックエンドサーバー（http://localhost:8000）が起動しているか確認してください
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ローディング表示 */}
        {loading && (
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-12 text-center">
              <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-xl font-semibold mb-2">🤖 AI が分析中...</p>
              <p className="text-gray-400 text-sm">
                技術仕様を生成しています（30〜60秒ほどかかります）
              </p>
            </div>
          </div>
        )}

        {/* 結果表示 */}
        {result && !loading && <ResultDisplay result={result} />}

        {/* 使い方ガイド（結果が出るまで表示） */}
        {!result && !loading && (
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">📖 使い方</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="font-bold text-purple-400">1.</span>
                  <span>
                    上のテキストエリアに<strong>ビジネス要望</strong>を入力してください
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-400">2.</span>
                  <span>
                    「🚀 技術仕様に変換」ボタンをクリック
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-purple-400">3.</span>
                  <span>
                    AIが自動で以下の4つを生成します：
                    <ul className="mt-2 ml-6 space-y-1 text-sm">
                      <li>📝 技術仕様書</li>
                      <li>⚠️ 実装可能性評価</li>
                      <li>⏱️ 工数見積もり</li>
                      <li>💻 プロトタイプコード</li>
                    </ul>
                  </span>
                </li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Created with ❤️ by Claude AI</p>
        <p className="mt-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            GitHub
          </a>
          {' • '}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            Powered by Claude
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
