class Model {
  attributes = {
    id: null,
    name: null,
    picture: null,
    comment: null,
    userId: null,
    createdAt: null,
    parentId: null
  }
  constructor(attributes) {
    this.attributes = {...this.attributes, ...attributes};
  }
  get(attribute) {
    if(attribute) return this.attributes[attribute];
  }
  amIaReply() {
    return !!this.attributes.parentId;
  }
  painter(props) {}
}
export default Model;