$headers = @{ 'User-Agent' = 'SushitaApp/1.0 (contact@sushita.com)' }

$slides = @(
  @{
    Url = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Cyber_city_Gurgaon.jpg';
    Path = 'client\public\images\hero\hero-slide-1.jpg'
  },
  @{
    Url = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/World_Trade_Center_Bangalore_%282017%29.jpg';
    Path = 'client\public\images\hero\hero-slide-2.jpg'
  },
  @{
    Url = 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Skyline_pic_Mumbai.jpg';
    Path = 'client\public\images\hero\hero-slide-3.jpg'
  },
  @{
    Url = 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Hiranandani_Gardens_in_Powai.jpg';
    Path = 'client\public\images\hero\hero-slide-4.jpg'
  }
)

Add-Type -AssemblyName System.Drawing

function Optimize-ImageFile {
    param(
        [string]$tempFile, 
        [string]$destFile, 
        [int]$maxWidth = 1920, 
        [int]$maxHeight = 1080, 
        [long]$quality = 82
    )
    
    $srcImg = [System.Drawing.Image]::FromFile($tempFile)
    $origW = $srcImg.Width
    $origH = $srcImg.Height
    
    # Calculate scale factor maintaining aspect ratio
    $scale = [Math]::Min([double]$maxWidth / $origW, [double]$maxHeight / $origH)
    if ($scale -gt 1.0) { $scale = 1.0 }
    
    $newW = [int]($origW * $scale)
    $newH = [int]($origH * $scale)
    
    $newBmp = New-Object System.Drawing.Bitmap($newW, $newH)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($srcImg, 0, 0, $newW, $newH)
    $g.Dispose()
    $srcImg.Dispose()
    
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
    
    if (Test-Path $destFile) { Remove-Item $destFile -Force }
    $newBmp.Save($destFile, $jpegCodec, $encoderParams)
    $newBmp.Dispose()
}

$tempDir = 'client\public\images\hero\_temp'
if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir | Out-Null }

$idx = 1
foreach ($s in $slides) {
    $tempFile = Join-Path $tempDir ('raw_' + $idx + '.jpg')
    Write-Host ('Downloading slide ' + $idx + ' from ' + $s.Url)
    Invoke-WebRequest -Uri $s.Url -OutFile $tempFile -Headers $headers -TimeoutSec 30
    Write-Host ('Optimizing to ' + $s.Path)
    Optimize-ImageFile -tempFile $tempFile -destFile $s.Path -maxWidth 1920 -maxHeight 1080 -quality 82
    $idx++
}

Remove-Item $tempDir -Recurse -Force
Get-ChildItem client\public\images\hero\hero-slide-*.jpg | Select-Object Name, Length
