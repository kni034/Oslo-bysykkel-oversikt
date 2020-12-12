# Kodeoppgave: Oversikt over oslo bysykkel's stasjoner

Jeg har valgt å skrive oppgaven i React selv om jeg ikke har så mye erfaring med det fra før. Dette er litt fordi jeg mener at javascript(med react) er et språk som passer godt til en slik oppgave, men også fordi jeg lenge har tenkt på å lære meg React og tenkte at dette var en godt mulighet for å starte. Måten jeg startet på var å lage en "demo" i Python og brukte den som mal når jeg skrev selve prosjektet i React. Python-koden er lagt ved men ikke ment som en del av prosjektet. 

Under implementeringen har jeg brukt axios (https://github.com/axios/axios) for å snakke med APIet da det gjør det enklere formatere responsen til noe som er lett å jobbe med. Etter formatering setter setter jeg sammen responsene og henter ut navn, kapasitet, antall sykler og antall sykkelplasser og skriver de ut i en tabell. Jeg kjører api kallene på nytt hvert tiende sekund for å holde appen oppdatert, koden for intervallet hentet jeg fra denne bloggen (https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

Grunnet tidsbegrensningene har jeg ikke gjort så mye styling på prosjektet, men heller bruk en drop-in css fra (https://watercss.kognise.dev/) for at det skal se litt bedre ut. En annen ting jeg ikke fikk tid til var å sortere sykkelstoppene etter områder, her måtte jeg nøyes med å sorte navnene i alfabetisk rekkefølge.

Prosjktet er laget med med [Create React App](https://github.com/facebook/create-react-app) og kan kjøres med kommandoen:

### `npm start`

og åpnes i browseren på http://localhost:3000

