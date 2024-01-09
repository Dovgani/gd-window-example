import { Component          } from '@angular/core';
import { LocationStrategy   } from '@angular/common';
import { GDWindowService    } from 'gd-window';
import { GDWindowComponent  } from 'gd-window';
import { IGDWindowConfig    } from 'gd-window';
import { GDLoginComponent   } from 'projects/gd-login/src/lib/gd-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    public gdWindowDefualt : IGDWindowConfig = 
    {
        left          : 100,
        top           : 100,
        width         : 500,
        height        : 250,
        title         : 'GD window (default)',
        icon          : './assets/icons/Window.png',
        isIconVisible : true,
        isIconImage   : true
    };  

    constructor( private windowService: GDWindowService, 
                 private locationStrategy: LocationStrategy )
    {
    }

    public  ngOnInit() : void
    {
        let gdWindowDynamic : IGDWindowConfig = 
        {
            left        : 260,
            top         : 260,
            width       : 500,
            height      : 250,
            title       : 'GD window (dynamic)',
            icon        : './assets/icons/Window.png',
            isIconVisible : true,
            isIconImage   : true
        };  
    
        this.windowService.open( null, this.whenDynamicIsReady.bind(this), 
        { 
           windowConfig : gdWindowDynamic, 
           childData    : undefined 
        });

        let x = 840;
        let y = 100;
        let w = 800;
        let h = 400;

        let gdWindowParent : IGDWindowConfig = 
        {
            left          : x,
            top           : y,
            width         : w,
            height        : h,
            title         : 'GD window (modal parent)',
            icon          : './assets/icons/Window.png',
            isIconVisible : true,
            isIconImage   : true
        };  

        let parent = this.windowService.open( null, this.whenDynamicIsReady.bind(this), 
        { 
           windowConfig : gdWindowParent, 
           childData    : undefined 
        });

        let wLogin = 270;
        let hLogin = 168;

        // modal should have parent ID
        let gdLoginWindow : IGDWindowConfig = 
        {
            parentID                  : parent.ID,
            modalParentRect           : { left : x-1, top : y-1, width : w+3, height : h+3 },
            isModal                   : true,
            childMakesDecisionToClose : true,
            left                      : x + (w - wLogin)/2,
            top                       : y + (h - hLogin)/2,
            z                         : 45,
            width                     : wLogin,
            height                    : hLogin,
            title                     : 'Login',
            footer                    : '',
            icon                      : './assets/icons/User.png',
            isIconVisible             : true,
            isIconImage               : true,
            ok                        : 'Login',
            cancel                    : 'Cancel',
            whenOKClick               : (data:any) => {},
            whenCancelClick           : (data:any) => {}
        }

        this.windowService.open( GDLoginComponent, this.whenLoginIsReady.bind(this), 
        { 
           windowConfig : gdLoginWindow, 
           childData    : undefined 
        });
    }

    public  ngAfterViewInit() : void
    {
        // dissable back navigation button
                                                  history.pushState( null, '', location.href );
        this.locationStrategy.onPopState( () => { history.pushState( null, '', location.href ); });

        // disable browser contextmenu
        document.addEventListener( 'contextmenu',  (event : any) => event.preventDefault() );  
        window  .addEventListener( 'beforeunload', (event : any) => { alert('Bad idea to close'); } );   
    }

    private whenDynamicIsReady( window : GDWindowComponent, child : any )   
    {
        let divNode = document.createElement('div');
            divNode.style.margin = '4px 10px'; 
            divNode.innerHTML =       
            `<br>
            <b>Window exapmple created dynamically in code</b><br>
            <br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>
            Some plain test or html or Component<br>`;

        (child.el.nativeElement as HTMLElement).appendChild(divNode);
    }    

    private whenLoginIsReady( window : GDWindowComponent, child : any )   
    {
    }    
}
