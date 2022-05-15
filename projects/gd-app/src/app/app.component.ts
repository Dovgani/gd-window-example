import { Component          } from '@angular/core';
import { ViewChild          } from '@angular/core';
import { LocationStrategy   } from '@angular/common';
import { GDWindowService    } from 'gd-window';
import { GDWindowComponent  } from 'gd-window';
import { IGDWindowConfig    } from 'gd-window';
import { GDLoginComponent   } from '../../../gd-login/src/lib/gd-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    title = 'gd-app';

    @ViewChild('myWindow') myWindow : GDWindowComponent;

    public myWindowConfig : IGDWindowConfig = 
    {
        left   : 100,
        top    : 100,
        width  : 500,
        height : 250,
        title  : 'GD window (default)',
        icon   : './assets/icons/Window.png'
    };  

    constructor( private windowService: GDWindowService, private locationStrategy: LocationStrategy )
    {
    }

    public  ngOnInit() : void
    {
        var myWindowConfig_dynamic : IGDWindowConfig = 
        {
            left   : 260,
            top    : 260,
            width  : 500,
            height : 250,
            title  : 'GD window (dynamic)',
            icon   : './assets/icons/Window.png',
        };  
    
        this.windowService.open( null, this.whenDynamicIsReady.bind(this), 
        { 
           windowConfig : myWindowConfig_dynamic, 
           childData    : undefined 
        });

        var x = 840;
        var y = 100;
        var w = 800;
        var h = 400;

        var modalPrentWindowConfig : IGDWindowConfig = 
        {
            left   : x,
            top    : y,
            width  : w,
            height : h,
            title  : 'GD window (modal parent)',
            icon   : './assets/icons/Window.png',
        };  
    
        this.windowService.open( null, this.whenDynamicIsReady.bind(this), 
        { 
           windowConfig : modalPrentWindowConfig, 
           childData    : undefined 
        });

        const modalWindowConfig : IGDWindowConfig = 
        {
            modalParentRect           : { left : x-1, top : y-1, width : w+2, height : h+2 },
            isModal                   : true,
            childMakesDecisionToClose : true,
            left                      : x + (w - 270)/2,
            top                       : y + (h - 168)/2,
            z                         : 45,
            width                     : 270,
            height                    : 168,
            title                     : 'Login',
            footer                    : '',
            icon                      : './assets/icons/User.png',
            ok                        : 'Login',
            cancel                    : 'Cancel',
            whenOKClick               : (data:any) => {},
            whenCancelClick           : (data:any) => {}
        }

        this.windowService.open( GDLoginComponent, this.whenDynamicIsReady.bind(this), 
        { 
           windowConfig : modalWindowConfig, 
           childData    : undefined 
        });
    }

    public  ngAfterViewInit() : void
    {
        // dissable back navigation button
                                                  history.pushState( null, null, location.href );
        this.locationStrategy.onPopState( () => { history.pushState( null, null, location.href ); });

        // disable browser contextmenu
        document.addEventListener( 'contextmenu',  (event : any) => event.preventDefault() );  
        window  .addEventListener( 'beforeunload', (event : any) => { alert('Bad idea to close'); } );   
    }

    private whenDynamicIsReady( window : GDWindowComponent, child : any )   
    {
        // add your code
    }    
}
