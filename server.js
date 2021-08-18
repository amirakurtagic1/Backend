const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require("fs");
const { stringify } = require('querystring');
const { json } = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/raspored', (req, res) => {
   //   res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
   console.log(req.body.nazivPredmeta);
   console.log(req.body.aktivnost);
   console.log(req.body.dan);
   console.log(req.body.vrijemeOd);
   console.log(req.body.vrijemeDo);
   var jsonArr = [];

   fs.readFile('raspored.csv', function (err, data) {
      if (err) return console.error(err);
      var niz = data.toString().split('\n');

      niz.forEach(el => {
         let rowEl = el.split(', ');
         let singleObj = {
            "nazivPredmeta": rowEl[0],
            "aktivnost": rowEl[1],
            "dan": rowEl[2],
            "vrijemeOd": rowEl[3],
            "vrijemeDo": rowEl[4],
         }
         jsonArr.push(singleObj);
      });
      console.log(jsonArr)
   });
});

function sortirajPoVrijednosti (prop) {
   return function (a, b) {
      if (a[prop] > b[prop]) return 1;
      else if (a[prop] < b[prop]) return -1;

      return 0;
   }
}

app.get('/raspored', (req, res) => {
   var jsonArr = [];

   var query = req.query;
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
            jsonArr.push(singleObj);
      });
      var sortiraniNiz = [];
      if (query["sort"] !== undefined && query["sort"] !== null) {
         var ascDesc = query["sort"].substring(0, 1);
         var atribut = query["sort"].substring(1, query["sort"].length);

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

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});