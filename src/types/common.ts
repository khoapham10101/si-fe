import { GenderEnum } from "@/enums/common";

export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

interface LinkPaginate {
  url: string | null;
  label: string;
  active: boolean;
}
export interface ApiPaginationResponse<T> {
  data: T;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: LinkPaginate[];
    path: string;
  };
  links: {
    first: string;
    last: string;
    prev: null;
    next: null;
  };
}

export interface PaginationPayload {
  per_page: number;
  current_page: number;
}
