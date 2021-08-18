const express = require('express');
const router = express.Router();
const db = require('../config/database');
const predmet = require('../modeli/predmet');


router.get('/', (req, res) =>
   db.predmet.findAll()
      .then(function (predmeti) {
         // console.log(aktivnosti)
         res.status(200).send({
            predmeti: predmeti
         })
      })
);


router.put('/', async (req, res) => {
    const id = req.body.id;
    const detaljiPredmeta = await db.predmet.update({
       naziv: req.body.naziv
    },
       { where: { id: req.body.id } })
 
    if (!detaljiPredmeta) {
       return res.status(200).send({
          status: 404,
          message: "Predmet nije pronadjen!"
       });
    }
 
    res.status(200).send({
       predmet: predmet,
       message: "Predmet promijenjen"
    });
 
 });
 

 router.delete('/', async (req, res) => {
    const id = req.body.id;
    const predmet = await db.predmet.destroy({
       where: { id: id }
    });
 
    if (!predmet) {
       return res.status(200).send({
          status: 404,
          message: "Predmet nije pronadjen!"
       });
    }
 
    res.status(200).send({
       status: 200,
       message: "Predmet uspjesno obrisan"
    });
 })
 
 router.post("/", async (req, res) => {
 
    const noviPredmet = await db.predmet.build({
       naziv: req.body.naziv
    });
    await noviPredmet.save()
    if (!noviPredmet) {
       return res.status(200).send({
          status: 404,
          message: 'Nije se kreirao novi predmet'
       });
    }
    res.status(200).send({
       status: 200,
       message: 'Novi predmet je kreiran'
    });
 });
 


module.exports = router;