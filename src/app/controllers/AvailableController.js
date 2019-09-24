import AvailableService from '../services/AvailableService';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    const available = await AvailableService.run({
      date,
      provider_id: req.params.providerId,
    });

    return res.json(available);
  }
}

export default new AvailableController();
