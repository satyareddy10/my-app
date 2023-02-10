const express = require('express');

const router = express.Router()

module.exports = router;

const Model = require('../model/student.model');




//Post Method
router.post('/post',  async (req, res) => {
  const data = new Model ({
    name: req.body.name,
    age: req.body.age,
   
})
console.log(req.body);

try{
  const dataToSave = await data.save();
  res.status(200).json(dataToSave)
}
catch(error){
  res.status(400).json({message: error.message})
}
  res.send('Post API')
})

//Get all Method
router.get('/getAll', (req, res) => {
  res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
  res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
  res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
  res.send('Delete by ID API')
})