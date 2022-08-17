import { Fetcher } from "./Fetcher";

const CommentStore = (api) => {
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