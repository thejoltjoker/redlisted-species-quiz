/**
 * Species Class
 * Represents a species of wildlife or plant.
 */
// import { PRIMARY_KEY } from "../../env.js";
// import ArtfaktaClient from "../services/artdatabanken/ArtfaktaClient.js";
// import INaturalistClient from "../services/iNaturalist/INaturalistClient.js";
import Endpoint from "./Endpoint.js";

export default class Species {
  /**
   * Constructor for the Species class.
   *
   * @param {Number} taxonId - The unique identifier for the species.
   * @param {String} swedishName - The Swedish name of the species.
   * @param {String} scientificName - The scientific name of the species.
   * @param {Number} iNaturlistId - The iNaturalist identifier for the species.
   * @param {boolean} [isRedlisted=false] - Indicates if the species is redlisted.
   * @param {Array} [photos=[]] - An array of photos associated with the species.
   */
  constructor(
    taxonId,
    swedishName,
    scientificName,
    iNaturlistId,
    isRedlisted = false,
    photos = []
  ) {
    this.taxonId = taxonId;
    this.swedishName = swedishName;
    this.scientificName = scientificName;
    this.iNaturlistId = iNaturlistId;
    this.isRedlisted = isRedlisted;
    this.photos = photos;

    // Properties to be populated with data from various sources.
    this.englishName = null;
    this.speciesData = null;
    this.redlistInfo = null;
    this.speciesFactText = null;
    this.taxonRelatedInformation = null;
    this.natureConservation = null;
    this.landscapeTypes = null;
    this.biotopes = null;

    // this.getSpeciesData()
    // .then((response) => {
    //   // console.log(`Got data for species ${this.taxonId}`, response);
    // })
    // .catch((error) => {
    //   throw new Error(error);
    // });
  }

  /**
   * Asynchronously fetches and populates species data from Artfakta.
   *
   * @param {boolean} [populate=true] - If true, populates the instance properties.
   * @returns {Object} - Species data fetched from Artfakta.
   */
  async getSpeciesData(populate = true) {
    try {
      const url = Endpoint.speciesData(this.taxonId);
      const response = await fetch(url);
      const responseJson = await response.json();
      // console.log(responseJson);

      const data = responseJson[0];
      if (populate) {
        this.assignAttributesFromObject(data);
        this.assignAttributesFromObject(data.speciesData);
      }
      this.scientificName = data.scientificName;
      this.speciesData = data.speciesData;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }

    return this.speciesData;
  }

  /**
   * Assigns attributes from an object to the class instance, even if they don't exist in the class.
   *
   * @param {Object} object - Object containing attributes to assign.
   */
  assignAttributesFromObject(object) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && key in this) {
        this[key] = object[key];
      }
    }
  }

  /**
   * Asynchronously fetches and sets the iNaturalist ID for the species.
   *
   * @returns {Number} - The iNaturalist identifier for the species.
   */
  async getInaturalistId() {
    if (!this.iNaturlistId) {
      try {
        // const inat = new INaturalistClient();
        let query = this.scientificName
          ? this.scientificName
          : this.englishName; // You may want to define 'englishName' in your class if it's used here.
        // const inatId = await inat.getIdFromScientificName(query);
        const response = await fetch(Endpoint.id(query));
        const responseJson = await response.json();
        this.iNaturlistId = responseJson;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    }

    return this.iNaturlistId;
  }

  /**
   * Asynchronously fetches and populates photos for the species from iNaturalist.
   *
   * @returns {Array} - An array of photos associated with the species.
   */
  async getPhotos() {
    try {
      // const inat = new INaturalistClient();

      const inatId = this.iNaturlistId
        ? this.iNaturlistId
        : this.getInaturalistId();

      // const taxa = await inat.getTaxa([inatId]);
      const response = await fetch(Endpoint.taxa([inatId]), { method: "POST" });
      const responseJson = response.json();
      this.photos = responseJson.results[0].taxon_photos.map(
        (item) => item.photo
      );
      return this.photos;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
