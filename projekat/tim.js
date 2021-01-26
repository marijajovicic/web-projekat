import {Volonter} from "./volonter.js"

export class Tim{
    constructor(id, ime, nizVolontera, maxBrojVolontera){
        this.id = id;
        this.ime="Tim";
        if(typeof(ime)=="string")
            this.ime=ime;
        this.nizVolontera=nizVolontera;

        this.maxBrojVolontera=10;
        if(typeof(maxBrojVolontera)=="number" 
            && maxBrojVolontera > 0 
            && nizVolontera.length <= maxBrojVolontera)
            this.maxBrojVolontera=maxBrojVolontera;

        this.roditelj = null;
    }

    nacrtaj(roditelj){
        this.roditelj = roditelj;
        const leviDivDesno=document.createElement("div");
        roditelj.appendChild(leviDivDesno);
        leviDivDesno.className="levi-div-desno";

        const labela=document.createElement("label");
        labela.textContent=this.ime;
        leviDivDesno.appendChild(labela);

        const desniDivDesno=document.createElement("div");
        roditelj.appendChild(desniDivDesno);
        desniDivDesno.className="desni-div-desno";

        const volonteriUTimu=document.createElement("div");
        volonteriUTimu.className="volonteri-u-timu";
        desniDivDesno.appendChild(volonteriUTimu);

            this.nizVolontera.forEach(volonter => {
            const sirina=(1/this.maxBrojVolontera)*100;
            volonter.nacrtaj(volonteriUTimu, sirina);
        });
        
        const label=document.createElement("label");
        label.textContent=`${this.nizVolontera.length}/${this.maxBrojVolontera}`;
        label.className = 'broj-volontera-u-timu'
        desniDivDesno.appendChild(label);
    }

    nacrtajVolontera(volonter) {
        const volonteriUTimu = this.roditelj.querySelector(".volonteri-u-timu");
        const sirina=(1/this.maxBrojVolontera)*100;
        volonter.nacrtaj(volonteriUTimu, sirina);


        const label = this.roditelj.querySelector(".broj-volontera-u-timu");
        label.textContent=`${this.nizVolontera.length}/${this.maxBrojVolontera}`;
    }

    obrisiVolontera(volonter) {
        const volonterIzNiza = this.nizVolontera.filter(vol => vol.id == volonter.id)[0];
        

        if (volonterIzNiza == null)
            return;
        
        const indexVolontera = this.nizVolontera.indexOf(volonterIzNiza);

        this.nizVolontera = this.nizVolontera.filter((volonter, index) => index !== indexVolontera);

        const volonteriUTimu = this.roditelj.querySelector(".volonteri-u-timu");
        const volonterDiv = this.roditelj.querySelector(`#${this.id}`);
        volonteriUTimu.removeChild(volonterDiv);
        
        const label = this.roditelj.querySelector(".broj-volontera-u-timu");
        label.textContent=`${this.nizVolontera.length}/${this.maxBrojVolontera}`;
    }

    
}