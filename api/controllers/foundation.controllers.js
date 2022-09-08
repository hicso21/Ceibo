const FoundationServices = require("../services/foundation.services");

class FoundationController {
  static async getAllFoundation(req, res) {
    try {
      const foundation = await FoundationServices.getAllFoundation();
      if (!foundation) return res.status(404).send("no data found");
      res.status(200).send(foundation);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createFoundation(req, res) {
    try {
        const foundation = await FoundationServices.createFoundation(req.body)
        return res.status(201).send(foundation)
    } catch (error) {
        console.log(error)
    }
}

static async findById(req, res) {
  try {
      const foundation = await FoundationServices.findById(req.params.id)
      return res.status(200).send(foundation)
  } catch (error) {
      console.log(error)
  }
}

}

module.exports = FoundationController;
