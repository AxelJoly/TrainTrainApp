

export class UrlBuilder {

  constructor(private url: string, private token: string) {

  }
  //https://api.sncf.com/v1/coverage/sncf/journeys?from=5.38064989%3B43.30272986&to=5.92945828%3B43.12831598&
  //https://api.sncf.com/v1/coverage/sncf/journeys?from=2.37346237%3B48.84492163&to=5.38064989%3B43.30272986&
  public getUrlForGetDepartures(startLong: string, startLat: string, finalLong: string, finalLat: string) {
    let url = this.appendToken(`${this.url}from=${startLong}%3B${startLat}&to=${finalLong}%3B${finalLat}&`);
    console.log(url);
    return url;
  }

  private appendToken(url: string): string {
    if (this.token) {
      return url + `&apiKey=${this.token}`;
    }
    return url;
  }


}
