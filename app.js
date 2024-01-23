const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// bodyparser is a middlewire :)
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost/contactDance");
}
const port = 80;

// Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,    
    Phone: String,    
    email: String,    
    address: String,    
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving files inside static folder.
app.use(express.urlencoded({ extended: true })); //using express.urlencoded() middleware without specifying the extended option will give you deprecation warning, it's recommended to explicitly set the extended option to either true or false to avoid the deprecation warning.

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the Viewd Directory

// ENDPOINTS
app.get("/", (req, res) => {
  const con =
    "This is the best content on the internet so far so use it wisely";
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render("contact.pug")
});

// Start the server
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
