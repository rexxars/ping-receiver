export const config = {
  host: process.env.PING_HOST || '0.0.0.0',
  port: intVar(process.env.PING_PORT, 8080),

  knownPings: process.env.PING_THINGS?.split(',').map((item) => item.trim()) || [],
}

function intVar(value: string | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) throw new Error(`Invalid integer value: ${value}`)
  return parsed
}
