class Model {
  attributes = {
    id: null,
    name: null,
    picture: null,
    comment: null,
    userId: null,
    createdAt: null
  }
  constructor(attributes) {
    this.attributes = {...this.attributes, ...attributes};
  }
  get(attribute) {
    if(attribute) return this.attributes[attribute];
  }
  paint(props) {}
}
export default Model;