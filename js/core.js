const body = document.body;
let outsite = false;
const core = function () {
    return {
        init: () => {
            core.Submenu(),
            core.MobMenu(),
            core.Collapse()
        },
        // Показать BackGround
        BackgroundShow: () => {
            body.classList.add('popup__show');
        },
        // Скрыть Background
        BackgroundHide: () => {
            body.classList.remove('popup__show');
        },
        // FixedHeader: () => {
        //     window.addEventListener("scroll", function () {
        //         window.scrollY > 300 ? (body.classList.add("")) : (document.querySelector("").classList.remove(""));
        //     });
        // },

        // Работа с Background при вызове SubMenu
        Submenu: () => {
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
        // Работа с мобильным меню
        MobMenu: () => {
            let item__open = document.querySelector('.header__panel__mobile--navbar');
            let item__close = document.querySelector('.header__menu--mob__close');

            item__open.addEventListener('click', core.MobMenuOpen);
            item__close.addEventListener('click', core.MobMenuClose);
            // Слушаем весь документ, закрываем, если клик вне исключений.
            core.ClickOutside();
        },
        // Открываем мобильное меню
        MobMenuOpen: () => {
            body.classList.add('show__navbar');
            core.LockScreen();
            core.BackgroundShow();
        },
        // Закрываем мобильное меню
        MobMenuClose: () => {
            body.classList.remove('show__navbar');
            core.UnlockScreen();
            core.BackgroundHide();
        },
        // Блочим скролл 
        LockScreen: () => {
            body.style.paddingRight = window.innerWidth - document.getElementsByTagName('html')[0].clientWidth + 'px';
            body.classList.add('lock__screen');
        },
        // Разлочим скролл
        UnlockScreen: () => {
            body.style.paddingRight = null;
            body.classList.remove('lock__screen');
        },
        ClickOutside: () => {
            document.addEventListener('click', (e) => {
                if (!e.composedPath().includes(document.querySelector('.header__menu--mob')) && !e.composedPath().includes(document.querySelector('.header__panel__mobile--navbar'))) {
                    core.MobMenuClose();
                }
            })
        },
        Collapse: () => {
            let togglebuttons = document.querySelectorAll('[data-toggle="collapse"]');
            for (i = 0; i < togglebuttons.length; i++) {
                let target = togglebuttons[i];
                let toggletarget = togglebuttons[i].dataset.target;
                target.addEventListener('click', (e) => {
                    target.classList.toggle('collapsed');
                    let collapsed_block = document.querySelector(toggletarget);
                    let collapse = new ItcCollapse(collapsed_block);
                    collapse.toggle();
                })
            }
        }
    }
}();
core.init();

document.addEventListener('DOMContentLoaded', () => {
    console.log('123');
})


// // ScreenLock Для iPhone, но надо потестировать.
// let screen__lock = false;
// let bodyScrollTop = null;
// // Открываем
// if (!screen__lock) {
//     bodyScrollTop = (typeof window.scrollY !== 'undefined') ? window.scrollY : (document.documentElement || body.parentNode || body).scrollTop;
//     body.classList.add('lock__screen');
//     body.style.top = `-${bodyScrollTop}px`;
//     body.style.paddingRight = window.innerWidth - document.getElementsByTagName('html')[0].clientWidth + 'px';
//     screen__lock = true;
// };
// // Закрываем
// if (screen__lock) {
//     body.classList.remove('lock__screen');
//     body.style.top = null;
//     window.scrollTo(0, bodyScrollTop);
//     body.style.paddingRight = null;
//     screen__lock = false;
// }