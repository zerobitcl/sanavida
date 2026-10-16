import { execSync } from 'node:child_process';
import { mkdirSync, existsSync, rmSync, cpSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Empaqueta SOLO dist/ → upload/public_html.zip
// Eso es lo que se descomprime DENTRO de public_html en Hostinger (no la carpeta del proyecto).
execSync('node build.mjs', { stdio: 'inherit' });

const outDir = 'upload';
const stage = join(outDir, 'public_html');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
cpSync('dist', stage, { recursive: true });

const zipPath = join(outDir, 'sanavida-public_html.zip');
if (existsSync(zipPath)) rmSync(zipPath);

// PowerShell Compress-Archive: disponible en Windows sin dependencias.
const absStage = join(process.cwd(), stage);
const absZip = join(process.cwd(), zipPath);
execSync(
  `powershell -NoProfile -Command "Compress-Archive -Path '${absStage}\\*' -DestinationPath '${absZip}' -Force"`,
  { stdio: 'inherit' },
);

const files = readdirSync(stage, { recursive: true });
console.log(`\n✓ Listo para Hostinger`);
console.log(`  ZIP:  ${zipPath}`);
console.log(`  Carpeta: ${stage} (${files.length} archivos)`);
console.log(`\n  En hPanel → Archivos → Administrador de archivos → public_html:`);
console.log(`  1. Borra el index.html de bienvenida de Hostinger (si existe).`);
console.log(`  2. Sube y extrae sanavida-public_html.zip DENTRO de public_html.`);
console.log(`  3. Debe quedar public_html/index.html (no public_html/dist/...).`);
