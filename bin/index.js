#!/usr/bin/env node

// 1. IMPORT modules first
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// 2. DEFINE the function
async function generateFlutterCore() {
  const templateDir = path.join(__dirname, '../templates/core');
  const targetDir = path.join(process.cwd(), 'lib/core');

  console.log(chalk.blue('🚀 Generating Yinni Flutter Core Architecture...'));

  try {
    if (!fs.existsSync(templateDir)) {
      console.error(chalk.red(`Error: Template directory not found at ${templateDir}`));
      return;
    }

    await fs.copy(templateDir, targetDir);
    renameFilesRecursive(targetDir);

    console.log(chalk.green('\n✅ Success! Core library generated at lib/core/'));
  } catch (err) {
    console.error(chalk.red('❌ Critical Error:'), err);
  }
}

// 3. DEFINE helper functions
function renameFilesRecursive(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      renameFilesRecursive(filePath);
    } else if (file.endsWith('.dart.txt')) {
      const newPath = filePath.replace('.dart.txt', '.dart');
      fs.renameSync(filePath, newPath);
    }
  });
}

async function addNewFile(targetPath) {
  if (!targetPath) {
    console.error(chalk.red('❌ Please provide a path. Example: yinnigen add core/common/models/user.dart'));
    return;
  }

  // Ensure the extension is .dart
  const formattedPath = targetPath.endsWith('.dart') ? targetPath : `${targetPath}.dart`;
  const fullPath = path.join(process.cwd(), 'lib', formattedPath);
  
  // Look for a matching template (checking if we have a .dart.txt version)
  const templatePath = path.join(__dirname, '../templates', `${formattedPath}.txt`);

  try {
    await fs.ensureDir(path.dirname(fullPath));

    if (fs.existsSync(templatePath)) {
      // Use existing template content
      const content = await fs.readFile(templatePath, 'utf8');
      await fs.writeFile(fullPath, content);
      console.log(chalk.green(`✅ Created ${formattedPath} from template.`));
    } else {
      // Create an empty file if no template exists
      await fs.writeFile(fullPath, '// New Dart File\n');
      console.log(chalk.green(`✅ Created new empty file: ${formattedPath}`));
    }
  } catch (err) {
    console.error(chalk.red('❌ Error:'), err);
  }
}

// --- Command Logic ---
const args = process.argv.slice(2);
const command = args[0];
const subArg = args[1];

if (command === 'core') {
  generateFlutterCore();
} else if (command === 'add') {
  addNewFile(subArg);
} else {
  console.log(chalk.yellow('Usage:'));
  console.log('  yinnigen core          - Generate full core structure');
  console.log('  yinnigen add <path>    - Generate a specific file');
}