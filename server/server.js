const express = require('express')
const cors=require('cors');
const bodyParser =require('body-parser');
const { default: mongoose, mongo } = require('mongoose');

const app = express()
const port = 4000
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/Adnecto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db=mongoose.connection;
db.once('connected',()=>{
    console.log('Connected to Mongoose');
})

const CountrySchema= new mongoose.Schema({
    country:String,
    capital:String,
});

const CountryModel=mongoose.model('countries', CountrySchema);

app.post('/createcountry', (req, res) => {
  const { country, capital } = req.body;

  CountryModel.create({ country, capital })
    .then((createdCountry) => {
      console.log('Created data:', createdCountry);
      res.json(createdCountry);
    })
    .catch((error) => res.status(500).json({ message: 'Internal Server Error', error: error.message }));
});

app.put('/updatecountry/:id', (req, res) => {
  const { id } = req.params;
  const { country, capital } = req.body;

  // Use findOneAndUpdate to update the document
  CountryModel.findOneAndUpdate({ _id: id }, { country, capital }, { new: true })
    .then((updatedCountry) => {
      if (!updatedCountry) {
        return res.status(404).json({ message: 'No country found for the given ID' });
      }

      console.log('Updated data:', updatedCountry);
      res.json(updatedCountry);
    })
    .catch((error) => res.status(500).json({ message: 'Internal Server Error', error: error.message }));
});

app.get('/getcountry', (req, res) =>
{
 CountryModel.find()
.then((country) =>{
  if (!country) {
    // Handle case where no document is found
    return res.status(404).json({ message: 'No country found' });
  }
  console.log('Retrieved data:', country);
      res.json(country);
    })
  
.catch((error)=>res.json(error))
  });


  app.get('/updatecountry/:id', (req, res) => {
    const { id } = req.params;
  
    CountryModel.findById(id)
      .then((country) => {
        if (!country) {
          return res.status(404).json({ message: 'No country found for the given ID' });
        }
        console.log('Retrieved data:', country);
        res.json(country);
      })
      .catch((error) => res.status(500).json({ message: 'Internal Server Error', error: error.message }));
  });

  app.delete('/deletecountry/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);  
    CountryModel.findByIdAndDelete(id)
      .then((deletedCountry) => {
        if (!deletedCountry) {
          return res.status(404).json({ message: 'No country found for the given ID' });
        }
  
        console.log('Deleted data:', deletedCountry);
        res.json(deletedCountry);
      })
      .catch((error) => res.status(500).json({ message: 'Internal Server Error', error: error.message }));
  });
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))