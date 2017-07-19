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
/********************************************************************/
    
/*         Funktion fuer den Initialisieren-Button                  */
function inp() {
  if ( va.length === 0 ) { 
  var bd = prompt(`Bitte lesen Sie die Musterdaten ein`);
  if ( bd === undefined) {
    return 0;
  }
  va = bd.split(";");
  var le = [];
  for (var i = 0; i <= va.length; i++) {
    if (va[i] == '"S"' || va[i] == '"H"') {
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
  va = vb;
  return vb;
  }
  else {
    return va; 
  }
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
  for ( var i = 0; i < se.length; i++){
    console.log((sc(se[i], va, 0))+1);
  }
}
/********************************************************************/

/*                Funktionen fuer den Listen-Button                 */
function ls(a) {
  var items = document.getElementById("lst");
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
 for ( var l = 0; l < c; l++){
   var ll = document.createElement("tr");
   buch.appendChild(ll);
    if ( l === 0 ){
      for ( var m = 0; m < va.length; m++){
        var oo = document.createElement("th");
        oo.innerHTML = va[m];
        buch.appendChild(oo);
      }
    }
    buch.appendChild(ll);
    for ( var i = 0; i < bu[l].length; i++) {
      var op = document.createElement(b);
      op.innerHTML = bu[l][i].replace('""', ' ');
      buch.appendChild(op);
      }
 }

}
function bc(){
  document.getElementById('buch').style.display = 'block' ;
  var a = prompt("Bitte geben Sie die Nummer der ersten gesuchten Buchung an");
  var c = prompt("Bitte geben Sie die Anzahl der Buchungen an");
  bb(a, "td", c);
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
function cl(){
  var cc = document.getElementsByClassName('pf');
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
/*                 UNDER CONSTRUCTION!!!
function nthChild
*/
/********************************************************************/