const Shelter = require('../models/Shelter.js')
const Dog = require('../models/Dog.js')

const shelterController = {
  // sends all shelters, index  ---works
  index: function(req, res) {
    Shelter.find().then(shelters => {
      res.send(shelters);
    });
  },
  // show single shelter with dogs ------
  show: function(req, res) {
    Shelter.findById(req.params.id).then(shelter => {
      Dog.find({shelterId: req.params.id}).then(dogs =>{
          console.log(dogs)
        res.send({shelter, dogs} );
      })
    });
  },


  // create --------------
  create: function(req, res) {
    Shelter.create(req.body).then(savedShelter => res.send(savedShelter));
  },
// edit
//   edit: function(req, res) {
//     Shelter.findById(req.params.id).then(shelter => {
//       res.send(shelter);
//     });
//   },
  // update
  update: function(req, res) {
    Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(savedShelter => {
      res.send(savedShelter);
    });
  },
  
  // delete, -----------works
  delete: function(req, res) {
    Shelter.findByIdAndRemove(req.params.id).then((deletedShelter) => {
      res.send(deletedShelter);
    });
  }
}

module.exports = shelterController