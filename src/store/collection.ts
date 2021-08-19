import { writable } from "svelte/store";
import { patch, updateItem } from "@ngxs/store/operators";

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
    updateCollectionTitle: (id: number, title: string) => {
      return update(
        updateItem(
          (c) => c.id === id,
          patch({
            title,
          })
        )
      );
    },

    updateTodoDescription: (
      collectionId: number,
      id: number,
      description: string
    ) => {
      return update(
        updateItem(
          (c) => c.id === collectionId,
          patch({
            todos: updateItem<ITodo>(
              (t) => t.id === id,
              patch({
                description,
              })
            ),
          })
        )
      );
    },

    updateItemBody: (
      collectionId: number,
      todoId: number,
      id: number,
      body: string
    ) => {
      return update(
        updateItem(
          (c) => c.id === collectionId,
          patch({
            todos: updateItem<ITodo>(
              (t) => t.id === todoId,
              patch({
                items: updateItem<ITodoItem>(
                  (i) => i.id === id,
                  patch({
                    body,
                  })
                ),
              })
            ),
          })
        )
      );
    },

    updateItemDone: (
      collectionId: number,
      todoId: number,
      id: number,
      done: boolean
    ) => {
      return update(
        updateItem(
          (c) => c.id === collectionId,
          patch({
            todos: updateItem<ITodo>(
              (t) => t.id === todoId,
              patch({
                items: updateItem<ITodoItem>(
                  (i) => i.id === id,
                  patch({
                    done,
                  })
                ),
              })
            ),
          })
        )
      );
    },
  };
}

export default createCollectionsStore();
