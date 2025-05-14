// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => !(window as any).invokeNative

// Basic no operation function
export const noop = () => {}

export const formatPrice = (price: number): string => {
  return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}