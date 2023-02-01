const searchEl = document.querySelector('div.search');
const searchInputEl = searchEl.querySelector('input');
console.log(searchEl, searchInputEl);

// 돋보기를 클릭해도 focus가 적용되도록 수정
searchEl.addEventListener('click', function(){
  searchInputEl.focus();
});
// 클래스를 추가하고 focus가 되면 속성추가
// 클릭하면 돋보기 안보이게 처리
// input에 요소 추가
searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  this.setAttribute('placeholder', '통합검색');
});
// focus가 해제되면 속성삭제
searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  this.setAttribute('placeholder', '');
});

// BADGE 영역처리
const badgeEl = document.querySelector('header div.badges');

// 버튼 toTop
const toTopEl = document.querySelector('div#to-top');

// console.log(badgeEl);

// 이벤트 발생 중복적으로 되는 부분을 제어
// 자바스크립트 외부 라이브러리를 사용한다.(lodash cdn)
window.addEventListener('scroll', _.throttle(function(){

  console.log(window.scrollY);
  // 배지 숨기기 & 보이기
  // 스크롤 양이 500이상이면
  if ( window.scrollY > 500 ) {
    // badgeEl.style.display = 'none';
    // gsap libs
    // gsap.to(요소, 지속시간, {옵션})
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 마지막 버튼이 보이게 처리
    gsap.to(toTopEl, .7, {
      x:0
    });
  } else {
    // badgeEl.style.display = 'block';
    // gsap libs
    // gsap.to(요소, 지속시간, {옵션})
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
        // 마지막 버튼이 안보이게 처리
        gsap.to(toTopEl, .7, {
          x:100
        });
  }

},300));

// to-top 버튼 클릭시 상단으로 이동
toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    // 플러그인 연결 시...
    scrollTo: 0
  });
})

// 순차적으로 visual안의 미지를 보여줌
// 이미지 부분 그룹처리(fade--in)
const fadeEls = document.querySelectorAll('section.visual div.fade--in');
// console.log(fadeEls);
fadeEls.forEach( function( fadeEl, index ){
  // console.log(fadeEl, index);
  // gsap.to(요소, 지속시간, {옵션})
  gsap.to(fadeEl, 1, {
    // index를 활용하여 순차적으로 화면에 출력
    // 0.7, 1.4, 2.1, 2.8
    delay: (index + 1) * .7,
    opacity: 1
  });
});

// 공지사항 부분의 슬라이드 구현
const swiper = new Swiper('div.notice-line div.swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

const swiper2 = new Swiper('div.promotion div.swiper' ,{
  // direction: 'horizontal',
  slidesPerView: 3, // 보여줄 요소 3개
  spaceBetween: 10, // 슬라이드 사이의 여백
  centeredSlides: true, // 1번 슬라이드 가운데
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: 'div.promotion div.swiper-pagination',
    clickable: true
  },
  navigation: {
    prevEl: 'div.promotion div.swiper-button-prev',
    nextEl: 'div.promotion div.swiper-button-next'
  }
});

const swiper3 = new Swiper('section.awards div.swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: 'section.awards div.swiper-button-prev',
    nextEl: 'section.awards div.swiper-button-next'
  }
});

// 토글버튼 클릭시 promation 닫힘 & 열림
const promotionEl = document.querySelector('div.promotion');
const promotionToggleBtn = document.querySelector('div.toggle-promotion');
console.log(promotionEl, promotionToggleBtn);

let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion;
  if ( isHidePromotion ) {
    // promotionEl.style.display = 'none';
    promotionEl.classList.add('hide');
  } else {
    // promotionEl.style.display = 'block';
    promotionEl.classList.remove('hide');
  }
});

// 범위 내의 숫자를 랜덤 함수(숫자 2자리까지)
/** random 함수 인자 최소값, 최대값 */
function random(min, max) {
  // .toFixed()를 통해 반환된 문자 데이터를
  // parseFloat()를 통해 소수점을 가지는 숫자 데이터로 반환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 유튜브 위 이미지 추가 애니메이션 효과
// gsap 애니메이션 요소, 지연, Y축 움직이는 범위

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    // 무한 반복, 자바스크립트에서 지원하는 동작
    repeat: -1,
    // 한번 재생된 애니메이션을 다시 실행
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  });
}
floatingObject('img.floating1', 1, 15);
floatingObject('img.floating2', .5, 15);
floatingObject('img.floating3', 1.5, 20);

// ScrollMagic cdn 연결
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach( function(spyEl) {
  // Scene() 매소드를 통해 여러 객체들을 변화에 대한 감시 옵션
  // addTo() 라이브러리를 사용하기 위한 옵션들
  new ScrollMagic
    .Scene({
      // 보여질 여부를 감시할 요소를 지정
      triggerElement: spyEl,
      // 화면의 높이를 0에서 1이라 보고 0.8 위치에 적용 
      // 기능이 걸려 있는 부분(실행위치)
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show') // show 클래스 추가/삭제
    .addTo(new ScrollMagic.Controller());
});

// footer year
const thisYear = document.querySelector('span.this-year');
thisYear.textContent = new Date().getFullYear();

// to-top 버튼을 클릭하면 문서의 상단으로 이동
// gsap에서 모든 기능들을 구현 한다면
// 로딩 시간등의 무거운 사이트가 됨
// 이를 보완하기 위해 별도 기능별로 구분
// gsap ScrollToTopPlugin cdn 사용
// window 이벤트에 적용