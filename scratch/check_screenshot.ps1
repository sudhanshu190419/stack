Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap ((Resolve-Path 'C:\Users\Sudhanshu\.gemini\antigravity-ide\brain\3ae27b9c-8ed3-422f-b8b0-45ea45c358bc\.user_uploaded\media_1789038148156.png').Path)
$w = $bmp.Width
$h = $bmp.Height

# Let's find tablet top-left in the screenshot
# Also let's find the handwritten note position
Write-Host "Screenshot size: $w x $h"
# Find tablet bezel in screenshot:
$tX = -1
$tY = -1
for ($y = 100; $y -lt 300; $y++) {
    for ($x = [int]($w * 0.5); $x -lt [int]($w * 0.8); $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 45 -and $p.G -lt 45 -and $p.B -lt 45) {
            $tX = $x
            $tY = $y
            break
        }
    }
    if ($tX -ne -1) { break }
}
Write-Host "In screenshot, tablet top-left bezel: X=$tX ($([Math]::Round($tX/$w*100))%), Y=$tY ($([Math]::Round($tY/$h*100))%)"

# Find handwritten text in screenshot around X = 0.5 * w, Y = 50-150:
# Handwritten text has darker pixels (R < 80, G < 80, B < 80)
$noteX = -1
$noteY = -1
for ($y = 40; $y -lt 150; $y++) {
    for ($x = [int]($w * 0.45); $x -lt $tX; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 80 -and $p.G -lt 80 -and $p.B -lt 80) {
            $noteX = $x
            $noteY = $y
            break
        }
    }
    if ($noteX -ne -1) { break }
}
Write-Host "In screenshot, handwritten note: X=$noteX ($([Math]::Round($noteX/$w*100))%), Y=$noteY ($([Math]::Round($noteY/$h*100))%)"
$bmp.Dispose()
