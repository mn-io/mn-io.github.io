(function () {
  function getOffsetTop(element) {
    if (!element.getClientRects().length) {
      return 0
    }

    let rect = element.getBoundingClientRect()
    let win = element.ownerDocument.defaultView
    return rect.top + win.pageYOffset
  };

  function setBackground(contentNode, bgNode) {
    const imgNode = contentNode.querySelector('img#logo')
    const relevantImgCoverHeight = 0.92

    const imgHeight = imgNode.height
    const imgStart = window.getComputedStyle(imgNode).getPropertyValue("padding-top").replace('px', '')
    const imgOffset = getOffsetTop(imgNode)
    const bgHeight = +imgStart + imgOffset + imgHeight * relevantImgCoverHeight

    bgNode.style.height = `${bgHeight}px`
    bgNode.style.opacity = '1'
    bgNode.style.transition = 'height 0.7s, opacity 0.7s'
  };

  (function () {
    const contentNode = document.querySelector('table#welcome-header')
    const bgNode = document.querySelector('div#background')

    setBackground(contentNode, bgNode)
  }());

  (function () {
    const emailNode = document.querySelector('a#em')
    const email = 'business' + '@' + 'mnio' + '.net'
    emailNode.setAttribute('href', 'mailto://' + email)
    emailNode.innerHTML = email
  }());

  (function () {
    const starNodes = document.querySelectorAll('i.star')
    starNodes.forEach(function (node) {
      const starConfig = node.classList[1]
      let innerHTML = ''

      if (starConfig === 'learning') {
        innerHTML += '<i class="far fa-star-half"></i> in progress'
      } else {
        const numbers = starConfig.split('of')
        const rating = numbers[0]
        const max = numbers[1]
        for (let i = 0; i < rating; i++) {
          innerHTML += '<i class="fas fa-star" title="+"></i>'
        }
        for (let j = rating; j < max; j++) {
          innerHTML += '<i class="far fa-star"></i>'
        }
      }

      node.innerHTML = innerHTML
    })
  }());


  (function () {
    const tcRoot = "https://aj47ruvl7eteijestkgdxelwoi0cjuoj.lambda-url.eu-central-1.on.aws/mnio.net/business/"

    function fetch2(tag) {
      const img = new Image();
      img.src = tcRoot + tag;
    }

    window.addEventListener('load', () => {
      fetch2("enter/2");
    });

    window.addEventListener('beforeunload', () => {
      fetch2("leave/1");
    });
    window.addEventListener('unload', () => {
      fetch2("leave/2");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const key = Array.from(entry.target.classList).find(item => item.startsWith("tc-"))?.substring("tc-".length);
          fetch2("scroll/" + key);
        }
      });
    });

    document.querySelectorAll('.tc').forEach(element => {
      observer.observe(element);
    });

    document.addEventListener('click', function (event) {
      const link = event.target.closest('a');

      if (link) {
        //event.preventDefault();
        // console.log('Link clicked:', link.href);
        const tag = link.href.replace(/^(https?:\/\/|ftp:\/\/|file:\/\/|\/\/)/i, '').replace("#", ":hash:");
        fetch2("link/" + tag);
        // window.location.href = link.href;
      }
    });
  }());

})()
