const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require("fs");
const { stringify } = require('querystring');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

/* post request za ubacivanje novog rasporeda */
app.post('/raspored', (req, res) => {
   //   res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
   /**
    * u req (skraceno od request) nalaze se sve vrijednosti koje saljem sa forme (iz unosRasporeda.html), a u html u form imam
    * u action="http://localhost:8080/raspored", sto dolazi do ove ovdje metode
    */
   console.log(req.body.nazivPredmeta);
   console.log(req.body.aktivnost);
   console.log(req.body.dan);
   console.log(req.body.vrijemeOd);
   console.log(req.body.vrijemeDo);
   var jsonArr = [];

   /**
    * fs.readFile koristimo za citanje csv fajla sa diska
    * i njegovo parsiranje u json objekat
    */
   fs.readFile('raspored.csv', function (err, data) {
      if (err) return console.error(err);
      console.log("Ovdje sam");

      //ovdje splitam csv po novim redovima tako da dobijem jedan red tog csv-a i spremim te redove u jedan niz
      var niz = data.toString().split('\n');

      //prodjem kroz niz redova iz csv-a i splitam ih po zarezu tako da dobijem pojedinacne vrijednosti elemenata jednog reda
      niz.forEach(el => {
         let rowEl = el.split(', ');
         //kreiram novi json objekat koji mi predstavlja jedan red iz csv-a po njegovim pojedinacnim vrijednostima
         let singleObj = {
            "nazivPredmeta": rowEl[0],
            "aktivnost": rowEl[1],
            "dan": rowEl[2],
            "vrijemeOd": rowEl[3],
            "vrijemeDo": rowEl[4],
         }

         //u ovaj niz cu spremat sve te pojedinacne redove u vidu json objekata tako da na kraju dobijem niz json objekata
         jsonArr.push(singleObj);
      });
      console.log(jsonArr)
   });
});

/**
 * ova funkcija sortira json niz po vrijednosti
 */
function sortirajPoVrijednosti (prop) {
   return function (a, b) {
      if (a[prop] > b[prop]) return 1;
      else if (a[prop] < b[prop]) return -1;

      return 0;
   }
}

/**
 * servis koji vraca raspored
 * u req.query nalaze se sve vrijednosti koje saljem kroz query string, npr: http://localhost:8080?querystring1=test&querystring2=amira
 * ovo querystring1 i querystring2 se nalazi u ovom req.query
 */
app.get('/raspored', (req, res) => {
   var jsonArr = [];

   var query = req.query;
   //čitanje csv fajla sa diska
   fs.readFile('raspored.csv', function (err, data) {
      if (err) return { "greska": "Datoteka raspored.csv nije kreirana!" };

      if (req.headers.accept == "text/csv") {
         res.setHeader("Access-Control-Allow-Origin", "*");
         res.setHeader("Access-Control-Allow-Credentials", "true");
         res.setHeader("Access-Control-Max-Age", "1800");
         res.setHeader("Access-Control-Allow-Headers", "content-type");
         res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
         res.write(data);
         res.end();
      }

      /**ista prica kao i u POST, čitanje i parsanje u json */
      var niz = data.toString().split('\n');
      niz.forEach(el => {
         let rowEl = el.split(', ');
         let singleObj = {
            "naziv": rowEl[0],
            "aktivnost": rowEl[1],
            "dan": rowEl[2],
            "vrijemeOd": rowEl[3],
            "vrijemeDo": rowEl[4],
         }

         /**
          * ovdje sad ispitujem da li u query stringu sadrzim parametar dan kako bih mogao filtrirati raspored po danu,
          * ako mi query string sadrži parametar "dan", onda trebam vratit raspored samo za taj dan
          * to uradim tako sto switch prodje kroz ovaj parametar "dan", a to je da ne bih pisao 100 if-else uslova
          * na kraju u jsonArr pusham samo elemente za taj dan 
          */
         if (JSON.stringify(query) !== JSON.stringify({}) && query["dan"] !== undefined && query["dan"] !== null) {
            var dan = query["dan"];
            switch (dan) {
               case "ponedjeljak":
                  if (singleObj.dan == dan) jsonArr.push(singleObj)
                  break;
               case "utorak":
                  if (singleObj.dan == dan) jsonArr.push(singleObj)
                  break;
               case "srijeda":
                  if (singleObj.dan == dan) jsonArr.push(singleObj)
                  break;
               case "cetvrtak":
                  if (singleObj.dan == dan) jsonArr.push(singleObj)
                  break;
               case "petak":
                  if (singleObj.dan == dan) jsonArr.push(singleObj)
                  break;
               default:
                  break;
            }
         }
         else
         //ako nema parametra dan u query stringu, onda mi svejedno trebaju svi dani za raspored
            jsonArr.push(singleObj);
      });

      //ovo mi je niz rasporeda koji cu vratit ako postoji "sort" parametar u query stringu
      var sortiraniNiz = [];
      if (query["sort"] !== undefined && query["sort"] !== null) {
         //trazeno je da se radi Asc ili Desc, ovisno o prvom slovu "sort" parametra
         var ascDesc = query["sort"].substring(0, 1);
         //atribut za sortiranje mi je sve poslije prvog slova
         var atribut = query["sort"].substring(1, query["sort"].length);

         /**
          * prodjem sa switch kroz atribut za sortiranje i u odnosu na to sta je taj atribut, sortiram raspored
          * rezultat pusham u sortiraniNiz koji cu na kraju vratiti
          */
         switch (atribut) {
            case "naziv":
               sortiraniNiz = jsonArr.sort(sortirajPoVrijednosti("naziv"));
               if (ascDesc == "D") sortiraniNiz = sortiraniNiz.reverse();
               break;
            case "aktivnost":
               sortiraniNiz = jsonArr.sort(sortirajPoVrijednosti("aktivnost"));
               if (ascDesc == "D") sortiraniNiz = sortiraniNiz.reverse();
               break;
            case "dan":
               sortiraniNiz = jsonArr.sort(sortirajPoVrijednosti("dan"));
               if (ascDesc == "D") sortiraniNiz = sortiraniNiz.reverse();
               console.log(sortiraniNiz)
               break;
            case "pocetak":
               sortiraniNiz = jsonArr.sort(sortirajPoVrijednosti("pocetak"));
               if (ascDesc == "D") sortiraniNiz = sortiraniNiz.reverse();
               break;
            case "kraj":
               sortiraniNiz = jsonArr.sort(sortirajPoVrijednosti("kraj"));
               if (ascDesc == "D") sortiraniNiz = sortiraniNiz.reverse();
               break;
            default:
               //ukoliko nemam sortiranja, sortiraniNiz mi je onaj originalni niz (jsonArr)
               sortiraniNiz = jsonArr;
               break;
         }
      }

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Max-Age", "1800");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
      res.write(JSON.stringify({ sortiraniNiz }));
      res.end();
   });
})

const port = 8080;

app.use(express.static('public'));

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});