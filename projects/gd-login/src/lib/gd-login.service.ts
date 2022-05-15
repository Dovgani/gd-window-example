import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { HttpHeaders    } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError     } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GDLoginService 
{
    private httpOptions = 
    {        
        headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
    };

    private localUrl    = 'http://localhost:64598/api/';  //.NET Core 3.0
    private url         = this.localUrl;
    private businessUrl = this.url + 'Security/';

    constructor( private http : HttpClient ) 
    {
    }

    public checkPassword( user : string, password : string ) : Observable<any>
    {
        return of({data: ''});
        return this.http.get<any>( this.businessUrl + 'CheckPassword?usr=' + user + '&psw=' + password )
                        .pipe(
                            catchError( this.handleError<string>('CheckPassword', null ) )
                        );
    }

    private handleError<T>( operation = 'operation', result?: T ) 
    {
        return (error: any): Observable<T> => 
        {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
      
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
      
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }       
}
