export default interface Paginated<T> {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  size: number;
}
