const express = require('express');
const router = express.Router();
const db = require('../config/database');
const tip = require('../modeli/tip');


router.get('/', (req, res) =>
   db.tip.findAll()
      .then(function (tipovi) {
         // console.log(aktivnosti)
         res.status(200).send({
            tipovi: tipovi
         })
      })
);


router.put('/', async (req, res) => {
    const id = req.body.id;
    const detaljiTipa = await db.tip.update({
       naziv: req.body.naziv
    },
       { where: { id: req.body.id } })
 
    if (!detaljiTipa) {
       return res.status(200).send({
          status: 404,
          message: "Tip nije pronadjen!"
       });
    }
 
    res.status(200).send({
       tip: tip,
       message: "Tip promijenjen"
    });
 
 });
 

 router.delete('/', async (req, res) => {
    const id = req.body.id;
    const tip = await db.tip.destroy({
       where: { id: id }
    });
 
    if (!tip) {
       return res.status(200).send({
          status: 404,
          message: "Tip nije pronadjen!"
       });
    }
 
    res.status(200).send({
       status: 200,
       message: "Tip uspjesno obrisan"
    });
 })
 
 router.post("/", async (req, res) => {
 
    const noviTip = await db.tip.build({
       naziv: req.body.naziv
    });
    await noviTip.save()
    if (!noviTip) {
       return res.status(200).send({
          status: 404,
          message: 'Nije se kreirao novi tip'
       });
    }
    res.status(200).send({
       status: 200,
       message: 'Novi tip je kreiran'
    });
 });
 

module.exports = router;