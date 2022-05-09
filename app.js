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



let vsechnyRecepty = recepty;

let seznamReceptu = document.getElementById('recepty');

zobrazSeznamReceptu();
hledat();


function vytvorElementReceptu(recept, index){

	let novyRecept = document.createElement('div');
	novyRecept.className = 'recept';
	
	let obrazekNovy = document.createElement('div');
	obrazekNovy.className = 'recept-obrazek';


	let obrazekImg = document.createElement('img');
	obrazekImg.className = 'recept-obrazek'; 
	obrazekImg.src = vsechnyRecepty[index].img;

	obrazekNovy.appendChild(obrazekImg);
	novyRecept.appendChild(obrazekNovy);


	let receptInfo = document.createElement('div');
	receptInfo.className = 'recept-info';

	let receptNazev = document.createElement('h3');
	receptNazev.innerText = vsechnyRecepty[index].nadpis;
	receptInfo.appendChild(receptNazev);

	novyRecept.appendChild(receptInfo);

	
	
	novyRecept.addEventListener('click', () => {
		zobrazNahledReceptu(index);
	});

	return novyRecept;

}




function zobrazSeznamReceptu(){

  vsechnyRecepty.forEach((recept,index) => {

	let vytvorRecept = vytvorElementReceptu(recept, index);
	seznamReceptu.appendChild(vytvorRecept);

  });

}


function zobrazNahledReceptu(index) {
/*
<div class="recept-detail-info">
                <header>
                    <div class="recept-kategorie">
                        <span class="fas fa-tag"></span> Kategorie:
                        <span class="hodnota" id="recept-kategorie"><!-- sem se bude doplňovat --></span>
                    </div>
                    <div class="recept-hodnoceni">
                        <span class="far fa-star"></span>
                        <span class="hodnota" id="recept-hodnoceni"><!-- sem se bude doplňovat --></span>
                    </div>
                </header>

                <h1 id="recept-nazev"><!-- sem se bude doplňovat --></h1>

                <p id="recept-popis"><!-- sem se bude doplňovat --></p>
            </div>
*/

let kliknutyRecept = vsechnyRecepty[index];


	console.log('kliknuto na: ' + 	kliknutyRecept.nadpis + ' ' + kliknutyRecept.img)

  let detailReceptu = document.querySelector('#recept-detail');
  	detailReceptu.innerHTML = null;
	detailReceptu.innerHTML = 	kliknutyRecept.nadpis;

	let receptKategorie = document.getElementById('recept-kategorie');
	receptKategorie.innerHTML = kliknutyRecept.kategorie;

	let receptHodnoceni = document.getElementById('recept-hodnoceni');
	receptHodnoceni.innerHTML = kliknutyRecept.hodnoceni;

	let receptPopis= document.getElementById('recept-popis');
	receptPopis.innerHTML = kliknutyRecept.popis;


	let obrazekReceptu = document.getElementById('recept-foto');
	obrazekReceptu.src = kliknutyRecept.img;

	

	/*obrazekReceptu.setAttribute('alt', 	kliknutyRecept.nadpis);
	obrazekReceptu.src = null;
	obrazekReceptu.src = kliknutyRecept.img



	let kliknutyRecept = vsechnyRecepty[index];
	let receptFoto = document.getElementById('recept-foto');
	receptFoto.src = kliknutyRecept.img;
   
	let receptKategorie = documet.getElementById('recept-kategorie');
	receptKategorie.textContent = kliknutyRecept.kategorie;

*/


}
   /*
   
   let vyhledavaniReceptu = document.getElementById('hledat');
   vyhledavaniReceptu.addEventListener('keydown', () => {
	 najdiRecept();
   




}


*/

function hledat() {

	let hledaniNazev = document.querySelector('#hledat').value.toLowerCase();
	let hledaniKategorie = document.querySelector('#kategorie').value;
	let razeni = document.querySelector('#razeni').value;

	// hledame nazev receptu
	nalezeneRecepty = recepty.filter(recept => recept.nadpis.toLowerCase().includes(hledaniNazev));

	// hledame kategorii
	if (hledaniKategorie !== '') {
		nalezeneRecepty = nalezeneRecepty.filter(recept => recept.kategorie === hledaniKategorie);
	}

	// razeni
	if (razeni === 'nejlepsi') {
		nalezeneRecepty = nalezeneRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni < recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	} else if (razeni === 'nejhorsi') {
		nalezeneRecepty = nalezeneRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni > recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	zobrazSeznamReceptu();
}




