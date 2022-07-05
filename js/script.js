let pokemonIn;
let nameOut;
let dexIdOut;
let typeOut;
let weightOut;
let heightOut;
let flavorOut;
let spriteOutSm;
let spriteOutBg;
let genusOut;

async function getPokemon(){
    
    let data = await response.json();

    let types = [];
    
    data.types.forEach(e => {
        types.push(e.type);    
    });
    
    return {
        dexId: data.id,
        name: data.name,
        type: types,
        weight: data.weight,
        height: data.height,
        sprite: data.sprites.front_default        
    }
}

async function getFlavor(){
    
    let data = await response.json();

    let flavor = getEnglishFlavor(data.flavor_text_entries);
    let genus = getEnglishGenus(data.genera);
    
    return {
        flavorText: flavor,
        genus: genus
    }
}

function getEnglishFlavor(data){
    let txt = 'This is indeed a pokemon.'

    for (let i = 0; i < data.length; i++) {
        if(data[i].language.name == 'en'){
            txt = data[i].flavor_text;
            break;
        }
    }

    return txt;
}
function getEnglishGenus(data){
    let txt = 'This is indeed a pokemon.'

    for (let i = 0; i < data.length; i++) {
        if(data[i].language.name == 'en'){
            txt = data[i].genus;
            break;
        }
    }

    return txt;
}

function getElements(){
    pokemonIn = document.getElementById('poke-input');
    nameOut = document.getElementById('name');
    dexIdOut = document.getElementById('dexId');
    typeOut = document.getElementById('type');
    weightOut = document.getElementById('weight');
    heightOut = document.getElementById('height');
    flavorOut = document.getElementById('flavor');
    spriteOutSm = document.getElementById('sprite-sm');
    spriteOutBg = document.getElementById('sprite-bg');
    genusOut = document.getElementById('genus');
}

function cFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

function launch(){
    let name = 'dragapult';


    getPokemon(name).then( (info) => {
        nameOut.innerText = cFL(info.name);
        dexIdOut.innerText = 'No. ' + info.dexId;
        weightOut.innerText = (parseFloat(info.weight) / 10) + ' kg';
        heightOut.innerText = (parseFloat(info.height) / 10) + ' m';

        typeOut.innerText = '';
        info.type.forEach(e => {
            typeOut.innerText += cFL(e.name);
        });

        spriteOutSm.src = info.sprite;
        spriteOutBg.src = info.sprite;
    });

    getFlavor(name).then( (info) => {
        let txt = info.flavorText.replaceAll('\n', ' ');
        genusOut.innerText = info.genus;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    launch();
});