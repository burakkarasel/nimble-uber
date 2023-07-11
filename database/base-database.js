class BaseDatabase {
  constructor(model) {
    this.model = model;
  }

  load = () => {
    return this.model.find();
  };

  insert = async (object) => {
    return this.model.create(object);
  };

  remove = async (id) => {
    await this.model.deleteOne({ ["_id"]: id });
  };

  findBy = async (key, value) => {
    return this.model.findOne({ [key]: value });
  };

  updateById = async (id, object) => {
    return this.model.findByIdAndUpdate(id, object);
  };
}

module.exports = BaseDatabase;
