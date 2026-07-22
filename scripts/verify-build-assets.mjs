/**
 * Fail fast before Vite build if any imported asset is missing on disk
 * (common cause of Vercel/Linux ENOENT while Windows still builds).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const requiredPaths = [
  'src/assets/logo.png',
  'src/assets/image_home_1.png',
  'src/assets/image_home_2.png',
  'src/assets/image_home_4.png',
  'src/assets/images/cup/LHSK.png',
  'src/assets/images/cup/MV.png',
  'src/assets/images/cup/LHP.png',
  'src/assets/images/cup/HTV.png',
  'src/assets/images/award/block-GT.png',
  'src/assets/images/award/block-Cup.png',
  'src/assets/images/le-khanh.png',
  'src/assets/Rectangle-1.png',
  'src/assets/Rectangle-2.png',
  'src/assets/Rectangle.png',
  'src/assets/images/avatar/avatar-cherishk.jpg',
  'src/assets/images/avatar/avatar-12hote.jpg',
  'src/assets/images/icon/facebook.png',
  'src/assets/images/icon/tiktok.png',
  'src/assets/images/icon/instagram.png',
  'src/assets/images/icon/face_white.png',
  'src/assets/images/icon/tiktok_white.png',
  'src/assets/images/icon/instagram_white.png',
  'src/assets/images/icon/wreathL.png',
  'src/assets/images/icon/wreathR.png',
  'public/favicon.svg',
  'public/fonts/iCielInternacional-Light.otf',
  'public/fonts/iCielInternacional-DemiBold.otf',
  'public/fonts/1FTVVIPAmoria-Italic.ttf',
]

let failed = false
for (const rel of requiredPaths) {
  const abs = path.join(root, rel)
  if (!fs.existsSync(abs)) {
    console.error(
      `[verify-build-assets] MISSING (commit & push this file): ${rel}`
    )
    failed = true
  }
}

if (failed) {
  process.exit(1)
}

console.log(`[verify-build-assets] OK (${requiredPaths.length} paths)`)
