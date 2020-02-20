import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async show(req, res) {
    /**
     * Validation params
     */
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (await schema.isValid(req.params)) {
      return res.status(401).json({ error: 'Validation params is Failed' });
    }

    return res.json({ ok: true });
  }

  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliverymans);
  }

  async store(req, res) {
    /**
     * Validation body
     */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is Failed' });
    }

    /**
     *  Check deliveryman already exist
     */
    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });
    if (deliverymanExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    /**
     * Validation body
     */
    const schemaBody = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });
    if (!(await schemaBody.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation body is Failed' });
    }

    /**
     * Validation Params
     */
    const schemaParams = Yup.object().shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParams.isValid(req.params))) {
      return res.status(401).json({ error: 'Validation params is Failed' });
    }

    /**
     * Check user exist
     */
    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    /**
     * Check user change email and email already exist
     */
    if (req.body.email && req.body.email !== deliveryman.email) {
      const deliverymanExist = await Deliveryman.findOne({
        where: { email: req.body.email },
      });
      if (deliverymanExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async delete(req, res) {
    /**
     * Validation params
     */
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(401).json({ error: 'Valid is fails' });
    }

    /**
     * Check user exist
     */
    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_id);
    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman does not exists' });
    }

    await deliveryman.destroy({ where: deliveryman });

    return res.json({ message: 'Deliveryman has ben deleted' });
  }
}

export default new DeliverymanController();
