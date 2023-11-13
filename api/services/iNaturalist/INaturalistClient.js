const axios = require("axios");
/**
 * Class representing a client for the iNaturalist API.
 * Extends the base ApiClient class.
 *
 * @export
 * @class INaturalistClient
 */

class INaturalistClient {
  /**
   * Initializes a new INaturalistClient instance.
   */
  constructor() {
    // Define the default endpoint for the iNaturalist API.
    this.endpoints = {
      taxa: "https://api.inaturalist.org/v1/taxa",
    };
  }

  /**
   * Search for taxa using specified parameters.
   * @param {Object} params - The search parameters for taxa.
   * @returns {Promise} A Promise that resolves with the response from the API.
   */
  async searchTaxa(params) {
    const searchParams = new URLSearchParams(params);

    const url = new URL(this.endpoints.taxa);
    url.search = searchParams;

    try {
      const response = await axios.get(url.href);
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get taxa information for a given list of iNaturalist IDs.
   * @param {Array} ids - The iNaturalist IDs to retrieve taxa for.
   * @returns {Promise} A Promise that resolves with the response from the API.
   */
  async getTaxa(ids) {
    const url = new URL(
      `${this.endpoints.taxa}/${encodeURIComponent(ids.join(","))}`
    );

    try {
      const response = await axios.get(url.href);
      return await response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get the iNaturalist ID for a taxon based on its scientific name.
   * @param {string} scientificName - The scientific name of the taxon.
   * @returns {number|null} The iNaturalist ID of the taxon, or null if not found.
   */
  async getIdFromScientificName(scientificName) {
    const params = {
      q: scientificName,
      is_active: "true",
      rank: "species",
      per_page: "1",
      only_id: "true",
      order: "desc",
      order_by: "observations_count",
    };

    try {
      const response = await this.searchTaxa(params);

      if (response.results.length > 0) {
        return response.results[0]["id"];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports.INaturalistClient = INaturalistClient;
