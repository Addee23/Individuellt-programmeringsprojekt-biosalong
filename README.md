Biosalong – Bokningssystem (React + JSON-server)

Ett komplett bokningssystem för en biosalong där användaren kan välja film, se lediga och bokade stolar, klicka för att välja platser och boka biljetter via ett validerat formulär. Projektet innehåller även en adminpanel med CRUD-hantering för filmer och bokningar. Applikationen byggdes först i ren JavaScript och utvecklades sedan vidare i React för tydligare struktur och komponentbaserad logik.

Funktioner:
• Filmval med dynamisk uppdatering av pris och platstillgänglighet
• Interaktiv stolsöversikt (lediga/upptagna/valda platser)
• Automatisk prisberäkning baserat på valda stolar
• Formulär med validering via Formik
• Bokningar sparas i JSON-server
• Adminpanel med CRUD för filmer
• Routing mellan användarvy och adminpanel med React Router

Tekniker:
• React (Vite)
• JavaScript (ES Modules)
• JSON-server (simulerad backend)
• Formik (validering)
• React Router
• CSS

Installation och körning:

Klona projektet: git clone https://github.com/Addee23/Individuellt-programmeringsprojekt-biosalong.git

Gå in i projektmappen: cd Individuellt-programmeringsprojekt-biosalong

Installera beroenden: npm install

Starta JSON-server på port 3001: npx json-server --watch db.json --port 3001 (API körs på http://localhost:3001)


Starta React-applikationen: npm run dev (körs på http://localhost:5173)

