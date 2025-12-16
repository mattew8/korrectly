import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Manifest {
  version: string;
  [key: string]: unknown;
}

const manifestPath = path.join(__dirname, '../public/manifest.json');

// 현재 버전 읽기
let currentVersion = '알 수 없음';
try {
  const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  currentVersion = manifest.version;
} catch (error) {
  console.warn('⚠️  현재 버전을 읽을 수 없습니다.');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `현재 버전: ${currentVersion}\n버전을 입력하세요 (x.y.z): `,
  (version: string) => {
    // 버전 형식 검증
    const versionRegex = /^\d+\.\d+\.\d+$/;
    if (!versionRegex.test(version)) {
      console.error('❌ 잘못된 버전 형식입니다. (예: 1.0.0)');
      process.exit(1);
    }

    try {
      // manifest.json 읽기
      const manifest: Manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf8'),
      );

      // 버전 업데이트
      manifest.version = version;

      // manifest.json 쓰기 (pretty print)
      fs.writeFileSync(
        manifestPath,
        JSON.stringify(manifest, null, 2) + '\n',
        'utf8',
      );

      console.log(`✅ 버전이 ${version}으로 업데이트되었습니다.`);
      rl.close();
      process.exit(0);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('❌ manifest.json 업데이트 실패:', errorMessage);
      rl.close();
      process.exit(1);
    }
  },
);
