export default class Endpoint {
  static baseUrl = "http://localhost:8080";
  static speciesData(taxonId) {
    const url = `${this.baseUrl}/speciesdata/${taxonId}`;
    return url;
  }
  static id(query) {
    return `${this.baseUrl}/id/${encodeURIComponent(query)}`;
  }
  static taxa(ids) {
    return `${this.baseUrl}/taxa/${encodeURIComponent(ids)}`;
  }
}
