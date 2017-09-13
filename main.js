var entries = []; //die Felder nach denen gesucht werden kann, darüber hinaus Tabellen-Header
var el = [];      //die gesamte CSV-Datei als Array
var j = 0;        //Zählvariable für Buchungen, wird von vielen Funktionen verwendet
var ind = [];     //Indizes der Beträge
var bu = [];      //der eigentliche Inhalt
var bcd = ["nach Zeile", "nach Spalte", "nur Soll", "nur Haben", "Zeileneintrag entspricht", "Ersetzen" ];
var lightequip_k = [1140, 1184, 1186, 1200, 1402, 1403, 1404, 1406, 3300, 3801, 3802, 3803, 3804, 3806, 3808,
4100, 4315, 4400, 4736, 5200, 5300, 5400, 5425, 5736, 5880, 6760];
var inp2 = '';
var buNeu = [[]];
var inp;
var regelInput = [];
var regelOutput = [];


/**********   Global Functions commonly used      ***********/
function down(){
  document.getElementById("btndwn").style.display = "none";
  if ( window.scrollY > screen.availHeight ) {
    document.getElementById("btnp").style.display = "block";
  }
}
function up(){
  document.getElementById("btnp").style.display = "none";
  if ( document.getElementById("buch").offsetHeight > (screen.availHeight)*2 ) {
    document.getElementById("btndwn").style.display = "block";
  }
}
function checkHeight (){
  if ( buch.clientHeight > screen.availHeight ) {
    var hold = document.getElementsByClassName('top-right');
    for ( var i = 0; i < hold.length; i++){
      hold[i].style.display = "block";
    }
  }
}
function show(a){
  document.getElementById(a).style.display = "block";
}
function hide(a){
  document.getElementById(a).style.display = "none";
}
function read(a = 'empty') {
  j = 0;
  //console.log(a);
  inp = ( a === 'empty' ? prompt(`Bitte geben Sie einen Text ein`) : a);
  if (a === undefined ) {
      return 0;
  }
  el = inp.split(";");
  entries = (input(el));
  sh(el);               //sollHaben
  ins(el, bu);
  var bu00 = bu[0][0];
  for (var k = 0; k < bu00.length; k++){
    if (bu00.indexOf(" ")>=0){
      bu[0][0] = bu00.substr(bu00.lastIndexOf(" ")+1, bu00.length);
    }
  }
  document.getElementById("btn1").style.display = "inherit";
  document.getElementById("btn2").style.display = "inherit";
  document.getElementById("btn3").style.display = "inherit";
  document.getElementById("btn4").style.display = "inherit";
  return bu;
}
/**************************************************/

/*** Functions belonging to the 'read'-Function ***/
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
function ins(a, b) {
  var st = ind[0];
  var la = ind[1]-ind[0];
  for ( var i = 0; i < j; i++ ) {
      b[i] = a.slice(st+(i*la),st+(i+1)*la);
  }
}
function sh(a) {
  for (var i = 0; i<=a.length; i++){
    if (el[i] == '"S"' || el[i] == '"H"'){
      ind[j]=(i-1);
      j++;
    }
    if (i == a.length){
      console.log("Es wurden " + j + " Buchungen gefunden!");
    }
  }
}
/**************************************************/

/**********    Darstellende Funktionen   **********/
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
  var d = new Date();
  bb(a, "td", c);
  checkHeight();
  var e = new Date();
  console.log("Laufzeit: " + (e-d) + " Millisekunden");
}
function bd(){
  for ( var m = 0; m < entries.length; m++){
        var oo = document.createElement("th");
        oo.innerHTML = entries[m];
        buch.appendChild(oo);
    }
}
function be(a) {  /* Loops through an array of Row Numbers */
 var buch = document.getElementById("buch");
 buch.innerHTML = "";
  var ll = document.createElement("tr");
  buch.appendChild(ll);
  var bl = bu[0].length;
  bd();
  console.log("a="+a);
  for ( var z in a ) {
    ll = document.createElement("tr");
    buch.appendChild(ll);
    for ( var i = 0; i < bl; i++){
      var op = document.createElement("td");
      op.innerHTML = bu[a[z]][i].replace('""', ' ');
      buch.appendChild(op);
    }
  }
}
/**************************************************/

/************    Filterfunktionen    **************/
function filter(){
  var kj = document.getElementById("div2");
  kj.innerHTML = "";
  kj.style.display='block';
  var oy = document.createElement("li");
  oy.setAttribute('onclick', 'hide("div2")');
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
  var els = document.getElementsByClassName('pf2');
  for ( var i = 0; i < els.length; i++ ){
     els[i].style.display = "list-item";
  }
  kj.setAttribute('class', 'small-ul');
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
      else {
      buch.appendChild(ll);
      var op = document.createElement("td");
      op.innerHTML = bu[i][a].replace('""', ' ');
      buch.appendChild(op);
      }
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
    buch.appendChild(ll);
    for (var i = 0; i < bu[0].length; i++){
      var op = document.createElement("td");
      if ( (bu[l][1] == '"S"') === a){
        op.innerHTML = bu[l][i].replace('""', ' ');
        buch.appendChild(op);
      }
    }
    }
}
function matchEntry(){
  document.getElementById("buch").style.display = 'block';
  var a;
  var ja = confirm("Vorgefertigte Regel verwenden?");
  if ( ja ){
    a = regelInput;
  }
  else if ( ja === false ) {
    a = prompt("Bitte geben Sie ein Suchwort ein:").split(",");
  }
  var b = [];
  var c = 0;
  for ( var i = 0; i < j; i++){
    for (var k = 0; k < bu[i].length; k++){
      for (var m = 0; m < a.length; m++){
        if ( bu[i][k] == a[m]){
        b[c] = i;
        c++;
        }
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
function createRule(){
  var a = parseInt(prompt("Spalte:")-1);
  var b = prompt("Spalte: " + (a+1) + " entspricht:");
  var c = confirm("Weiter?");
  return { spalte: a, regel: b , weiter: c };
}
function addRule(a, b, c){
  var s = createRule();
  b[a] = s.regel;
  c[a] = s.spalte;
  if ( s.weiter ) {
    addRule(a+1, b, c);
  }
}
function compareRule(a, b){
  var next = false;
  for ( var m = 0; m < j; m++){
    for ( var u in a ) {
      if ( (bu[m][a[u]] == b[u])){
        next = true;
      }
      else if ( (bu[m][a[u]] != b[u]) ){
        next = false;
      }
    }
  }
}
function pattern(){
  document.getElementById("buch").style.display = 'block';
  var ruleset = [];
  var columns = [];
  var shown = [];
  count = 0;
  var next = confirm("Neue Regel hinzufügen?");
  if ( next ){          // nur eine Ausführung soweit
    addRule(0, ruleset, columns);
  }
  next = false;
  console.log(ruleset, columns, columns.length);
  for ( var m = 0; m < j; m++ ) {
    for ( var u in columns){
      if ( (bu[m][columns[u]] == ruleset[u]) ){
        next = true;
      }
      else if ( (bu[m][columns[u]] != ruleset[u]) ){
        next = false;
      }
      if ( next && ( u == columns.length - 1 )){
        shown[count] = m;
        count++;
      }
    }
  }
  console.log(shown);
  for ( var y in shown){
    be(shown);
  }
  return shown;
}
function ersetzen(){
  var a;
  var ja = confirm("Vorgefertigte Regel verwenden?");
  if ( ja ){
    if ( regelInput.length > 0){
      a = regelInput;
    }
    else if (regelInput.length < 1){
      chooseRule();
    }
  }
  else if ( ja === false ) {
    a = prompt("Bitte geben Sie den zu ersetzenden Begriff ein:").split(",");
  }
  if ( a === null ){
    return 0;
  }
  var b = [];
  var c = 0;
  var d = [];
  var e = 0;
  var f = [];
  for ( var i = 0; i < j; i++){
    for (var k = 0; k < bu[i].length; k++){
      c = 0;
      var cont = [];
      for (var m = 0; m < a.length; m++){
        if ( bu[i][k] == a[m]){
          cont[c] = i;
          if ( m == a.length - 1){
            b[m] = cont;
          }
          if ( d.indexOf(k) < 0 ) {
            d[e]=k;
            e++;
          }
        c++;
        }
      }
    }
  }
  console.log('Treffer gefunden in folgenden Spalten: ' + d);
  for ( var r = 0; r < d.length; r++) { d[r]+=1; }
  var nVal = confirm("Auszuwaehlende Spalten:" + d);
  var nEntry;
  if ( ja ){
    if (regelOutput.length > 0){
     nEntry = regelOutput;
    }
    else if (regelOutput.length < 1){
      chooseRule();
    }
  }
  else if ( ja === false){
    nEntry = prompt("Neuer zuzuweisender Wert: ").split(",");
  }
  if ((ja === false) && (nEntry.length < a.length)){
    nEntry = prompt("Zu wenige Ersatzwerte! Neu eingeben:").split(",");
  }
  else if ((ja === false)&& (nEntry.length > a.length)){
    nEntry = prompt("Zu viele Ersatzwerte! Neu eingeben: ").split(",");
  }
  for (var s = 0; s < a.length; s++){
    var replace = a[s];
    var re = new RegExp(replace, "g");
    inp2 = inp.replace(re, nEntry[s]);
    inp = inp2;
  }
  read(inp2);
  bu.splice(0,0,entries);
  var els = el.slice(0,29);
  bu.splice(0,0,els);
  exportToCsv(bu);
  bc();
}
/***************************************************/

/************  Funktion zum Export   ***************/
function exportToCsv(rows) {
        var und = '_';
        var el0 = el[0].replace('"', '');
        var el1 = el0.replace('"', '');
        var el3 = el[3].replace('"', '');
        var el4 = el3.replace('"', '');
        var el5 = el[5];
        var csv = ".csv";
        var filename = el1.concat(und.concat(el4.concat(und.concat(el5.concat(csv)))));
        console.log(filename);
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
/***************************************************/

/***********     Eigene Regeln     *****************/
function chooseRule(aa = null){
  var myData = JSON.parse(data);
  var c1 = 0;
  var c2 = 0;
  for ( var prop in myData[0] ) {
    if ( myData[0].hasOwnProperty(prop)){
      c1++;
    }
  }

  console.log("Laenge: " + c1);
  var treffer1 = [];
  var treffer2 = [];
  if ( aa === null){
    var a = prompt("Input");
    for ( var x in myData[0]){
      c2++;
      console.log(c2);
      if ( x == a ){
        treffer1 = eval("myData[0]." + x);
        console.log("Input: " + treffer1);
        regelInput = treffer1;
      }
    }
      if (treffer1.length < 1) {
        chooseRule();
        }
  }
  else {
    regelInput = aa;
  }
    c2 = 0;
    var b = prompt("Output");
    for ( var y in myData[0]){
      c2++;
      console.log(c2);
      if ( y == b){
        treffer2 = eval("myData[0]." + y);
        console.log("Output: " + treffer2);
        regelOutput = treffer2;
      }
    }
    if (treffer2.length < 1) {
     chooseRule(treffer1);
    }
    console.log(treffer1.length, treffer2.length, c2, c1);
}
/***************************************************/

/****************** EXPERIMENTALS ******************/
function tm(){
  var k = new Date();
  var tmcontent = document.getElementById("tablenew");
  tmcontent.innerHTML='<table>' + tableHTML() + '</table>';
  var l = new Date();
  console.log("Laufzeit: " + (l-k) + " Millisekunden!");
}

function tableHTML(){
  var a = '';
  for ( var i = 0; i < bu.length; i++){
    a += '<tr>';
    for ( var j = 0; j < bu[i].length; j++) {
      var b = bu[i];
      a+= '<td>' + b[j] + '</td>';
    }
  }
  a += '</tr>';
  return a;
}
/***************************************************/
