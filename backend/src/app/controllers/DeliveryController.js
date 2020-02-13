import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

import DetailMail from '../jobs/DetailMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'zip_code',
            'number',
            'state',
            'city',
            'complement',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path', 'name'],
        },
      ],
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    /**
     * Check Recipient exist
     */
    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    /**
     * Check Deliveryman exist
     */
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(DetailMail.key, {
      delivery,
      deliveryman,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    /**
     * Check Recipient exist
     */
    const recipientExist = await Recipient.findByPk(recipient_id);
    if (recipient_id && !recipientExist) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    /**
     * Check Deliveryman exist
     */
    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id);
    if (deliveryman_id && !deliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const delivery = await Delivery.findByPk(req.params.id);
    /**
     * Check delivery exist
     */
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    const { id, product } = await delivery.update(req.body);

    return res.json({ id, product, recipient_id, deliveryman_id });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    /**
     * Check delivery exist
     */
    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not Exist' });
    }

    await delivery.destroy({ where: delivery });

    return res.json({ message: 'Delivery has been deleted' });
  }
}

export default new DeliveryController();
