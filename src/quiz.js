import "./main.css";
import TaxonomyClient from "./services/artdatabanken/TaxonomyClient.js";
import { TAXON_PRIMARY } from "../env.js";
import {
  filterDataArray,
  filterSpeciesList,
  sha256sum,
} from "./shared/utility.js";
import Quiz from "./components/Quiz.js";
import { speciesGroups } from "./shared/data.js";
import QuizSelectionItem from "./components/QuizSelectionItem.js";
const header = document.querySelector("header");
const quizContainer = document.querySelector("#quiz");
const quizBoard = document.querySelector("#quiz-board");

const getSpecies = async (taxonId) => {
  const client = new TaxonomyClient(TAXON_PRIMARY);
  const allSpecies = await client.getFilteredSelectedTaxa(taxonId, [17]);
  const allSpeciesSwedishNames = allSpecies.filter(
    (species) => species.swedishName
  );
  const allIds = allSpeciesSwedishNames.map((i) => i.id);

  // const allIdsWithSwedishName = allIds.map((id))

  // 227 is the list id for redlisted species
  const redlistedTaxonResponse = await client.getTaxonList(227, [
    "id",
    "scientificname",
    "swedishname",
  ]);

  const redlistedSpecies =
    redlistedTaxonResponse.natureConservationListTaxa[0].taxonInformation;

  const filteredRedlistSpecies = redlistedSpecies.filter((item) =>
    allIds.includes(item["id"])
  );
  const redlistedIds = redlistedSpecies.map((i) => i.id);

  const redlisted = filteredRedlistSpecies;
  const notRedlisted = allSpeciesSwedishNames.filter(
    (item) => !redlistedIds.includes(item["id"])
  );

  return [notRedlisted, redlisted];
};

// Get redlisted animals
const getRedlistedVertebrata = async () => {
  const vertebrataTaxonId = speciesGroups.find(
    (group) => (group.scientificName = "vertebrata")
  ).taxonId;

  const species = await getSpecies(227, vertebrataTaxonId, null);

  return species;
};

// Get common animals
const getCommonVertebrata = async (redlistAnimals) => {
  const vertebrataTaxonId = speciesGroups.find(
    (group) => (group.scientificName = "vertebrata")
  ).taxonId;
  // const animals = getCommonSpecies(redlistAnimals, vertebrataTaxonId);
  const species = await getSpecies(1, vertebrataTaxonId, redlistAnimals);
  return species;
};

const createButton = (id, text, color) => {
  const button = document.createElement("button");
  button.id = id;
  button.className = `transition bg-${color}-300 hover:bg-${color}-400 border-4 border-zinc-800 rounded-2xl overflow-hidden p-4 md:p-6 drop-shadow-card text-zinc-800 text-xl md:text-4xl font-extrabold md:font-black flex-grow md:flex-grow-0`;
  button.innerText = text;
  return button;
};

const quizSelection = () => {
  // Set header
  header.innerHTML = `<div class="p-2 text-center sm:p-3 md:p-5">
<h1 class="font-title text-2xl font-black md:mb-3 md:text-4xl">
  Starta quiz
</h1>
<p class="text-lg">Välja en artgrupp för att starta quiz</p>
</div>`;

  // Place selection items
  quizBoard.innerHTML = "";
  for (const group of speciesGroups) {
    const item = new QuizSelectionItem(
      group.swedishName,
      group.scientificName,
      group.taxonId,
      group.iconName
    );
    item.playButton.onclick = startQuiz;
    quizBoard.append(item.element);
  }
};

const startQuiz = async (event) => {
  const button = event.target.closest("button[data-taxon]");
  const taxonId = button.getAttribute("data-taxon");

  button.innerText = "Laddar...";
  button.classList.remove("bg-teal-300");
  button.classList.remove("hover:bg-red-400");
  button.classList.add("bg-stone-300");
  button.classList.add("hover:bg-stone-400");
  button.classList.add("cursor-auto");

  // Prepare quiz
  // let commonSpecies = JSON.parse(
  //   window.localStorage.getItem(await sha256sum("notRedlisted")),
  // );
  // let redlistedSpecies = JSON.parse(
  //   window.localStorage.getItem(await sha256sum("redlisted")),
  // );

  // if (!commonSpecies || !redlistedSpecies) {
  //   [commonSpecies, redlistedSpecies] = await getSpecies(taxonId);
  // }

  const [commonSpecies, redlistedSpecies] = await getSpecies(taxonId);

  // Set local storage
  window.localStorage.setItem("currentTaxon", JSON.stringify(taxonId));
  // const redlistedSpecies = await getSpecies(227, taxonId, null);
  // const redlistAnimals = await getRedlistedVertebrata();
  window.localStorage.setItem(
    await sha256sum("redlisted"),
    JSON.stringify(redlistedSpecies)
  );

  // const commonSpecies = await getSpecies(1, taxonId, redlistedSpecies);
  // const commonAnimals = await getCommonVertebrata(redlistAnimals);
  window.localStorage.setItem(
    await sha256sum("notRedlisted"),
    JSON.stringify(commonSpecies)
  );
  const quiz = new Quiz(10, commonSpecies, redlistedSpecies);
  quiz.start();
};

quizSelection();
// const startQuizButton = document.querySelector("#start-quiz");
// startQuizButton.onclick = startQuiz;

// await getSpeciesIds(4000104);
