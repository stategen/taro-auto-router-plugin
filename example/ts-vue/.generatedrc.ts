import { GeneratedrcConfig } from 'generated'
const path = require('path')

const generatedrc: GeneratedrcConfig = {
  configDir: './config',
  generatedDir: path.resolve(__dirname, 'src', 'service'),
  plugins: [
    'taro-auto-router-plugin'
  ],
}

export default generatedrc
