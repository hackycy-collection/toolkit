import type { AdvancedAntdvGlobalConfig } from './types'

import { merge } from '@hackycy-toolkit/shared/es-toolkit'

function defineGlobalConfig<T extends object>() {
  const config = {} as T
  return {
    getGlobalConfig: (): Readonly<T> => config,
    setGlobalConfig: (cfg: T) => { merge(config, cfg) },
  }
}

export const { getGlobalConfig, setGlobalConfig }
  = defineGlobalConfig<AdvancedAntdvGlobalConfig>()

export type { AdvancedAntdvGlobalConfig }
