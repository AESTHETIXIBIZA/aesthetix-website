#!/usr/bin/env node
/**
 * Image Optimization Script
 * Komprimiert alle JPGs auf web-optimierte Größe
 *
 * Usage: node scripts/optimize-images.mjs
 */

import sharp from 'sharp'
import { readdir, stat, mkdir } from 'fs/promises'
import { join, extname, basename } from 'path'
import { existsSync } from 'fs'

const IMAGES_DIR = './public/images'
const BACKUP_DIR = './public/images-backup'
const MAX_WIDTH = 1920  // Max Breite für 16:9
const MAX_HEIGHT = 1200 // Max Höhe für 4:5
const QUALITY = 85      // JPEG Qualität (80-90 ist optimal)

async function getAllImages(dir) {
  const files = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath))
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function optimizeImage(filePath) {
  const stats = await stat(filePath)
  const sizeMB = stats.size / (1024 * 1024)

  // Skip wenn bereits klein genug
  if (sizeMB < 0.3) {
    return { path: filePath, status: 'skipped', reason: 'already optimized' }
  }

  try {
    const image = sharp(filePath)
    const metadata = await image.metadata()

    // Resize wenn zu groß
    let pipeline = image
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }

    // Optimieren und überschreiben
    const buffer = await pipeline
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer()

    // Backup erstellen (nur beim ersten Mal)
    const backupPath = filePath.replace(IMAGES_DIR, BACKUP_DIR)
    const backupDir = backupPath.substring(0, backupPath.lastIndexOf('/'))
    if (!existsSync(backupPath)) {
      await mkdir(backupDir, { recursive: true })
      await sharp(filePath).toFile(backupPath)
    }

    // Optimiertes Bild speichern
    await sharp(buffer).toFile(filePath)

    const newStats = await stat(filePath)
    const newSizeMB = newStats.size / (1024 * 1024)
    const saved = ((sizeMB - newSizeMB) / sizeMB * 100).toFixed(1)

    return {
      path: filePath,
      status: 'optimized',
      before: `${sizeMB.toFixed(2)} MB`,
      after: `${newSizeMB.toFixed(2)} MB`,
      saved: `${saved}%`
    }
  } catch (error) {
    return { path: filePath, status: 'error', error: error.message }
  }
}

async function main() {
  console.log('\n🖼️  AESTHETIX Image Optimizer\n')
  console.log(`📁 Scanning: ${IMAGES_DIR}`)
  console.log(`📐 Max Size: ${MAX_WIDTH}x${MAX_HEIGHT}`)
  console.log(`🎯 Quality: ${QUALITY}%\n`)

  const images = await getAllImages(IMAGES_DIR)
  console.log(`Found ${images.length} images\n`)

  let totalBefore = 0
  let totalAfter = 0
  let optimized = 0
  let skipped = 0
  let errors = 0

  for (const img of images) {
    const stats = await stat(img)
    totalBefore += stats.size

    const result = await optimizeImage(img)

    if (result.status === 'optimized') {
      console.log(`✅ ${basename(img)}: ${result.before} → ${result.after} (${result.saved} saved)`)
      optimized++
      const newStats = await stat(img)
      totalAfter += newStats.size
    } else if (result.status === 'skipped') {
      console.log(`⏭️  ${basename(img)}: already optimized`)
      skipped++
      totalAfter += stats.size
    } else {
      console.log(`❌ ${basename(img)}: ${result.error}`)
      errors++
      totalAfter += stats.size
    }
  }

  const beforeMB = (totalBefore / (1024 * 1024)).toFixed(1)
  const afterMB = (totalAfter / (1024 * 1024)).toFixed(1)
  const savedMB = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(1)
  const savedPercent = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)

  console.log('\n' + '─'.repeat(50))
  console.log(`\n📊 Summary:`)
  console.log(`   Optimized: ${optimized}`)
  console.log(`   Skipped:   ${skipped}`)
  console.log(`   Errors:    ${errors}`)
  console.log(`\n💾 Space:`)
  console.log(`   Before: ${beforeMB} MB`)
  console.log(`   After:  ${afterMB} MB`)
  console.log(`   Saved:  ${savedMB} MB (${savedPercent}%)`)
  console.log(`\n🗂️  Backup: ${BACKUP_DIR}`)
  console.log('')
}

main().catch(console.error)
