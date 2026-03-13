/**
 * Precision Math Library - Vitest Test Suite
 * 高精度数学运算库测试集
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  enableBoundaryChecking,
  precisionAdd,
  precisionDivide,
  precisionMultiply,
  precisionSubtract,
  roundToPrecision,
} from './decimal'

describe('precision-math', () => {
  // 每个测试前重置状态
  beforeEach(() => {
    enableBoundaryChecking(true)
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ==================== 主要运算函数测试 ====================
  describe('precisionMultiply', () => {
    describe('基础功能', () => {
      it('应该正确处理两个数的乘法', () => {
        expect(precisionMultiply(0.1, 0.2)).toBe(0.02)
        expect(precisionMultiply(0.2, 0.7)).toBe(0.14)
        expect(precisionMultiply(1.1, 1.1)).toBe(1.21)
      })

      it('应该处理整数', () => {
        expect(precisionMultiply(2, 3)).toBe(6)
        expect(precisionMultiply(10, 10)).toBe(100)
      })

      it('应该处理零', () => {
        expect(precisionMultiply(0, 0.1)).toBe(0)
        expect(precisionMultiply(0.1, 0)).toBe(0)
        expect(precisionMultiply(0, 0)).toBe(0)
      })

      it('应该处理负数', () => {
        expect(precisionMultiply(-0.1, 0.2)).toBe(-0.02)
        expect(precisionMultiply(0.1, -0.2)).toBe(-0.02)
        expect(precisionMultiply(-0.1, -0.2)).toBe(0.02)
      })
    })

    describe('多参数支持', () => {
      it('应该处理三个数', () => {
        expect(precisionMultiply(0.1, 0.2, 0.3)).toBe(0.006)
        expect(precisionMultiply(2, 3, 4)).toBe(24)
      })

      it('应该处理四个数', () => {
        expect(precisionMultiply(0.1, 0.1, 0.1, 0.1)).toBe(0.0001)
        expect(precisionMultiply(2, 2, 2, 2)).toBe(16)
      })
    })

    describe('边缘情况', () => {
      it('应该处理大数', () => {
        // eslint-disable-next-line no-loss-of-precision
        expect(precisionMultiply(999999999, 999999999)).toBe(999999998000000001)
      })

      it('应该处理科学计数法结果', () => {
        expect(precisionMultiply(1e-10, 1e-10)).toBe(1e-20)
      })
    })
  })

  describe('precisionAdd', () => {
    describe('基础功能', () => {
      it('应该正确处理两个数的加法', () => {
        expect(precisionAdd(0.1, 0.2)).toBe(0.3)
        expect(precisionAdd(0.7, 0.1)).toBe(0.8)
        expect(precisionAdd(1.1, 2.2)).toBe(3.3)
      })

      it('应该解决经典精度问题', () => {
        // 经典问题：0.1 + 0.2 !== 0.3
        expect(precisionAdd(0.1, 0.2)).not.toBe(0.30000000000000004)
        expect(precisionAdd(0.1, 0.2)).toBe(0.3)
      })

      it('应该处理整数', () => {
        expect(precisionAdd(1, 2)).toBe(3)
        expect(precisionAdd(100, 200)).toBe(300)
      })

      it('应该处理负数', () => {
        expect(precisionAdd(-0.1, 0.2)).toBe(0.1)
        expect(precisionAdd(-0.1, -0.2)).toBe(-0.3)
      })
    })

    describe('多参数支持', () => {
      it('应该处理三个数', () => {
        expect(precisionAdd(0.1, 0.2, 0.3)).toBe(0.6)
        expect(precisionAdd(1.1, 2.2, 3.3)).toBe(6.6)
      })

      it('应该处理多个小数', () => {
        expect(precisionAdd(0.1, 0.1, 0.1, 0.1, 0.1)).toBe(0.5)
      })
    })

    describe('不同小数位数', () => {
      it('应该处理不同小数位数的加法', () => {
        expect(precisionAdd(0.1, 0.02)).toBe(0.12)
        expect(precisionAdd(0.001, 0.02)).toBe(0.021)
      })
    })
  })

  describe('precisionSubtract', () => {
    describe('基础功能', () => {
      it('应该正确处理两个数的减法', () => {
        expect(precisionSubtract(0.3, 0.1)).toBe(0.2)
        expect(precisionSubtract(0.7, 0.2)).toBe(0.5)
        expect(precisionSubtract(1.5, 1.2)).toBe(0.3)
      })

      it('应该解决经典精度问题', () => {
        // 经典问题：0.3 - 0.1 !== 0.2
        expect(precisionSubtract(0.3, 0.1)).not.toBe(0.19999999999999998)
        expect(precisionSubtract(0.3, 0.1)).toBe(0.2)
      })

      it('应该处理整数', () => {
        expect(precisionSubtract(5, 3)).toBe(2)
        expect(precisionSubtract(100, 1)).toBe(99)
      })

      it('应该处理负数结果', () => {
        expect(precisionSubtract(0.1, 0.3)).toBe(-0.2)
        expect(precisionSubtract(1, 2)).toBe(-1)
      })

      it('应该处理负数为减数', () => {
        expect(precisionSubtract(0.1, -0.2)).toBe(0.3)
      })
    })

    describe('多参数支持', () => {
      it('应该处理三个数', () => {
        expect(precisionSubtract(1, 0.1, 0.2)).toBe(0.7)
        expect(precisionSubtract(10, 2, 3)).toBe(5)
      })
    })
  })

  describe('precisionDivide', () => {
    describe('基础功能', () => {
      it('应该正确处理两个数的除法', () => {
        expect(precisionDivide(0.3, 0.1)).toBe(3)
        expect(precisionDivide(0.6, 0.2)).toBe(3)
        expect(precisionDivide(0.7, 0.1)).toBe(7)
      })

      it('应该解决经典精度问题', () => {
        // 经典问题：0.3 / 0.1 !== 3
        expect(precisionDivide(0.3, 0.1)).not.toBe(2.9999999999999996)
        expect(precisionDivide(0.3, 0.1)).toBe(3)
      })

      it('应该处理整数', () => {
        expect(precisionDivide(6, 2)).toBe(3)
        expect(precisionDivide(100, 4)).toBe(25)
      })

      it('应该处理结果为无限循环小数', () => {
        expect(precisionDivide(1, 3)).toBeCloseTo(0.333333333333333, 10)
        expect(precisionDivide(2, 3)).toBeCloseTo(0.666666666666667, 10)
      })

      it('应该处理负数的除法', () => {
        expect(precisionDivide(-0.3, 0.1)).toBe(-3)
        expect(precisionDivide(0.3, -0.1)).toBe(-3)
        expect(precisionDivide(-0.3, -0.1)).toBe(3)
      })
    })

    describe('多参数支持', () => {
      it('应该处理三个数', () => {
        expect(precisionDivide(100, 2, 5)).toBe(10)
        expect(precisionDivide(1, 0.1, 0.1)).toBe(100)
      })
    })

    describe('边界情况', () => {
      it('应该处理除数小于被除数', () => {
        expect(precisionDivide(0.1, 0.3)).toBeCloseTo(0.333333333333333, 10)
      })
    })
  })

  describe('roundToPrecision', () => {
    describe('基础功能', () => {
      it('应该正确四舍五入', () => {
        expect(roundToPrecision(0.555, 2)).toBe(0.56)
        expect(roundToPrecision(0.554, 2)).toBe(0.55)
        expect(roundToPrecision(1.005, 2)).toBe(1.01)
      })

      it('应该解决银行家舍入问题', () => {
        // 经典问题：1.005.toFixed(2) === '1.00'
        expect(roundToPrecision(1.005, 2)).toBe(1.01)
        expect(roundToPrecision(2.555, 2)).toBe(2.56)
      })

      it('应该处理整数', () => {
        expect(roundToPrecision(5, 2)).toBe(5)
        expect(roundToPrecision(5.0, 2)).toBe(5)
      })

      it('应该处理零', () => {
        expect(roundToPrecision(0, 2)).toBe(0)
      })

      it('应该处理负数', () => {
        expect(roundToPrecision(-0.555, 2)).toBe(-0.56)
        expect(roundToPrecision(-1.005, 2)).toBe(-1.01)
      })
    })

    describe('不同精度', () => {
      it('应该支持不同的小数位数', () => {
        expect(roundToPrecision(0.5555, 3)).toBe(0.556)
        expect(roundToPrecision(0.5555, 1)).toBe(0.6)
        expect(roundToPrecision(0.5555, 0)).toBe(1)
      })

      it('应该使用默认精度2位', () => {
        expect(roundToPrecision(0.555)).toBe(0.56)
      })
    })

    describe('极端值', () => {
      it('应该处理非常大的数', () => {
        expect(roundToPrecision(999999.999, 2)).toBe(1000000)
      })

      it('应该处理非常小的数', () => {
        expect(roundToPrecision(0.000555, 5)).toBe(0.00056)
      })
    })
  })

  // ==================== 综合测试 ====================
  describe('综合运算', () => {
    it('应该支持混合运算', () => {
      // (0.1 + 0.2) * 0.3 = 0.09
      const sum = precisionAdd(0.1, 0.2)
      expect(precisionMultiply(sum, 0.3)).toBe(0.09)
    })

    it('应该处理复杂计算场景', () => {
      // 模拟价格计算场景
      const price = 19.99
      const quantity = 3
      const discount = 0.85

      const subtotal = precisionMultiply(price, quantity)
      expect(subtotal).toBe(59.97)

      const total = precisionMultiply(subtotal, discount)
      expect(total).toBe(50.9745)

      const rounded = roundToPrecision(total, 2)
      expect(rounded).toBe(50.97)
    })

    it('应该处理财务计算场景', () => {
      // 模拟账户余额计算
      const balance = 1000.00
      const deposit = 123.45
      const withdrawal = 67.89

      const newBalance = precisionSubtract(
        precisionAdd(balance, deposit),
        withdrawal,
      )
      expect(newBalance).toBe(1055.56)
    })
  })

  // ==================== 性能测试 ====================
  describe('性能测试', () => {
    it('应该能快速处理大量计算', () => {
      const start = Date.now()
      for (let i = 0; i < 10000; i++) {
        precisionAdd(0.1, 0.2)
        precisionMultiply(0.1, 0.2)
        precisionSubtract(0.3, 0.1)
        precisionDivide(0.3, 0.1)
      }
      const duration = Date.now() - start
      // 应该在合理时间内完成（1秒内）
      expect(duration).toBeLessThan(1000)
    })
  })
})
