import {Tim} from "./tim.js"
import {Volonter} from "./volonter.js"

export class Grad{
    constructor(id, ime, nizTimova, nizVolontera){
        this.id = id;   
        this.ime="Crveni krst";
        if(typeof(ime)=="string")
            this.ime=ime;
        this.nizTimova=nizTimova;
        this.nizVolontera=nizVolontera;
        
        this.glavniDiv=document.createElement("div");
        this.glavniDiv.className="glavni-div";
        document.body.appendChild(this.glavniDiv);

    }

    nacrtaj() {
        this.gornjiDeo();
        const donjiDiv = document.createElement("div");
        donjiDiv.className = "donji-div";
        this.glavniDiv.appendChild(donjiDiv);
        this.leviDeo(donjiDiv);
        this.desniDeo(donjiDiv);
    }

    gornjiDeo(){
        const gornjiDiv=document.createElement("div");
        gornjiDiv.className="gornji-div";
        this.glavniDiv.appendChild(gornjiDiv);

        const lokacijaKrsta=document.createElement("h2");
        lokacijaKrsta.className="lokacija-krsta";
        lokacijaKrsta.textContent="Crveni krst "+ this.ime;
        gornjiDiv.appendChild(lokacijaKrsta);
    }

    leviDeo(glavniDiv){
        const leviDiv=document.createElement("div");
        leviDiv.className="levi-div";
        glavniDiv.appendChild(leviDiv);

        const dodajTimDiv=document.createElement("div");
        dodajTimDiv.className="dodaj-tim-div";
        leviDiv.appendChild(dodajTimDiv);

        const napraviNoviTim=document.createElement("h4");
        napraviNoviTim.className="dodaj-novi-tim";
        napraviNoviTim.textContent="Dodaj novi tim ";
        dodajTimDiv.appendChild(napraviNoviTim);

        const nazivTima=document.createElement("p");
        nazivTima.textContent="Naziv tima:";
        nazivTima.className="naziv-tima";
        dodajTimDiv.appendChild(nazivTima);

        const inputTim=document.createElement("input");
        inputTim.className="input-tim";
        dodajTimDiv.appendChild(inputTim);  

        const maxBrojClanova=document.createElement("p");
        maxBrojClanova.textContent="Maksimalni broj clanova:";
        maxBrojClanova.className="max-broj-clanova";
        dodajTimDiv.appendChild(maxBrojClanova);

        const inputMaxClanova=document.createElement("input");
        inputMaxClanova.type="number";
        inputMaxClanova.min=1;
        inputMaxClanova.className="input-max-clanova";
        dodajTimDiv.appendChild(inputMaxClanova);

        const buttonDodajTim=document.createElement("button");
        buttonDodajTim.textContent="Napravi novi tim";
        buttonDodajTim.className="button-dodaj-tim";
        dodajTimDiv.appendChild(buttonDodajTim);

        buttonDodajTim.onclick=()=>{
            const imeTima = inputTim.value;
            const maxVolonteraUTimu = parseInt(inputMaxClanova.value);
            if(imeTima === '' || inputMaxClanova.value === ''){
                
                alert("Nevalidan unos podataka za tim");
                return;
            }

            fetch(`http://localhost:5000/CrveniKrst/NapraviTim/${this.id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ime: imeTima,
                    maxBrojVolontera: maxVolonteraUTimu
                }),
            }).then(resp => {
                if(resp.ok) {
                    location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }

        const dodajVolonteraDiv=document.createElement("div");
        dodajVolonteraDiv.className="dodaj-volontera-div";
        leviDiv.appendChild(dodajVolonteraDiv);

        const dodajVolontera=document.createElement("h4");
        dodajVolontera.className="dodaj-volontera";
        dodajVolontera.textContent="Dodaj volontera:";
        dodajVolonteraDiv.appendChild(dodajVolontera);

        const imeVolontera=document.createElement("p");
        imeVolontera.textContent="Ime volontera:";
        imeVolontera.className="ime-volontera";
        dodajVolonteraDiv.appendChild(imeVolontera);

        const inputVolonterIme=document.createElement("input");
        inputVolonterIme.className="input-volonter-ime";
        dodajVolonteraDiv.appendChild(inputVolonterIme);

        const prezimeVolontera=document.createElement("p");
        prezimeVolontera.textContent="Prezime volontera:";
        prezimeVolontera.className="prezime-volontera";
        dodajVolonteraDiv.appendChild(prezimeVolontera);

        const inputVolonterPrezime=document.createElement("input");
        inputVolonterPrezime.className="input-volonter-prezime";
        dodajVolonteraDiv.appendChild(inputVolonterPrezime);

        const timKomeSeDodajeVolonter=document.createElement("p");
        timKomeSeDodajeVolonter.textContent="Dodaj u tim:";
        timKomeSeDodajeVolonter.className="dodaj-u-tim";
        dodajVolonteraDiv.appendChild(timKomeSeDodajeVolonter);

        const selectTim=document.createElement("select");
        selectTim.className="select-tim";
        dodajVolonteraDiv.appendChild(selectTim);
        this.nizTimova.forEach(timoviZaDodavajeVolontera => {
            const option=document.createElement("option");
            option.value=timoviZaDodavajeVolontera.id;
            option.textContent=timoviZaDodavajeVolontera.ime;
            selectTim.appendChild(option);   
        });

        
        const buttonDodajVolontera=document.createElement("button");
        buttonDodajVolontera.textContent="Dodaj volontera";
        buttonDodajVolontera.className="button-dodaj-volontera";
        dodajVolonteraDiv.appendChild(buttonDodajVolontera);

        buttonDodajVolontera.onclick=()=>{
            const imeVolonter = inputVolonterIme.value;
            const prezimeVolonter = inputVolonterPrezime.value; 
            const idTim = selectTim.value;
            if (imeVolonter === "" || prezimeVolonter === "" || idTim === ""){
                alert("Nevalidan unos podataka za volontera")
                return;
            }            

            const selektovaniTim = this.nizTimova.filter((nasTim) => nasTim.id == idTim)[0];
            if(selektovaniTim.nizVolontera.length >= selektovaniTim.maxBrojVolontera){
                alert("Nema mesta u timu");
                return;
            }

            fetch(`http://localhost:5000/CrveniKrst/NapraviVolontera/${idTim}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ime: imeVolonter,
                    prezime: prezimeVolonter
                }),
            }).then(resp => {
                if(resp.ok) {
                    location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }

        const azurirajIObrsiDiv=document.createElement("div");
        azurirajIObrsiDiv.className="azuriraj-i-obrisi-div";
        leviDiv.appendChild(azurirajIObrsiDiv);

        const azurirajVolontere=document.createElement("h4");
        azurirajVolontere.className="azuriraj-volontere";
        azurirajVolontere.textContent="Azuriraj volontere: ";
        azurirajIObrsiDiv.appendChild(azurirajVolontere);

        const imeClanaTima=document.createElement("p");
        imeClanaTima.textContent="Clan tima:"
        imeClanaTima.className="ime-clana-tima";
        azurirajIObrsiDiv.appendChild(imeClanaTima);

        const selectClana=document.createElement("select");
        selectClana.className="select-clana svi-volonteri";
        azurirajIObrsiDiv.appendChild(selectClana);
        this.nizVolontera.forEach(clanovi=>{
            const option=document.createElement("option");
            option.value= clanovi.id;
            option.textContent=`${clanovi.ime} ${clanovi.prezime}`;
            selectClana.appendChild(option); 
        });

        const imenaTimova=document.createElement("p");
        imenaTimova.textContent="Ime tima:"
        imenaTimova.className="ime-tima-za-azuriranje-i-brisanje";
        azurirajIObrsiDiv.appendChild(imenaTimova);

        const selectTimova=document.createElement("select");
        selectTimova.className="select-timova";
        azurirajIObrsiDiv.appendChild(selectTimova);
        this.nizTimova.forEach(timoviZaSelect=>{
            const option=document.createElement("option");
            option.value=timoviZaSelect.id;
            option.textContent=timoviZaSelect.ime;
            selectTimova.appendChild(option); 
        });

        const buttonAzuriraj=document.createElement("button");
        buttonAzuriraj.className="button-azuriraj";
        buttonAzuriraj.textContent="Promeni volonteru tim";
        azurirajIObrsiDiv.appendChild(buttonAzuriraj);

        buttonAzuriraj.onclick=()=>{
            const idTim = selectTimova.value;
            const idVolontera = parseInt(selectClana.value);

            const timZaPromenu = this.nizTimova.filter(tim => tim.id == idTim)[0];
            const volonterZaPromenu = this.nizVolontera.filter(volonter => 
                volonter.id == idVolontera)[0];
            
            const volonterVecUTimu = timZaPromenu.nizVolontera.filter(volonter => 
                volonter.id == idVolontera).length != 0;

            if(timZaPromenu == null || volonterZaPromenu == null || volonterVecUTimu) {
                alert("Greska!");
                return;
            }                

            fetch(`http://localhost:5000/CrveniKrst/PromeniTimVolonteru/${idTim}/${idVolontera}`, {
                method: "PUT",
            }).then(resp => {
                if(resp.ok) {
                    location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }


        const buttonObrisiVolontera=document.createElement("button");
        buttonObrisiVolontera.className="button-obrisi-volontera";
        buttonObrisiVolontera.textContent="Obrsi volontera";
        azurirajIObrsiDiv.appendChild(buttonObrisiVolontera);

        buttonObrisiVolontera.onclick=()=>{
            const idVolontera = parseInt(selectClana.value);

            const volonterZaBrisanje = this.nizVolontera.filter(volonter => 
                volonter.id == idVolontera)[0];

            if(volonterZaBrisanje == null) {
                alert("Greska!");
                return;
            }                

            fetch(`http://localhost:5000/CrveniKrst/ObrisiVolontera/${idVolontera}`, {
                method: "DELETE",
            }).then(resp => {
                if(resp.ok) {
                    location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }


    }

    desniDeo(glavniDiv){
        const desniDiv=document.createElement("div");
        desniDiv.className="desni-div";
        glavniDiv.appendChild(desniDiv);

        this.nizTimova.forEach(timovi =>{

            const red=document.createElement("div");
            timovi.nacrtaj(red);
            red.className="red";
            desniDiv.appendChild(red);
        });
    }
}