import { ref } from "vue";
interface PaginationConf {
  pageSize?: number;
  pageSizes?: number[];
  currentPage?: number;
  layout?: string;
}

export function useTablePagination(
  paginationConf: PaginationConf | undefined = {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
    currentPage: 1,
    layout: "total, sizes, prev, pager, next, jumper",
  }
) {
  return {
    currentPage: ref<number>(paginationConf.currentPage || 1),
    pageSize: ref<number>(paginationConf.pageSize || 10),
    pageSizes: paginationConf.pageSizes || [10, 20, 30],
    layout: paginationConf.layout || "total, sizes, prev, pager, next, jumper",
  };
}
