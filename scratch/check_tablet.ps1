Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap ((Resolve-Path 'public\cta.png').Path)
$w = $bmp.Width
$h = $bmp.Height

# Find the tablet top edge: scan y from 200 to 450, x from 200 to 500 where color is dark bezel (R < 60, G < 60, B < 60)
$foundX = -1
$foundY = -1
for ($y = 200; $y -lt 500; $y++) {
    for ($x = 100; $x -lt 500; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 200 -and $p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 70) {
            $foundX = $x
            $foundY = $y
            break
        }
    }
    if ($foundX -ne -1) { break }
}
$bmp.Dispose()
Write-Host "Tablet top-left bezel around: X=$foundX ($([Math]::Round($foundX/$w*100))%), Y=$foundY ($([Math]::Round($foundY/$h*100))%)"
