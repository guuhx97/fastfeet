import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const deliveriesProblems = await DeliveryProblem.findAll({
      attributes: ['delivery_id'],
      include: [
        {
          distinct: ['delivery_id'],
          model: Delivery,
          as: 'delivery',
          attributes: ['product'],
        },
      ],
    });

    const newList = [];

    deliveriesProblems.forEach(l => {
      if (!newList.find(n => n.delivery_id === l.delivery_id)) newList.push(l);
    });

    return res.json(newList);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }
    const deliveryExists = await Delivery.findByPk(req.params.id);

    if (!deliveryExists) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }
    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'deliveryman_id', 'recipient_id'],
        },
      ],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }
    const { id } = req.params;
    const { description } = req.body;
    const delivery = await Delivery.findByPk(id);
    /**
     * Check delivery exixt
     */
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblemExists = await DeliveryProblem.findOne({
      where: { id },
    });

    if (!deliveryProblemExists) {
      return res.status(400).json({ error: "It's problem does not exists" });
    }

    const delivery = await Delivery.findByPk(
      deliveryProblemExists.delivery_id,
      {
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
        ],
      }
    );

    if (delivery.end_date !== null && delivery.signature_id !== null) {
      return res.status(400).json('This delivery already completed');
    }

    delivery.update(
      {
        canceled_at: new Date(),
      },
      {
        where: {
          id: deliveryProblemExists.delivery_id,
        },
      }
    );
    const formattedDate = format(
      delivery.start_date,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );
    await Queue.add(CancellationMail.key, {
      delivery,
      formattedDate,
      deliveryman: delivery.deliveryman,
      problem: deliveryProblemExists,
    });

    return res.status(200).json({ ok: 'Delivery has been cancelled' });
  }
}
export default new DeliveryProblemController();
