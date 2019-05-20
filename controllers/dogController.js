
const Dog = require('../models/Dog.js')

const dogController = {
  // sends all shelters, index 
  index: function(req, res) {
    Dog.find().then(dogs => {
      res.send(dogs);
    });
  },
  // show single shelter with dogs ------
  show: function(req, res) {
    Dog.findById(req.params.dogId).then(dog => {
      res.send(dog);
    });
  },
  // create --------------
  create: function(req, res) {
    Dog.create(req.body).then(savedDog => res.send(savedDog));
  },
  
  // update
  update: function(req, res) {
    Dog.findByIdAndUpdate(req.params.dogId, req.body, { new: true }).then(savedDog => {
      res.send(savedDog);
    });
  },
  
  // delete
  delete: function(req, res) {
    Dog.findByIdAndRemove(req.params.dogId).then((deletedDog) => {
      res.send(deletedDog);
    });
  }
}

module.exports = dogController