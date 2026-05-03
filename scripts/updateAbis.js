const fs = require("fs");
const path = require("path");

const backendAbiDir = path.join(__dirname, "..", "backend", "data", "abis");
const artifactsDir = path.join(__dirname, "..", "artifacts", "contracts");

if (!fs.existsSync(backendAbiDir)) {
  fs.mkdirSync(backendAbiDir, { recursive: true });
}

function copyAbi(contractFileName, artifactSubDir) {
  const artifactPath = path.join(artifactsDir, artifactSubDir, `${contractFileName}.json`);
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    const backendPath = path.join(backendAbiDir, `${contractFileName}.json`);
    fs.writeFileSync(backendPath, JSON.stringify({ abi: artifact.abi }, null, 2));
    console.log(`Updated ${backendPath}`);
  } else {
    console.warn(`Artifact not found: ${artifactPath}`);
  }
}

copyAbi("EVChargingEscrow", "EVChargingEscrow.sol");
copyAbi("Userregistry", "VehicleRegistry.sol");
