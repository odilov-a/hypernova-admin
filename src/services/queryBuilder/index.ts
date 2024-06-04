import qs from "qs";
import { query } from "js-query-builder";
import { TParams } from "services/types";

const queryBuilder = (
  url: string,
  {
    fields = [],
    include = "",
    append = "",
    limit = 0,
    sort = "",
    filter = {},
    page = 1,
    extra = {},
  }: TParams = {}
): string => {
  let queryObj = query(url);

  if (fields.length) {
    queryObj.param("fields", fields);
  }

  if (include.length) {
    queryObj.include(include);
  }

  if (append.length) {
    queryObj.append(append);
  }

  if (limit > 0) {
    queryObj.param("perPage", Number(limit));
  }

  if (sort) {
    queryObj.sort(sort);
  }

  if (Object.keys(filter).length) {
    Object.keys(filter).forEach((item: string) => {
      const normalized = qs
        .stringify({ filter: { [item]: filter[item] } }, { encode: false })
        .split("&");
      normalized.forEach((item: string) => {
        const splited = item.split("=");
        if (splited.length === 2 && splited[0] && splited[1]) {
          queryObj.param(splited[0], splited[1]);
        }
      });
    });
  }

  if (Object.keys(extra).length) {
    Object.keys(extra).forEach((key: string) => {
      if (key && extra[key]) {
        queryObj.param(key, extra[key]);
      }
    });
  }

  if (page && page > 1) {
    queryObj.page(Number(page));
  }

  return decodeURIComponent(queryObj.build());
};

export default queryBuilder;
