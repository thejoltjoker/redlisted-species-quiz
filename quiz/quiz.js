import "../src/main.css";
import Quiz from "../src/components/Quiz.js";
import QuizSelectionItem from "../src/components/QuizSelectionItem.js";
import Endpoint from "../src/shared/Endpoint.js";
import { pingServer, sha256sum } from "../src/shared/utility.js";
import { speciesGroups } from "../src/shared/data.js";

const header = document.querySelector("header");
const quizContainer = document.querySelector("#quiz");
const quizBoard = document.querySelector("#quiz-board");

// Wake server
pingServer();

// const getSpecies = async (taxonId) => {
//   const client = new TaxonomyClient(TAXON_PRIMARY);
//   const allSpecies = await client.getFilteredSelectedTaxa(taxonId, [17]);
//   const allSpeciesSwedishNames = allSpecies.filter(
//     (species) => species.swedishName
//   );
//   const allIds = allSpeciesSwedishNames.map((i) => i.id);

//   // const allIdsWithSwedishName = allIds.map((id))

//   // 227 is the list id for redlisted species
//   const redlistedTaxonResponse = await client.getTaxonList(227, [
//     "id",
//     "scientificname",
//     "swedishname",
//   ]);

//   const redlistedSpecies =
//     redlistedTaxonResponse.natureConservationListTaxa[0].taxonInformation;

//   const filteredRedlistSpecies = redlistedSpecies.filter((item) =>
//     allIds.includes(item["id"])
//   );
//   const redlistedIds = redlistedSpecies.map((i) => i.id);

//   const redlisted = filteredRedlistSpecies;
//   const notRedlisted = allSpeciesSwedishNames.filter(
//     (item) => !redlistedIds.includes(item["id"])
//   );

//   return [notRedlisted, redlisted];
// };

// // Get redlisted animals
// const getRedlistedVertebrata = async () => {
//   const vertebrataTaxonId = speciesGroups.find(
//     (group) => (group.scientificName = "vertebrata")
//   ).taxonId;

//   const species = await getSpecies(227, vertebrataTaxonId, null);

//   return species;
// };

// // Get common animals
// const getCommonVertebrata = async (redlistAnimals) => {
//   const vertebrataTaxonId = speciesGroups.find(
//     (group) => (group.scientificName = "vertebrata")
//   ).taxonId;
//   // const animals = getCommonSpecies(redlistAnimals, vertebrataTaxonId);
//   const species = await getSpecies(1, vertebrataTaxonId, redlistAnimals);
//   return species;
// };

// const createButton = (id, text, color) => {
//   const button = document.createElement("button");
//   button.id = id;
//   button.className = `transition bg-${color}-300 hover:bg-${color}-400 border-4 border-zinc-800 rounded-2xl overflow-hidden p-4 md:p-6 drop-shadow-card text-zinc-800 text-xl md:text-4xl font-extrabold md:font-black flex-grow md:flex-grow-0`;
//   button.innerText = text;
//   return button;
// };

const getSpecies = async (taxonId) => {
  // Fetch all species based on the specified taxonId and taxonCategories
  // const allSpecies = await client.getFilteredSelectedTaxa(taxonId, [17]); // 17 = Art
  const url = `/api/species/${taxonId}?taxonCategories=${encodeURIComponent([
    17,
  ])}`;

  const allSpecies = await fetch(url);
  const allSpeciesJson = await allSpecies.json();

  // Filter out species without Swedish names
  const allSpeciesSwedishNames = allSpeciesJson.filter(
    (species) => species.swedishName
  );

  // Extract all species IDs with Swedish names
  const allIds = allSpeciesSwedishNames.map((i) => i.id);

  // Fetch redlisted species based on the conservation list ID and output fields
  // const redlistedTaxonResponse = await client.getTaxonList(
  //   227, // 227 = Rödlistade arter
  //   ["id", "scientificname", "swedishname"]
  // );
  // 227 = Rödlistade arter
  const redlistedTaxonResponse = await fetch(
    `/api/list/${227}?outputFields=${encodeURIComponent([
      "id",
      "scientificname",
      "swedishname",
    ])}`
  );
  const redlistedTaxonResponseJson = await redlistedTaxonResponse.json();

  // Extract taxon information for redlisted species
  const redlistedSpecies =
    redlistedTaxonResponseJson.natureConservationListTaxa[0].taxonInformation;

  // Filter redlisted species based on the IDs of all species with Swedish names
  const filteredRedlistSpecies = redlistedSpecies.filter((item) =>
    allIds.includes(item.id)
  );

  // Extract IDs of redlisted species
  const redlistedIds = redlistedSpecies.map((i) => i.id);

  // Separate species into redlisted and not redlisted categories
  const redlisted = filteredRedlistSpecies;
  const notRedlisted = allSpeciesSwedishNames.filter(
    (item) => !redlistedIds.includes(item.id)
  );

  // Return an array containing not redlisted and redlisted species
  return { redlisted: redlisted, notRedlisted: notRedlisted };
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
  let notRedlisted;
  let redlisted;
  try {
    // const response = await fetch(`${process.env.APIURI}/species/${taxonId}`);
    // const url = Endpoint.species(taxonId);
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error("Network response was not OK");
    // }
    // ({ notRedlisted, redlisted } = await response.json());
    ({ notRedlisted, redlisted } = await getSpecies(taxonId));
  } catch (error) {
    console.log("There has been a problem:", error);
  }

  // Set local storage
  window.localStorage.setItem("currentTaxon", JSON.stringify(taxonId));

  window.localStorage.setItem(
    await sha256sum("redlisted"),
    JSON.stringify(redlisted)
  );

  window.localStorage.setItem(
    await sha256sum("notRedlisted"),
    JSON.stringify(notRedlisted)
  );
  const quiz = new Quiz(10, notRedlisted, redlisted);
  quiz.start();
};

// Show quiz selection
quizSelection();
