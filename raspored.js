class Raspored {
   static raspored = [{
      naziv: "BWT",
      aktivnost: "predavanje",
      dan: "ponedjeljak",
      start: "15:00",
      end: "18:00"
   },
   {
      naziv: "BWT-grupa2",
      aktivnost: "vjezbe",
      dan: "ponedjeljak",
      start: "13:30",
      end: "15:00"
   },
   {
      naziv: "MUR1",
      aktivnost: "predavanje",
      dan: "utorak",
      start: "09:00",
      end: "11:00"
   },
   {
      naziv: "MUR1-grupa1",
      aktivnost: "vjezbe",
      dan: "srijeda",
      start: "11:00",
      end: "12:30"
   },
   {
      naziv: "MUR1-grupa2",
      aktivnost: "vjezbe",
      dan: "srijeda",
      start: "12:30",
      end: "14:00"
   },
   {
      naziv: "RMA",
      aktivnost: "predavanje",
      dan: "ponedjeljak",
      start: "09:00",
      end: "12:00"
   },
   {
      naziv: "BWT-grupa1",
      aktivnost: "vjezbe",
      dan: "ponedjeljak",
      start: "12:00",
      end: "13:30"
   },
   {
      naziv: "FWT-grupa2",
      aktivnost: "vjezbe",
      dan: "srijeda",
      start: "11:00",
      end: "12:30"
   },
   {
      naziv: "FWT-grupa1",
      aktivnost: "vjezbe",
      dan: "srijeda",
      start: "12:30",
      end: "14:00"
   },
   {
      naziv: "ASP",
      aktivnost: "predavanje",
      dan: "srijeda",
      start: "09:00",
      end: "12:00"
   },
   {
      naziv: "MUR2",
      aktivnost: "predavanje",
      dan: "cetvrtak",
      start: "12:00",
      end: "15:00"
   },
   {
      naziv: "FWT",
      aktivnost: "predavanje",
      dan: "cetvrtak",
      start: "09:00",
      end: "10:30"
   }];
   constructor(csv) {
      // let redovi = csv.toString().split("\n");
      // redovi.forEach(red => {
      //    var linija = red[i].split(",");
      //    var jsonObjekat = {
      //       naziv: linija[0],
      //       aktivnost: linija[2],
      //       dan: linija[3],
      //       start: linija[4],
      //       end: linija[5]
      //    }
      //    this.raspored.push(jsonObjekat);
      // });

      // console.log(this.raspored)
   }
   /** 
    * moment().day() vraća dane kao int u sljedećem redoslijedu:
    * Pon: 1
    * Uto: 2
    * Sri: 3
    * Cet: 4
    * Pet: 5
    * Sub: 6
    * Ned: 0
   */
   static dajTrenutnuAktivnost(vrijeme, nazivGrupe) {
      const proslijedjenoVrijeme = moment(vrijeme, "DD-MM-YYYYTHH:mm:ss");
      // const trenutnoVrijeme = moment();
      // var ms = moment(trenutnoVrijeme, 'DD-MM-YYYYTHH:mm:ss').diff(moment(proslijedjenoVrijeme, "DD-MM-YYYYTHH:mm:ss"));
      // var min = Math.floor(moment.duration(ms).asMinutes());
      // var trenutniDan = trenutnoVrijeme.day();
      // var trenutniSat = trenutnoVrijeme.hour();
      // var trenutneMinute = trenutnoVrijeme.minutes();
      var proslijedjeniDan = proslijedjenoVrijeme.day()
      var proslijedjeniSat = proslijedjenoVrijeme.hour()
      var proslijedjeneMinute = proslijedjenoVrijeme.minutes()

      var predavanjaIVjezbePonedjeljak = [];
      var predavanjaIVjezbeUtorak = [];
      var predavanjaIVjezbeSrijeda = [];
      var predavanjaIVjezbeCetvrtak = [];
      var predavanjaIVjezbePetak = [];

      this.raspored.forEach(element => {
         switch (element.dan) {
            case "ponedjeljak":
               predavanjaIVjezbePonedjeljak.push(element)
               break;
            case "utorak":
               predavanjaIVjezbeUtorak.push(element)
               break;
            case "srijeda":
               predavanjaIVjezbeSrijeda.push(element)
               break;
            case "cetvrtak":
               predavanjaIVjezbeCetvrtak.push(element)
               break;
            case "petak":
               predavanjaIVjezbePetak.push(element)
               break;
         }
      });

      var vratiVjezbe = [];
      var vratiPredavanja = [];

      switch (proslijedjeniDan) {
         case 1:
            predavanjaIVjezbePonedjeljak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  vratiVjezbe.push(element)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 2:
            predavanjaIVjezbeUtorak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  vratiVjezbe.push(element)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 3:
            predavanjaIVjezbeSrijeda.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  vratiVjezbe.push(element)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 4:
            predavanjaIVjezbeCetvrtak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  vratiVjezbe.push(element)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 5:
            predavanjaIVjezbePetak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  vratiVjezbe.push(element)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 6:
            predavanjaIVjezbeUtorak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               if (grupa == nazivGrupe &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiVjezbe.push(returnJson)
               } else if (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
         case 0:
            predavanjaIVjezbePonedjeljak.forEach(element => {
               var satiIMinuteStart = element.start.split(":");
               var satiIMinuteEnd = element.end.split(":");
               var predmet = element.naziv.split("-")[0]
               var grupa = element.naziv.split("-")[1];
               
               if (grupa == nazivGrupe && element.aktivnost == "vjezbe" &&
                  (proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1])
               ) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiVjezbe.push(returnJson)
               } else if (element.aktivnost == "predavanje" && proslijedjeniSat >= satiIMinuteStart[0] && proslijedjeneMinute >= satiIMinuteStart[1] && proslijedjeniSat <= satiIMinuteEnd[0] && proslijedjeneMinute <= satiIMinuteEnd[1]) {
                  var returnJson = {
                     predmet: predmet
                  }
                  vratiPredavanja.push(returnJson)
               }
            });
            break;
      }
      var retJs = {
         "predavanja": vratiPredavanja,
         "vjezbe": vratiVjezbe
      }
      alert (JSON.stringify(retJs))
      if(retJs.predavanja.length == 0 && retJs.vjezbe.length == 0) return "Trenutno nema aktivnosti";
      else if(retJs.predavanja.length != 0 && retJs.vjezbe.length == 0){
         var string = "";
         for(var i = 0; i < retJs.predavanja.length; i++){
            if(i == retJs.predavanja.length - 1) string += vratiPredavanja[i].predmet;
             else  string += vratiPredavanja[i].predmet + ", ";
         }
         document.getElementById("ispisi2").innerHTML = string;
         return string;
      }
      else if(retJs.predavanja.length == 0 && retJs.vjezbe.length != 0){
         var string = "";
         for(var i = 0; i < retJs.vjezbe.length; i++){
            if(i == retJs.vjezbe.length - 1) string += vratiVjezbe[i].predmet;
             else  string += vratiVjezbe[i].predmet + ", ";
         }
         return string;
      }
      else return retJs;
   }

   static dajSljedecuAktivnost(vrijeme, nazivGrupa) {

   }

   static dajPrethodnuAktivnost(nazivGrupa) {

   }

}
