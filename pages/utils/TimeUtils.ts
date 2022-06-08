export const delay = (milis: number) => {
  return new Promise((res) => setTimeout(res, milis))
}
