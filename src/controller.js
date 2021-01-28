export const index = (req, res) => res.status(200).json({
  message: 'My Rule-Validation API',
  status: 'success',
  data: {
    name: 'Fatiu Isiaka',
    github: '@razaqfatiu',
    email: 'razaqfatiu@gmail.com',
    mobile: '08034464795',
    twitter: '@muhammadfatiu',
  },
});

export const validate = (req, res) => res.json(req.body);
