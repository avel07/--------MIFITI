const body = document.body;
let outsite = false;
const core = function () {
    return {
        init: () => {
            core.Submenu(),
                core.MobMenu(),
                core.Basket(),
                core.Personal(),
                core.Search(),
                core.ClickOutside(),
                core.AuthForm(),
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
            if (core.IsMobile()) {
                item__open.addEventListener('touchstart', core.MobMenuOpen);
                item__close.addEventListener('touchstart', core.MobMenuClose);
            }
            else {
                item__open.addEventListener('click', core.MobMenuOpen);
                item__close.addEventListener('click', core.MobMenuClose);
            }
        },
        // Открываем мобильное меню
        MobMenuOpen: () => {
            body.classList.add('show__navbar');
            core.LockScreen();
        },
        // Закрываем мобильное меню
        MobMenuClose: () => {
            body.classList.remove('show__navbar');
            core.UnlockScreen();
        },
        // Работа с корзиной
        Basket: () => {
            let item__open = document.querySelector('.header__panel__basket');
            let item__close = document.querySelector('.header__basket--close');
            if (core.IsMobile()) {
                item__open.addEventListener('touchstart', core.BasketOpen);
                item__close.addEventListener('touchstart', core.BasketClose);
            }
            else {
                item__open.addEventListener('click', core.BasketOpen);
                item__close.addEventListener('click', core.BasketClose);
            }
        },
        // Открываем корзину
        BasketOpen: () => {
            body.classList.add('show__basket');
            core.LockScreen();
        },
        // Закрываем корзину
        BasketClose: () => {
            body.classList.remove('show__basket');
            core.UnlockScreen();
        },
        // Работа с пользователем.
        Personal: () => {
            let item__open = document.querySelector('.header__panel__personal');
            let item__close = document.querySelector('.header__personal--close');
            if (core.IsMobile()) {
                item__open.addEventListener('touchstart', core.PersonalOpen);
                item__close.addEventListener('touchstart', core.PersonalClose);
            }
            else {
                item__open.addEventListener('click', core.PersonalOpen);
                item__close.addEventListener('click', core.PersonalClose);
            }
        },
        // Открываем пользователя.
        PersonalOpen: () => {
            body.classList.add('show__personal');
            core.LockScreen();
        },
        // Закрываем пользователя.
        PersonalClose: () => {
            body.classList.remove('show__personal');
            core.UnlockScreen();
        },
        // Работа с поиском
        Search: () => {
            let item__open = document.querySelector('.header__panel__search');
            let item__close = document.querySelector('.header__search--close');
            if (core.IsMobile()) {
                item__open.addEventListener('touchstart', core.SearchOpen);
                item__close.addEventListener('touchstart', core.SearchClose);
            }
            else {
                item__open.addEventListener('click', core.SearchOpen);
                item__close.addEventListener('click', core.SearchClose);
            }
        },
        // Открываем поиск
        SearchOpen: () => {
            body.classList.add('show__search')
            core.LockScreen();
        },
        // Закрываем поиск
        SearchClose: () => {
            body.classList.remove('show__search');
            core.UnlockScreen();
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
        // Клик вне блока.
        ClickOutside: () => {
            let overlay = document.querySelector('.overlay__blur');
            overlay.addEventListener('click', () => {
                core.MobMenuClose();
                core.BasketClose();
                core.PersonalClose();
                core.SearchClose();
            })
        },
        AuthForm: () => {
            let button = document.querySelector('button[type="submit"]');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (core.FormControl(e.target)) {
                    console.log('Отправляем форму Auth')
                }
            })
        },
        // Для проверки форм (Если обратить внимание, то он находит родителей кнопки). Семантика обязательно должна быть соблюдена!!!
        FormControl: (item__submit) => {
            let result = [],
                find__error = false
            let parents = item__submit.parentNode;
            for (i = 0; i < parents.length; i++) {
                if (parents[i].hasAttribute('aria-required')) {
                    if (parents[i].value === '') {
                        parents[i].classList.add('error');
                        result += false;
                    }
                    else {
                        parents[i].classList.remove('error');
                        result += true;
                    }
                }
            }
            find__error = result.match(/false/);
            if (find__error === null) {
                find__error = true
            }
            else {
                find__error = false
            }
            result = [];
            return find__error;
        },
        // Проверим, мобилка ли
        IsMobile: () => {
            let check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },
        // Collapse
        Collapse: () => {
            let togglebuttons = document.querySelectorAll('[data-toggle="collapse"]');
            for (i = 0; i < togglebuttons.length; i++) {
                let target = togglebuttons[i];
                let toggletarget = togglebuttons[i].dataset.target;
                target.addEventListener('click', (e) => {
                    target.classList.toggle('collapsed');
                    let collapsed_block = document.querySelector(toggletarget);
                    let collapse = new Collapse(collapsed_block);
                    collapse.toggle();
                })
            }
        },
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