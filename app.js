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

zobrazPosledniRecept();


let vyhledavaniReceptu = document.getElementById('hledat');
vyhledavaniReceptu.addEventListener('keydown', () => {
 hledat();

})





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


let kliknutyRecept = vsechnyRecepty[index];

	console.log('kliknuto na: ' + 	kliknutyRecept.nadpis + ' ' + kliknutyRecept.img)

	let detailReceptu = document.querySelector('#recept-detail');
  	detailReceptu.innerHTML = null;
	

	let obrazekElement = document.createElement('div');
	obrazekElement.classList.add('recept-detail-obrazek');

	let obrazekReceptu = document.createElement('img');
	obrazekReceptu.id = 'recept-foto';
	
	obrazekReceptu.src = kliknutyRecept.img;

	obrazekElement.appendChild(obrazekReceptu);
	detailReceptu.appendChild(obrazekElement);

	

	let receptKategorie = document.getElementById('recept-kategorie');
	receptKategorie.innerHTML = kliknutyRecept.kategorie;

	let receptHodnoceni = document.getElementById('recept-hodnoceni');
	receptHodnoceni.innerHTML = kliknutyRecept.hodnoceni;

	let nazevReceptu = document.getElementById('recept-nazev');
	nazevReceptu.innerHTML = kliknutyRecept.nadpis;


	let receptPopis= document.getElementById('recept-popis');
	receptPopis.innerHTML = kliknutyRecept.popis;





	localStorage.posledniZobrazenyRecept = index;


}





function hledat() {

	let hledaniNazev = document.querySelector('#hledat').value.toLowerCase();
	let hledaniKategorie = document.querySelector('#kategorie').value;
	let razeni = document.querySelector('#razeni').value;

	vsechnyRecepty = vsechnyRecepty.filter(recept => recept.nadpis.toLowerCase().includes(hledaniNazev));

	if (hledaniKategorie !== '') {
		vsechnyRecepty = vsechnyRecepty.filter(recept => recept.kategorie === hledaniKategorie);
	}

	
	if (razeni === 'nejlepsi') {
		vsechnyRecepty = vsechnyRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni < recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	} else if (razeni === 'nejhorsi') {
		vsechnyRecepty = vsechnyRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni > recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	zobrazSeznamReceptu();
}





function zobrazPosledniRecept() {
	let posledniZobrazenyRecept = localStorage.posledniZobrazenyRecept;

	if (posledniZobrazenyRecept !== null && posledniZobrazenyRecept !== undefined) {
		
		let index = parseInt(posledniZobrazenyRecept);

		if (index >= 0 && index < vsechnyRecepty.length) {
			zobrazNahledReceptu(index);
		}
	}
}


 



