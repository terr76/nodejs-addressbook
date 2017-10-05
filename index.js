var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

// DB setting
// MONGO_DB: environment variable from local pc
mongoose.connect("mongodb://dbuser:dbuser@ds023435.mlab.com:23435/contact_book", {
  useMongoClient: true
});
var db = mongoose.connection;

// Other setting
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));

var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema);

// Routes
// Home
app.get("/", function(req, res){
  res.redirect("/contacts");
});
// Contacts - Index
app.get("/contacts", function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});
app.get("/contacts/new", function(req, res){
  res.render("contacts/new");
});
// Contacts - create
app.post("/contacts", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Port setting
app.listen(3000, function(){
  console.log("server on");
});
