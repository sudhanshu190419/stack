Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap ((Resolve-Path 'C:\Users\Sudhanshu\.gemini\antigravity-ide\brain\3ae27b9c-8ed3-422f-b8b0-45ea45c358bc\.user_uploaded\media_1789038148156.png').Path)
$w = $bmp.Width
$h = $bmp.Height

$tX = 0; $tY = 0
for ($y = 80; $y -lt 160; $y++) {
    for ($x = 580; $x -lt 680; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 40 -and $p.G -lt 40 -and $p.B -lt 40) {
            $tX = $x; $tY = $y
            break
        }
    }
    if ($tX -ne 0) { break }
}

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 40; $y -lt 140; $y++) {
    for ($x = 500; $x -lt 650; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.R -lt 70 -and $p.G -lt 70 -and $p.B -lt 70 -and $x -lt ($tX - 10)) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()
Write-Host "Tablet corner: X=$tX, Y=$tY"
Write-Host "Text box: X=$minX to $maxX, Y=$minY to $maxY"
Write-Host "Horizontal offset from tablet: $($minX - $tX) px to $($maxX - $tX) px"
Write-Host "Vertical offset from tablet: $($minY - $tY) px to $($maxY - $tY) px"
