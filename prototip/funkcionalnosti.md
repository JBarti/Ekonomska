# Funkcionalnosti svih elemenata:

## Škola:
    - Id
    - Ime
    - Admin
    - Profesori
        - Timelineovi
    - Razred
       - Učenici  


## Admin:
    - Id
    - Mailovi_svih_korisnika
    - Šifra
    - Email_potvrda()
    - Dodaj_profesora()
    - Dodaj_razred()
    - Dodaj_profesora_razredu()
    - Dodaj_učenika_razredu()
    - Pregled_profesora()
    - Pregled_razreda()
    - Pregled_učenika_u_razredu()


## Profesori:
    - Id
    - Ime
    - Šifra
    - Mail
    - Razredi
    - Timelineovi
    - Dodaj_timeline()
    - Omoguči_razredu_timeline()
    - Stvori_čvor()
    - Stvori_folder_čvor()
    - Otključaj_čvor_učeniku_ili_razredu()
    - Pregled_razreda()
    - Pregled_učenika_u_razredu()


## Učenici:
    - Id
    - Ime
    - Šifra
    - Razred
    - Otključani_timelineovi()
    - Statistika_o_testovima()


## Razred:
    - Učenici
    - Pračenje_godine()
    - Prebacivanje_učenika()
    - Dodavanje_učenika()
    - Izbacivanje_učenika()
    - Brisanje_učenika() __ADMIN__
    - Caching_prethodnih_godina()
    - Pristup_maturantima()


TODO:
    --Primjeri sa iznosima koji se prenose

    --Generator primjera https://www.jotform.com/

    --Timeline folder sustav
