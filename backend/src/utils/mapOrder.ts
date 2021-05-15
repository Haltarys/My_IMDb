import { reduce, map } from 'lodash';

export function mapOrder(objects: any[], ids: any[], key = 'id'): any[] {
  const indexObject = reduce(
    objects,
    (result, currentObject) => {
      result[currentObject[key]] = currentObject;
      return result;
    },
    {},
  );

  return map(ids, (currentGUID) => indexObject[currentGUID]);
}
