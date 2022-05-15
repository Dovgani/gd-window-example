import { Component          } from '@angular/core';
import { AfterViewInit      } from '@angular/core';
import { ElementRef         } from '@angular/core';
import { Input              } from '@angular/core';
import { GDLoginService     } from './gd-login.service';
import { Buttons            } from 'gd-window';
import { IWindowAction      } from 'gd-window';
import { IGDWindowChild     } from 'gd-window';
import { ContentResponce    } from 'gd-window';
import { Subscription       } from "rxjs";

@Component({
    selector:    'gd-login',
    templateUrl: './gd-login.component.html',
    styleUrls:  ['./gd-login.component.css'],
})
export class GDLoginComponent implements AfterViewInit, IGDWindowChild
{
    public  remember       : boolean;
    private passwordKeeper : string;
    private window         : any;
    public  password       : string;
    public  userKeeper     : string;
    public  user           : string;
    public  message        : string;

              get Window()      : any   { return this.window;         }
    @Input()  set Window( value : any ) {        this.window = value; }

    private errorMessage : any;

    constructor( private dataService: GDLoginService )
    {
        this.message  = '';
        this.user     = 'Paul';
        this.password = '123';
    }

    public  ngAfterViewInit()
    {
        var data = localStorage.getItem( 'loginInfo' );
        if( data )
        {
            this.userKeeper     = this.user     = data['user'];
            this.passwordKeeper = this.password = data['password'];
            this.remember       = true;
        }
    }

    public  onKeyPress( event: any ): void
    {
        if( event.key              !== 'Enter'        ) return;
    //    if( event.currentTarget.id === 'userName'     ) $('#userPassword').focus();
    //    if( event.currentTarget.id === 'userPassword' ) $('#loginBtn'    ).focus();
    }

    public  onLogin( windowAction : IWindowAction )
    {
        if( this.remember )
        {
            if( this.user !== this.userKeeper || this.password !== this.passwordKeeper )
            {
                localStorage.setItem( 'loginInfo', JSON.stringify({ 'user': this.user, 'password': this.password }) );
            }
        }
        else
        {
            localStorage.removeItem( 'loginInfo' );
        }

        this.checkPassword( this.user, this.password, windowAction );
    }

    private checkPassword( user : string, password : string, windowAction : IWindowAction )
    {
        this.dataService.checkPassword(user, password).subscribe(
            data  => this.OnLoadComplated_CheckPassword( data,  windowAction ),
            error => this.OnLoadComplated_CheckPassword( error, windowAction )
        );
    }

    private OnLoadComplated_CheckPassword( data : any, windowAction : IWindowAction )
    {
        if( data.error )
        {
            alert('error');
        }
        else
        {
            var              responce = new ContentResponce(windowAction.action, windowAction.windowID, windowAction.windowName, data, 'OK', '', true, 500);
            windowAction.cb( responce );
        }
    }

    public  ParentWindowAction( windowAction : IWindowAction ) 
    {
        if( windowAction.windowID !== this.window.ID ) return;

        var responce = new ContentResponce( windowAction.action, windowAction.windowID, windowAction.windowName, null, 'OK', '', true );

        switch( windowAction.action ) 
        {
            case Buttons.close    : {                       windowAction.cb( responce ); }  break;
            case Buttons.minimaze : {                       windowAction.cb( responce ); }  break;
            case Buttons.ok       : { this.onLogin(windowAction);                        }  break;
            case Buttons.cancel   : {                       windowAction.cb( responce ); }  break;
            case Buttons.footer   : {                       windowAction.cb( responce ); }  break;
            default               : { responce.result = ''; windowAction.cb( responce ); }  break;
        }
    }      
}
