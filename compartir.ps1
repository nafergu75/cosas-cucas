#Requires -Version 5.1
<#
  Cosas Cucas · Enlace publico de demostracion
  Genera una URL publica para que cualquier persona pueda ver la
  web desde su movil u ordenador sin instalar nada adicional.
  No requiere cuenta. Sin configuracion.
#>

$Host.UI.RawUI.WindowTitle = "Cosas Cucas · Enlace Publico"
$ErrorActionPreference = "SilentlyContinue"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$DIR    = Split-Path -Parent $MyInvocation.MyCommand.Definition
$cfExe  = Join-Path $DIR "cloudflared.exe"
$port   = 4747

# ── Paleta de colores ──────────────────────────────────────────────────────
function Linea   { Write-Host "" }
function Titulo  { param($t) Write-Host "  $t" -ForegroundColor DarkYellow }
function OK      { param($t) Write-Host "  " -NoNewline; Write-Host " OK " -BackgroundColor DarkGreen -ForegroundColor White -NoNewline; Write-Host "  $t" }
function Paso    { param($t) Write-Host "  " -NoNewline; Write-Host " >> " -BackgroundColor DarkYellow -ForegroundColor Black -NoNewline; Write-Host "  $t" }
function Error_  { param($t) Write-Host "  " -NoNewline; Write-Host " !! " -BackgroundColor Red -ForegroundColor White -NoNewline; Write-Host "  $t" -ForegroundColor Red }
function Info    { param($t) Write-Host "  " -NoNewline; Write-Host "      $t" -ForegroundColor Gray }

# ── Cabecera ───────────────────────────────────────────────────────────────
Clear-Host
Linea
Titulo "╔══════════════════════════════════════════════════════╗"
Titulo "║        COSAS CUCAS  ·  Enlace de Demostracion       ║"
Titulo "║         Comparte la web con quien quieras            ║"
Titulo "╚══════════════════════════════════════════════════════╝"
Linea

# ── PASO 1: Comprobar / arrancar servidor ──────────────────────────────────
Paso "Comprobando servidor (puerto $port)..."

$portOcupado = netstat -ano 2>$null | Select-String ":$port " | Select-Object -First 1

if ($portOcupado) {
    OK "Servidor activo en http://localhost:$port"
} else {
    $serverJs = Join-Path $DIR "server.js"
    if (-not (Test-Path $serverJs)) {
        Error_ "No se encontro server.js en la carpeta."
        Linea
        Write-Host "  Asegurate de ejecutar este archivo desde la carpeta de Cosas Cucas." -ForegroundColor Yellow
        Linea; Read-Host "  Pulsa INTRO para salir"; exit 1
    }
    Paso "Arrancando el servidor de Cosas Cucas..."
    Start-Process -FilePath "cmd.exe" -ArgumentList "/k `"cd /d `"$DIR`" && node server.js`"" -WindowStyle Normal
    Start-Sleep -Seconds 3
    OK "Servidor iniciado."
}

Linea

# ── PASO 2: Descargar cloudflared si no esta ───────────────────────────────
if (-not (Test-Path $cfExe)) {
    Paso "Descargando cloudflared (primera vez, ~30 MB)..."
    $cfUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
    curl.exe -sL -o $cfExe $cfUrl 2>$null
    if (Test-Path $cfExe) {
        OK "cloudflared descargado."
    } else {
        Error_ "No se pudo descargar cloudflared. Comprueba la conexion a internet."
        Linea; Read-Host "  Pulsa INTRO para salir"; exit 1
    }
}

# ── PASO 3: Abrir tunel ────────────────────────────────────────────────────
Paso "Abriendo tunel publico..."
Linea

Write-Host "  ┌──────────────────────────────────────────────────────┐" -ForegroundColor DarkYellow
Write-Host "  │  El enlace publico aparecera en unos segundos.       │" -ForegroundColor DarkYellow
Write-Host "  │                                                       │" -ForegroundColor DarkYellow
Write-Host "  │  Busca la linea:                                      │" -ForegroundColor DarkYellow
Write-Host "  │                                                       │" -ForegroundColor DarkYellow
Write-Host "  │      https://xxxx.trycloudflare.com                  │" -ForegroundColor Cyan
Write-Host "  │   o  your url is: https://xxxx.loca.lt               │" -ForegroundColor Cyan
Write-Host "  │                                                       │" -ForegroundColor DarkYellow
Write-Host "  │  Copia ese enlace y envialo por WhatsApp o email.     │" -ForegroundColor DarkYellow
Write-Host "  │  El enlace funciona mientras esta ventana este abierta│" -ForegroundColor DarkYellow
Write-Host "  │  Cierra esta ventana cuando quieras desactivarlo.     │" -ForegroundColor DarkYellow
Write-Host "  └──────────────────────────────────────────────────────┘" -ForegroundColor DarkYellow
Linea

# Intentar cloudflared primero; si falla en los primeros segundos, pasar a localtunnel
$cfLog   = Join-Path $env:TEMP "cf_tunnel.log"
$cfProc  = Start-Process -FilePath $cfExe `
               -ArgumentList "tunnel --url http://localhost:$port" `
               -RedirectStandardError $cfLog `
               -PassThru -WindowStyle Hidden -NoNewWindow

Start-Sleep -Seconds 7

# Leer el log de cloudflared
$cfOutput = ""
if (Test-Path $cfLog) { $cfOutput = Get-Content $cfLog -Raw -ErrorAction SilentlyContinue }

$cfUrl = ""
if ($cfOutput -match "https://[a-z0-9\-]+\.trycloudflare\.com") {
    $cfUrl = $Matches[0]
}

if ($cfUrl -ne "") {
    # ─ cloudflared funcionando ─
    Write-Host ""
    Write-Host "  ╔══════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "  ║  ENLACE PUBLICO ACTIVO:                              ║" -ForegroundColor Green
    Write-Host "  ║                                                       ║" -ForegroundColor Green
    Write-Host ("  ║  " + $cfUrl.PadRight(52) + "║") -ForegroundColor Cyan
    Write-Host "  ║                                                       ║" -ForegroundColor Green
    Write-Host "  ║  Comparte este enlace con quien quieras.             ║" -ForegroundColor Green
    Write-Host "  ╚══════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Pulsa Ctrl+C o cierra esta ventana para desactivar el enlace." -ForegroundColor Gray
    Write-Host ""
    # Mantener vivo
    $cfProc.WaitForExit()
} else {
    # ─ cloudflared no pudo obtener URL → localtunnel como reserva ─
    if (-not $cfProc.HasExited) { $cfProc.Kill() }

    Write-Host "  [Usando localtunnel como alternativa...]" -ForegroundColor DarkGray
    Write-Host ""
    npx --yes localtunnel --port $port
}

Linea
Write-Host "  Tunel cerrado. El enlace ya no esta disponible." -ForegroundColor Gray
Linea
Read-Host "  Pulsa INTRO para salir"
