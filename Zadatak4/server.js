const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var path = require('path');
const app = express();
const port= 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var jsonArr = [];
//naredna 4 reda dodana naknadno, zbog njih pravi error - popraviti
app.post('/',function(req,res){
    let tijelo = req.body;
    let reqNazivPredmeta = tijelo['nazivPredmeta'];
    let reqAktivnost = tijelo['aktivnost'];
    let reqDan = tijelo['dan'];
    let reqVrijemeOd = tijelo['vrijemeOd'];
    let reqVrijemeDo = tijelo['vrijemeDo'];
    proba = req.body;
    console.log(reqAktivnost + " " + reqNazivPredmeta);

fs.readFile('raspored.csv', function (err, data) {
    if (err) return console.error(err);
    //ovdje splitam csv po novim redovima tako da dobijem jedan red tog csv-a i spremim te redove u jedan niz
    var niz = data.toString().split('\n');

    //prodjem kroz niz redova iz csv-a i splitam ih po zarezu tako da dobijem pojedinacne vrijednosti elemenata jednog reda
    niz.forEach(el => {
       let rowEl = el.split(',');
       //kreiram novi json objekat koji mi predstavlja jedan red iz csv-a po njegovim pojedinacnim vrijednostima
       let singleObj = {
          "nazivPredmeta": rowEl[0],
          "aktivnost": rowEl[1],
          "dan": rowEl[2],
          "vrijemeOd": rowEl[3],
          "vrijemeDo": rowEl[4],
       }

       jsonArr.push(singleObj);
    });

//kreiranje tabela sa podacima ucitanim iz csv-a
    let predmeti = '<table border="1" style=" margin: auto;"><tr> <th>Naziv  predmeta</th>';
    let result = '<table border="1" style=" margin: auto;"><tr> <th>Naziv</th> <th> Aktivnost</th> <th>Dan</th> <th>Pocetak</th> <th>Kraj</th>';
    var nizPredmeta = [];
    jsonArr.forEach(el => {
    var pr = [];
    var postoji = false;
    pr = el.nazivPredmeta.toString().split('-');
        for(var i = 0; i < nizPredmeta.length; i++){
                if(nizPredmeta[i] == pr[0]) postoji = true;
        }
        if(postoji == false) nizPredmeta.push(pr[0]);
        else postoji == false;
   });
   var postoji = false;
   for(var i = 0; i < nizPredmeta.length; i++){
       if(nizPredmeta[i] == reqNazivPredmeta) postoji = true;
   }
   var uspjesnoDodanPredmet = false;
   if(postoji == false && reqNazivPredmeta != null && reqNazivPredmeta != undefined) {
       nizPredmeta.push(reqNazivPredmeta);
       uspjesnoDodanPredmet = true;
   }
var jes = false;
   if(uspjesnoDodanPredmet == true && reqAktivnost != null && reqAktivnost  != undefined &&
    reqDan != null && reqDan  != undefined && reqVrijemeOd != null && reqVrijemeOd  != undefined &&
    reqVrijemeDo != null && reqVrijemeDo != undefined){
        jes = true;

          let singleObj = {
            "nazivPredmeta": reqNazivPredmeta,
            "aktivnost": reqAktivnost,
            "dan": reqDan,
            "vrijemeOd": reqVrijemeOd,
            "vrijemeDo": reqVrijemeDo,
         }
         jsonArr.push(singleObj);
   }
   else if(uspjesnoDodanPredmet == true){
    const index = array.indexOf(reqNazivPredmeta);
    if (index > -1) {
      array.splice(index, 1);
    }
   }

    nizPredmeta.forEach(el => {
    predmeti += "<tr>";
    predmeti += "<td> " + el + " </td>";
    predmeti += "</tr>";
   });
   predmeti += '</table>';
    for(var i =0; i < jsonArr.length; i++){
        var pr = [];
        pr = jsonArr[i].nazivPredmeta.toString().split('-');
        result += "<tr>";
        result += "<td> " + jsonArr[i].nazivPredmeta + " </td>" + "<td> " + jsonArr[i].aktivnost + " </td>"
        + "<td> " + jsonArr[i].dan + " </td>" + "<td> " + jsonArr[i].vrijemeOd + " </td>" + "<td> " + jsonArr[i].vrijemeDo + " </td>";
         result += "</tr>";
    }
    result += '</table>';

    //unos u tabelu gdje se nalaze samo nazivi predmeta
    fs.writeFile('C:/Users/Amira/Desktop/Zadatak4/public/tabela.html', result, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

    //unos u tabelu gdje se nalazi cijeli raspored
      fs.writeFile('C:/Users/Amira/Desktop/Zadatak4/public/predmeti.html', predmeti, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

      if(jes == true){
        fs.writeFile('C:/Users/Amira/Desktop/Zadatak4/public/poruka.html', "Uspjesno dodano", (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
      }
     
 });
});
app.get('/unosRasporeda', (req, res) => {
    res.sendFile(path.join('C:/Users/Amira/Desktop/Zadatak4/public/unosRasporeda.html'));
});
/*app.post('/',function(req,res){
   console.log(req.body);
});*/
app.listen(port, () => {
    console.log(port);
});