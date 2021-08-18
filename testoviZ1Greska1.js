let assert = chai.assert;
let expect = chai.expect;

describe('Zadatak 1', function(){
    describe('Test kada nema niti jednog predavanja', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[5])).to.be.null;
        });
    })
    describe('Test kada nema niti jedne vježbe', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[6])).to.be.null;
        });
    })
    describe('Test kada je string prazan', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[7])).to.be.null;
            expect(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[7])).to.be.null;
        });
    })
    describe('Test kada svaka druga sedmica ima vježbu', function(){
        it('Treba vratiti url iz posljednje sedmice: https://meet.google.com/bbb-umeh-ghi', function(){
            assert.equal(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[8]), "https://meet.google.com/bbb-umeh-ghi");
        });
    })
    describe('Test kada imaju linkovi sa ispravnim nazivima ali url ne sadrži meet.google.com', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[9])).to.be.null;
            expect(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[9])).to.be.null;
        });
    })
    describe('Test kada postoje linkovi sa ispravnim url-om ali ne sadrže tekst ‘vjezb’,’vježb’ i ’predavanj’', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[10])).to.be.null;
            expect(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[10])).to.be.null;
        });
    })
    //neće vratiti ispravno, greška u klsdi GoogleMeetGreska1.html, komentar u 49 i 132 liniji koda
    describe('Test kada se link nalazi van ul liste (validan rezultat iz posljednje sedmice isključujuću link koji je van liste)', function(){
        it('Treba kao rezultat vratiti linkove:(za predavanje)https://meet.google.com/atc-umeh-mno, (za vježbu)https://meet.google.com/def', function(){
            assert.equal(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[11]), 'https://meet.google.com/atc-umeh-mno');
            assert.equal(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[11]), 'https://meet.google.com/def');
        });
    })
    describe('Test kada su predavanja i vježbe samo u prvoj sedmici (rezultat url vježbe iz prve sedmice i url predavanja iz prve sedmice)', function(){
        it('Treba kao rezultat vratiti linkove:(za predavanje)https://meet.google.com/atc-umeh-mno, (za vježbu)https://meet.google.com/atc-umeh-abc', function(){
            assert.equal(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[12]), 'https://meet.google.com/atc-umeh-abc');
            assert.equal(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[12]), 'https://meet.google.com/atc-umeh-mno');
        });
    })
    describe('Test kada nije validan html kod - kada ne sadrži div ‘course-content’ sa ul listom ‘weeks’ i elementima liste ‘section-*’’', function(){
        it('Treba kao rezultat vratiti null.', function(){
            expect(GoogleMeetGreska1.dajZadnjuVjezbu(Ulaz1.primjeri()[13])).to.be.null;
            expect(GoogleMeetGreska1.dajZadnjePredavanje(Ulaz1.primjeri()[13])).to.be.null;
        });
    })
});