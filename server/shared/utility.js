import { redlistCategories } from "./data.js";

/**
 * Converts a string to title case.
 *
 * @param {string} str - The input string to be converted to title case.
 * @returns {string} - The input string in title case.
 */
export const toTitleCase = (str) => {
  return str.replace(/(^|\s)\S/g, (t) => {
    return t.toUpperCase();
  });
};

/**
 * Selects a random item from a given list and returns an array with the index and the item.
 *
 * @param {Array} list - The array from which a random item will be selected.
 * @returns {Array} - An array containing the index and the randomly selected item.
 */
export const randomArrayItem = (list) => {
  const index = Math.floor(Math.random() * list.length);
  return [index, list[index]];
};

/**
 * Filters out objects from an array based on a filter parameter and a list of values.
 *
 * @param {Array<Object>} dataArray - The array of objects to be filtered.
 * @param {Array} filterArray - The array of values used for filtering.
 * @param {string} filterParameter - The parameter in objects used for filtering.
 * @returns {Array<Object>} - The filtered array of objects.
 */
export const filterDataArray = (dataArray, filterArray, filterParameter) => {
  return dataArray.filter((item) =>
    filterArray.includes(item[filterParameter]),
  );
};

/**
 * Removes redlisted species from the common species array based on their ids.
 *
 * @param {Array} commonSpecies - The array of common species.
 * @param {Array} redlistedSpecies - The array of redlisted species.
 * @returns {Array} - A new array containing common species excluding redlisted ones.
 */
export const removeRedlistedFromCommon = (commonSpecies, redlistedSpecies) => {
  const redlistedIds = redlistedSpecies.map((item) => item["id"]);
  return commonSpecies.filter((item) => !redlistedIds.includes(item["id"]));
};

export const filterSpeciesList = (species, filterSpecies) => {
  const redlistedIds = filterSpecies.map((item) => item["id"]);
  return species.filter((item) => !redlistedIds.includes(item["id"]));
};

/**
 * Shuffles the elements of an array randomly.
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - A new array with elements shuffled randomly.
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Retrieves redlist category data based on the provided category code.
 *
 * @param {string} category - The redlist category code (e.g., "NT", "LC").
 * @returns {Object} - An object containing title, color, and category information.
 */
export const getRedlistCategoryData = (category) => {
  const categories = redlistCategories;
  const result = categories.find((element) =>
    category.toUpperCase().includes(element.category),
  );
  return result ?? {};
};

/**
 * Converts a string to kebab case.
 *
 * @param {string} input - The input string to be converted.
 * @returns {string} - The input string converted to kebab case.
 */
export const toKebabCase = (input) => {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$|-(?=-)/g, "");
};

/**
 * Constructs a URL for Artfakta based on scientific name and taxon id.
 *
 * @param {string} scientificName - The scientific name of the species.
 * @param {string} taxonId - The taxon id of the species.
 * @returns {string} - The constructed Artfakta URL.
 */
export const constructArtfaktaUrl = (scientificName, taxonId) => {
  return `https://artfakta.se/artinformation/taxa/${toKebabCase(
    scientificName,
  )}-${taxonId}`;
};

export const sha256sum = async (str) => {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(str),
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
};
