
export interface ResponseData<T> {
  data: T[];
  currentPage: number;
  hasNext : boolean;
  hasPrevious: boolean;
  message: string;
  status: string;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}




