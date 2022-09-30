const KEY = 'vue3-ts-admin-starter'

const getKey = (key: string) => `${KEY}-${key}`

export const localSet = (key: string, value: any) => {
  localStorage.setItem(getKey(key), JSON.stringify(value))
}

export const localGet = (key: string) => {
  const value = localStorage.getItem(getKey(key))
  return value ? JSON.parse(value) : undefined
}
