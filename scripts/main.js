var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function setDetails(imageURL, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageURL);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function corruptOtter(thumbnailArray) {
  var poorOtterNumber = Math.floor(Math.random() * 10);
  var poorOtter = thumbnailArray[poorOtterNumber];
  var imageURL = 'https://cdn.dribbble.com/users/977419/screenshots/3279713/tacocat1-fat.jpg';
  poorOtter.setAttribute('data-image-url', imageURL);
  thumbnailArray[poorOtterNumber] = poorOtter;
}

function resetOttersAndCorrupt() {
  var thumbnailArray = getThumbnailsArray();
  var arrayLength = thumbnailArray.length;
  for (var i = 0; i < arrayLength; i++) {
    var imgUrl = 'img/otter' + (i % 5 + 1) + '.jpg';
    thumbnailArray[i].setAttribute('data-image-url', imgUrl);
  }
  corruptOtter(thumbnailArray);
}

function ifTacocat() {
  var tacocatURL = 'https://cdn.dribbble.com/users/977419/screenshots/3279713/tacocat1-fat.jpg';
  var currentThumb = document.querySelector(DETAIL_IMAGE_SELECTOR);
  if (currentThumb.getAttribute('src') == tacocatURL) {
    resetOttersAndCorrupt();
  }
}
addEventListener('click', ifTacocat);

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  corruptOtter(thumbnails);
  thumbnails.forEach(addThumbClickHandler);
}
initializeEvents();
