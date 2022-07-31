const KEY = 'easy-for-work'

const getKey = (key: string) => `${KEY}-${key}`


export const setLocal = (key: string, value: any) => {
  localStorage.setItem(getKey(key), JSON.stringify(value))
}

export const localGet = (key: string) => JSON.parse(localStorage.getItem(getKey(key)) ?? '')
