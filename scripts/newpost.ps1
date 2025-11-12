param(
  [Parameter(Mandatory=$true)][string]$Title,
  [string]$Tags = "",
  [string]$ImagePath = "",
  [switch]$Publish
)

# normalize filename -> slug
$name = ($Title.ToLower() -replace '[^a-z0-9\s-]','' -replace '\s+','-').Trim('-')
$filename = "$(Get-Date -Format yyyy-MM-dd)-$name.md"
$postsDir = Join-Path -Path (Resolve-Path ..\content\posts).Path -ChildPath $filename
$imagesDir = (Resolve-Path ..\static\images).Path

if (-not (Test-Path $imagesDir)) { New-Item -ItemType Directory -Path $imagesDir | Out-Null }

$draftVal = if ($Publish.IsPresent) { "false" } else { "true" }

$template = @"
---
title: "$Title"
date: $(Get-Date -Format o)
draft: $draftVal
tags: [${Tags}]
description: ""
featuredImage: "/images/$($name).jpg"
---

# $Title

Yazıya buradan başlayın.
"@

# create post
$template | Out-File -FilePath $postsDir -Encoding UTF8
Write-Host "Created: $postsDir"

# copy image if provided
if ($ImagePath -ne "" -and (Test-Path $ImagePath)) {
  $dest = Join-Path $imagesDir "$($name).jpg"
  Copy-Item -Path $ImagePath -Destination $dest -Force
  Write-Host "Copied image to: $dest"
  git -C .. add "static/images/$($name).jpg" | Out-Null
}

# git add/commit/push
git -C .. add $postsDir
git -C .. commit -m "Add post: $Title" || Write-Host "Nothing to commit or commit failed"
git -C .. push || Write-Host "Push failed or already up-to-date"

Write-Host "Done. Edit the file if needed: $postsDir"
