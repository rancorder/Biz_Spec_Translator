#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
models.py - データモデル定義

BizSpec Translator で使用するPydanticモデル
"""

from pydantic import BaseModel, Field


class TranslateRequest(BaseModel):
    """翻訳リクエストモデル"""
    business_requirement: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="ビジネス要望（10〜5000文字）"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "business_requirement": "ECサイトで、カートに入れた商品の合計金額が1万円以上なら送料無料にしたい"
            }
        }


class TranslateResponse(BaseModel):
    """翻訳レスポンスモデル"""
    technical_spec: str = Field(..., description="技術仕様書")
    feasibility: str = Field(..., description="実装可能性評価")
    estimation: str = Field(..., description="工数見積もり")
    prototype_code: str = Field(..., description="プロトタイプコード")
    
    class Config:
        json_schema_extra = {
            "example": {
                "technical_spec": "フロントエンド: カート合計金額の計算ロジック\n...",
                "feasibility": "実装難易度: ★★☆☆☆ (簡単)\n...",
                "estimation": "合計: 40時間\n...",
                "prototype_code": "# FastAPI実装例\n..."
            }
        }


class HealthResponse(BaseModel):
    """ヘルスチェックレスポンス"""
    status: str = Field(default="ok", description="ステータス")
    version: str = Field(default="1.0.0", description="バージョン")
