import { reduce, map } from 'lodash';

export function mapOrder(objects: any[], ids: any[], key = 'id'): any[] {
  const index = reduce(
    objects,
    (acc, current) => {
      acc[current[key]] = current;
      return acc;
    },
    {},
  );

  return map(ids, (id) => index[id]);
}
