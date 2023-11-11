import "../main.css";
import Species from "../shared/Species.js";
import {
  constructArtfaktaUrl,
  getRedlistCategoryData,
  randomArrayItem,
  toTitleCase,
} from "../shared/utility.js";

export default class QuizInfoCard {
  /**
   * Creates an instance of QuizInfoCard.
   * @param {Species} species
   * @param {function} callback Callback function after the user clicks to move on
   * @memberof QuizInfoCard
   */
  constructor(species, callback) {
    this.species = species;
    species.swedishName
      ? (this.swedishName = toTitleCase(species.swedishName))
      : (this.swedishName = toTitleCase(species.scientificName));
    this.scientificName = toTitleCase(species.scientificName);
    this.element = document.createElement("div");
    this.element.classList = "col-span-full flex flex-col";
    this.textContainer = document.createElement("div");
    this.textContainer.classList = "w-full pt-2 sm:pt-3 md:pt-5";
    this.metaContainer = document.createElement("div");
    this.metaContainer.classList = "meta inline-flex w-full items-center";
    this.metaContainer.innerHTML = `<div class="flex flex-col justify-center pl-4">
    <h2 class="text-xl font-extrabold text-zinc-800 md:text-4xl md:font-black">
      ${this.swedishName}
    </h2>
    <p class="tracking-wider text-stone-500">
      ${this.scientificName}
    </p>
  </div>
  <a href="${constructArtfaktaUrl(
    this.species.scientificName,
    this.species.taxonId
  )}" target="_blank"
  class="ml-auto">
  <svg class="h-full w-14 cursor-pointer fill-white stroke-stone-400 transition hover:fill-blue-50 hover:stroke-sky-400"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
      stroke="currentColor">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          </a>`;

    // Redlist badge
    this.redlistBadge = this.createRedlistBadge(species);
    this.metaContainer.prepend(this.redlistBadge);

    this.about = document.createElement("p");
    this.about.classList = "mt-5";
    this.about.innerText = species.redlistInfo[0].criterionText;
    // Add text to container
    this.textContainer.append(this.metaContainer);
    this.textContainer.append(this.about);

    this.card = document.createElement("div");
    this.card.classList =
      "quiz-info-card h-30 group w-full overflow-hidden rounded-2xl border-4 border-zinc-800 bg-white p-2 drop-shadow-card transition sm:p-3 md:p-5";

    this.photoContainer = document.createElement("div");
    this.photoContainer.classList =
      "rounded-lg border-4 border-zinc-800 bg-stone-300";
    this.imgPlaceholder = document.createElement("div");
    this.imgPlaceholder.role = "status";
    this.imgPlaceholder.classList =
      "space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center w-full h-[35vh]";
    this.imgPlaceholder.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-stone-300">
      <svg class="w-10 h-10 text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" viewBox="0 0 20 18">
        <path
          d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    </div>`;
    this.img = document.createElement("img");
    this.img.classList =
      "h-[35vh] w-full object-cover object-center text-center text-stone-500";
    this.photoContainer.append(this.imgPlaceholder);
    if (!this.species.photos[0]) {
      try {
        this.setPhoto(this.species.photos[0]);
      } catch (error) {
        this.setPlaceholderError();
      }
      // this.species
      //   .getPhotos()
      //   .then((response) => {
      //     this.setPhoto(randomArrayItem(response)[1]);
      //   })
      //   .catch((error) => {
      //     this.setPlaceholderError();
      //     console.error(error);
      //   });
    } else {
      this.setPhoto(randomArrayItem(this.species.photos)[1]);
    }

    this.card.append(this.photoContainer);
    this.card.append(this.textContainer);

    this.element.append(this.card);
    // Create button
    this.continueButton = document.createElement("button");
    this.continueButton.classList =
      "w-full md:max-w-sm text-center transition bg-teal-300  hover:bg-red-400 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-pointer p-4 md:p-6 drop-shadow-card text-zinc-800 group-hover:text-red-950 text-xl md:text-4xl font-extrabold md:font-black flex-grow md:flex-grow-0 mt-3 mx-auto";
    this.continueButton.innerText = "Gå vidare";
    this.continueButton.onclick = callback;
    this.element.append(this.continueButton);
  }
  createRedlistBadge() {
    let redlist;
    if (!this.species.redlistInfo) {
      this.species.getSpeciesData().then((response) => {
        redlist = getRedlistCategoryData(response.redlistInfo[0].category);
      });
    } else {
      redlist = getRedlistCategoryData(this.species.redlistInfo[0].category);
    }

    const badge = document.createElement("div");
    badge.classList = `overflow-hidden rounded-2xl border-4 border-zinc-800 bg-${redlist.color} p-2 text-center drop-shadow-card transition sm:p-3 md:p-5`;

    badge.innerHTML = `
      <p class="text-xl font-extrabold text-white md:text-4xl md:font-black">
        ${redlist.category}
      </p>
      <p class="text-zinc-800">${redlist.title}</p>`;
    return badge;
  }

  setPlaceholderError() {
    this.imgPlaceholder.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-stone-300">
      <svg class="w-10 sm:w-12 md:w-14 h-10 text-stone-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    </div>`;
  }

  /**
   * @param {{ small_url: string; medium_url: string; large_url: string; }} photo - Photo object from iNaturalist
   */
  setPhoto(photo) {
    if (photo) {
      try {
        this.photoContainer.innerHTML = "";
        this.img.src = photo.small_url;
        this.img.src = photo.medium_url;
        // this.img.src = photo.large_url;

        this.photoContainer.append(this.img);
      } catch (error) {
        this.setPlaceholderError();
      }
    } else {
      this.setPlaceholderError();
    }
  }
}
