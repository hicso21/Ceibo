const MessageService = require("../services/messages.services");

class MessageController {
  static async findAll(req, res) {
    try {
      const messages = await MessageService.findAll();
      res.status(200).send(messages);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByIds(req, res) {
    try {
      const messages = await MessageService.findByIds(
        req.params.fId,
        req.params.uId
      );
      return messages
        ? res.status(200).send(messages)
        : res.status(404).send("No messages found");
    } catch (error) {
      console.log(error.message);
    }
  }

  static async findByFoundation(req, res) {
    try {
      const messages = await MessageService.findByFoundation(req.params.id);
      return messages
        ? res.status(200).send(messages)
        : res.status(404).send("No messages found");
    } catch (error) {
      console.log(error.messages);
    }
  }

  static async findByUser(req, res) {
    try {
      console.log(req.params.id)
      const messages = await MessageService.findByUser(req.params.id);
      return messages
        ? res.status(200).send(messages)
        : res.status(404).send("No messages found");
    } catch (error) {
      console.log(error.messages);
    }
  }
}

module.exports = MessageController;
