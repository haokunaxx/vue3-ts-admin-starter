import { ref, watch } from "vue";

/**
 * 根据key获取数据，
 * 修改该数据时自动更新localstorage
 * */
interface Options {
  watchStorageChange?: boolean;
}
export default function UseLocalStorage(
  key: string,
  fallbackValue?: any,
  options: Options = {}
) {
  const { watchStorageChange = true } = options;
  let value = localStorage.getItem(key);
  if (!value) value = fallbackValue || null;
  else value = JSON.parse(value);

  const data = ref<any>(value);

  const update = (e: StorageEvent) => {
    if (e?.key !== key) return;
    data.value = e.newValue ? JSON.parse(e.newValue) : e.newValue;
  };
  if (window && watchStorageChange) {
    window.addEventListener("storage", update, false);
  }

  const write = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  watch(
    data,
    (newVal) => {
      write(key, JSON.stringify(newVal));
    },
    {
      immediate: true,
      flush: "post",
    }
  );

  return data;
}
