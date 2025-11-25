#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
translator.py - ビジネス要望を技術仕様に変換

Claude APIを使用して、ビジネス要望を以下の4つに変換:
1. 技術仕様書
2. 実装可能性評価
3. 工数見積もり
4. プロトタイプコード
"""

import os
from typing import Dict
from anthropic import Anthropic


class BizSpecTranslator:
    """ビジネス要望を技術仕様に変換するクラス"""
    
    def __init__(self):
        """初期化"""
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("環境変数 ANTHROPIC_API_KEY が設定されていません")
        
        self.client = Anthropic(api_key=api_key)
        self.model = "claude-sonnet-4-20250514"
    
    def _create_prompt(self, business_requirement: str) -> str:
        """プロンプト生成"""
        return f"""あなたは優秀なシステムアーキテクトです。
以下のビジネス要望を分析し、技術仕様に変換してください。

# ビジネス要望
{business_requirement}

# 出力形式
以下の4つのセクションに分けて、詳細に記載してください。

## 1. 技術仕様書
- システム構成
- 必要な技術スタック
- データベース設計
- API設計
- セキュリティ要件

## 2. 実装可能性評価
- 実装難易度（★1〜5で評価）
- 必要な技術レベル
- 想定される技術的課題
- リスク分析

## 3. 工数見積もり
- 合計工数（時間単位）
- フェーズ別の内訳（要件定義、設計、実装、テスト、デプロイ）
- 必要人員
- 想定期間

## 4. プロトタイプコード
- 実装例（Python or JavaScript）
- コードコメント付き
- 実行可能なコード

各セクションは実用的で具体的な内容にしてください。"""
    
    async def translate(self, business_requirement: str) -> Dict[str, str]:
        """
        ビジネス要望を技術仕様に変換
        
        Args:
            business_requirement: ビジネス要望（文字列）
        
        Returns:
            Dict containing:
                - technical_spec: 技術仕様書
                - feasibility: 実装可能性評価
                - estimation: 工数見積もり
                - prototype_code: プロトタイプコード
        """
        try:
            # Claude APIにリクエスト
            message = self.client.messages.create(
                model=self.model,
                max_tokens=4000,
                temperature=0.7,
                messages=[
                    {
                        "role": "user",
                        "content": self._create_prompt(business_requirement)
                    }
                ]
            )
            
            # レスポンスからテキストを取得
            full_text = message.content[0].text
            
            # セクションごとに分割
            sections = self._parse_response(full_text)
            
            return sections
            
        except Exception as e:
            raise Exception(f"Claude API呼び出しエラー: {str(e)}")
    
    def _parse_response(self, text: str) -> Dict[str, str]:
        """
        Claude のレスポンスをセクションごとに分割
        
        Args:
            text: Claude の全レスポンステキスト
        
        Returns:
            Dict with 4 sections
        """
        # デフォルト値
        result = {
            "technical_spec": "",
            "feasibility": "",
            "estimation": "",
            "prototype_code": ""
        }
        
        # セクション区切り文字
        markers = {
            "technical_spec": ["## 1. 技術仕様書", "##1. 技術仕様書", "## 1.技術仕様書"],
            "feasibility": ["## 2. 実装可能性評価", "##2. 実装可能性評価", "## 2.実装可能性評価"],
            "estimation": ["## 3. 工数見積もり", "##3. 工数見積もり", "## 3.工数見積もり"],
            "prototype_code": ["## 4. プロトタイプコード", "##4. プロトタイプコード", "## 4.プロトタイプコード"]
        }
        
        # 各セクションを抽出
        for key, marker_list in markers.items():
            for marker in marker_list:
                if marker in text:
                    # セクションの開始位置を取得
                    start_idx = text.find(marker)
                    
                    # 次のセクションの開始位置を探す（終了位置）
                    end_idx = len(text)
                    for next_marker_list in markers.values():
                        for next_marker in next_marker_list:
                            next_idx = text.find(next_marker, start_idx + len(marker))
                            if next_idx != -1 and next_idx < end_idx:
                                end_idx = next_idx
                    
                    # セクションを切り出し
                    section_text = text[start_idx:end_idx].strip()
                    
                    # マーカーを除去
                    for m in marker_list:
                        section_text = section_text.replace(m, "").strip()
                    
                    result[key] = section_text
                    break
        
        # セクションが空の場合は全文を返す
        if all(not v for v in result.values()):
            result["technical_spec"] = text
        
        return result
