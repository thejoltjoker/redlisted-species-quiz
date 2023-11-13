export default class Endpoint {
  static baseUrl = `/api`;
  // static baseUrl = `https://redlisted-species-quiz-server.onrender.com`;
  // static baseUrl = `http://localhost.com:8080`;
  static ping = `${this.baseUrl}/ping`;

  static speciesData(taxonId) {
    const url = `${this.baseUrl}/speciesdata/${taxonId}`;
    // console.log(url);
    return url;
  }

  static id(query) {
    const url = `${this.baseUrl}/id/${encodeURIComponent(query)}`;
    // console.log(url);
    return url;
  }

  static taxa(ids) {
    const url = `${this.baseUrl}/taxa/${encodeURIComponent(ids)}`;
    // console.log(url);
    return url;
  }

  static species(taxonId) {
    const url = `${this.baseUrl}/species/${encodeURIComponent(taxonId)}`;
    // console.log(url);
    return url;
  }
}
