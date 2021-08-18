class GoogleMeetGreska2 {

    constructor() { }
 
    static dajZadnjePredavanje(stranica) {
       var parser = new DOMParser();
       var htmlformat = parser.parseFromString(stranica, "text/html");
       var linkovi = htmlformat.getElementsByTagName("a");
 
       var postojiidsection = false, postojiclassweeks = false, postojiclasscontent = false;
       var links = [], id = [];
       for (var i = 0; i < linkovi.length; i++) {
          var els = [];
          var a = linkovi[i];
          while (a) {
             els.unshift(a);
             a = a.parentNode;
          }

          var provjera1, provjera2, provjera3;
          for (var j = 1; j < els.length-1; j++) {
             if (els[j].hasAttribute('id')) {
                postojiidsection = true;
                    links.push(linkovi[i]);
             }
          }
       }
 
       //ukoliko su parent tagovi ispravni, u niz ubacuje link
       var niz = [];
       if (links.length == 0) return null;
       for (var i = 0; i < links.length-1; i++) {
          if (links[i].toString().includes("meet.google.com") &&
              links[i].textContent.includes("predavanj"))
             niz.push(links[i]);
       }
      // document.getElementById('ispisi3').innerHTML = niz[0];
       if (niz.length == 0) return null;
       //u niz brojevi svrstava broj sectiona
       var brojevi = [];
       for (var i = 0; i < niz.length-1; i++) {
          var els = [];
          var a = niz[i];
          while (a) {
             els.unshift(a);
             a = a.parentNode;
          }
          for (var j = 1; j < els.length-1; j++) {
             if (els[j].hasAttribute('id')) {
                var broj = els[j].getAttribute('id').toString().split("");
                brojevi.push(broj[broj.length - 1]);
             }
          }
       }
 
       //pronalazi najveci section
       var max = brojevi[brojevi.length-1];
       var pozicija = 0;
       var i = 0;
       for (i = 0; i < brojevi.length-1; i++) {
          if (brojevi[i] > max) {
             max = brojevi[i];
             pozicija = i;
          }
       }
 
       return niz[pozicija].toString();
    }
 
    static dajZadnjuVjezbu(stranica) {
       var parser = new DOMParser();
       var htmlformat = parser.parseFromString(stranica, "text/html");
       var linkovi = htmlformat.getElementsByTagName("a");
 
       var links = [], id = [];
       for (var i = 0; i < linkovi.length; i++) {
          var els = [];
          var a = linkovi[i];
          while (a) {
             els.unshift(a);
             a = a.parentNode;
          }

          for (var j = 1; j < els.length-1; j++) {
             if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {      
                            links.push(linkovi[i]);

             }
          }
       }
 
       //ukoliko su parent tagovi ispravni, u niz ubacuje link
       var niz = [];
       if (links.length == 0) return null;
       for (var i = 0; i < links.length-1; i++) {
          if (links[i].toString().includes("meet.google.com") &&
             (links[i].textContent.includes("vjez") || 
             links[i].textContent.includes("vjež")))
             niz.push(links[i]);
       }
 
       if (niz.length == 0) return null;
       //u niz brojevi svrstava broj sectiona
       var brojevi = [];
       for (var i = 0; i < niz.length-1; i++) {
          var els = [];
          var a = niz[i];
          while (a) {
             els.unshift(a);
             a = a.parentNode;
          }
          for (var j = 1; j < els.length-1; j++) {
             if (els[j].hasAttribute('id') && els[j].getAttribute('id').toString().includes("section-")) {
                var broj = els[j].getAttribute('id').toString().split("");
                brojevi.push(broj[broj.length - 1]);
             }
          }
       }
 
       //pronalazi najveci section
       var max = brojevi[brojevi.length-1];
       var pozicija = 0;
       var i = 0;
       for (i = 0; i < brojevi.length-1; i++) {
          if (brojevi[i] > max) {
             max = brojevi[i];
             pozicija = i;
          }
       }
 
       return niz[pozicija].toString();
 
    }
 }