import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll({
      attributes: [
        'name',
        'street',
        'number',
        'complement',
        'state',
        'city',
        'zip_code',
      ],
    });
    return res.json(recipients);
  }

  async store(req, res) {
    /**
     * Validation body
     */
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

    /**
     * Check recipient already exist
     */
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

    return res.json({ name, street, number, complement, city, state, zipCode });
  }

  async update(req, res) {
    /**
     * Validation body
     */
    const schemaBody = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number().positive(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zipCode: Yup.string().length(9),
    });
    if (!(await schemaBody.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails Body' });
    }

    /**
     * Validation Params
     */
    const schemaParams = Yup.object().shape({
      recipient_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParams.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails Params' });
    }

    /**
     * Check recipient exist
     */
    const recipient = await Recipient.findByPk(req.params.recipient_id);
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
    /**
     * Validation Params
     */
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Valid is fails' });
    }

    /**
     * Check recipient exist
     */
    const recipient = await Recipient.findByPk(req.params.recipient_id);
    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }

    await recipient.destroy({ where: recipient });

    return res.json({ message: 'Recipient has ben deleted' });
  }
}

export default new RecipientController();
