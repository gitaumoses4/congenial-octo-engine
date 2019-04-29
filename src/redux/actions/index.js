import {TOGGLE_ITEM} from '../types';

export const toggleItemSelection = (name) => ({
  type: TOGGLE_ITEM,
  name
});
