import { Fetcher } from "./Fetcher";

const CommentStore = (api) => {
    //when api == null, we want to return a store object that users can tap into
    //to do store.all(), store.add(), store.remove(), store.edit(), 
    //store.listen('listener_name','add/remove/update', callback), store.unlisten('listener_name')
    return {
        all: () => {
            return Fetcher.get(api);
        },
        add: (payload) => {
            return Fetcher.post(api, payload);
        },
        remove: (id) => {
            return Fetcher.delete(`${api}/${id}`);
        },
        edit: (id, payload) => {
            return Fetcher.patch(`${api}/${id}`, payload);
        } 
    }
}
export default CommentStore;