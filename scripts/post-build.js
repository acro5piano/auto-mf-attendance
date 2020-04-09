#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const manifestJson = fs.readFileSync(path.resolve(__dirname, '../manifest.json'), 'utf8')
const manifest = JSON.parse(manifestJson)
manifest.content_scripts[0].js = './index.js'

fs.writeFileSync(
  path.resolve(__dirname, '../build/manifest.json'),
  JSON.stringify(manifest, undefined, 2),
)
