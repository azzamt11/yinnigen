<#
.SYNOPSIS
    Runs the yinnigen CLI tool directly with Node.js without needing npm install -g.
.DESCRIPTION
    Resolves bin/index.js relative to this script's location and passes all arguments through.
.EXAMPLE
    yinnigen.ps1 core
.EXAMPLE
    yinnigen.ps1 add core/common/models/user.dart
#>

$entrypoint = Join-Path $PSScriptRoot "..\bin\index.js"

if (-not (Test-Path $entrypoint)) {
    Write-Error "yinnigen entrypoint not found at: $entrypoint"
    exit 1
}

& node $entrypoint @args
exit $LASTEXITCODE
