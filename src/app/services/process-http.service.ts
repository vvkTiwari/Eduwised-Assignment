import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPService {

	characters:any =[];
  constructor(private http: HttpClient) { }

  	endpoint = 'https://swapi.co/api/';
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json'
	})
};

	public extractData(res: any) {
	  let body = res;
	  return body || { };
	}

	getPeople(): Observable<any> {
	  return this.http.get(this.endpoint + 'people/?format=json').pipe(
	    map(this.extractData),catchError(error => {	return this.handleError(error) }));
	}
	getSpecies(): Observable<any> {
	  return this.http.get(this.endpoint + 'species/?format=json').pipe(
	    map(this.extractData),catchError(error => {	return this.handleError(error) }));
	}
	getMovies(): Observable<any> {
	  return this.http.get(this.endpoint + 'films/?format=json').pipe(
	    map(this.extractData),catchError(error => {	return this.handleError(error) }));
	}
	getPeopleByLink(link: any): Observable<any> {
		console.log(link);
		return this.http.get(link+'?format=json')
		.pipe(map(this.extractData),catchError(error => { return this.handleError(error) }));
	}
	getPeopleIdByLink(link:any){
		let id= link.split('/')[5];
		return id;
	}


  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };

}
