# ============================================================
# BizSpec Translator - GitHub準備スクリプト（PowerShell）
# ============================================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " BizSpec Translator - GitHub Upload Preparation" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# プロジェクトディレクトリに移動
Set-Location "C:\Users\masube\bizspec-translator"

Write-Host "[1/5] 現在のディレクトリ: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Write-Host "[2/5] 不要なファイルを削除中..." -ForegroundColor Yellow
Write-Host ""

# node_modules削除
if (Test-Path "node_modules") {
    Write-Host "  - node_modules\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ node_modules\ は存在しません" -ForegroundColor Gray
}

if (Test-Path "frontend\node_modules") {
    Write-Host "  - frontend\node_modules\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "frontend\node_modules"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ frontend\node_modules\ は存在しません" -ForegroundColor Gray
}

# ビルド成果物削除
if (Test-Path "frontend\dist") {
    Write-Host "  - frontend\dist\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "frontend\dist"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ frontend\dist\ は存在しません" -ForegroundColor Gray
}

if (Test-Path "frontend\build") {
    Write-Host "  - frontend\build\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "frontend\build"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ frontend\build\ は存在しません" -ForegroundColor Gray
}

# Python関連削除
if (Test-Path "backend\__pycache__") {
    Write-Host "  - backend\__pycache__\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "backend\__pycache__"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ backend\__pycache__\ は存在しません" -ForegroundColor Gray
}

if (Test-Path "backend\venv") {
    Write-Host "  - backend\venv\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "backend\venv"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ backend\venv\ は存在しません" -ForegroundColor Gray
}

if (Test-Path "backend\.mypy_cache") {
    Write-Host "  - backend\.mypy_cache\ を削除中..." -ForegroundColor White
    Remove-Item -Recurse -Force "backend\.mypy_cache"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ backend\.mypy_cache\ は存在しません" -ForegroundColor Gray
}

# 環境変数ファイル削除
if (Test-Path ".env") {
    Write-Host "  - .env を削除中..." -ForegroundColor White
    Remove-Item -Force ".env"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ .env は存在しません" -ForegroundColor Gray
}

if (Test-Path "backend\.env") {
    Write-Host "  - backend\.env を削除中..." -ForegroundColor White
    Remove-Item -Force "backend\.env"
    Write-Host "    ✓ 削除完了" -ForegroundColor Green
} else {
    Write-Host "    ✓ backend\.env は存在しません" -ForegroundColor Gray
}

Write-Host ""
Write-Host "[3/5] ファイル削除完了！" -ForegroundColor Green
Write-Host ""

Write-Host "[4/5] 現在のファイル構造:" -ForegroundColor Yellow
Write-Host ""
Get-ChildItem | Select-Object Name
Write-Host ""

Write-Host "[5/5] 次のステップ:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. .gitignore ファイルを確認してください" -ForegroundColor White
Write-Host "     → すでに配置済みの場合はスキップ" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. .env.example ファイルを確認してください" -ForegroundColor White
Write-Host "     → すでに配置済みの場合はスキップ" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Gitリポジトリを初期化してください" -ForegroundColor White
Write-Host "     git init" -ForegroundColor Cyan
Write-Host "     git add ." -ForegroundColor Cyan
Write-Host "     git commit -m `"Initial commit`"" -ForegroundColor Cyan
Write-Host "     git remote add origin https://github.com/rancorder/Biz_Spec_Translator.git" -ForegroundColor Cyan
Write-Host "     git branch -M main" -ForegroundColor Cyan
Write-Host "     git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " 準備完了！上記のGitコマンドを実行してください。" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 一時停止
Read-Host "続行するには Enter キーを押してください"
