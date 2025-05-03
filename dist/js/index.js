"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const abilitiesElement = document.querySelector(".abilities");
const nameElement = document.querySelector(".pokemon-name");
const baseStatsElement = document.querySelector(".basic-stats");
const locationsElement = document.querySelector(".locations");
const imageElement = document.querySelector(".poke-img");
const pokemonIdElement = document.querySelector("#poke-id");
const inputElement = document.querySelector("input");
const containerElement = document.querySelector(".container");
const infoElement = document.querySelector(".infos");
const searchButton = document.querySelector(".btn-search");
const typesElement = document.querySelector(".types");
const errorElement = document.querySelector(".failed_to_search");
const statsContainer = document.querySelector(".stats");
const titleElement = document.querySelector("#title");
const getPokemon = () => __awaiter(void 0, void 0, void 0, function* () {
    containerElement.style.display = "none";
    infoElement.style.display = "none";
    const loadingIndicator = document.getElementById("loading");
    loadingIndicator.style.display = "block";
    typesElement.innerText = "";
    statsContainer.innerHTML = "";
    errorElement.style.display = "none";
    titleElement.style.display = "none";
    try {
        nameElement.querySelectorAll("p").forEach((p) => p.remove());
        abilitiesElement.querySelectorAll("p").forEach((p) => p.remove());
        baseStatsElement.querySelectorAll("p").forEach((p) => p.remove());
        locationsElement.querySelectorAll("p").forEach((p) => p.remove());
        infoElement.style.borderRadius = "20px 20px 0 0";
        const pokemonName = inputElement.value.toLowerCase();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = yield fetch(url);
        const data = yield response.json();
        imageElement.src = data.sprites.other["official-artwork"].front_default;
        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = data.species.name;
        nameParagraph.style.textTransform = "capitalize";
        nameElement.appendChild(nameParagraph);
        pokemonIdElement.innerHTML = `#${data.id}`;
        data.abilities.forEach((abilityObj) => {
            const abilityParagraph = document.createElement("p");
            abilityParagraph.textContent = abilityObj.ability.name;
            abilitiesElement.appendChild(abilityParagraph);
        });
        data.stats.forEach((statObj) => {
            const statName = document.createElement("p");
            const statValue = document.createElement("p");
            const statWrapper = document.createElement("div");
            const statBar = document.createElement("div");
            const statBarProgress = document.createElement("div");
            statName.textContent = statObj.stat.name;
            statName.style.textTransform = "uppercase";
            statValue.textContent = statObj.base_stat;
            statValue.style.textAlign = "right";
            statValue.style.marginRight = "82px";
            statWrapper.classList.add("stats-inf");
            statBar.classList.add("bar");
            statBarProgress.classList.add("data");
            statBarProgress.style.width = `${statObj.base_stat}px`;
            statsContainer.appendChild(statWrapper);
            statWrapper.appendChild(statName);
            statWrapper.appendChild(statValue);
            statWrapper.appendChild(statBar);
            statWrapper.appendChild(statBarProgress);
        });
        const typeColors = {
            normal: "#A8A77A",
            fire: "#EE8130",
            water: "#6390F0",
            electric: "#F7D02C",
            grass: "#7AC74C",
            ice: "#96D9D6",
            fighting: "#C22E28",
            poison: "#A33EA1",
            ground: "#E2BF65",
            flying: "#A98FF3",
            psychic: "#F95587",
            bug: "#A6B91A",
            rock: "#B6A136",
            ghost: "#735797",
            dragon: "#6F35FC",
            dark: "#705746",
            steel: "#B7B7CE",
            fairy: "#D685AD",
        };
        data.types.forEach((typeObj) => {
            const typeTag = document.createElement("div");
            const typeName = typeObj.type.name;
            typeTag.textContent = typeName;
            typeTag.style.background = typeColors[typeName] || "#777777";
            typesElement.appendChild(typeTag);
        });
        const locationUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`;
        const locationResponse = yield fetch(locationUrl);
        const locationData = yield locationResponse.json();
        if (locationData.length > 0) {
            locationData.slice(0, 3).forEach((location) => {
                const locationParagraph = document.createElement("p");
                locationParagraph.textContent = location.location_area.name;
                locationsElement.appendChild(locationParagraph);
            });
        }
        else {
            const noLocationParagraph = document.createElement("p");
            noLocationParagraph.textContent = "Nenhuma localização encontrada";
            noLocationParagraph.style.fontStyle = "italic";
            noLocationParagraph.style.opacity = "50%";
            locationsElement.appendChild(noLocationParagraph);
        }
        containerElement.style.display = "grid";
        infoElement.style.display = "flex";
        inputElement.value = "";
    }
    catch (error) {
        console.log("Error. Failed to get pokemon informations");
        containerElement.style.display = "none";
        infoElement.style.borderRadius = "20px";
        pokemonIdElement.textContent = "";
        errorElement.style.display = "block";
        infoElement.style.display = "flex";
        titleElement.style.display = "block";
        inputElement.value = "";
    }
    finally {
        loadingIndicator.style.display = "none";
    }
});
searchButton.addEventListener("click", getPokemon);
inputElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        getPokemon();
    }
});
