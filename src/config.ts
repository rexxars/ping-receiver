export const config = {
  host: process.env.HOST || '127.0.0.1',
  port: intVar(process.env.PORT, 8080),

  knownPings: process.env.THINGS?.split(',').map((item) => item.trim()) || [],
}

function intVar(value: string | undefined, defaultValue: number): number {
  if (value === undefined) return defaultValue
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed)) throw new Error(`Invalid integer value: ${value}`)
  return parsed
}
