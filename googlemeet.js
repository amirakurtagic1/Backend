class GoogleMeet {

   constructor() { }

   static dajZadnjePredavanje(stranica) {
      var parser = new DOMParser();
      var htmlformat = parser.parseFromString(stranica, "text/html");
      var linkovi = htmlformat.getElementsByTagName("a");

      //ispitivanje da li je neki od onih koji slijede weeks class
    //  var select = htmlformat.querySelector('.course-content');
    //  var weeks = select.querySelectorAll('.weeks');

      var postojiidsection = false, postojiclassweeks = false, postojiclasscontent = false;
      var links = [], id = [];
      for (var i = 0; i < linkovi.length; i++) {
         var els = [];
         var a = linkovi[i];
         while (a) {
            els.unshift(a);
            a = a.parentNode;
         }
       //   document.getElementById('ispisi3').innerHTML = linkovi[1].toString();
         var provjera1, provjera2, provjera3;
         for (var j = 1; j < els.length; j++) {
            if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {
               postojiidsection = true;
               for (var k = 1; k < j; k++) {
                  if (els[k].className.toString().valueOf() == "weeks" && postojiidsection == true) {
                     postojiclassweeks = true;
                     for (var m = 1; m < k; m++) {
                        if (els[m].className.toString().valueOf() == "course-content" && postojiclassweeks == true) {
                           postojiclasscontent = true;
                           links.push(linkovi[i]);
                        }
                     }
                  }
               }
            }
            postojiidsection = false;
         postojiclassweeks = false;
         postojiclasscontent = false;
         }
      }

      //ukoliko su parent tagovi ispravni, u niz ubacuje link
      var niz = [];
      if (links.length == 0) return null;
      for (var i = 0; i < links.length; i++) {
         if (links[i].toString().includes("meet.google.com") &&
             links[i].textContent.includes("predavanj"))
            niz.push(links[i]);
      }
     // document.getElementById('ispisi3').innerHTML = niz[0];
      if (niz.length == 0) return null;
      //u niz brojevi svrstava broj sectiona
      var brojevi = [];
      for (var i = 0; i < niz.length; i++) {
         var els = [];
         var a = niz[i];
         while (a) {
            els.unshift(a);
            a = a.parentNode;
         }
         for (var j = 1; j < els.length; j++) {
            if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {
               var broj = els[j].getAttribute('id').toString().split("");
               brojevi.push(broj[broj.length - 1]);
            }
         }
      }

      //pronalazi najveci section
      var max = brojevi[0];
      var pozicija = 0;
      var i = 0;
      for (i = 0; i < brojevi.length; i++) {
         if (brojevi[i] > max) {
            max = brojevi[i];
            pozicija = i;
         }
      }
      //ispisuje najveci section
      // document.getElementById('ispisi6').innerHTML = niz[pozicija] + " " + max;

      return niz[pozicija].toString();
   }

   static dajZadnjuVjezbu(stranica) {
      var parser = new DOMParser();
      var htmlformat = parser.parseFromString(stranica, "text/html");
      var linkovi = htmlformat.getElementsByTagName("a");

      //ispitivanje da li je neki od onih koji slijede weeks class
    //  var select = htmlformat.querySelector('.course-content');
    //  var weeks = select.querySelectorAll('.weeks');

      var postojiidsection = false, postojiclassweeks = false, postojiclasscontent = false;
      var links = [], id = [];
      for (var i = 0; i < linkovi.length; i++) {
         var els = [];
         var a = linkovi[i];
         while (a) {
            els.unshift(a);
            a = a.parentNode;
         }
         // document.getElementById('ispisi3').innerHTML = els[0].toString();
         var provjera1, provjera2, provjera3;
         for (var j = 1; j < els.length; j++) {
            if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {
               postojiidsection = true;
               for (var k = 1; k < j; k++) {
                  if (els[k].className.toString().valueOf() == "weeks" && postojiidsection == true) {
                     postojiclassweeks = true;
                     for (var m = 1; m < k; m++) {
                        if (els[m].className.toString().valueOf() == "course-content" && postojiclassweeks == true) {
                           postojiclasscontent = true;
                           links.push(linkovi[i]);
                        }
                     }
                  }
               }
            }
         }
         postojiidsection = false;
         postojiclassweeks = false;
         postojiclasscontent = false;
      }

      //ukoliko su parent tagovi ispravni, u niz ubacuje link
      var niz = [];
      if (links.length == 0) return null;
      for (var i = 0; i < links.length; i++) {
         if (links[i].toString().includes("meet.google.com") &&
            (links[i].textContent.includes("vjez") || 
            links[i].textContent.includes("vjež")))
            niz.push(links[i]);
      }

      if (niz.length == 0) return null;
      //u niz brojevi svrstava broj sectiona
      var brojevi = [];
      for (var i = 0; i < niz.length; i++) {
         var els = [];
         var a = niz[i];
         while (a) {
            els.unshift(a);
            a = a.parentNode;
         }
         for (var j = 1; j < els.length; j++) {
            if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {
               var broj = els[j].getAttribute('id').toString().split("");
               brojevi.push(broj[broj.length - 1]);
            }
         }
      }

      //pronalazi najveci section
      var max = brojevi[0];
      var pozicija = 0;
      var i = 0;
      for (i = 0; i < brojevi.length; i++) {
         if (brojevi[i] > max) {
            max = brojevi[i];
            pozicija = i;
         }
      }
      //ispisuje najveci section
      // document.getElementById('ispisi6').innerHTML = niz[pozicija] + " " + max;

      return niz[pozicija].toString();

   }
}