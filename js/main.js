$(document).ready(function () {

  var setBackground = function (contentNode, bgNode) {
    var timeOut = 0
    var imgNode = contentNode.find('img#logo')

    var setBackgroundHeightHandler = function () {
      var relevantImgCoverHeight = 0.92

      var imgHeight = imgNode.height()

      if ((!imgHeight || imgHeight < 1)) {
        if (timeOut < 250) {
          console.log('retry to set header by img height:', imgHeight)
          timeOut += 10
          setTimeout(setBackgroundHeightHandler, timeOut)
          return
        }
        console.log('could not set header by img height', imgHeight)
      }

      var imgStart = imgNode.css('padding-top').replace('px', '')
      var imgOffset = imgNode.offset().top
      var bgHeight = +imgStart + imgOffset + imgHeight * relevantImgCoverHeight

      bgNode.animate({
        height: bgHeight,
        opacity: 1
      }, 'fast', function () {
        contentNode.addClass('after-bg-transition')
      })
    }

    setTimeout(setBackgroundHeightHandler, 0)
  };

  (function () {
    var contentNode = $('table#welcome-header')
    var bgNode = $('div#background')

    setBackground(contentNode, bgNode)
  }());

  (function () {
    var emailNode = $('a#em')
    var email = 'business' + '@' + 'mnio' + '.net'
    emailNode.attr('href', 'mailto://' + email)
    emailNode.html(email)
  }());

  (function () {
    var starNodes = $('i.star')
    starNodes.each(function (index, node) {
      var starConfig = node.classList[1]
      var innerHTML = ''

      if (starConfig === 'learning') {
        innerHTML += '<i class="far fa-star-half"></i> Future'
      } else {
        var numbers = starConfig.split('of')
        var rating = numbers[0]
        var max = numbers[1]
        for (var i = 0; i < rating; i++) {
          innerHTML += '<i class="fas fa-star"></i>'
        }
        for (var j = rating; j < max; j++) {
          innerHTML += '<i class="far fa-star"></i>'
        }
      }

      node.innerHTML = innerHTML
    })
  }());

  (function () {
    var toggles = $('a.hiddenToggle')
    var carretUp = '<i class="fas fa-caret-up"></i><span class="text">show less</span>'
    var carretDown = '<i class="fas fa-caret-down"></i><span class="text">show more</span>'

    toggles.each(function (i, node) {
      node.innerHTML = carretDown
    })
    toggles.click(function (node) {
      if (node.currentTarget.innerHTML === carretDown) {
        node.currentTarget.innerHTML = carretUp
      } else if (node.currentTarget.innerHTML === carretUp) {
        node.currentTarget.innerHTML = carretDown
      }
      var hiddenNodes = $('.hidden-tr')
      var nonHiddenNodes = $('.hidden-tr-no')

      hiddenNodes.addClass('hidden-tr-no').show('slow')
      nonHiddenNodes.removeClass('hidden-tr-no').hide('slow')
    })
  }())
})
