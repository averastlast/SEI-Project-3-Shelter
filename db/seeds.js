const Shelter = require('../models/Shelter.js')
  
// Promises
Shelter.deleteMany().then(() => {
    const brookhaven = new Shelter({name: 'brookhaven', address: 'forest', phoneNum: 5})
    return brookhaven.save()
  }).then(() => {
    const brookview = new Shelter({name: 'brookview', address: 'sky', phoneNum: 4})
    return brookview.save()
  })


  