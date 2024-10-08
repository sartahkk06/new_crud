const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// SCHEMA
const schemaData = mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('user', schemaData);

// READ
// https://localhost:8080/
app.get('/', async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// CREATE DATA || SAVE DATA IN MONGODB
// https://localhost:8080/create
/* 
{
    name,
    
}
*/
app.post('/create', async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: 'Data Saved', data: data });
});

// UPDATE DATA
// https://localhost:8080/update
/*
    id:"",
    name: "", || 
    
*/
app.put('/update', async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: 'Data Updated', data: data });
});

//DELETE DATA
// https://localhost:8080/delete/id
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: 'Data Deleted', data: data });
});

mongoose
  .connect('mongodb://127.0.0.1:27017/CRUD')
  .then(() => {
    console.log('Database Connected Successfully');
    app.listen(PORT, () => console.log('Server is Running'));
  })
  .catch((err) => console.log('err'));
