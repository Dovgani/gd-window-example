import { Injectable     } from '@angular/core';
import { HttpClient     } from '@angular/common/http';
import { HttpHeaders    } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GDLoginService 
{
    private httpOptions = 
    {        
        headers : new HttpHeaders( { 'Content-Type' : 'application/json' } )
    };

    private localUrl    = 'http://localhost:64598/api/'; 
    private url         = this.localUrl;

    constructor( private http : HttpClient ) 
    {
    }

    public checkPassword( user : string, password : string ) : Observable<any>
    {
        return of({data: ''});
    }
}
