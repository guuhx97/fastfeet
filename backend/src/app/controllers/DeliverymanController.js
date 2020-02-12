import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();
    return res.json(deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: ' Validation is Fails' });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res.status(400).json({ error: 'User alright exists' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  async update(req, res) {
    return res.json({ error: true });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ error: 'Valid is fails' });
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
