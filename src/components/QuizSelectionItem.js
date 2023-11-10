import "../main.css";
import { icons } from "../shared/data.js";
import { toTitleCase } from "../shared/utility.js";

/**
 * Represents an item in a quiz selection interface.
 */
export default class QuizSelectionItem {
  /**
   * Constructor for QuizSelectionItem.
   *
   * @param {string} title - The title of the quiz selection item.
   * @param {string} subtitle - The subtitle of the quiz selection item.
   */
  constructor(title, subtitle, taxonId, iconName) {
    // Initialize properties with provided parameters.
    this.title = title;
    this.subtitle = subtitle;
    this.taxonId = taxonId;

    // Create the main element container.
    this.element = document.createElement("div");
    this.element.setAttribute("data-taxon", this.taxonId);
    this.element.classList =
      "col-span-full flex rounded-xl border-4 border-zinc-800 bg-white p-2 text-start drop-shadow-card sm:p-3 md:cursor-auto md:p-5";

    // Create and configure the icon badge.
    this.iconBadge = document.createElement("div");
    this.iconBadge.classList =
      "aspect-square rounded-2xl border-4 border-zinc-800 bg-zinc-300 p-2 text-center transition sm:p-3 md:p-5";
    // SVG icon for the badge.
    this.iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    this.iconBadge.innerHTML = icons.find((icon) => icon.name == iconName).svg;
    // `<svg class="h-full w-10 fill-stone-800 stroke-stone-400 transition" xmlns="http://www.w3.org/2000/svg"
    //     height="1em" viewBox="0 0 576 512">
    //     <path
    // d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
    //   </svg>`;

    // Create and configure the metadata container.
    this.metaContainer = document.createElement("div");
    this.metaContainer.classList =
      "flex flex-col justify-center pl-2 sm:pl-3 md:pl-5";

    // Create and configure the title element.
    this.metaTitle = document.createElement("h2");
    this.metaTitle.classList = "font-title text-2xl font-black md:text-4xl";
    this.metaTitle.innerText = toTitleCase(this.title);

    // Create and configure the subtitle element.
    this.metaSubtitle = document.createElement("h3");
    this.metaSubtitle.classList = "text-lg text-stone-500";
    this.metaSubtitle.innerText = toTitleCase(this.subtitle);

    // Append title and subtitle to the metadata container.
    this.metaContainer.append(this.metaTitle, this.metaSubtitle);

    // Create and configure the play button.
    this.playButton = document.createElement("button");
    this.playButton.setAttribute("data-taxon", this.taxonId);
    this.playButton.classList =
      "ml-auto cursor-pointer overflow-hidden rounded-2xl border-4 border-zinc-800 bg-teal-300 p-4 text-xl font-extrabold text-zinc-800 drop-shadow-card transition hover:bg-red-400 group-hover:text-red-950 md:flex-grow-0 md:p-6 md:text-2xl md:font-black 2xl:text-4xl";
    // Play button content, including SVG icon.
    this.playButton.innerHTML = `<svg class="h-full w-10 fill-stone-800 md:hidden" xmlns="http://www.w3.org/2000/svg" height="1em"
      viewBox="0 0 640 512">
      <path
          d="M274.9 34.3c-28.1-28.1-73.7-28.1-101.8 0L34.3 173.1c-28.1 28.1-28.1 73.7 0 101.8L173.1 413.7c28.1 28.1 73.7 28.1 101.8 0L413.7 274.9c28.1-28.1 28.1-73.7 0-101.8L274.9 34.3zM200 224a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM96 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 376a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM352 200a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM224 120a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm96 328c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H461.7c11.6 36 3.1 77-25.4 105.5L320 413.8V448zM480 328a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
    </svg>
    <span class="hidden md:block">Starta quiz</span>`;

    // Append icon badge, metadata container, and play button to the main element.
    this.element.append(this.iconBadge, this.metaContainer, this.playButton);
  }

  createIcon() {
    const element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    element.classList = `w-8 h-8 stroke-2 stroke-stone-800`;
    element.fill = "none";
    element.setAttribute("viewBox", "0 0 24 24");
    element.setAttribute("stroke-width", "1.5");
    element.setAttribute("stroke", "currentColor");
    element.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />`;
    return element;
  }
}
