//importing router function from express 
const router = require('express').Router();

//setting up api route  
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;