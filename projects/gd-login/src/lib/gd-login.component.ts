import { Component, OnDestroy   } from '@angular/core';
import { AfterViewInit          } from '@angular/core';
import { Input                  } from '@angular/core';
import { GDLoginService         } from './gd-login.service';
import { Buttons                } from 'gd-window';
import { IWindowAction          } from 'gd-window';
import { IGDWindowChild         } from 'gd-window';
import { ContentResponce        } from 'gd-window';
import { Subject, Subscription  } from 'rxjs';

@Component({
    selector:    'gd-login',
    templateUrl: './gd-login.component.html',
    styleUrls:  ['./gd-login.component.scss'],
})
export class GDLoginComponent implements AfterViewInit, OnDestroy, IGDWindowChild
{
    public  remember       : any    = false;
    private passwordKeeper : string = '';
    public  password       : string = '';
    public  userKeeper     : string = '';
    public  user           : string = '';
    public  message        : string = '';
    
    @Input() windowActionNotifier     : Subject<IWindowAction> | null = null;
    private  subscriptionWindowAction : Subscription           | null = null;

    private    window        : any;
    public get Window()      : any   { return this.window;         }
    @Input() 
    public set Window( value : any ) {        this.window = value; }

    constructor( private dataService: GDLoginService )
    {
        this.message  = '';
        this.user     = 'Paul';
        this.password = '123';
    }

    public  ngAfterViewInit()
    {
        if( this.windowActionNotifier )
        {
            this.subscriptionWindowAction = this.windowActionNotifier.subscribe( (windowAction : IWindowAction) => 
            {
                this.ParentWindowAction( windowAction );
            });
        }

        var data = localStorage.getItem( 'loginInfo' );
        if( data )
        {
            this.userKeeper     = this.user     = (data as any)['user'];
            this.passwordKeeper = this.password = (data as any)['password'];
            this.remember       = true;
        }
    }

    public ngOnDestroy()
    {
        this.subscriptionWindowAction?.unsubscribe();
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
        {
            next : data => this.OnLoadComplated_CheckPassword( data, windowAction ),
            error: err  => this.onRequestError( err, 'checkPassword' )
        });
    }

    private OnLoadComplated_CheckPassword( data : any, windowAction : IWindowAction )
    {
        let              responce = new ContentResponce(windowAction.action, windowAction.windowID, windowAction.windowName, data, 'OK', '', true, 500);
        windowAction.cb( responce );
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

    private hadBackendIsDown = false;

    private onRequestError( error: any, action = 'action' )
    {
        if( error.message === 'Backend is down' )
        {
            if( this.hadBackendIsDown ) return;
                this.hadBackendIsDown = true;

            action        = 'Backend is down.';
            error.message = 'Please contact support for help';
        }
       // to use this you have to install gd-slide-message component 
       // this.messageService.Add({ type : 'error', header: 'Error', content : [action, error.message]});
    }
}
