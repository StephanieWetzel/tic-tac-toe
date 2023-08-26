let fields = [
    null, // 0 (Zellennummer)
    null, // 1
    null, // 2
    null, // 3
    null, // 4
    null, // 5
    null, // 6
    null, // 7
    null // 8
];

let currentPlayer = 'x';


function init() {
    render();
}


function render() { // Tabelle wird generiert:
    let table = '<table>'; // TABELLE ANFANG
    for (let i = 0; i < 3; i++) { // Durch die ZEILEN (senkrecht) iterieren.
        table += '<tr>'; // table row = Zeile wird mit += hinzugefügt (insgesamt 3 da i < 3)
        // ZEILENINHALT (3 Zellen) ANFANG
        for (let j = 0; j < 3; j++) { // Durch die ZELLEN (waagrecht) iterieren.
            const index = i * 3 + j; // Zeilennummer * 3 (Spalten) + Spaltennummer = aktuelle Zelle
            let symbol = ''; // standardmäßig leer
            // table data = Zelle wird erstellt (insgesamt 3 da i < 3) -> entweder  Kreis/Kreuz (oder leer wenn keins von beiden zutrifft):
            if (fields[index] === 'o') {
                symbol = generateAnimatedCircle();
            } else if (fields[index] === 'x') {
                symbol = generateAnimatedCross();
            }
            table += `<td onclick="fillCell(this, ${index})">${symbol}</td>`; // Hinzufügen des Zellinhalts zur aktuellen Zeile / this = aktuell geklicktes Zellelement
        }
        // ZEILENINHALT (3 Zellen) ENDE
        table += '</tr>'; // ZEILE ENDE
    }
    table += '</table>'; // TABELLE ENDE

    document.getElementById('content').innerHTML = table; // Eben generierter Code wird in die div mit der id 'content' gerendert.
}


function fillCell(cell, index) {
    if (fields[index] === null) { // Überprüfen, ob das Feld leer ist
        fields[index] = currentPlayer; // Feld mit dem aktuellen Spieler füllen -> speichert den aktuellen Spielzustand im 'fields'-Array
        cell.innerHTML = currentPlayer === 'o' ? generateAnimatedCircle() : generateAnimatedCross(); // Zelle wird gefüllt: wenn currentPlayer 'o' dann ...Circle() Funktion, wenn 'x' dann ...Cross() Funktion
        cell.onclick = null; // onclick-Funktion wird von der aktuellen Zelle wieder entfernt, damit bereits geklicktes Feld nicht nochmal geklickt werden kann
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Spielerwechsel -> verkürzte Schreibweise für if/else: "if currentPlayer === x dann (?) 'o', ansonsten (:) 'x'"
    }
}


function generateAnimatedCircle() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" fill="none" stroke="#00B0F0" stroke-width="5">
                <animate attributeName="stroke-dasharray" from="0,188.4955" to="188.4955,0" dur="300ms" fill="freeze" />
            </circle>
        </svg>
    `;
    return svgCode;
}


function generateAnimatedCross() {
    const svgCode = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="10" to="60" dur="300ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="300ms" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" from="60" to="10" dur="300ms" fill="freeze" />
                <animate attributeName="y2" from="10" to="60" dur="300ms" fill="freeze" />
            </line>
        </svg>
    `;
    return svgCode;
}