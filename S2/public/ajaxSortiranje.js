function ucitajSortirano(dan, atribut, callback) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         return this.responseText;
      }
   };
   let url = "http://localhost:8080/raspored";
   if (dan !== null && dan !== "" && atribut == null) {
      url += "?dan=" + dan;
   }
   else if (atribut !== null && atribut !== "" && dan == null) {
      url += "?sort=" + atribut;
   }
   else if (dan !== null && dan !== "" && atribut !== null && atribut !== "") {
      url += "?dan=" + dan + "&sort=" + atribut;
   }

   xhttp.open("GET", url, true);
   xhttp.setRequestHeader("Content-type", "application/json");
   xhttp.send();
};

