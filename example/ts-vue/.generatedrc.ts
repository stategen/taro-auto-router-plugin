import { GeneratedrcConfig } from 'generated'
const path = require('path')

const generatedrc: GeneratedrcConfig = {
  configDir: './gconfig',
  generatedDir: path.resolve(__dirname, 'src', 'service'),
  plugins: [
    'toro-auto-router-plugin'
  ],
}

export default generatedrc
