param(
    [string]$Stack = "stg",
    [string]$Region = "us-east-2"
)

$ErrorActionPreference = "Stop"

function Read-SecretAsPlainText {
    param([string]$Prompt)

    $secureValue = Read-Host -Prompt $Prompt -AsSecureString
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)

    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}

Write-Host "Configuring Pulumi stack '$Stack' for AWS region '$Region'..."

pulumi stack select $Stack
pulumi config set aws:region $Region --stack $Stack

$accessKey = Read-Host -Prompt "AWS Access Key ID"
$secretKey = Read-SecretAsPlainText -Prompt "AWS Secret Access Key"
$sessionToken = Read-SecretAsPlainText -Prompt "AWS Session Token (optional; press Enter if not using temporary credentials)"

if ([string]::IsNullOrWhiteSpace($accessKey)) {
    throw "AWS Access Key ID is required."
}

if ([string]::IsNullOrWhiteSpace($secretKey)) {
    throw "AWS Secret Access Key is required."
}

pulumi config set aws:accessKey $accessKey --secret --stack $Stack
pulumi config set aws:secretKey $secretKey --secret --stack $Stack

if (-not [string]::IsNullOrWhiteSpace($sessionToken)) {
    pulumi config set aws:token $sessionToken --secret --stack $Stack
}

Write-Host "Pulumi AWS config saved. Running preview..."
pulumi preview --stack $Stack
