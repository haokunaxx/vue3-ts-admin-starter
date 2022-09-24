import type { Ref } from "vue";

export const getElemFromElRef = (
  elRef: Window | HTMLElement | Ref<HTMLElement | null>
) => {
  let el;
  const plain = unref(elRef as HTMLElement);
  return (el = plain !== null ? plain : null) !== null ? el : plain;
};
