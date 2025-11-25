#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
main.py - BizSpec Translator API

ビジネス要望を技術仕様に自動変換するFastAPI

実行方法:
    uvicorn main:app --reload --host 0.0.0.0 --port 8000

動作確認:
    http://localhost:8000/docs

作成者: Claude (Auto-generated)
バージョン: 1.0.0
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import TranslateRequest, TranslateResponse, HealthResponse
from translator import BizSpecTranslator

# 環境変数読み込み
load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """アプリケーションのライフサイクル管理"""
    # 起動時の処理
    print("🚀 BizSpec Translator API 起動中...")
    
    # Claude APIキーのチェック
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("⚠️  警告: ANTHROPIC_API_KEY が設定されていません")
        print("   .env ファイルに以下を追加してください:")
        print("   ANTHROPIC_API_KEY=your-api-key-here")
    else:
        print("✅ Claude API キー検出")
    
    print("✅ サーバー起動完了")
    print("📖 API仕様: http://localhost:8000/docs")
    
    yield
    
    # 終了時の処理
    print("👋 BizSpec Translator API 停止")


# FastAPIアプリケーション作成
app = FastAPI(
    title="BizSpec Translator API",
    description="ビジネス要望を技術仕様に自動変換するAPI",
    version="1.0.0",
    lifespan=lifespan
)


# CORS設定（開発環境用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite開発サーバー
        "http://localhost:3000",  # 代替ポート
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root():
    """ルートエンドポイント"""
    return {
        "message": "🤖 BizSpec Translator API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    ヘルスチェック
    
    サーバーの稼働状況を確認
    """
    return HealthResponse(
        status="ok",
        version="1.0.0"
    )


@app.post("/api/translate", response_model=TranslateResponse, tags=["Translate"])
async def translate_business_requirement(request: TranslateRequest):
    """
    ビジネス要望を技術仕様に変換
    
    Args:
        request: ビジネス要望を含むリクエストボディ
    
    Returns:
        TranslateResponse: 変換結果（技術仕様、実装可能性、工数見積、プロトタイプコード）
    
    Raises:
        HTTPException: Claude API呼び出しエラー時
    """
    try:
        # BizSpecTranslatorインスタンス作成
        translator = BizSpecTranslator()
        
        # ビジネス要望を変換
        result = await translator.translate(request.business_requirement)
        
        return TranslateResponse(
            technical_spec=result["technical_spec"],
            feasibility=result["feasibility"],
            estimation=result["estimation"],
            prototype_code=result["prototype_code"]
        )
        
    except ValueError as e:
        # 環境変数エラー
        raise HTTPException(
            status_code=500,
            detail=f"設定エラー: {str(e)}"
        )
    
    except Exception as e:
        # その他のエラー
        raise HTTPException(
            status_code=500,
            detail=f"変換処理エラー: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    
    # 開発サーバー起動
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
