$headers = @{ 'User-Agent' = 'SushitaApp/1.0 (contact@sushita.com)' }
$url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Handshake_-_Men_-_37969912965.jpg/1920px-Handshake_-_Men_-_37969912965.jpg'
$destFile1 = 'client\public\images\about\about-closing-bg.jpg'
$destFile2 = 'client\public\images\common\conversation-handshake.jpg'

$commonDir = 'client\public\images\common'
if (-not (Test-Path $commonDir)) { New-Item -ItemType Directory -Path $commonDir | Out-Null }

Write-Host 'Downloading 1920px handshake image...'
Invoke-WebRequest -Uri $url -OutFile $destFile2 -Headers $headers -TimeoutSec 30
Copy-Item $destFile2 $destFile1 -Force

Get-Item $destFile1, $destFile2 | Select-Object FullName, Length
