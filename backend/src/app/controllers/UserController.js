import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email'],
    });
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Check already exist
     */

    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;
    const { user_id } = req.params;

    /**
     * Check email already exist
     */
    const user = await User.findByPk(user_id);
    if (email && email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }
    /**
     * Check password is correct
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
    });
    console.log(req.params.user_id);
    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation is fail' });
    }

    /**
     * Check user exist
     */
    const user = await User.findByPk(req.params.user_id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    await user.destroy(user);
    return res.json({ message: 'User has been deleted' });
  }
}

export default new UserController();
