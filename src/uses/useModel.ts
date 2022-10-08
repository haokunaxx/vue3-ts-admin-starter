export function useModel<T>(
  valueGetter: () => T,
  valueEmitter: (val: T) => void
) {
  const refVal = ref(valueGetter()) as { value: T }
  watch(valueGetter, (val) => {
    if (val !== refVal.value) {
      refVal.value = val
    }
  })
  return {
    get value() {
      return refVal.value
    },
    set value(val: T) {
      console.log(val)
      if (refVal.value !== val) {
        refVal.value = val
        valueEmitter(val)
      }
    }
  }
}
