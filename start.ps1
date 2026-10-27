# Script Peluncur Portofolio Muhammad Firdaus Haykal
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  MENJALANKAN WEBSITE PORTOFOLIO MUHAMMAD FIRDAUS HAYKAL" -ForegroundColor Magenta
Write-Host "  Tema: Dark Mode Elegan khas Agency Media - Purple Neon" -ForegroundColor DarkMagenta
Write-Host "========================================================" -ForegroundColor Cyan

$nodeCmd = "node"
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    $fallbackNode = "C:\Program Files\Adobe\Adobe Creative Cloud Experience\libs\node.exe"
    if (Test-Path $fallbackNode) {
        $nodeCmd = $fallbackNode
    }
}

Write-Host "Runtime Node.js: $nodeCmd" -ForegroundColor Green
Write-Host "Membuka browser di: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Tekan CTRL+C untuk menghentikan server.`n" -ForegroundColor DarkGray

Start-Process "http://localhost:3000"
& $nodeCmd "$PSScriptRoot\server.js"
