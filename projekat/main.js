import {Grad} from "./grad.js"
import {Tim} from "./tim.js"
import {Volonter} from "./volonter.js"


const dodajGradDiv = document.createElement("div");
document.body.appendChild(dodajGradDiv);

const dodajGradInput = document.createElement("input");
dodajGradDiv.appendChild(dodajGradInput);

const dodajGradButton = document.createElement("button");
dodajGradDiv.appendChild(dodajGradButton);
dodajGradButton.textContent = "Dodaj Grad";
dodajGradButton.onclick = (() => {
    const imeGrada = dodajGradInput.value;
    if(imeGrada === ''){
        alert("neispravan unos");
    }

    fetch("http://localhost:5000/CrveniKrst/NapraviGrad", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ime: imeGrada
        })        
    }).then(resp => {
        console.log(resp);
        if (resp.ok) {
            resp.json().then(data => {
                console.log(data);
                const timJson = data.nizTimova[0];
                const tim = new Tim(timJson.id, timJson.ime, timJson.nizVolontera, timJson.maxBrojVolontera);
                const timovi = [];
                timovi.push(tim);
                const grad = new Grad(data.id, data.ime, timovi, []);
                grad.nacrtaj();
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

fetch("http://localhost:5000/CrveniKrst/VratiGradove", {
    method: "GET"
}).then(resp => {
    if(resp.ok) {
        resp.json().then((data) => {
            data.forEach(gradJson => {
                const timoviJson = gradJson.nizTimova;
                const timovi = timoviJson.map(timJson => {
                    const nizVolontera = timJson.nizVolontera.map(volonterJson => {
                        const volonter = new Volonter(volonterJson.id, volonterJson.ime, volonterJson.prezime);
                        return volonter;
                    });
                const tim = new Tim(timJson.id, timJson.ime, nizVolontera, timJson.maxBrojVolontera);
                return tim;
                });

                const volonteri = gradJson.nizVolontera.map(volonterJson => {
                    const volonter = new Volonter(volonterJson.id, volonterJson.ime, volonterJson.prezime);
                    return volonter;
                });

                const grad = new Grad(gradJson.id, gradJson.ime, timovi, volonteri);
                console.log(grad);
                grad.nacrtaj();
            });
        });
    }
}).catch(err => {
    console.log(err);
});



