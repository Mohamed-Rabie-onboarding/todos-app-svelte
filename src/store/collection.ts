import { writable } from "svelte/store";

export interface ITodoItem {
  id: number;
  body: string;
  done: boolean;
  created_at: number;
}

export interface ITodo {
  id: number;
  description: string;
  items: ITodoItem[];
  create_at: string;
}

export interface ICollection {
  id: number;
  title: string;
  created_at: string;
  user_id: number;
  todos: ITodo[];
}

function createCollectionsStore() {
  const { subscribe, set, update } = writable<ICollection[]>([]);

  return {
    subscribe,
    set,
    clear: () => set([]),
    /**
     * @TODO add updates here
     */
  };
}

export default createCollectionsStore();
