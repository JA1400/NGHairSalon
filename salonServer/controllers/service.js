const Service = require("../models/service");

module.exports.addService = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const service = new Service({
      title: title,
      price: price,
      description: description,
    });
    await service.save();
    res.status(200).send({ message: "Service added!", service });
  } catch (e) {
    res.status(500).send({ message: "Error creating new service!" });
  }
};

module.exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;
    await Service.findByIdAndUpdate(id, { title, price, description });
    res.status(200).send({ message: "Service updated!" });
  } catch (e) {
    res.status(500).send({ message: "Error updating service!" });
  }
};

module.exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.status(200).send({ message: "Service deleted!" });
  } catch (e) {
    res.status(500).send({ message: "Error deleting service!" });
  }
};
