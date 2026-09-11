Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 'C:\Users\Sudhanshu\.gemini\antigravity-ide\brain\3ae27b9c-8ed3-422f-b8b0-45ea45c358bc\.user_uploaded\media_1789039217296.png'
$w = $bmp.Width
$h = $bmp.Height

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $bmp.GetPixel($x, $y)
        # Blue markup: strong blue/cyan (B > 180, R < 50)
        if ($p.B -gt 180 -and $p.R -lt 70 -and $p.G -gt 100) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()
Write-Host "Total image size: $w x $h"
Write-Host "Blue mark bounding box: X=$minX to $maxX (center: $([Math]::Round(($minX+$maxX)/2))), Y=$minY to $maxY (center: $([Math]::Round(($minY+$maxY)/2)))"
Write-Host "As percentage of screen: X=$([Math]::Round((($minX+$maxX)/2)/$w*100, 1))%, Y=$([Math]::Round((($minY+$maxY)/2)/$h*100, 1))%"
