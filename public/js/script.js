//$(document).ready(function() {
//  // Click event - scroll to
//  function scrollToAnchor(aid){
//    var aTag = $("article[id='"+ aid +"']");
//    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
//  }
//
//
//
//  var $nav2 = $('#nav');
//  $nav2.on('click', 'a', function(e) {
//    var testObj = e.target;
//
//    if (testObj.href == undefined)
//      testObj = testObj.parentNode;
//
//    var link = testObj.getAttribute("href")
//
//    if (link.indexOf("twitter") == -1) {
//      link = link.replace('/#', '');
//      //console.log(link);
//      e.preventDefault();
//      scrollToAnchor(link);
//    }
//  });
//});
//
