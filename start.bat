@echo off
title Portofolio Muhammad Firdaus Haykal - Firdaus Media
echo ========================================================
echo   MENJALANKAN WEBSITE PORTOFOLIO MUHAMMAD FIRDAUS HAYKAL
echo   Tema: Dark Mode Elegan khas Agency Media - Purple Neon
echo ========================================================
echo.

set "NODE_CMD=node"

where node >nul 2>nul
if %errorlevel% neq 0 (
  if exist "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe" (
    set "NODE_CMD=C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
  )
)

echo Menggunakan runtime Node.js: %NODE_CMD%
echo Membuka browser: http://localhost:3000
echo Tekan CTRL+C untuk menghentikan server.
echo.

start "" "http://localhost:3000"
"%NODE_CMD%" server.js

pause
