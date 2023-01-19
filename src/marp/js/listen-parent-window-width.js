// https://stackoverflow.com/questions/67692892/mutation-observer-for-a-particular-div

var mo = new MutationObserver(function(list, _o) {
var numItems = list.length;
for (var i = 0; i < numItems; i++) {
  var m = list[i];
  if (m.type === 'attributes') {
    if (m.attributeName === 'class') {
      if (m.target.classList.contains('bespoke-marp-active')) {
        // console.log(m.target.querySelector('section'));
        // console.log(m.target.querySelectorAll('section'));
        var activeSlide = m.target.querySelector('section').getAttribute('data-marpit-pagination');
        document.querySelector('body[data-bespoke-view]').setAttribute('data-current-slide', activeSlide);
        // console.log(`The active slide is : ${activeSlide}`);
      }
    }
  }
}
});

mo.observe(document.querySelector('body[data-bespoke-view] > #p'), {
  attributes: true,
  childList: true,
  subtree: true
});

window.onload = (event) => {
  console.log("slide page is fully loaded");

  function windowRef () {
    try {
      if ( window.self !== window.top) return window.parent.document.querySelector('body');
      return window.document.querySelector('body');
    } catch (e) {
      console.log(e);
    }
  }

  var win = windowRef();
  // var root = document.documentElement;
  var _winWidth,
      winWidth = '100%',
      // _winHeight,
      // _sectionHeight,
      // sectionHeight = '720px',
      // slideHeight = 'unset',
      // foreignObjectHeight = document.querySelector('.bespoke-marp-slide.bespoke-marp-active > foreignObject').clientHeight,
      delay = 250, // delay after event is "complete" to run callback
      timeout,
      container = document.querySelector('body[data-bespoke-view] > #p');

  // container = document.createElement('div')
  container.style.cssText = `width:${winWidth};`;
  // container.setAttribute("id", "flex-slides");
  container.classList.add('flex-slides');
  // document.body.appendChild(container);

  // window.resize callback function
  function getDimensions() {
    _winWidth = Math.round(win.clientWidth);
    
    winWidth = `${_winWidth}px`;
    // console.log(`window width : ${winWidth}`);
    container.style.setProperty('width', winWidth);
    // container.style.cssText = `width:${winWidth};`;

    // _winHeight = Math.round(win.clientHeight);
    // _sectionHeight = Math.round((1280 / (_winWidth / _winHeight)));
    // slideHeight = `${_winHeight}px`;
    // sectionHeight = `${_sectionHeight}px`;

    // function getForeignObjectHeight () {
    //   try {
    //     return Math.round(_winWidth / (1280 / 720));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // function getSectionMarginTop () {
    //   try {
    //     return Math.round(-Math.abs(((_sectionHeight / 2) - (getForeignObjectHeight() / 2)) / (1280 / 720)))
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // foreignObjectHeight = `${getForeignObjectHeight()}px`;
    // sectionMarginTop = `${getSectionMarginTop()}px`;
    // root.style.setProperty('--flex-slide-height', `calc(${slideHeight})`);
    // root.style.setProperty('--flex-foreign-object-height', `calc(${foreignObjectHeight})`);
    // root.style.setProperty('--flex-section-height', `calc(${sectionHeight})`);
    // root.style.setProperty('--flex-section-margin-top', `calc(${sectionMarginTop})`);
  }

  // window.resize event listener
  // https://web.archive.org/web/20220714020647/https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
  win.onresize = function() {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(getDimensions(), delay);
  };

  getDimensions();
};