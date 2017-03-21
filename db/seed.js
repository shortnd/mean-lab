const mongoose = require('./connection')
const seedData = require('./seedData')

var Champ = mongoose.model("Champ")

Champ.remove({}, function(){
  Champ.collection.insert(seedData).then(function(){
    process.exit()
  })
})
