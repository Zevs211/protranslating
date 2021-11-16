import providerSchema from'../models/provider'

class ProviderController {
  async create(req, res) {
    try {
      const provider = await providerSchema.create(req.body)
      res.status(200).json(provider)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getAll(req, res) {
    try {
      const providers = await providerSchema.find().exec()
      return res.json(providers)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params
      const provider = await providerSchema.findById(id)
      return res.json(provider)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!id) {
        res.status(400).json({ message: 'id is not found' })
      }
      const updatedClient = await providerSchema.findByIdAndUpdate(id, { $set: { name } }, { new: true })
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
      const provider = await providerSchema.findByIdAndDelete(id)
      return res.json(provider)
    } catch (e) {
      console.log(e)
      res.status(500).json(e.message)
    }
  }
}

export default new ProviderController();