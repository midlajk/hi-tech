'use strict';
!(function () {
  var e = document.querySelector('#swiper-default'),
    i = document.querySelector('#swiper-with-arrows'),
    r = document.querySelector('#swiper-with-pagination'),
    t = document.querySelector('#swiper-with-progress'),
    n = document.querySelector('#swiper-with-scrollbar'),
    o = document.querySelector('#swiper-vertical'),
    s = document.querySelector('#swiper-multiple-slides'),
    w = document.querySelector('#swiper-3d-coverflow-effect'),
    p = document.querySelector('#swiper-3d-cube-effect'),
    a = document.querySelector('#swiper-3d-flip-effect'),
    l = document.querySelector('.gallery-thumbs'),
    c = document.querySelector('.gallery-top');
  let u;
  e && new Swiper(e, {slidesPerView: 'auto'}),
    i &&
      new Swiper(i, {
        slidesPerView: 'auto',
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      }),
    r &&
      new Swiper(r, {
        slidesPerView: 'auto',
        pagination: {clickable: !0, el: '.swiper-pagination'},
      }),
    t &&
      new Swiper(t, {
        slidesPerView: 'auto',
        pagination: {type: 'progressbar', el: '.swiper-pagination'},
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      }),
    n && new Swiper(n, {scrollbar: {hide: !0, el: '.swiper-scrollbar'}}),
    o &&
      new Swiper(o, {
        direction: 'vertical',
        pagination: {clickable: !0, el: '.swiper-pagination'},
      }),
    s &&
      new Swiper(s, {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {clickable: !0, el: '.swiper-pagination'},
      }),
    w &&
      new Swiper(w, {
        effect: 'coverflow',
        grabCursor: !0,
        centeredSlides: !0,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0,
        },
        pagination: {el: '.swiper-pagination'},
      }),
    p &&
      new Swiper(p, {
        effect: 'cube',
        grabCursor: !0,
        cubeEffect: {
          shadow: !0,
          slideShadows: !0,
          shadowScale: 0.94,
          shadowOffset: 20,
        },
        pagination: {el: '.swiper-pagination'},
      }),
    a &&
      new Swiper(a, {
        effect: 'flip',
        grabCursor: !0,
        pagination: {el: '.swiper-pagination'},
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      }),
    l &&
      (u = new Swiper(l, {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: !0,
        watchSlidesVisibility: !0,
        watchSlidesProgress: !0,
      })),
    c &&
      new Swiper(c, {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {swiper: u},
      });
})();
