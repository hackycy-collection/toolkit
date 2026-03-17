export interface FetchParams {
  page?: number
  [key: string]: any
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string
  // 每页显示多少条
  sizeField: string
  // 请求结果列表字段  支持 a.b.c
  listField: string
  // 请求结果总数字段  支持 a.b.c
  totalField: string
}

export interface TableGlobalConfig {
  /**
   * 接口字段映射配置，用于适配不同的后端接口规范
   * 优先级低于 useTable 单实例的 fetchSetting 参数
   */
  fetchSetting?: Partial<FetchSetting>

  /**
   * 默认每页条数，默认为 10
   */
  pageSize?: number

  /**
   * 分页大小选项，默认为 ['10', '20', '50', '100']
   */
  pageSizeOptions?: string[]

  /**
   * 自定义分页总数文案，默认为 `共 ${total} 条`
   */
  showTotal?: (total: number) => string
}

export interface ModalGlobalConfig {
  // reserved for future useModal config
}

export interface AdvancedAntdvGlobalConfig {
  table?: TableGlobalConfig
  modal?: ModalGlobalConfig
}
