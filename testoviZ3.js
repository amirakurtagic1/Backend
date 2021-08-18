var assert = chai.assert;
var expect = chai.expect;

describe('Zadatak 3', function(){
    describe('Test kada nema trenutne aktivnosti u datom vremenu', function(){
        it('Treba vratiti string: \"Trenutno nema aktivnosti.\"', function(){
            assert.equal(Raspored.dajTrenutnuAktivnost('14-11-2020T11:10:00', 'grupa1'), "Trenutno nema aktivnosti");
        });
    })
    describe('Test kada se proslijeđena vrijednost nalazi na početku neke aktivnosti', function(){
        it('Treba da vrati predavanje BWT', function(){
            assert.equal(Raspored.dajTrenutnuAktivnost('16-11-2020T15:00:00', 'predavanje'), "BWT 180");
        });
    })
    describe('Test kada se proslijeđena vrijednost nalazi na kraju neke aktivnosti', function(){
        it('Treba da vrati predavanje BWT', function(){
            assert.equal(Raspored.dajTrenutnuAktivnost('16-11-2020T18:00:00', 'predavanje'), "BWT 0");
        });
    })
    describe('Test kada postoji vježba, ali nije ispravna grupa', function(){
        it('Treba vratiti string: \"Trenutno nema aktivnosti.\"', function(){
            assert.equal(Raspored.dajTrenutnuAktivnost('11-11-2020T11:10:00', 'grupa5'), "Trenutno nema aktivnosti");
        });
    })
    describe('Test kada postoji vježba i ispravna je grupa', function(){
        it('Treba vratiti MUR1', function(){
            assert.equal(Raspored.dajTrenutnuAktivnost('11-11-2020T12:30:00', 'grupa2'), "MUR1 90");
        });
    })
    describe('Test kada je prva prethodna aktivnost vježba sa pogrešnom grupom', function(){
        it('Treba vratiti aktivnost prije nje', function(){
            assert.equal(Raspored.dajPrethodnuAktivnost('16-11-2020T16:00:00', 'grupa5'), "RMA");
        });
    })
    describe('Test kada se šalje vrijednost prije prve aktivnosti u ponedjeljak', function(){
        it('Treba vratiti posljednju aktivnost iz petka, ili četvrtka ako nema aktivnosti u petak', function(){
            assert.equal(Raspored.dajPrethodnuAktivnost('16-11-2020T09:00:00', 'grupa1'), "FWT");
        });
    })
    describe('Test kada je prva naredna aktivnost vježba sa pogrešnom grupom', function(){
        it('Treba vratiti aktivnost poslije nje', function(){
            assert.equal(Raspored.dajPrethodnuAktivnost('16-11-2020T09:00:00', 'grupa5'), "BWT");
        });
    })
    describe('Test kada se šalje vrijednost prije prve aktivnosti u ponedjeljak', function(){
        it('Treba vratiti prvu aktivnost od ponedjeljka', function(){
            assert.equal(Raspored.dajPrethodnuAktivnost('16-11-2020T08:00:00', 'grupa1'), "RMA");
        });
    })
});