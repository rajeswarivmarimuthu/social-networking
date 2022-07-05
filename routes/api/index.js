//importing router function from express 
const router = require('express').Router();

//importing user route and thought routes from /routes library
const thoughtRoutes = require('./thoughtRoute');
const userRoutes = require('./userRoute');

//setting up thoughts route to have the route /api/thoughts
router.use('/thoughts', thoughtRoutes);

//setting up user route to have the route /api/users
router.use('/users', userRoutes);

module.exports = router;