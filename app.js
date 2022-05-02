/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/


let nalezeneRecepty = recepty;
let seznamReceptuElement = document.getElementById('recepty');





zobrazSeznamReceptu();

function zobrazSeznamReceptu(index) {

  
    let seznamReceptu = document.querySelector('#recepty');
    
    
    for(let i = 0; i < recepty.length; i++){
      let novyRecept = document.createElement('div');
      novyRecept.className = 'recept'; 
      novyRecept.id = i;
      seznamReceptu.appendChild(novyRecept);
     
    
      let obrazek = document.createElement('img');
      obrazek.className = 'recept-obrazek'; 
      obrazek.src = recepty[i].img;
      
    
      let receptInfo = document.createElement('div');
      receptInfo.className = 'recept-info';
      novyRecept.appendChild(obrazek);
      novyRecept.appendChild(receptInfo);
     
      
      let receptNazev = document.createElement('h3');
      receptNazev.innerText = recepty[i].nadpis;
      receptInfo.appendChild(receptNazev);

       

        
    }  
   // let novyRecept = document.querySelector('div')
    nalezeneRecepty.forEach(vratIndex);

  novyRecept.addEventListener('click', zobrazNahledReceptu(index));   
    

   
   
 }


 function vratIndex(recept, index){
    
  console.log(recept + ' + ' + index);

  recept.ind = recept.index;
  
  return index;
       
  }
  


 

function zobrazNahledReceptu(index) {

   
 console.log(recepty[index]);

 let kliknutyRecept = recepty[index];
 let receptFoto = document.getElementById('recept-foto');
 receptFoto.src = kliknutyRecept.img;

 let receptKategorie = documet.getElementById('recept-kategorie');
 receptKategorie.textContent = kliknutyRecept.kategorie;
}


let vyhledavaniReceptu = document.getElementById('hledat');
vyhledavaniReceptu.addEventListener('keydown', () => {
  najdiRecept();

})

function najdiRecept() {
 // let vyhledavaniReceptu = document.getElementById('hledat');
  let nalezeneRecepty = recepty.filter(recept => recept.nadpis.toLocaleLowerCase().includes(vyhledavaniReceptu.value))

zobrazSeznamReceptu(nalezeneRecepty);
}



