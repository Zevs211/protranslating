import clientsSchema from '../models/client'
import { validateClient } from '../validator'

class ClientController {
  async create(req, res) {
    const { name, email, phone, providers } = req.body;
    try {
      validateClient({ name, email, phone });
      const client = new clientsSchema({
        name,
        email,
        phone,
        providers
      });
      const newClient = await client.save();
      res.status(200).json(newClient)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getAll(req, res) {
    try {
      const clients = await clientsSchema.find().populate('providers').exec()
      return res.json(clients)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params
      const client = await clientsSchema.findById(id)
      return res.json(client)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async update(req, res) {
    const { id } = req.params
    const { name, email, phone, providers } = req.body;
    try {
      validateClient({ name, email, phone });
      if (!id) {
        res.status(400).json({ message: 'id is not found' })
      }
      const updatedClient = await clientsSchema.findByIdAndUpdate(id, {
        $set: {
          name,
          email,
          phone,
          providers
        }
      }, { new: true })
      return res.json(updatedClient)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'id is not found' })
      }
      const client = await clientsSchema.findByIdAndDelete(id)
      return res.json(client)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
}

export default new ClientController();
