import "../main.css";
export default class QuizSummary {
  constructor(score, isLoseScreen = false, callback) {
    this.element = document.createElement("div");
    this.element.classList = "col-span-full mt-3 flex flex-col";
    const loseHtml = `<h1 class="font-title text-2xl md:text-4xl font-black md:mb-3">
    Typiskt...
  </h1>
  <p class="text-lg">Precis som de rödlistade arterna fick du också slut på extra-liv.</p>
  <p class="text-2xl font-black">Du fick ${score[0]} av ${score[1]}</p>`;
    const winHtml = `<h1 class="font-title text-2xl md:text-4xl font-black md:mb-3">
    Bra jobbat!
  </h1>
  <p class="text-lg">Du verkar ha koll på vilka arter som är rödlistade, vet du hur du hjälper dem?</p>`;
    const messageHtml = isLoseScreen ? loseHtml : winHtml;
    this.element.innerHTML = `
    <div
      class=" text-center bg-white border-4 border-zinc-800 rounded-xl overflow-hidden p-2 sm:p-3 md:p-5 drop-shadow-card">
      ${messageHtml}
    </div>
    
  `;
    this.button = document.createElement("button");
    this.button.classList =
      "w-full md:max-w-sm text-center transition bg-teal-300  hover:bg-red-400 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-pointer p-4 md:p-6 drop-shadow-card text-zinc-800 group-hover:text-red-950 text-xl md:text-4xl font-extrabold md:font-black flex-grow md:flex-grow-0 mt-3 mx-auto";
    this.button.innerText = "Spela igen";
    this.button.onclick = callback;
    this.element.append(this.button);
  }
}
