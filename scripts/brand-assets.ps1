# Genera los derivados web de la marca desde assets/brand (originales de diseño, no se publican).
# Uso: powershell -ExecutionPolicy Bypass -File scripts/brand-assets.ps1
Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root 'assets\brand'
$out = Join-Path $root 'public\img\brand'
New-Item -ItemType Directory -Force $out | Out-Null

function Load($name) { [System.Drawing.Bitmap]::FromFile((Join-Path $src $name)) }

function New-Canvas($w, $h, $bg) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'
  $g.PixelOffsetMode = 'HighQuality'; $g.CompositingQuality = 'HighQuality'; $g.TextRenderingHint = 'AntiAliasGridFit'
  if ($bg) { $g.Clear([System.Drawing.ColorTranslator]::FromHtml($bg)) }
  return $bmp, $g
}

function Save($bmp, $g, $file) {
  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  '{0,-28} {1,6:N1} KB' -f $file, ((Get-Item (Join-Path $out $file)).Length / 1KB)
}

# Escala $crop (x,y,w,h del original) para que quepa en $boxW x $boxH, centrado.
function Fit($g, $img, $crop, $bx, $by, $boxW, $boxH) {
  $s = [math]::Min($boxW / $crop[2], $boxH / $crop[3])
  $w = [int]($crop[2] * $s); $h = [int]($crop[3] * $s)
  $dest = New-Object System.Drawing.Rectangle ([int]($bx + ($boxW - $w) / 2)), ([int]($by + ($boxH - $h) / 2)), $w, $h
  $g.DrawImage($img, $dest, $crop[0], $crop[1], $crop[2], $crop[3], 'Pixel')
}

function Resize($name, $file, $w) {
  $img = Load $name
  $h = [int][math]::Round($w * $img.Height / $img.Width)
  $bmp, $g = New-Canvas $w $h
  Fit $g $img @(0, 0, $img.Width, $img.Height) 0 0 $w $h
  $img.Dispose(); Save $bmp $g $file
}

# Los íconos traen el texto incrustado en el PNG: se recorta sólo el pictograma y el texto va en HTML
# (indexable, accesible y con la tipografía del sitio).
function Pictogram($name, $file, $size) {
  $img = Load $name
  $top = -1; $bottom = -1; $minX = $img.Width; $maxX = 0
  for ($y = 0; $y -lt $img.Height; $y++) {
    $rowHas = $false
    for ($x = 0; $x -lt $img.Width; $x += 1) {
      if ($img.GetPixel($x, $y).A -gt 40) { $rowHas = $true; if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x } }
    }
    if ($rowHas -and $top -lt 0) { $top = $y }
    if (-not $rowHas -and $top -ge 0) { $bottom = $y - 1; break }
  }
  $bmp, $g = New-Canvas $size $size
  Fit $g $img @($minX, $top, ($maxX - $minX + 1), ($bottom - $top + 1)) 0 0 $size $size
  $img.Dispose(); Save $bmp $g $file
}

# Logo: header (2.5x de 96px) y footer/schema.
Resize 'LogoSanavida.png' 'logo-240.png' 240
Resize 'LogoSanavida.png' 'logo-480.png' 480

# Favicon y apple-touch: el sol del logo (zona superior, sin el texto).
$logo = Load 'LogoSanavida.png'
$sun = @(100, 15, 945, 445)
$bmp, $g = New-Canvas 64 64; Fit $g $logo $sun 0 6 64 52; Save $bmp $g 'favicon-64.png'
$bmp, $g = New-Canvas 180 180 '#FFFCF8'; Fit $g $logo @(0, 0, $logo.Width, $logo.Height) 14 14 152 152; Save $bmp $g 'apple-touch-180.png'
$logo.Dispose()

Pictogram 'IconoBulgaros.png' 'ico-bulgaros.png' 112
Pictogram 'IconoAzucar.png' 'ico-azucar.png' 112
Pictogram 'IconoGluten.png' 'ico-gluten.png' 112

Resize 'Grecas.png' 'grecas.png' 482
Resize 'Nube1.png' 'nube-1.png' 560
Resize 'nube2.png' 'nube-2.png' 900
Resize 'Recurso 12.png' 'rombo.png' 36

# OG 1200x630: logo + promesa; fondo cielo con nube como en la identidad.
$bmp, $g = New-Canvas 1200 630 '#EEF7FD'
$cloud = Load 'nube2.png'; Fit $g $cloud @(0, 0, $cloud.Width, $cloud.Height) -40 470 1280 248; $cloud.Dispose()
$logo = Load 'LogoSanavida.png'; Fit $g $logo @(0, 0, $logo.Width, $logo.Height) 70 95 470 314; $logo.Dispose()
$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#2A1030'))
$plum = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#6B2A83'))
$mag = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#D1006F'))
$g.DrawString('KÉFIR ARTESANAL · IV REGIÓN', (New-Object System.Drawing.Font 'Segoe UI', 17, ([System.Drawing.FontStyle]::Bold)), $mag, 600, 150)
$g.DrawString("Fermentado con`nbúlgaros vivos.", (New-Object System.Drawing.Font 'Georgia', 46, ([System.Drawing.FontStyle]::Bold)), $ink, 594, 190)
$g.DrawString("Listo para tomar, en botella.`nHecho a mano en Ovalle.", (New-Object System.Drawing.Font 'Segoe UI', 21), $plum, 600, 352)
$g.DrawString('@sanavida_kefir', (New-Object System.Drawing.Font 'Segoe UI', 18, ([System.Drawing.FontStyle]::Bold)), $plum, 600, 452)
$bmp.Save((Join-Path $root 'public\img\og.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
'og.png regenerado'
