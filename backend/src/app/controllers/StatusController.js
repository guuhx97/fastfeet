import * as Yup from 'yup';
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
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.require() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    const delivery = Delivery.findByPk(req.params.id);

    const { id, product, start_date } = delivery.update(req.body);

    return res.json({ id, product, start_date });
  }
}
export default new StatusController();
