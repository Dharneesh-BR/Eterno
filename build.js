const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting build process...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install --no-optional', { stdio: 'inherit' });

  // Fix permissions if needed
  const viteBinPath = path.join('node_modules', '.bin', 'vite');
  if (fs.existsSync(viteBinPath)) {
    console.log('Fixing Vite binary permissions...');
    fs.chmodSync(viteBinPath, '755');
  }

  // Run the build
  console.log('Running build...');
  execSync('npx vite build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
