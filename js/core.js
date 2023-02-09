const body = document.body;
let screen__lock = false;
let bodyScrollTop = null;
const core = function () {
    return {
        init: () => {
            core.ShowSubmenu(),
            core.ShowMobMenu()
        },
        BackgroundShow: () => {
            body.classList.add('popup__show');
        },
        BackgroundHide: () => {
            body.classList.remove('popup__show');
        },
        // FixedHeader: () => {
        //     window.addEventListener("scroll", function () {
        //         window.scrollY > 300 ? (body.classList.add("")) : (document.querySelector("").classList.remove(""));
        //     });
        // },
        ShowSubmenu: () => {
            let items = Array.from(document.querySelectorAll(".header__submenu")).map(i => i.parentNode);
            for (i = 0; i < items.length; i++) {
                items[i].addEventListener('mouseenter', () => {
                    core.BackgroundShow();
                })
                items[i].addEventListener('mouseleave', () => {
                    core.BackgroundHide();
                })
            }
        },
        ShowMobMenu: () => {
            let item__open = document.querySelector('.header__panel__mobile--navbar');
            // let item__close = document.querySelector('.')
            item__open.addEventListener('click', () => {
                body.classList.add('show__navbar');
                core.LockScreen();
            })
            // item__close.addEventListener('click', () => {
            //     body.classList.remove('show__navbar');
            // })
        },
        LockScreen: () => {
            if (!screen__lock) {
                bodyScrollTop = (typeof window.scrollY !== 'undefined') ? window.scrollY : (document.documentElement || body.parentNode || body).scrollTop;
                body.classList.add('lock__screen');
                body.style.top = `-${bodyScrollTop}px`;
                body.style.paddingRight = window.innerWidth - document.getElementsByTagName('html')[0].clientWidth + 'px';
                screen__lock = true;
            };
        },
        UnlockScreen: () => {
            if (screen__lock) {
                body.classList.remove('lock__screen');
                body.style.top = null;
                window.scrollTo(0, bodyScrollTop);
                body.style.paddingRight = null;
                screen__lock = false;
            }
        }
    }
}();
core.init();

document.addEventListener('DOMContentLoaded', () => {
    console.log('123');
})