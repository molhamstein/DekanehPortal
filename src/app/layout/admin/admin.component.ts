import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from '../../services/notifications.service';
import { ConstService } from '../../services/const.service';
import { not } from 'rxjs/util/not';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    animations: [
        trigger('mobileMenuTop', [
            state('no-block, void',
                style({
                    overflow: 'hidden',
                    height: '0px',
                })
            ),
            state('yes-block',
                style({
                    height: AUTO_STYLE,
                })
            ),
            transition('no-block <=> yes-block', [
                animate('400ms ease-in-out')
            ])
        ]),
        trigger('slideInOut', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(100%, 0, 0)'
            })),
            transition('in => out', animate('400ms ease-in-out')),
            transition('out => in', animate('400ms ease-in-out'))
        ]),
        trigger('slideOnOff', [
            state('on', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('off', style({
                transform: 'translate3d(100%, 0, 0)'
            })),
            transition('on => off', animate('400ms ease-in-out')),
            transition('off => on', animate('400ms ease-in-out'))
        ]),
        trigger('fadeInOutTranslate', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms ease-in-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translate(0)' }),
                animate('400ms ease-in-out', style({ opacity: 0 }))
            ])
        ])
    ]
})


export class AdminComponent implements OnInit {
    subscr: Subscription;
    navType: string; /* st1, st2(default), st3, st4 */
    themeLayout: string; /* vertical(default) */
    layoutType: string; /* dark, light */
    verticalPlacement: string; /* left(default), right */
    verticalLayout: string; /* wide(default), box */
    deviceType: string; /* desktop(default), tablet, mobile */
    verticalNavType: string; /* expanded(default), offcanvas */
    verticalEffect: string; /* shrink(default), push, overlay */
    vNavigationView: string; /* view1(default) */
    pcodedHeaderPosition: string; /* fixed(default), relative*/
    pcodedSidebarPosition: string; /* fixed(default), absolute*/
    headerTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */
    logoTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */
    innerHeight: string;
    windowWidth: number;
    username = '';
    clientType = ""
    toggleOn: boolean;

    headerFixedMargin: string;
    navBarTheme: string; /* theme1, themelight1(default)*/
    activeItemTheme: string; /* theme1, theme2, theme3, theme4(default), ..., theme11, theme12 */

    isCollapsedMobile: string;
    isCollapsedSideBar: string;
    notiCount = 0;
    newNoti: any[];
    chatToggle: string;
    chatToggleInverse: string;
    chatInnerToggle: string;
    chatInnerToggleInverse: string;

    menuTitleTheme: string; /* theme1, theme2, theme3, theme4, theme5(default), theme6 */
    itemBorder: boolean;
    itemBorderStyle: string; /* none(default), solid, dotted, dashed */
    subItemBorder: boolean;
    subItemIcon: string; /* style1, style2, style3, style4, style5, style6(default) */
    dropDownIcon: string; /* style1(default), style2, style3 */
    configOpenRightBar: string;
    isSidebarChecked: boolean;
    isHeaderChecked: boolean;

    @ViewChild('searchFriends') search_friends: ElementRef;

    /*  @ViewChild('toggleButton') toggle_button: ElementRef;
      @ViewChild('sideMenu') side_menu: ElementRef;*/

    constructor(public menuItems: MenuItems, public api: ApiService, private router: Router, private NotiHandler: NotificationsService, private c: ConstService) {
        this.menuItems;
        this.navType = 'st2';
        this.themeLayout = 'vertical';
        this.vNavigationView = 'view1';
        this.verticalPlacement = 'right';
        this.verticalLayout = 'wide';
        this.deviceType = 'desktop';
        this.verticalNavType = 'expanded';
        this.verticalEffect = 'shrink';
        this.pcodedHeaderPosition = 'fixed';
        this.pcodedSidebarPosition = 'fixed';
        this.headerTheme = 'theme5';
        this.logoTheme = 'theme5';
        this.toggleOn = true;
        this.headerFixedMargin = '80px';
        this.navBarTheme = 'themelight1';
        this.activeItemTheme = 'theme4';

        this.isCollapsedMobile = 'no-block';
        this.isCollapsedSideBar = 'no-block';

        this.chatToggle = 'out';
        this.chatToggleInverse = 'in';
        this.chatInnerToggle = 'off';
        this.chatInnerToggleInverse = 'on';

        this.menuTitleTheme = 'theme5';
        this.itemBorder = true;
        this.itemBorderStyle = 'none';
        this.subItemBorder = true;
        this.subItemIcon = 'style6';
        this.dropDownIcon = 'style1';
        this.isSidebarChecked = true;
        this.isHeaderChecked = true;
        const scrollHeight = window.screen.height - 150;
        this.innerHeight = scrollHeight + 'px';
        this.windowWidth = window.innerWidth;
        this.setMenuAttributes(this.windowWidth);
        setTimeout(() => {
            this.getNewNotiCount();
            this.getNewNoti().subscribe(data => {
                this.newNoti = data;
            });
        }, 3000);
    }

    getNewNotiCount(sound?) {
        return this.NotiHandler.getNewNotiCount().subscribe(data => {
            if ((this.notiCount < data['count'])) {
                this.playAudio();
            }
            this.notiCount = data['count'];

        });
    }

    getNewNoti() {
        return this.NotiHandler.getNewNoti();

    }

    playAudio() {
        let audio = new Audio();
        audio.src = '../../../assets/audio/noty.mp3';
        audio.load();
        audio.play();
    }
    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.clientType = localStorage.getItem('clientType');

        this.setBackgroundPattern('pattern2');
        this.subscr = Observable.interval(30000)
            .flatMap(() => this.getNewNoti())
            .subscribe(data => {
                this.newNoti = data;
                this.getNewNotiCount(true);

            });

    }

    seeMePlz() {
        this.NotiHandler.makeSeeAll().finally(() => {
        }).subscribe(() => {
            this.notiCount = 0;
        });
    }

    goToHell(noty) {
        if (noty.type == null)
            this.router.navigate([noty]);
        else if (noty.type == 'order') {
            this.router.navigate(['/orders/management']);

        } else if (noty.type == 'client') {
            this.router.navigate(['/client/edit/' + noty.clientId]);

        } else if (noty.type == 'rating') {
            this.router.navigate(['/ratings/list']);

        } else if (noty.type == 'forgetPassword') {
            this.router.navigate(['/client/edit/' + noty.clientId]);

        }
    }
    onResize(event) {
        this.innerHeight = event.target.innerHeight + 'px';
        /* menu responsive */
        this.windowWidth = event.target.innerWidth;
        let reSizeFlag = true;
        if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
            reSizeFlag = false;
        } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
            reSizeFlag = false;
        }
        /* for check device */
        if (reSizeFlag) {
            this.setMenuAttributes(this.windowWidth);
        }
    }

    setMenuAttributes(windowWidth) {
        if (windowWidth >= 768 && windowWidth <= 1024) {
            this.deviceType = 'tablet';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'push';
        } else if (windowWidth < 768) {
            this.deviceType = 'mobile';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'overlay';
        } else {
            this.deviceType = 'desktop';
            this.verticalNavType = 'expanded';
            this.verticalEffect = 'shrink';
        }
    }

    toggleOpened() {
        if (this.windowWidth < 768) {
            this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
        }
        this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    }

    onClickedOutside(e: Event) {
        if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
            this.toggleOn = true;
            this.verticalNavType = 'offcanvas';
        }
    }

    onMobileMenu() {
        this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
    }

    toggleChat() {
        this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
        this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
        this.chatInnerToggle = 'off';
        this.chatInnerToggleInverse = 'off';
    }

    toggleChatInner() {
        this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
        this.chatInnerToggleInverse = this.chatInnerToggleInverse === 'off' ? 'on' : 'off';
    }

    searchFriendList(event) {
        const search = (this.search_friends.nativeElement.value).toLowerCase();
        let search_input: string;
        let search_parent: any;
        const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
        Array.prototype.forEach.call(friendList, function (elements, index) {
            search_input = (elements.innerHTML).toLowerCase();
            search_parent = (elements.parentNode).parentNode;
            if (search_input.indexOf(search) !== -1) {
                search_parent.classList.add('show');
                search_parent.classList.remove('hide');
            } else {
                search_parent.classList.add('hide');
                search_parent.classList.remove('show');
            }
        });
    }

    toggleOpenedSidebar() {
        this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
    }

    toggleRightbar() {
        this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
    }

    setSidebarPosition() {
        this.isSidebarChecked = !this.isSidebarChecked;
        this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
    }

    setHeaderPosition() {
        this.isHeaderChecked = !this.isHeaderChecked;
        this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
        this.headerFixedMargin = this.isHeaderChecked === true ? '80px' : '';
    }

    setBackgroundPattern(pattern) {
        document.querySelector('body').setAttribute('themebg-pattern', pattern);
    }

    setLayoutType(type: string) {
        this.layoutType = type;
        if (type === 'dark') {
            this.headerTheme = 'theme6';
            this.navBarTheme = 'theme1';
            this.logoTheme = 'theme6';
            document.querySelector('body').classList.add('dark');
        } else {
            this.headerTheme = 'theme1';
            this.navBarTheme = 'themelight1';
            this.logoTheme = 'theme1';
            document.querySelector('body').classList.remove('dark');
        }
    }

    setNavBarTheme(theme: string) {
        if (theme === 'themelight1') {
            this.navBarTheme = 'themelight1';
        } else {
            this.navBarTheme = 'theme1';
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['auth', 'login']);
    }
}
