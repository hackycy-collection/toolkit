import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/storage/index.ts',
    'src/request/index.ts',
    'src/financial/index.ts',
  ],
  dts: true,
  exports: true,
  publint: true,
})
