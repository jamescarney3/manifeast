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

const updateResource = <R extends { id: number }>(
  state: NormalizedStoreResource<R>,
  resource: R,
): NormalizedStoreResource<R> => {
  const { allIds, byIds } = state;

  const newByIds = allIds.reduce((current, id) => {
    const idMatch = resource.id === id;
    return { ...current, [id] : idMatch ? resource : byIds[id] };
  }, {});

  return { allIds, byIds: newByIds };
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

const removeResource = <R extends { id: number }>(
  state: NormalizedStoreResource<R>,
  id: number,
): NormalizedStoreResource<R> => {
  const { allIds, byIds } = state;

  const newAllIds = allIds.filter((existingId) => existingId !== id);
  const newByIds = newAllIds.reduce((current, retainedId) => {
    return { ...current, [retainedId]: byIds[retainedId] };
  }, {});

  return { allIds: newAllIds, byIds: newByIds };
};

const normalizeResource = <R>(
  resource: R,
  ...fields: Array<string>
): R => {
  return Object.keys(resource).reduce((normalizedResource, k) => {
    if (fields.includes(k)) return normalizedResource;
    return { ...normalizedResource, [k]: resource[k] };
  }, {} as R);
};


export default {
  mergeResource,
  mergeResources,
  removeResource,
  updateResource,
  normalizeResource,
};
