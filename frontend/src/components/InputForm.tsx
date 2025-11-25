import { useState } from 'react';

interface InputFormProps {
  onSubmit: (input: string) => void;
  loading: boolean;
}

export default function InputForm({ onSubmit, loading }: InputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length >= 10) {
      onSubmit(input);
    }
  };

  const examplePrompts = [
    'ECサイトで、カートに入れた商品の合計金額が1万円以上なら送料無料にしたい',
    'ユーザーがログインすると、過去の注文履歴を表示できる機能',
    'メール認証機能を追加して、新規登録時にメールアドレスを確認したい',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* テキストエリア */}
        <div className="glass rounded-2xl p-6">
          <label
            htmlFor="business-requirement"
            className="block text-lg font-semibold mb-3 text-white"
          >
            💡 ビジネス要望を入力してください
          </label>
          <textarea
            id="business-requirement"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例: ECサイトで、カートに入れた商品の合計金額が1万円以上なら送料無料にしたい"
            className="w-full h-40 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none transition-all"
            disabled={loading}
          />
          <div className="mt-2 text-sm text-gray-400">
            {input.length < 10 && input.length > 0 && (
              <span className="text-yellow-400">
                ⚠️ 最低10文字以上入力してください（現在: {input.length}文字）
              </span>
            )}
            {input.length >= 10 && (
              <span className="text-green-400">
                ✅ 入力OK（{input.length}文字）
              </span>
            )}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || input.trim().length < 10}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-300 transform
              ${
                loading || input.trim().length < 10
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'gradient-bg text-white hover:scale-105 hover:shadow-2xl'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                変換中...
              </span>
            ) : (
              <span>🚀 技術仕様に変換</span>
            )}
          </button>
        </div>

        {/* サンプルプロンプト */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-3">💡 サンプルプロンプト:</p>
          <div className="space-y-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(prompt)}
                disabled={loading}
                className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
