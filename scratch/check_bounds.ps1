Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap ((Resolve-Path 'public\cta.png').Path)
$w = $bmp.Width
$h = $bmp.Height
$minX = $w
$maxX = 0
$minY = $h
$maxY = 0

for ($x = 0; $x -lt $w; $x += 2) {
    for ($y = 0; $y -lt $h; $y += 2) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()
Write-Host "Dimensions: $w x $h"
Write-Host "Content: X from $minX to $maxX, Y from $minY to $maxY"
Write-Host "Left empty: $minX, Right empty: $($w - 1 - $maxX)"
