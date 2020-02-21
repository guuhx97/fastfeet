import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  isAfter,
  isBefore,
  parseISO,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveryCollect {
  async index(req, res) {
    /**
     * Check params
     */
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.deliverman_id,
        start_date: {
          [Op.ne]: null,
        },
        end_date: null,
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
      return res.status(400).json({ error: 'Validation params is fail' });
    }

    /**
     * Check body
     */
    const schemaBody = Yup.object().shape({
      start_date: Yup.date().required(),
    });
    if (!(await schemaBody.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation body is fail' });
    }

    /**
     * Check deliveryman exist
     */
    const deliveryman = await Deliveryman.findByPk(req.params.deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    /**
     * Check delivery exist
     */
    const delivery = await Delivery.findByPk(req.params.delivery_id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    /**
     * Check delivery is available for pickup
     */
    if (delivery.start_date) {
      return res.status(400).json({ error: 'Delivery already picked up' });
    }

    /**
     * Check delivery allocated for deliveryman
     */
    const { deliveryman_id } = req.params;
    console.log(typeof deliveryman_id);
    if (!(delivery.deliveryman_id === parseInt(deliveryman_id, 0))) {
      return res
        .status(400)
        .json({ error: 'Delivery is not allocated for deliveryman' });
    }

    const startDate = parseISO(req.body.start_date);
    /**
     * Check for past dates
     */
    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Checks if date is within pickup time
     */
    const startInterval = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
    const endInterval = setSeconds(setMinutes(setHours(startDate, 18), 0), 0);

    if (isAfter(startDate, endInterval) || isBefore(startDate, startInterval)) {
      return res
        .status(400)
        .json({ error: 'Collect between 08:00 and 18:00h' });
    }

    /**
     * Check amount deliveries eached the maximum
     */
    const todayDeliveries = await Delivery.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(startDate), endOfDay(startDate)],
        },
      },
    });
    if (todayDeliveries.length >= 5) {
      return res
        .status(400)
        .json({ error: 'maximum number of deliveries reached' });
    }

    const deliveryCollected = await delivery.update(req.body, {
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

    return res.json(deliveryCollected);
  }
}

export default new DeliveryCollect();
