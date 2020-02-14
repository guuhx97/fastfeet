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

class WithdrawnController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Valid is fail' });
    }
    const { delivery_id, deliveryman_id } = req.params;

    /**
     * Check delivery exist
     */
    const deliveryExist = await Delivery.findOne({
      where: {
        id: delivery_id,
        start_date: null,
      },
    });

    if (!deliveryExist) {
      return res.status(400).json({
        error:
          'Delivery does not exit or already withdrawn for other deliveryman',
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
      },
    });
    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'This delivery does not allocated for deliveryman' });
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
        .json({ error: 'Orders pickup only between 08:00 and 18:00h' });
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

    const deliveryWithdrawn = await delivery.update(req.body, {
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

    return res.json(deliveryWithdrawn);
  }
}

export default new WithdrawnController();
