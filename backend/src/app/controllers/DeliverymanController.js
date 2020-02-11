import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = Deliveryman.findAll();
    return res.json(deliverymans);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Valid is fails' });
    }
    const { id } = req.params;
    const deliveryman = Deliveryman.findOne({ where: id });
    return res.json(deliveryman);
  }

  async store(req, res) {}

  async update(req, res) {}

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Valid is fails' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    await deliveryman.destroy({ where: deliveryman });

    return res.json({ message: 'Recipient has ben deleted' });
  }
}

export default new DeliverymanController();
