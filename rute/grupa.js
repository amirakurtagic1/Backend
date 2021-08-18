const express = require('express');
const router = express.Router();
const db = require('../config/database');
const grupa = require('../modeli/grupa');


router.get('/', (req, res) =>
   db.grupa.findAll()
      .then(function (grupe) {
         // console.log(aktivnosti)
         res.status(200).send({
            grupe: grupe
         })
      })
);


router.put('/', async (req, res) => {
    const id = req.body.id;
    const detaljiGrupe = await db.grupa.update({
       naziv: req.body.naziv
    },
       { where: { id: req.body.id } })
 
    if (!detaljiGrupe) {
       return res.status(200).send({
          status: 404,
          message: "Grupa nije pronadjena!"
       });
    }
 
    res.status(200).send({
       grupa: grupa,
       message: "Grupa promijenjena"
    });
 
 });
 

 router.delete('/', async (req, res) => {
    const id = req.body.id;
    const grupa = await db.grupa.destroy({
       where: { id: id }
    });
 
    if (!grupa) {
       return res.status(200).send({
          status: 404,
          message: "Grupa nije pronadjena!"
       });
    }
 
    res.status(200).send({
       status: 200,
       message: "Grupa uspjesno obrisana"
    });
 })
 
 router.post("/", async (req, res) => {
 
    const novaGrupa = await db.grupa.build({
       naziv: req.body.naziv
    });
    await novaGrupa.save()
    if (!novaGrupa) {
       return res.status(200).send({
          status: 404,
          message: 'Nije se kreirala nova grupa'
       });
    }
    res.status(200).send({
       status: 200,
       message: 'Nova grupa je kreirana'
    });
 });
 

module.exports = router;