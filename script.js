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

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
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

        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}


function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}



function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2} px`;
    line.style.left = `${startRect.left + startRect.width / 2} px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    document.getElementById('content').appendChild(line);
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


function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            return pattern;
        }
    }
    return null;
}


function drawWinLine(winPattern) {
    const lineSvg = `
        <svg width="220" height="220" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: -75px; top: -75px;">
            <line x1="0" y1="0" x2="220" y2="220" stroke="white" stroke-width="4" />
        </svg>
    `;

    const contentDiv = document.getElementById('content');
    contentDiv.insertAdjacentHTML('beforeend', lineSvg);

    for (const i of winPattern) {
        const cell = document.getElementById(`cell-${i}`);
        cell.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    }
}