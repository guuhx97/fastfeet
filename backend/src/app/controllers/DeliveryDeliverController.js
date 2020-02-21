import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveryDeliverController {
  async index(req, res) {
    /**
     * Check params
     */
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.deliveryman_id,
        end_date: {
          [Op.ne]: null,
        },
        canceled_at: null,
      },
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    /**
     * Check params
     */
    const schemaParams = Yup.object().shape({
      delivery_id: Yup.number()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schemaParams.isValid(req.params))) {
      return res.status(400).json('Validation params fails');
    }

    /**
     * Check body
     */
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
      signature_id: Yup.number().positive(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation body is fails' });
    }
    const { delivery_id, deliveryman_id } = req.params;

    /**
     * Check delivery exist and already been withdrawn
     */
    const deliveryExist = await Delivery.findOne({
      where: {
        id: delivery_id,
        start_date: {
          [Op.ne]: null,
        },
      },
    });
    if (!deliveryExist) {
      return res.status(400).json({
        error: 'Delivery does not exit or has not yet been withdrawn',
      });
    }

    /**
     * Check Deliveryman exist
     */
    const deliverymanExist = await Deliveryman.findByPk(deliveryman_id);
    if (!deliverymanExist) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    /**
     * Check delivery allocated for deliveryman
     */
    const delivery = await Delivery.findOne({
      where: {
        id: delivery_id,
        deliveryman_id,
        start_date: {
          [Op.ne]: null,
        },
      },
    });
    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'This delivery does not allocated for deliveryman' });
    }

    /**
     * Check signature exist if informed
     */
    if (req.body.signature_id) {
      const signature = await File.findByPk(req.body.signature_id);
      if (!signature) {
        return res.status(400).json({ error: 'Signature does not exist' });
      }
    }

    /**
     * Check date Delivered is past date Withdrawn
     */
    const endDate = parseISO(req.body.end_date);
    if (
      isBefore(endDate, new Date()) &&
      isBefore(delivery.start_date, endDate)
    ) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const deliveryDelivered = await delivery.update(req.body, {
      attributes: [
        'id',
        'product',
        'recipient_id',
        'canceled_at',
        'start_date',
        'end_date',
        'signature_id',
      ],
    });
    return res.json(deliveryDelivered);
  }
}

export default new DeliveryDeliverController();
