const express = require('express');
const https = require('https');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("css"));

mongoose.connect("mongodb://localhost:27017/detailsDB", {useNewUrlParser: true});

const detailsSchema = {
  name : String,
  age : Number,
  city :String,
  phone : Number
};

const Person = mongoose.model("person",detailsSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index1.html");
});

app.post("/", (req,res) => {
  const Name = req.body.name;
  const Age = req.body.age;
  const City = req.body.city;
  const Phone = req.body.phone;

  const person = new Person({
    name : Name,
    age : Age,
    city : City,
    phone : Phone
  });

  person.save();
  res.redirect("/");
});

app.get("/find", (req,res) =>{
  res.sendFile(__dirname + "/index2.html");

});

app.post("/find", (req,res) => {
  const UserName = req.body.userName;

  var per = Person.find({ name : UserName}, (err, data) => {
    if (err){
      res.send(err);
    }
    else {
      var n = data[0].name;
      var a = data[0].age;
      var c = data[0].city;
      var p = data[0].phone;

      res.write('<body style="background-color: #537895; background-image: linear-gradient(135deg, #537895 0%, #09203f 74%);"</body>');
      res.write('<h1 style="text-align:center"> Your Details </h2>');
      res.write('Your name : ' + n);
      res.write('<br>');
      res.write('Your age : ' + a);
      res.write('<br>');
      res.write('Your city : ' + c);
      res.write('<br>');
      res.write('Your phone number : ' + p);
      res.send();
    };
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
