ascDescNaziv = false;
ascDescDan = false;

function prikaziPodatke(data, error) {
   console.log(error)
   if (!error) console.log(JSON.stringify(data));
}

function loadData() {
   ucitajSortirano(null, null, prikaziPodatke);
}

function sortNaziv() {
   if (ascDescNaziv == true) {
      document.getElementById("iconNaziv").innerHTML = "<i class=\"fa fa-arrow-down\"></i>";
      ucitajSortirano(null, "Anaziv", prikaziPodatke)
      ascDescNaziv = false;
   }
   else if (ascDescNaziv == false) {
      document.getElementById("iconNaziv").innerHTML = "<i class=\"fa fa-arrow-up\"></i>";
      ucitajSortirano(null, "Dnaziv", prikaziPodatke)
      ascDescNaziv = true;
   }
}

function sortDan() {
   if (ascDescDan == true) {
      document.getElementById("iconDan").innerHTML = "<i class=\"fa fa-arrow-down\"></i>";
      ucitajSortirano(null, "Adan", prikaziPodatke)
      ascDescDan = false;
   }
   else if (ascDescDan == false) {
      document.getElementById("iconDan").innerHTML = "<i class=\"fa fa-arrow-up\"></i>";
      ucitajSortirano(null, "Ddan", prikaziPodatke)
      ascDescDan = true;
   }
}

