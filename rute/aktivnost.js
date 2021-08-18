const express = require('express');
const router = express.Router();
const db = require('../config/database');
const aktivnost = require('../modeli/aktivnost');

router.get('/', (req, res) =>
   db.aktivnost.findAll()
      .then(function (aktivnosti) {
         // console.log(aktivnosti)
         res.status(200).send({
            aktivnosti: aktivnosti
         })
      })
);


router.put('/', async (req, res) => {
    const id = req.body.id;
    const detaljiAktivnosti = await db.aktivnost.update({
       naziv: req.body.naziv,
       pocetak: req.body.pocetak,
       kraj: req.body.kraj
    },
       { where: { id: req.body.id } })
 
    if (!detaljiAktivnosti) {
       return res.status(200).send({
          status: 404,
          message: "Aktivnost nije pronadjena!"
       });
    }
 
    res.status(200).send({
       aktivnost: aktivnost,
       message: "Aktivnost promijenjena"
    });
 
 });
 

 router.delete('/', async (req, res) => {
    const id = req.body.id;
    const aktivnost = await db.aktivnost.destroy({
       where: { id: id }
    });
 
    if (!aktivnost) {
       return res.status(200).send({
          status: 404,
          message: "Aktivnost nije pronadjena!"
       });
    }
 
    res.status(200).send({
       status: 200,
       message: "Aktivnost uspjesno obrisana"
    });
 })
 
 router.post("/", async (req, res) => {
 
    const novaAktivnost = await db.aktivnost.build({
       naziv: req.body.naziv,
       pocetak: req.body.pocetak,
       kraj: req.body.kraj
    });
    await novaAktivnost.save()
    if (!novaAktivnost) {
       return res.status(200).send({
          status: 404,
          message: 'Nije se kreirala nova aktivnost'
       });
    }
    res.status(200).send({
       status: 200,
       message: 'Nova aktivnost je kreirana'
    });
 });
 

module.exports = router;