Add-Type -AssemblyName System.Drawing

$srcPath = 'C:\Users\ASUS\.gemini\antigravity\brain\8185b1f9-b17e-422c-b346-5dd1c68df98e\.user_uploaded\media_1795366558537_d42b8c3a.png'
$destLogoPng = 'client\public\images\branding\logo.png'
$destFaviconPng = 'client\public\favicon.png'

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

# Sized at 280px max dimension (perfect crisp 3x density for 68px footer logo and 44px navbar logo)
$maxDim = 280
$scale = [Math]::Min([double]$maxDim / $srcImg.Width, [double]$maxDim / $srcImg.Height)
$newW = [int]($srcImg.Width * $scale)
$newH = [int]($srcImg.Height * $scale)

$bmpLogo = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gLogo = [System.Drawing.Graphics]::FromImage($bmpLogo)
$gLogo.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gLogo.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gLogo.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gLogo.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$gLogo.DrawImage($srcImg, 0, 0, $newW, $newH)
$gLogo.Dispose()

if (Test-Path $destLogoPng) { Remove-Item $destLogoPng -Force }
$bmpLogo.Save($destLogoPng, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created $destLogoPng ($newW x $newH)"

# Favicon (64x64)
$favDim = 64
$bmpFav = New-Object System.Drawing.Bitmap($favDim, $favDim, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gFav = [System.Drawing.Graphics]::FromImage($bmpFav)
$gFav.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFav.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gFav.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gFav.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

$gFav.DrawImage($srcImg, 0, 0, $favDim, $favDim)
$gFav.Dispose()

if (Test-Path $destFaviconPng) { Remove-Item $destFaviconPng -Force }
$bmpFav.Save($destFaviconPng, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Created $destFaviconPng ($favDim x $favDim)"

$bmpLogo.Dispose()
$bmpFav.Dispose()
$srcImg.Dispose()

Get-Item $destLogoPng, $destFaviconPng | Select-Object Name, Length
