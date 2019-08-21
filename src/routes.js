import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'humbreto',
    email: '@',
    password_hash: '1823721786312',
  });

  return res.json(user);
});
export default routes;
