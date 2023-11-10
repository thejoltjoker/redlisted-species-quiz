export const redlistCategories = [
  {
    category: "NT",
    title: "Nära hotad",
    color: "red-300",
  },
  {
    category: "LC",
    title: "Livskraftig",
    color: "emerald-500",
  },
  {
    category: "DD",
    title: "Kunskapsbrist",
    color: "zinc-400",
  },
  {
    category: "VU",
    title: "Sårbar",
    color: "red-400",
  },
  {
    category: "EN",
    title: "Starkt hotad",
    color: "red-500",
  },
  {
    category: "CR",
    title: "Akut hotad",
    color: "violet-500",
  },
  {
    category: "RE",
    title: "Nationellt utdöd",
    color: "slate-500",
  },
];

export const speciesGroups = [
  {
    scientificName: "vertebrata",
    swedishName: "ryggradsdjur",
    iconName: "vertebrata",
    color: "lime-300",
    taxonId: "6000993",
  },
  {
    scientificName: "mammalia",
    swedishName: "däggdjur",
    iconName: "mammalia",
    color: "lime-300",
    taxonId: "4000107",
  },
  {
    scientificName: "hexapoda",
    swedishName: "insekter",
    iconName: "hexapoda",
    color: "zinc-300",
    taxonId: "4000072",
  },
  {
    scientificName: "pisces",
    swedishName: "fiskar",
    iconName: "pisces",
    color: "blue-300",
    taxonId: "6000995",
  },
  {
    scientificName: "fungi",
    swedishName: "svampar",
    iconName: "fungi",
    color: "green-300",
    taxonId: "5000039",
  },
  {
    scientificName: "plantae",
    swedishName: "växter",
    iconName: "plantae",
    color: "rose-300",
    taxonId: "5000045",
  },
];

export const icons = [
  {
    name: "mammalia",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-400 transition" xmlns="http://www.w3.org/2000/svg"
    height="1em" viewBox="0 0 576 512">
    <path
d="M309.6 158.5L332.7 19.8C334.6 8.4 344.5 0 356.1 0c7.5 0 14.5 3.5 19 9.5L392 32h52.1c12.7 0 24.9 5.1 33.9 14.1L496 64h56c13.3 0 24 10.7 24 24v24c0 44.2-35.8 80-80 80H464 448 426.7l-5.1 30.5-112-64zM416 256.1L416 480c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V364.8c-24 12.3-51.2 19.2-80 19.2s-56-6.9-80-19.2V480c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V249.8c-28.8-10.9-51.4-35.3-59.2-66.5L1 167.8c-4.3-17.1 6.1-34.5 23.3-38.8s34.5 6.1 38.8 23.3l3.9 15.5C70.5 182 83.3 192 98 192h30 16H303.8L416 256.1zM464 80a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z" />
  </svg>`,
  },
  {
    name: "vertebrata",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-400 transition" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M153.7 144.8c6.9 16.3 20.6 31.2 38.3 31.2H384c17.7 0 31.4-14.9 38.3-31.2C434.4 116.1 462.9 96 496 96c44.2 0 80 35.8 80 80c0 30.4-17 56.9-42 70.4c-3.6 1.9-6 5.5-6 9.6s2.4 7.7 6 9.6c25 13.5 42 40 42 70.4c0 44.2-35.8 80-80 80c-33.1 0-61.6-20.1-73.7-48.8C415.4 350.9 401.7 336 384 336H192c-17.7 0-31.4 14.9-38.3 31.2C141.6 395.9 113.1 416 80 416c-44.2 0-80-35.8-80-80c0-30.4 17-56.9 42-70.4c3.6-1.9 6-5.5 6-9.6s-2.4-7.7-6-9.6C17 232.9 0 206.4 0 176c0-44.2 35.8-80 80-80c33.1 0 61.6 20.1 73.7 48.8z"/></svg>`,
  },
  {
    name: "hexapoda",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-400 transition" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
    <path d="M463.7 505.9c9.8-8.9 10.7-24.3 2.1-34.3l-42.1-49 0-54.7c0-5.5-1.8-10.8-5.1-15.1L352 266.3l0-.3L485.4 387.8C542.4 447.6 640 405.2 640 320.6c0-47.9-34-88.3-79.4-94.2l-153-23.9 40.8-40.9c7.8-7.8 9.4-20.1 3.9-29.8L428.5 90.1l38.2-50.9c8-10.6 6.1-25.9-4.3-34.1s-25.2-6.3-33.2 4.4l-48 63.9c-5.9 7.9-6.6 18.6-1.7 27.2L402.2 140 352 190.3l0-38.2c0-14.9-10.2-27.4-24-31l0-57.2c0-4.4-3.6-8-8-8s-8 3.6-8 8l0 57.2c-13.8 3.6-24 16.1-24 31l0 38.1L237.8 140l22.6-39.5c4.9-8.6 4.2-19.3-1.7-27.2l-48-63.9c-8-10.6-22.8-12.6-33.2-4.4s-12.2 23.5-4.3 34.1l38.2 50.9-23.9 41.7c-5.5 9.7-3.9 22 3.9 29.8l40.8 40.9-153 23.9C34 232.3 0 272.7 0 320.6c0 84.6 97.6 127 154.6 67.1L288 266l0 .3-66.5 86.4c-3.3 4.3-5.1 9.6-5.1 15.1l0 54.7-42.1 49c-8.6 10.1-7.7 25.5 2.1 34.3s24.7 7.9 33.4-2.1l48-55.9c3.8-4.4 5.9-10.2 5.9-16.1l0-55.4L288 344.7l0 63.1c0 17.7 14.3 32 32 32s32-14.3 32-32l0-63.1 24.3 31.6 0 55.4c0 5.9 2.1 11.7 5.9 16.1l48 55.9c8.6 10.1 23.6 11 33.4 2.1z"></path>
  </svg>`,
  },
  {
    name: "pisces",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-400 transition" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">      
    <path d="M275.2 38.4c-10.6-8-25-8.5-36.3-1.5S222 57.3 224.6 70.3l9.7 48.6c-19.4 9-36.9 19.9-52.4 31.5c-15.3 11.5-29 23.9-40.7 36.3L48.1 132.4c-12.5-7.3-28.4-5.3-38.7 4.9S-3 163.3 4.2 175.9L50 256 4.2 336.1c-7.2 12.6-5 28.4 5.3 38.6s26.1 12.2 38.7 4.9l93.1-54.3c11.8 12.3 25.4 24.8 40.7 36.3c15.5 11.6 33 22.5 52.4 31.5l-9.7 48.6c-2.6 13 3.1 26.3 14.3 33.3s25.6 6.5 36.3-1.5l77.6-58.2c54.9-4 101.5-27 137.2-53.8c39.2-29.4 67.2-64.7 81.6-89.5c5.8-9.9 5.8-22.2 0-32.1c-14.4-24.8-42.5-60.1-81.6-89.5c-35.8-26.8-82.3-49.8-137.2-53.8L275.2 38.4zM384 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
  </svg>`,
  },
  {
    name: "fungi",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-400 transition" height="800px" width="800px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
    <g>
      <path class="st0" d="M449.469,110.076C366.072,76.721,319.373,0,255.996,0C192.619,0,145.927,76.721,62.531,110.076   c-56.854,22.748-76.72,80.055-30.022,126.754c36.889,36.897,111.242,55.038,175.385,61.04   c-1.51,46.071-6.614,75.586-21.974,108.512c-19.72,42.254-5.64,92.962,42.254,104.228c47.896,11.267,75.778-48.14,81.695-101.416   c3.38-30.42,3.717-75.026,0.406-111.939c62.68-6.568,133.498-24.71,169.215-60.426C526.19,190.131,506.323,132.825,449.469,110.076   z"></path>
    </g>
    <script xmlns=""></script>
  </svg>`,
  },
  {
    name: "plantae",
    svg: `<svg class="h-full w-10 md:w-12 lg:w-14 fill-stone-800 stroke-stone-800 transition" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M4 14c0 2.333 1.4 7 7 7 0-2.333-1.4-7-7-7zm3-6V4l2.5 2L12 3l2.5 3L17 4v4c0 1.667-1 5-5 5S7 9.667 7 8zm13 6c0 2.333-1.4 7-7 7 0-2.333 1.4-7 7-7z"></path>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 21c-5.6 0-7-4.667-7-7 5.6 0 7 4.667 7 7zm0 0h1m0 0v-8m0 8h1m-1-8c-4 0-5-3.333-5-5V4l2.5 2L12 3l2.5 3L17 4v4c0 1.667-1 5-5 5zm1 8c5.6 0 7-4.667 7-7-5.6 0-7 4.667-7 7z"></path>
    <script xmlns=""></script>
  </svg>`,
  },
];
