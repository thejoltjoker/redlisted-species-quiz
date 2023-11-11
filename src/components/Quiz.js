import "../main.css";
import { randomArrayItem, sha256sum } from "../shared/utility.js";
import QuizCard from "./QuizCard.js";
import Species from "../shared/Species.js";
import QuizRound from "./QuizRound.js";
import QuizProgress from "./QuizProgress.js";
import QuizInfoCard from "./QuizInfoCard.js";
import QuizSummary from "./QuizSummary.js";
import Endpoint from "../shared/Endpoint.js";
// TODO Add error message to user if images fail to load
// TODO Add back button to quiz selection
// TODO Implement custom api
export default class Quiz {
  constructor(rounds = 10, commonSpecies, redlistedSpecies) {
    this.rounds = rounds;
    this.incorrect = commonSpecies;
    this.correct = redlistedSpecies;
    this.currentRound = 1;
    this.quizContainer = document.querySelector("#quiz");
    this.quizBoard = document.querySelector("#quiz-board");
    this.quizProgress = new QuizProgress();
    this.currentScore = 0;
    this.currentHearts = 3;
    this.totalHearts = 3;
  }

  start() {
    // Add progress bar
    this.quizContainer.prepend(this.quizProgress.element);
    this.quizProgress.element.classList.add("hidden");

    // create new round
    this.startRound();
  }

  updateHeader(subtitle) {
    const header = document.querySelector("header");
    header.innerHTML = `<div class="text-center bg-white border-4 border-zinc-800 rounded-xl overflow-hidden p-2 sm:p-3 md:p-5 drop-shadow-card">
    <h1 class="font-title text-2xl md:text-4xl font-black md:mb-3">
      En <span class="line-through decoration-4 decoration-red-600 text-stone-400">ska</span> är på väg bort
    </h1>
    <p class="text-lg">${subtitle}</p>
  </div>`;
  }

  async initRound() {
    const allSpecies = [];
    const cards = [];
    const promises = [];
    // console.log(this.correct.length, this.incorrect.length);

    // Pick 1 correct answer and 3 incorrect answers
    for (let i = 0; i < 4; ++i) {
      let newSpecies;
      let index;
      let randomSpecies;
      // Pick the correct answer first
      if (i == 0) {
        [index, randomSpecies] = randomArrayItem(this.correct);
        randomSpecies.isRedlisted = true;
        // Remove species from list
        this.correct.splice(index, 1);
      } else {
        [index, randomSpecies] = randomArrayItem(this.incorrect);
        randomSpecies.isRedlisted = false;
        // Remove species from list
        this.incorrect.splice(index, 1);
      }
      // Create new Species object
      newSpecies = new Species(
        randomSpecies.id,
        randomSpecies.swedishName,
        randomSpecies.scientificName,
        null,
        randomSpecies.isRedlisted, // Is not redlisted
        []
      );
      // Add to list of promises
      promises.push(newSpecies.getSpeciesData());
      allSpecies.push(newSpecies);
    }

    await Promise.all(promises);

    // Create cards for round
    allSpecies.map((species) => {
      const card = new QuizCard(species);
      cards.push(card);
    });

    // Map each species instance to a promise that calls getInaturalistId()
    this.getInatIdsAndPhotos(allSpecies, cards);

    const round = new QuizRound(cards, (result) => {
      // Determine what to do based on the result
      if (result[0]) {
        this.currentScore++;
        this.showSpeciesInfo(result[1]);
      } else {
        this.currentHearts--;
        this.quizProgress.updateHearts(this.currentHearts, this.totalHearts);
        if (this.currentHearts <= 0) {
          this.updateHeader("Bättre lycka nästa gång");
          this.showLoseScreen();
        }
      }
    });
    return round;
  }

  getInatIdsAndPhotos(allSpecies, cards) {
    const promises = allSpecies.map((spec) => spec.getInaturalistId());

    // Use Promise.all() to run them concurrently
    Promise.all(promises)
      // .then((results) => Promise.all(results.map((r) => r.json())))
      .then(async (inaturalistIds) => {
        // Create a new INaturalistClient instance
        // const inat = new INaturalistClient();

        // Use the retrieved inaturalistIds to fetch taxonomic information
        // const taxa = await inat.getTaxa(inaturalistIds);
        const url = Endpoint.taxa(inaturalistIds);
        console.log("url=" + url);
        const response = await fetch(url);
        const responseJson = await response.json();
        const taxa = responseJson.data;

        // Iterate through the cards
        for (const card of cards) {
          // Find the correct card object based on the inaturalist id of the species
          const t = taxa.results.find((obj) => {
            return card.species.iNaturlistId == obj.id;
          });

          const species = card.species;
          if (t.taxon_photos) {
            // Populate the species' photos from the retrieved taxon photos
            species.photos = t.taxon_photos.map((item) => item.photo);

            // Set a random photo for the species
            const randomPhoto = randomArrayItem(species.photos)[1];
            card.setPhoto(randomPhoto);
          } else {
            card.setPlaceholderError();
          }
        }
        // // Iterate through the results
        // for (const t of taxa.results) {
        //   // Find the correct card object based on the inaturalist id of the species
        //   const card = cards.find((obj) => {
        //     return obj.species.iNaturlistId == t.id;
        //   });
        //   const species = card.species;
        //   if (t.taxon_photos) {
        //     // Populate the species' photos from the retrieved taxon photos
        //     species.photos = t.taxon_photos.map((item) => item.photo);

        //     // Set a random photo for the species
        //     const randomPhoto = randomArrayItem(species.photos)[1];
        //     card.setPhoto(randomPhoto);
        //   } else {
        //     card.setPlaceholderError();
        //   }
        // }
      })
      .catch((error) => {
        // Handle errors if any of the promises are rejected
        console.error("Error:", error);
        for (const card of cards) {
          card.setPlaceholderError();
        }
        throw new Error(error);
      });
  }
  showSpeciesInfo(card) {
    // Get species data if it's not already existing
    if (!card.species.redlistInfo) card.species.getSpeciesData();
    const infoCard = new QuizInfoCard(card.species, () => {
      this.moveToNextRound();
    });
    this.clearQuizBoard();
    this.quizBoard.append(infoCard.element);
  }
  moveToNextRound() {
    this.currentRound++;
    if (this.currentHearts <= 0) {
      this.showLoseScreen();
    } else if (this.currentRound < this.rounds) {
      // Start the next round
      this.startRound();
    } else {
      // Quiz is complete
      this.showQuizSummary();
    }
  }

  async startRound() {
    const round = await this.initRound();
    this.updateHeader("Klicka på den rödlistade arten");
    this.clearQuizBoard();
    for (const card of round.cards) {
      this.quizBoard.append(card.element);
    }
    this.quizProgress.element.classList.remove("hidden");
    this.quizProgress.updateTextProgress(this.currentRound, this.rounds);
    this.quizProgress.updateProgressBar(this.currentRound, this.rounds);
    this.quizProgress.updateHearts(this.currentHearts, this.totalHearts);
  }

  showQuizSummary() {
    this.quizProgress.element.remove();
    this.clearQuizBoard();
    // this.quizBoard.innerHTML = `<h2 class="text-center text-2xl w-full col-span-2 mt-8 font-black">Färdig!<br>Du fick ${this.currentScore} av ${this.rounds}</h2>`;
    this.quizBoard.append(
      new QuizSummary(
        [this.currentScore, this.rounds],
        false,
        this.restartQuizCallback
      ).element
    );
  }

  showLoseScreen() {
    this.quizProgress.element.remove();
    this.clearQuizBoard();
    this.quizBoard.append(
      new QuizSummary(
        [this.currentScore, this.rounds],
        true,
        this.restartQuizCallback
      ).element
    );
    // this.quizBoard.innerHTML = `<h2 class="text-center text-2xl w-full col-span-2 mt-8 font-black">Aj aj aj, precis som de rödlistade arterna fick du slut på extra-liv...<br>Du fick ${this.currentScore} av ${this.rounds}</h2>`;
  }

  clearQuizBoard() {
    this.quizBoard.innerHTML = "";
  }

  async restartQuizCallback(event) {
    const button = event.target;
    button.innerText = "Laddar...";
    button.classList.remove("bg-teal-300");
    button.classList.remove("hover:bg-red-400");
    button.classList.add("bg-stone-300");
    button.classList.add("hover:bg-stone-400");
    button.classList.add("cursor-auto");

    const taxonId = JSON.parse(window.localStorage.getItem("currentTaxon"));
    // Prepare quiz
    let commonSpecies = JSON.parse(
      window.localStorage.getItem(await sha256sum("notRedlisted"))
    );
    let redlistedSpecies = JSON.parse(
      window.localStorage.getItem(await sha256sum("redlisted"))
    );
    const quiz = new Quiz(10, commonSpecies, redlistedSpecies);
    quiz.start();
  }
}
