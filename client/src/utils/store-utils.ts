import { NormalizedStoreResource } from 'types/store';


const mergeResource = <R extends { id: number }>(
  state: NormalizedStoreResource<R>,
  resource: R,
): NormalizedStoreResource<R> => {
  const { allIds, byIds } = state;
  const { id } = resource;

  const newAllIds = Array.from(new Set([...allIds, id]));
  const newByIds = { ...byIds, [id]: resource };

  return { allIds: newAllIds, byIds: newByIds };
};

const mergeResources = <R extends { id: number }>(
  state: NormalizedStoreResource<R>,
  resources: Array<R>,
): NormalizedStoreResource<R> => {
  const { allIds, byIds } = state;
  const ids = resources.map((resource) => resource.id);

  const newAllIds = Array.from(new Set([...allIds, ...ids]));
  const newByIds = resources.reduce((current, resource) => {
    return { ...current, [resource.id]: resource };
  }, byIds);

  return { allIds: newAllIds, byIds: newByIds };
};


export default { mergeResource, mergeResources };
