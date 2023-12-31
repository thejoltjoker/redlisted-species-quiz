const axios = require("axios");

class TaxonomyClient {
  /**
   * Initializes a new TaxonomyClient instance.
   * @param {string} subscriptionKey - The subscription key required for accessing the Taxonomy API.
   */
  constructor(subscriptionKey) {
    // Define the default endpoints for the Taxonomy API.
    this.endpoints = {
      definitions:
        "https://api.artdatabanken.se/taxonlistservice/v1/definitions",
      taxa: "https://api.artdatabanken.se/taxonlistservice/v1/taxa",
      childIds:
        "https://api.artdatabanken.se/taxonservice/v1/taxa/{taxonId}/childids",
      filteredSelected:
        " https://api.artdatabanken.se/taxonservice/v1/taxa/{taxonId}/filteredSelected",
    };

    // Set the default headers for API requests.
    this.headers = {
      Accept: "*/*",
      "User-Agent": "Animal Quiz",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
    };
  }

  /**
   * Get child taxon IDs for a specified taxon.
   * @param {string} taxonId - The ID of the taxon for which child IDs are requested.
   * @param {boolean} useMainChildren - Indicates whether to use main children (default is true).
   * @returns {Promise} A Promise that resolves with the response from the API.
   * @throws {Error} Throws an error if the API request fails.
   */
  async getChildIds(taxonId, useMainChildren = true) {
    // Construct the API endpoint URL for fetching child taxon IDs.
    let endpoint = new URL(
      this.endpoints.childIds.replace(/{taxonId}/, taxonId)
    );
    endpoint.searchParams.append("useMainChildren", useMainChildren);

    try {
      const response = await axios.get(endpoint.href, {
        headers: this.headers,
      });
      return await response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  /**
   *
   *
   * @param {number|string} taxonId
   * @param {Array} taxonCategories
   * @param {boolean} [useMainChildren=true]
   * @return {*}
   * @memberof TaxonomyClient
   */
  async getFilteredSelectedTaxa(
    taxonId,
    taxonCategories,
    useMainChildren = true
  ) {
    // Construct the API endpoint URL for fetching child taxon IDs.
    let endpoint = new URL(
      this.endpoints.filteredSelected.replace(/{taxonId}/, taxonId)
    );
    endpoint.searchParams.append("taxonCategories", taxonCategories);
    endpoint.searchParams.append("useMainChildren", useMainChildren);

    try {
      const response = await axios.get(endpoint.href, {
        headers: this.headers,
      });
      return await response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  /**
   * Get a list of taxa based on a conservation list ID and specified output fields.
   * @param {number} conservationListId - The ID of the conservation list to retrieve taxa from.
   * @param {Array} outputFields - An array of output fields to include in the response (default fields are specified).
   * @returns {Promise} A Promise that resolves with the response from the API.
   * @throws {Error} Throws an error if the API request fails.
   */
  async getTaxonList(
    conservationListId,
    outputFields = ["id", "scientificname", "swedishname", "englishname"]
  ) {
    // Create a JSON body with the specified parameters for the request.
    let body = {
      conservationListIds: [conservationListId],
      outputFields: outputFields,
    };

    // Set the API endpoint URL for fetching taxa.
    let endpoint = this.endpoints.taxa;
    try {
      const response = await axios.post(endpoint, body, {
        headers: this.headers,
      });
      return await response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

module.exports.TaxonomyClient = TaxonomyClient;
