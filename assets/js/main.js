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
          innerHTML += '<i class="fas fa-star"></i>'
        }
        for (let j = rating; j < max; j++) {
          innerHTML += '<i class="far fa-star"></i>'
        }
      }

      node.innerHTML = innerHTML
    })
  }());
})()
