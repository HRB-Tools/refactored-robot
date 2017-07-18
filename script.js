/* Nils Eidmann - Buchungsstapel Einleseprogramm                    */


/*      Alle globalen Variablen kommen hier rein!                   */
var el = [];
var j = 0;
var bu = [];
var b = [];
var ind = [];
var st = 0;
var la = -1;
var va = [];
/********************************************************************/

/*       Alle globalen Funktionen kommen hier rein!                 */
function ls(a) {
  var items = document.getElementById("lst");
  items.innerHTML = "";
  for (var i = 0; i < a.length; i++){
    var output = document.createElement("li");
    output.innerHTML = a[i];
    items.appendChild(output);
  }
}
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
  for ( var i = 0; i < ar.length; i++) {
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
function sc(a, b) {
  for ( var i = 0; i < b.length; i++){
    if ( a == b[i]){
      return i;
    }
  }
}
function inp() {
  var bd = prompt(`Bitte lesen Sie die Musterdaten ein`);
  va = bd.split(";");
  var le = [];
  for (var i = 0; i <= va.length; i++) {
    if (va[i] == '"S"' || va[i] == '"H"'){
      le[j] = i;
      j++;
    }
  }
  console.log(va[le[0]-1]);
  var m1 = va[le[0]-1].split(" ");
  m1.splice(-1, 1);
  var m2 = m1.join();
  m1 = m2.replace(",", " ");
  va[le[0]-1] = m1;
  var vb = va.slice(30,le[0]);
  j = 0;
  console.log(vb);
  return vb;
}
/********************************************************************/

/*               Funktionen fuer den Einlesen-Button                */
function read() {
  var inp = prompt(`Bitte geben Sie einen Text ein`);
  el = inp.split(";");
  sh(el);
  rec(ind[0], ind[1]);
  ins(el, bu);
  rw(bu[0]);
  rw(b);
  console.log(bu);
  
}
/********************************************************************/

/*                Funktionen fuer den Suchen-Button                 */
function search() {
  var f = prompt("Bitte geben Sie einen oder mehrere Suchbegriffe ein");
  var se = f.split(",");
  for ( var i = 0; i <= se.length; i++){
    console.log(sc(se[i], va));
  }
}
/********************************************************************/
