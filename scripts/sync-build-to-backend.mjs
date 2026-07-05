import { cp, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const backendPublicDir = path.resolve(projectRoot, '..', 'ca-mistertoy-backend', 'public')

async function emptyDir(dirPath) {
    await mkdir(dirPath, { recursive: true })
    const entries = await readdir(dirPath, { withFileTypes: true })

    await Promise.all(
        entries.map((entry) =>
            rm(path.join(dirPath, entry.name), { recursive: true, force: true })
        )
    )
}

async function main() {
    await readdir(distDir)
    await emptyDir(backendPublicDir)
    await cp(distDir, backendPublicDir, { recursive: true })

    console.log(`Synced frontend build from "${distDir}" to "${backendPublicDir}"`)
}

main().catch((err) => {
    console.error('Failed to sync frontend build to backend/public')
    console.error(err)
    process.exit(1)
})
