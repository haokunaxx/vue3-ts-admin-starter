/**
 * 快速排序
 * @param { array } 排序的数组
 * @param { function:() => boolean }  判断的条件函数
 * @return { array } 排序好的数组
 */
export function quicklySort<T>(
  arr: T[],
  condition: (val1: T, val2: T) => boolean
): T[] {
  if (arr.length < 2) {
    return arr
  }
  const midIdx = arr.length >> 1,
    midVal = arr.splice(midIdx, 1)[0]
  const left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i]
    if (condition(temp, midVal)) {
      left.push(temp)
    } else {
      right.push(temp)
    }
  }
  return quicklySort(left, condition).concat(
    midVal,
    quicklySort(right, condition)
  )
}
