export interface OScillatorOption {
  phase: number
  offset: number
  frequency: number
  amplitude: number
}
/**
 * 色相振荡器
 */
export class Oscillator implements OScillatorOption {
  phase: number
  offset: number
  frequency: number
  amplitude: number
  value: number
  constructor({ phase = 0, offset = 0, frequency = 0.001, amplitude = 1 }: OScillatorOption) {
    this.phase = phase
    this.offset = offset
    this.frequency = frequency
    this.amplitude = amplitude
  }
  update() {
    this.phase += this.frequency
    this.value = this.offset + Math.sin(this.phase) * this.amplitude
    return this.value
  }
}
