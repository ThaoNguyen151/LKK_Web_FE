import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const isCi =
  process.env.CI === 'true' ||
  process.env.CI === '1' ||
  Boolean(process.env.VERCEL)

if (isCi) {
  console.log('[prepare] Skipping husky on CI/Vercel.')
  process.exit(0)
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const huskyBin = path.join(root, 'node_modules', 'husky', 'bin.js')
const r = spawnSync(process.execPath, [huskyBin], { cwd: root, stdio: 'inherit' })
process.exit(r.status === null ? 1 : r.status)
