import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
        canceled_at: null,
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
