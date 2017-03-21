const express = require('express')
const parser = require('body-parser')
const hbs = require('express-handlebars')
const mongoose = require('./db/connection')

const app = express()

const Champ = mongoose.model("Champ")

app.set("port", process.env.PORT || 3001)
app.set("view engine", "hbs")
app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout"
}))
app.use("/assets", express.static("public"))
app.use(parser.json({extened: true}))

app.get("/", function(req,res){
  res.render("main")
})

app.get("/api/champs", function(req, res){
  Champ.find({}).then(function(champs){
    res.json(champs)
  })
})

app.get("/api/champs/:name", function(req, res){
  Champ.findOne({ name: req.params.name }).then(function(champ){
    res.json(champ)
  })
})

app.post("/api/champs", function(req, res){
  Champ.create(req.body).then(function(champ){
    res.json(champ)
  })
})

app.delete("/api/champs/:name", function(req, res){
  Champ.findOneAndRemove({ name: req.params.name }).then(function(){
    res.json({ success: true })
  })
})

app.put("/api/champs/:name", function(req, res){
  Champ.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }).then(function(champ){
    res.json(champ)
  })
})

app.listen(app.get("port"), function(){
  console.log("FIGHT!!!");
})
