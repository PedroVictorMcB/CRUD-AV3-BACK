const express = require('express');
const morgan = require('morgan');
const supabaseClient = require('@supabase/supabase-js');

const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");


app.use(cors());

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const key = "https://cpdelfetsombvllrfcln.supabase.co";
const url = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwZGVsZmV0c29tYnZsbHJmY2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMTA0MDAsImV4cCI6MjAxNDg4NjQwMH0.SZjRrKsRA0FSZsnuPVgHdMnzoGe_lbL5gIHH5yv5wRo";

const supabase = supabaseClient.createClient(url, key);

app.get('/products', async (req, res) => {
  const {data, error} = await supabase
      .from('products')
      .select()
  res.send(data);
  console.log(`lists all products${data}`);
});

app.get('/products/:id', async (req, res) => {
  console.log("id = " + req.params.id);
  const {data, error} = await supabase
      .from('products')
      .select()
      .eq('id', req.params.id)
  res.send(data);

  console.log("retorno "+ data);
});

app.post('/products', async (req, res) => {
  const {error} = await supabase
      .from('products')
      .insert({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
      })
  if (error) {
      res.send(error);
  }
  res.send("created!!");
  console.log("retorno "+ req.body.name);
  console.log("retorno "+ req.body.description);
  console.log("retorno "+ req.body.price);

});

app.put('products/update/:id', async (req, res) => {
  const {error} = await supabase
      .from('products')
      .update({
          name: req.body.name,
          price: req.body.price,
      })
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("updated!!");
  console.log("retorno "+ req.body.name);
})



app.put('/products/:id', async (req, res) => {
  const { error } = await supabase
    .from('products')
    .update({
      name: req.body.name,
      price: req.body.price
    })
    .eq('id', req.params.id);

  if (error) {
    res.send(error);
  }

  res.send("updated!!");
});

app.delete('/products/:id', async (req, res) => {
  console.log("delete: " + req.params.id);
  const {error} = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id)
  if (error) {
      res.send(error);
  }
  res.send("deleted!!")
  console.log("delete: " + req.params.id);

});

app.get('/', (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.get('*', (req, res) => {
  res.send("Hello again I am working my friend to the moon and behind <3");
});

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});
