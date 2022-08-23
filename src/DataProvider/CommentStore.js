import { Fetcher } from "./Fetcher";

const CommentStore = (api, context) => {
    //when api == null, we want to return a store object that users can tap into
    //to do store.all(), store.add(), store.remove(), store.edit(), 
    //store.listen('add/remove/update', callback) <= returns an id, store.unlisten('listenerId')
    return {
        all: () => {
            return Fetcher.get(api);            
        },
        add: (payload) => {
            payload = context.onBeforeAdd?.(payload) || payload;
            return Fetcher.post(api, payload);
        },
        remove: (id) => {
            return Fetcher.delete(`${api}/${id}`);
        },
        edit: (id, payload) => {
            payload = context.onBeforeEdit?.(payload) || payload;
            return Fetcher.patch(`${api}/${id}`, payload);
        } 
    }
}
export default CommentStore;