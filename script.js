/* Nils Eidmann - Buchungsstapel Einleseprogramm                    */


/*      Alle globalen Variablen kommen hier rein!                   */
var el = [];
var j = 0;
var bu = [];
var bn = [];
var inp; 
var b = [];
var ind = [];
var st = 0;
var la = -1;
var entries = [];
var inp2 = '';
var bcd = ["nach Zeile", "nach Spalte", "nur Soll", "nur Haben", "Zeileneintrag entspricht", "Ersetzen" ];
var lightequip_k = [1140, 1184, 1186, 1200, 1402, 1403, 1404, 1406, 3300, 3801, 3802, 3803, 3804, 3806, 3808,
4100, 4315, 4400, 4736, 5200, 5300, 5400, 5425, 5736, 5880, 6760];
/********************************************************************/

/*       Alle globalen Funktionen kommen hier rein!                 */
function writeOutput(a,b) {
  var items = document.getElementById(b);
  items.innerHTML = "";
  for (var i = 1; i < a.length; i++) {
   var output = document.createElement("li");
    output.innerHTML = a[i];
   items.appendChild(output);
  }
}
function searchWhiteSpaces(a, i){
  if ( a[i].indexOf(" ") >= 0 ) {
    a[i]=a[i].slice(a[i].indexOf(" ")+1, a[i].length+1);
    searchWhiteSpaces(a, i);
  }
}
function rw(ar) {
  for ( var i = 0; i < ar.length - 1; i++) {
    searchWhiteSpaces(ar, i);
  }
}
function rec(a, b) {
  la = b-a;
  st = a;
  if ( la == 115 ) {
    console.log("Buchungstyp erkannt: Buchungsstapel");
    return st;
  }
  else if ( la == 95 ) {
    console.log("Buchungstyp erkannt: Wiederkehrende Buchungen");
    st-=2;
    return st;
  }
  else if ( la == -1 ){
    console.log("Kein gueltiger Buchungstyp erkannt!");
  }
}
function sh(a) {
  for (var i = 0; i<=a.length; i++){
    if (el[i] == '"S"' || el[i] == '"H"'){
      b[j]=el[i-1];
      ind[j]=(i-1);
      j++;
    }
    if (i == a.length){
      console.log("Es wurden " + j + " Buchungen gefunden!");
    }
  }
}
function ins(a, b) {
  for ( var i = 0; i < j; i++ ) {
      b[i] = a.slice(st+(i*la),st+(i+1)*la);
  }
}
function sc(a, b, c) {
  //console.log("a = " + a + " , c = " + c);
  for ( var i = c; i < b.length; i++) {
    if ( a == b[i]){
      return i;
    }
    else {
      var y = b[i].split(" ");
        for (var p = 0; p < y.length; p++) {
          if ( a == y[p] ){
            sc(a, b, i+1);
            return i;
          }
        }
    }
    if ( i == b.length) {
      break;
    }
  }
}
function extractNumber(a){
    for ( var i = 0; i < a.length; i++ ) {
        var ccc = a.charAt(i);
        if ( isNaN(ccc) && ccc!==",") {
            a = a.replace(a.charAt(i), " ");
        }
    }
    return a;
}
function addN(a, n = 0){
  a += n;
}
/********************************************************************/
    
/*   Funktion fuer den Initialisieren-Button +++ NICHT MEHR!!! +++  */
function input(a) {
  entries = a;
  var le = [];
  for (var i = 0; i <= entries.length; i++) {
    if (entries[i] === '"S"' || entries[i] === '"H"') {
      le[j] = i;
      j++;
    }
  }
  var m1 = entries[le[0]-1].split(" ");
  m1.splice(-1, 1);
  var m2 = m1.join();
  m1 = m2.replace(",", " ");
  m2 = a[145];
  entries[le[0]-1] = m1;
  a[145]=m2;
  var vb = entries.slice(30,le[0]);
  j = 0;
  entries = vb;
  entries[115] = "Datum Zuord. Steuerperiode";
  return vb;
}
/********************************************************************/

/*               Funktionen fuer den Einlesen-Button                */
function read(a = 'empty') {
  j = 0;
  console.log(a);
  inp = ( a === 'empty' ? prompt(`Bitte geben Sie einen Text ein`) : a);
  if (a === undefined ) {
      return 0;
  }
  el = inp.split(";");
  //console.log("Eingabe, bu = " + bu[0][0]);
  entries = (input(el));
  //console.log("Eintraege, bu= " + bu[0][0]);
  sh(el);               //sollHaben
  //console.log("Soll-Haben bu = " + bu[0][0]);
  rec(ind[0], ind[1]); //Typ erkennen
  //console.log("Typ erkannt, bu = " + bu[0][0]);
  ins(el, bu);    //Beträge herausziehne
  rw(b);          //Leerzeichen entfernen
  bu[0][0] = b[0];
  document.getElementById("btn1").style.display = "block";
  document.getElementById("btn2").style.display = "block";
  document.getElementById("btn3").style.display = "block";
  document.getElementById("btn4").style.display = "block";
  return bu;
}
/********************************************************************/

/*                Funktionen fuer den Suchen-Button                 */
function search() {
  var f = prompt("Bitte geben Sie einen oder mehrere Suchbegriffe ein");
  var se = f.split(",");
  for ( var i = 0; i < se.length; i++){
    console.log((sc(se[i], entries, 0))+1);
  }
}
/********************************************************************/

/*                Funktionen fuer den Listen-Button                 */
function ls(a, b) {
  var items = document.getElementById(b);
  items.innerHTML = "";
  for (var i = 0; i < a.length; i++){
    var output = document.createElement("li");
    output.setAttribute( 'class', 'exp');
    output.innerHTML = a[i];
    items.appendChild(output);
    document.getElementById('exp').style.display = "block";
  }
}
/********************************************************************/

/*                  Funktionen fuer den Anzeigen-Button             */
function bb(a, b, c) {
 var buch = document.getElementById("buch");
 buch.innerHTML = "";
 for ( var l = a-1; l < (a-1+c) ; l++){
   var ll = document.createElement("tr");
   buch.appendChild(ll);
   var bl = bu[l].length;
    if ( l === a-1 ){
      bd();
    }
    buch.appendChild(ll);
    for ( var i = 0; i < bl; i++) {
      var op = document.createElement(b);
      op.innerHTML = bu[l][i].replace('""', ' ');
      buch.appendChild(op);
      }
 }

}
function bc(){
  document.getElementById('buch').style.display = 'block' ;
  var a = parseInt(prompt("Bitte geben Sie die Nummer der ersten gesuchten Buchung an", 1));
  var c = parseInt(prompt("Bitte geben Sie die Anzahl der Buchungen an", j));
  bb(a, "td", c);
}
function bd(){
  for ( var m = 0; m < entries.length; m++){
        var oo = document.createElement("th");
        oo.innerHTML = entries[m];
        buch.appendChild(oo);
    }
}
/********************************************************************/

/*            Funktionen fuer den Einklappen-Button                 */
function exp() {
  var elems = document.getElementsByClassName('exp');
    for (var i = 0;i < elems.length; i++){
      if ( elems[i].style.display == 'list-item'){
       elems[i].style.display = 'none';
       document.getElementById('exp').innerHTML = "Aufklappen";
      }
      else {
        elems[i].style.display = 'list-item';
        document.getElementById('exp').innerHTML = "Einklappen";
      }
    } 
}
/********************************************************************/

/*            Funktionen fuer den Schliessen-Button                 */
function cl(a){
  var cc = document.getElementsByClassName('pf' + a);
    for ( var i = 0; i < cc.length; i++) {
      cc[i].style.display = 'none';
    }
}
/********************************************************************/

/*                 Funktionen fuer den Sidebar                      */
function w3_open() {
    document.getElementById("sdb").style.display = "block";
}
function w3_close() {
    document.getElementById("sdb").style.display = "none";
}
/********************************************************************/

/*               Funktionen fuer den Filter                         */
function filter(){
  var kj = document.getElementById("div2");
  kj.innerHTML = "";
  kj.style.display='block';
  var oy = document.createElement("li");
  oy.setAttribute('onclick', 'cl(2)');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = 'Schliessen';
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'zeile()');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[0];
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'spalte()');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[1];
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'soll(true)');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[2];
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'soll(false)');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[3];
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'matchEntry()');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[4];
  kj.appendChild(oy);
  oy = document.createElement("li");
  oy.setAttribute('onclick', 'ersetzen()');
  oy.setAttribute('class', 'pf2');
  oy.innerHTML = bcd[5];
  kj.appendChild(oy);
}
function zeile(){
  document.getElementById("buch").style.display = 'block';
  var a = prompt("Bitte geben Sie die anzuzeigende Zeile an");
  bb(a, "td", 1);
}
function spalte(){
  var a = parseInt(prompt("Bitte geben Sie die anzuzeigende Spalte an"))-1;
  var buch = document.getElementById("buch");
  buch.style.display = 'block';
  buch.innerHTML = "";
  for (var i = 0; i <= j+1; i++ ){
    var ll = document.createElement("tr");
    buch.appendChild(ll);
      if ( i === 0) {
        var oo = document.createElement("th");
        oo.innerHTML=entries[a];
        buch.appendChild(oo);
      }
      buch.appendChild(ll);
      var op = document.createElement("td");
      op.innerHTML = bu[i][a].replace('""', ' ');
      buch.appendChild(op);
  }
}
function soll(a = true){
  var buch = document.getElementById("buch");
  buch.style.display = 'block';
  buch.innerHTML = "";
  for ( var l = 0; l <= j; l++){
    var ll = document.createElement("tr");
    buch.appendChild(ll);
    if ( l === 0) {
      for ( var m = 0; m < entries.length; m++){
        var oo = document.createElement("th");
        oo.innerHTML = entries[m];
        buch.appendChild(oo);
      }
    }
    buch.appendChild(ll);                                         //hierhin setzen
    for (var i = 0; i < bu[0].length; i++){
      var op = document.createElement("td");
      if ( (bu[l][1] == '"S"') === a){                            //if-Abfrage am besten
        op.innerHTML = bu[l][i].replace('""', ' ');
        buch.appendChild(op);
      }
    }
  }
}
function matchEntry(){
  document.getElementById("buch").style.display = 'block';
  var a = prompt("Bitte geben Sie ein Suchwort ein:");
  var b = [];
  var c = 0;
  for ( var i = 0; i < j; i++){
    for (var k = 0; k < bu[i].length; k++){
      if ( bu[i][k] == a){
        b[c] = i;
        c++;
      }
    }
  }
  var buch = document.getElementById("buch");
  buch.innerHTML = "";
  for ( var l = 0; l <= b.length; l++){
    var ll = document.createElement("tr");
    if (l === 0){
      bd();
    }
    buch.appendChild(ll);
    var h = b[l];
      for (var n = 0; n < parseInt(bu[h].length); n++){
      var op = document.createElement("td");
      op.innerHTML = bu[b[l]][n].replace('""', ' ');
      buch.appendChild(op);
      }
  }
 
  console.log(b);
}
function ersetzen(){
  var a = prompt("Bitte geben Sie den zu ersetzenden Begriff ein:");
  if ( a === null ){
    return 0;
  }
  var b = [];
  var c = 0;
  var d = [];
  var e = 0;
  for ( var i = 0; i < j; i++){
    for (var k = 0; k < bu[i].length; k++){
      if ( bu[i][k] == a){
        b[c] = i;
        if ( d.indexOf(k) < 0 ) {
          d[e]=k;
          e++;
        }
        c++;
      }
    }
  }
  console.log(a, b, c);
  console.log('Treffer gefunden in folgenden Spalten: ' + d);
  for ( var m = 0; m < d.length; m++) { d[m]+=1; }
  var nVal = confirm("Auszuwaehlende Spalten:" + d);
  var nEntry = prompt("Neuer zuzuweisender Wert: ");
  var replace = a;
  var re = new RegExp(replace, "g");
  inp2 = inp.replace(re, nEntry);
  read(inp2);
  exportToCsv('datev_neu.csv', bu);
  bc();
}
/********************************************************************/

/*       Finale Funktion fuer die Ausgabe als CSV                   */
function output(a){
   //document.getElementById("text-box").innerHTML= bu.toString();
   document.getElementById("text-box").innerHTML = (inp2 === '' ? inp : inp2);
}

function leeren(){
  document.getElementById("text-box").innerHTML=' ';
  document.getElementById("btn2").disabled = true;
}

var cpbtn = document.querySelector('.js-button');
cpbtn.addEventListener('click', function(event){
  var txt = document.querySelector('.js-input-field');
  var range = document.createRange();
  range.selectNode(txt);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  }
  catch(err) {
    console.log('unable to copy');
  }
  window.getSelection().removeAllRanges();
});

function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                }
                var result = innerValue.replace(/"/g, '"');
                /*if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';*/  //keine unnötigen Anführungszeichen
                if (j > 0)
                    finalVal += ';';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
      }
}

/********************************************************************/
/************ Experimentelle Funktionen (wenn etwas kaputtgeht dann hier!!) ************/ 
var buNeu = [];
buNeu = bu.slice();
    
    




