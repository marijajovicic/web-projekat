export class Volonter{
    constructor(id, ime,prezime){
        this.id = id;
        this.ime="ime";
        if(typeof(ime)=="string")
            this.ime=ime;
        this.prezime="prezime";
        if(typeof(prezime)=="string")
            this.prezime=prezime;
    }

    nacrtaj(roditelj, sirina) {
        const volonter=document.createElement("div");
        volonter.className="volonter";
        volonter.id= this.id
        volonter.style.width=`${sirina}%`;
        volonter.textContent = `${this.ime[0]}.${this.prezime[0]}.`
        roditelj.appendChild(volonter);    

        volonter.onclick=()=>{
            alert(this.ime+" "+this.prezime);
        }
    }
}