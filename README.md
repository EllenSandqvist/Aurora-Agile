Detta projekt var initialt skapat av Viktor, Jerry, Alicia, Moa, Paulina och Emil, proud members of the AuroraAgile-developerTeam. #AA

[Vårt projekt på Netlify](https://auroraagile.netlify.app/)

#ÖVERLÄMNING TILL KOMMANDE GRUPP SOM SKA VIDAREUTVECKLA:

Detta projekt är stylat med Bootstrap.

Dokumentation finns här: Vanilla bootstrap. Klasser för enkel css relaterad styling: https://getbootstrap.com

Branding: https://drive.google.com/file/d/1L_IytKVZVaeP38QD5jFxr0fsctzOvJaS/view?usp=sharing

Javascriprelaterade komponenter som kräver manipulation av domen. finns här: Använd dessa as simple as copy,paste. https://react-bootstrap.netlify.app

Vi har också egna klasser för varumärket. Dom finns här: https://drive.google.com/file/d/1DQPt9NJKTnvXboSj7DU-1C41WqYQSCtM/view?usp=sharing

Förslag på saker ni kan utvecka:

- Se till att man inte kan ta bort kolumnen todo. Nu när man tar bort den går det inte att lägga till nån task.
- När man tar bort en kolumn, vad ska då hända med tasken måntro? just nu svävar dom i ovisshet.(flytta till annan kolumn? deleta? )
- Anpassa bakgrundsbild?
- confirm-rutan vid delete column centreras. ?

# LiUm förslag

## Vi i Umeå-Linköping gruppen valde att fokusera på kodförbättringar snarare än att lägga till nya features.

Föreslagna förbättringar som vi genomfört:

- Todo-kolumnen kan inte raderas
- När man raderar en kolumn flyttas uppgifterna till den första kolumnen
- Confirm-rutan vid delete är centrerad

Övriga vidareutvecklingar:

- Tagit bort context då den inte behövdes längre
- Tagit bort local states och props som inte längre behövdes, t.ex. showModal, selectedUserId
- Lagt till local storage
- Om man väljer AllUsers i MultiSelectDropDown blir alla användare valda
- Cirkeln med tre punkter visar bara namnen på de användare som inte rymts att renderas ut

## Reflektion

Kul att se hur andra löst uppgiften även om det var svårt att följa koden från början. Vi tyckte er kod fungerade bra, men vi har försökt korta ner och optimera den. Vi insåg när vi fick jobba med andras kod att vi säkert också har en hel del kod som skulle kunna optimeras i vårt projekt. Vi tycker att det svåraste var att sätta sig in i koden och försöka förstå hur allt hänger ihop. Att jobba med andras kod har gjort att vi tydligare förstått vikten av att döpa variabler så att det är lätt att förstå vad de används till. Sammanfattningsvis var det en bra och utvecklande övning att få läsa och försöka förbättra andras kod.
