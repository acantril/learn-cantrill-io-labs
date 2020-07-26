param(
    [switch] $removeProgramData
)

function Log-Info {
    param(
        [string] $message
    )
    Write-Host("[INFO] {0}" -f $message)
}

function Log-Warning {
    param(
        [string] $message
    )
    Write-Warning("{0}" -f $message)
}

$ServiceName = "AmazonSSMAgent"
$InstalledPath = Join-Path $env:programFiles -ChildPath "Amazon" | Join-Path -ChildPath "SSM"
$CustomizedSeelog = Join-Path $InstalledPath -ChildPath "seelog.xml"
$CustomizedAppConfig = Join-Path $InstalledPath -ChildPath "amazon-ssm-agent.json"
$ProgramDataAmazonFolder = Join-Path $env:programData -ChildPath "Amazon"
$ProgramDataSSMFolder= Join-Path $ProgramDataAmazonFolder -ChildPath "SSM"

Log-Info("Uninstalling Amazon SSM Agent begins")

# Check if Amazon SSM Agent service is already installed or running
Log-Info("Checking if $ServiceName exists in Windows service")
$ExistingService = Get-CimInstance -ClassName Win32_Service -Filter "Name='$ServiceName'"
if($ExistingService) {
    Log-Info("Checking if {0} is running as windows service" -f $ServiceName)

    # If Amazon SSM Agent service is already running or waiting, check the state
    if($ExistingService.State -in "Running", "Waiting") {
        # Stop the service if running
        Log-Info("Stopping {0} in windows service" -f $ServiceName)
        try {
            $ErrorActionPreference = "Stop";
            net stop $ServiceName
        } catch {
            $ex = $Error[0].Exception
            Log-Warning("{0}.. exit!" -f $ex)
            Exit 1
        }
    }

    # Delete Amazon SSM Agent service
    Log-Info("Deleting $ServiceName from service")
    $silent = $ExistingService | Invoke-CimMethod -MethodName Delete

    Start-Sleep 1
}

# If removeProgramData is set as argument, remove program data
Log-Info("Checking if removeProgramData argument is set")
if($removeProgramData) {
    Log-Info("Removing program data since removeProgramData is set")

    # Remove ProgramDataSSMFolder
    if(Test-Path $ProgramDataSSMFolder) {
        Log-Info("Removing SSM ProgramData directory: {0}" -f $ProgramDataSSMFolder)
        Remove-Item $ProgramDataSSMFolder -Recurse
    }

    # Check if ProgramDataAmazonFolder is empty and if so, remove the folder as well
    if((Test-Path $ProgramDataAmazonFolder) -and ((Get-ChildItem -Path $ProgramDataAmazonFolder -Recurse | Measure-Object).Count -eq 0)) {
        Log-Info("Removing Amazon ProgramData directory: {0}" -f $ProgramDataSSMFolder)
        Remove-Item $ProgramDataAmazonFolder
    }
}

# Remove files and directories excluding customized files in installed path
Log-Info("Checking if any file exists in installed path excluding customized files")
if(Test-Path $InstalledPath) {
    Log-Info("Removing files and directories excluding {0} and {1} if exists" -f $CustomizedSeelog, $CustomizedAppConfig)
    Get-ChildItem $InstalledPath | ForEach-Object {
        if($_.FullName -ne $CustomizedSeelog -and $_.FullName -ne $CustomizedAppConfig) {
            Log-Info("Removing {0}" -f $_)
            Remove-Item $_.FullName -Recurse
        }
    }
}

Log-Info("Checking if installed path is empty")
if((Test-Path $InstalledPath) -and ((Get-ChildItem -Path $InstalledPath -Recurse | Measure-Object).Count -eq 0)) {
    Log-Info("Removing $InstalledPath since it is empty")
    Remove-Item $InstalledPath
}

Log-Info("Uninstalling Amazon SSM Agent successfully ended!`n")

Exit 0