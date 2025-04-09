class SlideshowImage {
  constructor(fileNumber, caption) {
    this.fileNumber = fileNumber;
    this.caption = caption;
  }
}

//Number specifies which file goes with which caption, not image order in slideshow
function populateSlideshow() {
  let imageInfo = [
    new SlideshowImage(1, "Shelf with hat and CD-Rs"),
    new SlideshowImage(2, "Shelf with many broken camera lenses"),
    new SlideshowImage(7, "Shelf with (plastic) skull and XBOX Kinect"),
    new SlideshowImage(8, "Coffee shelf"),
    new SlideshowImage(3, "Shelf with programming books"),
    new SlideshowImage(4, "Shelf with art books"),
    new SlideshowImage(5, "Shelf with mice, keyboards, insulin pump supplies"),
    new SlideshowImage(6, "Shelf with old notebooks and DVDs"),
    new SlideshowImage(9, "Shelf with ink cartridges"),
    new SlideshowImage(10, "Shelf with more ink cartridges"),
  ];

  let slideDummyText = `<div class="mySlides fade">
      <div class="numbertext">NUMBER</div>
      <img src="IMAGE" style="width:100%">
      <div class="text">CAPTION</div>
      </div>`;
  let dotDummyText = `<span class="dot" onclick="currentSlide(CURRENT_SLIDE_NUM)"></span>`;

  let slideshowContainer = document.getElementById("slideshow");
  let dotContainer = document.getElementById("dots");
  let slideshowContent = "";
  let dotContent = "";

  imageInfo.forEach(addImage);
  function addImage(value, index, array) {
    let i = index;
    let newText = slideDummyText
      .replace("NUMBER", (i + 1) + "/" + imageInfo.length)
      .replace("IMAGE", "images/shelf" + imageInfo[i].fileNumber + ".jpeg")
      .replace("CAPTION", imageInfo[i].caption);
    slideshowContent += newText;
    dotContent += dotDummyText.replace("CURRENT_SLIDE_NUM", i + 1);
  }
  //insertAdjacentHTML is used because there is other stuff in the slideshow container
  // already, and I want this new content to go in front of it.
  slideshowContainer.insertAdjacentHTML("afterbegin", slideshowContent);
  dotContainer.innerHTML = dotContent;
  showSlides();
}

//Below parts are mostly copied from W3Schools tutorial

let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  //Turn off display for all images
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  //Remove "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  //Display correct image and set correct dot to "active" class
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
