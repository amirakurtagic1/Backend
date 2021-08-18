const express = require('express');
const router = express.Router();
const db = require('../config/database');
const student = require('../modeli/student');


router.get('/', (req, res) =>
   db.student.findAll()
      .then(function (studenti) {
         // console.log(aktivnosti)
         res.status(200).send({
            studenti: studenti
         })
      })
);


router.put('/', async (req, res) => {
   const id = req.body.id;
   const detaljiStudenta = await db.student.update({
      ime: req.body.ime,
      index: req.body.index
   },
      { where: { id: req.body.id } })

   if (!detaljiStudenta) {
      return res.status(200).send({
         status: 404,
         message: "Student nije pronadjen!"
      });
   }

   res.status(200).send({
      student: student,
      message: "Student promijenjen!"
   });

});


router.delete('/', async (req, res) => {
   const id = req.body.id;
   const student = await db.student.destroy({
      where: { id: id }
   });

   if (!student) {
      return res.status(200).send({
         status: 404,
         message: "Student nije pronadjen!"
      });
   }

   res.status(200).send({
      status: 200,
      message: "Student uspjesno obrisan"
   });
})

router.post("/", async (req, res) => {

   const noviStudent = await db.student.build({
      ime: req.body.ime,
      index: req.body.index
   });
   await noviStudent.save()
   if (!noviStudent) {
      return res.status(200).send({
         status: 404,
         message: 'Nije se kreirao novi student'
      });
   }
   res.status(200).send({
      status: 200,
      message: 'Student sa datim podacima je uspjesno kreiran!'
   });
});

router.post("/dodajStudente", async (req, res) => {
   var csv = req.body.csv;
   var grupa = req.body.grupa;
   var nizStudenata = [];
   var studentiIzBaze;
   var returnArray = [];
   var niz = csv.toString().split("\n");
   niz.forEach(student => {
      let rowEl = student.split(',');
      let singleStudent = {
         "ImeIPrezime": rowEl[0],
         "brIndeksa": rowEl[1]
      }

      nizStudenata.push(singleStudent);
   });

   console.log("Niz studenata: ")
   console.log(nizStudenata)

   await db.student.findAll()
      .then(function (studenti) {
         studentiIzBaze = studenti;
         console.log("Studenti iz baze: ")
      });

   console.log(studentiIzBaze)
   // nizStudenata.forEachAsync(element => {
   //    studentiIzBaze.forEachAsync(sib => {
   //       if (element.ImeIPrezime === sib.ime && element.brIndeksa === sib.index) {
   //          let message = "Student " + element.ImeIPrezime + " sa brojem indeksa " + element.brIndeksa + " postoji u bazi.";
   //          returnArray.push(message);
   //       }
   //       else if (element.ImeIPrezime !== sib.ime && element.brIndeksa === sib.index) {
   //          let message = "Student " + element.ImeIPrezime + " nije kreiran jer postoji student " + sib.ime + " sa istim indeksom " + sib.index;
   //          returnArray.push(message);
   //       }
   //       else {
   //          const noviStudent = await db.student.build({
   //             ime: element.ImeIPrezime,
   //             index: element.brIndeksa
   //          });
   //          await noviStudent.save();
   //          if (!noviStudent) {
   //             continue;
   //          }
   //       }
   //    });
   // });

   if (studentiIzBaze.length == 0) {
      console.log("DODJEM TU INICIJALNO")
      for (const element of nizStudenata) {
         const noviStudent = await db.student.build({
            ime: element.ImeIPrezime,
            index: element.brIndeksa
         });
         await noviStudent.save();
         if (!noviStudent) {
            continue;
         }
      }

      res.status(200).send({
         returnArray: returnArray,
      });
   }
   else {
      for (const element of nizStudenata) {
         for (const sib of studentiIzBaze) {
            console.log("TU: ")
            console.log(sib)
            if (element.ImeIPrezime === sib.ime && element.brIndeksa === sib.index) {
               console.log("1")
               let message = "Student " + element.ImeIPrezime + " sa brojem indeksa " + element.brIndeksa + " postoji u bazi.";
               returnArray.push(message);
            }
            else if (element.ImeIPrezime !== sib.ime && element.brIndeksa === sib.index) {
               console.log("2")

               let message = "Student " + element.ImeIPrezime + " nije kreiran jer postoji student " + sib.ime + " sa istim indeksom " + sib.index;
               returnArray.push(message);
            }
            else if (element.ImeIPrezime !== sib.ime && element.brIndeksa !== sib.index){
               console.log("3")

               const noviStudent = await db.student.build({
                  ime: element.ImeIPrezime,
                  index: element.brIndeksa
               });
               await noviStudent.save();
               if (!noviStudent) {
                  continue;
               }
            }
         }
      }
   }


   console.log("POVRATNI NIZ: ")
   console.log(returnArray)

   res.status(200).send({
      returnArray: returnArray,
   });
});

module.exports = router;