const express = require('express');
const { response } = require('../app');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
Drone.find()
.then((response) => {
  res.render('drones/list.hbs', {response})
  console.log(drones)
})
.catch((err) => {
  next(err);
});
  // ... your code here
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create()
  .then(() => {
    res.render('drones/create-form.hbs')
  })
  .catch((err) => {
    next(err);
  });
  // ... your code here
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create({

    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed

  })
  
  .then(() => {
    res.redirect('/drones')
  })
  .catch(() => {
    res.redirect('drones/create')
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
  .then((response) =>{
    res.render("drones/update-form.hbs", response)
  })
  .catch((err) => {
    next(err);
  });
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {name, propellers, maxSpeed} = req.body
  Drone.findByIdAndUpdate(req.params.id, {name, propellers, maxSpeed})
  .then((response) => {
    res.redirect("/drones")
  })
  .catch((err, response) => {
    res.render("drones/update-form.hbs", response);
  });

  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  Drone.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/drones')

  })
  .catch((err) => {
    next(err);
  });
  // ... your code here
});

module.exports = router;
