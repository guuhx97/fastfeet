import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class StatusController {
  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .required(),
    });
    if (!(await schema.isValid(req.params.id))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    /**
     * Check Deliveryman exist
     */
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exist' });
    }

    const { delivered } = req.query; // true delivered, false undeliverable

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: delivered && delivered === true ? !null : null,
      },
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    /**
     * Check start_date already passed on
     */
    const startDate = parseISO(req.body.start_date);
    if (isBefore(startDate, new Date())) {
      return res
        .startus(400)
        .json({ erro: 'The start hour informed already passed on' });
    }

    /**
     * Check end_date already passed on
     */
    const endDate = parseISO(req.body.start_date);
    if (isBefore(endDate, new Date())) {
      return res
        .startus(400)
        .json({ erro: 'The end hour informed already passed on' });
    }

    const delivery = Delivery.findByPk(req.params.id);

    const { id, product, start_date } = delivery.update(req.body);

    return res.json({ id, product, start_date });
  }
}
export default new StatusController();
