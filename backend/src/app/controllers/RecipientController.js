import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async show(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .positive()
        .required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string()
        .length(9)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExist = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExist) {
      return res.status(400).json({ error: ' Recipient already exist' });
    }
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    } = await Recipient.create(req.body);
    return res.json({
      name,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number().positive(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipCode: Yup.string().length(9),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient do not found' });
    }
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    } = await recipient.update(req.body);

    return res.json({ name, street, number, complement, city, state, zipCode });
  }

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

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    await recipient.destroy({ where: recipient });

    return res.json({ message: 'Recipient has ben deleted' });
  }
}

export default new RecipientController();
