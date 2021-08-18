const express = require('express');
const router = express.Router();
const db = require('../config/database');
const dan = require('../modeli/dan');

router.get('/', (req, res) =>
   db.dan.findAll()
      .then(function (dani) {
         // console.log(aktivnosti)
         res.status(200).send({
            dani: dani
         })
      })
);


router.put('/', async (req, res) => {
    const id = req.body.id;
    const detaljiDana = await db.dan.update({
       naziv: req.body.naziv
    },
       { where: { id: req.body.id } })
 
    if (!detaljiDana) {
       return res.status(200).send({
          status: 404,
          message: "Dan nije pronadjen!"
       });
    }
 
    res.status(200).send({
       dan: dan,
       message: "Dan promijenjen"
    });
 
 });
 

 router.delete('/', async (req, res) => {
    const id = req.body.id;
    const dan = await db.dan.destroy({
       where: { id: id }
    });
 
    if (!dan) {
       return res.status(200).send({
          status: 404,
          message: "Dan nije pronadjen!"
       });
    }
 
    res.status(200).send({
       status: 200,
       message: "Dan uspjesno obrisan"
    });
 })
 
 router.post("/", async (req, res) => {
 
    const noviDan = await db.dan.build({
       naziv: req.body.naziv
    });
    await noviDan.save()
    if (!noviDan) {
       return res.status(200).send({
          status: 404,
          message: 'Nije se kreirao novi dan'
       });
    }
    res.status(200).send({
       status: 200,
       message: 'Novi dan je kreiran'
    });
 });
 


module.exports = router;