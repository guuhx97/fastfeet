class DeliveredController {
  async index(req, res) {
    return res.json({ ok: true });
  }

  async update(req, res) {
    return res.json({ ok: true });
  }
}

export default new DeliveredController();
