import { Ref, ref, onBeforeMount, onBeforeUnmount } from "vue";

export default function UseMediaQuery(queryString: string): Ref<boolean> {
  // 是否支持媒体查询
  const isMediaQuerySupported = Boolean(window && "matchMedia" in window);
  let mediaQuery = window.matchMedia(queryString);
  const queryRes = ref<boolean>(false);

  const update = () => {
    if (!isMediaQuerySupported) return;
    if (!mediaQuery) mediaQuery = window.matchMedia(queryString);
    return (queryRes.value = mediaQuery.matches);
  };
  onBeforeMount(() => {
    update();
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", update);
    else mediaQuery.addListener(update);
  });
  onBeforeUnmount(() => {
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", update);
    else mediaQuery.removeListener(update);
  });

  return queryRes;
}
