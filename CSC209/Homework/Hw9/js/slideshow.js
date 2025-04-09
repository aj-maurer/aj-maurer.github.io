function populateSlideshow(folder) {

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
  let basePath = "images/";

  //Send request to getImages.php to get a list of images from the given folder
  fetch(`./php/getImages.php?folder=${encodeURIComponent(folder)}`)
    .then((response) => response.json())
    //images is json-encoded array of image file names
    .then((images) => {
      //remove any existing slides
      let oldSlides = document.getElementsByClassName("mySlides");
      //getElementsByClassName returns an HTML collection, which has to be turned
      // into an array in order to use forEach
      oldSlides = Array.from(oldSlides);
      if (oldSlides.length > 0) {
        oldSlides.forEach((slide) => {
          slide.remove();
        });
      }
      //add new slides
      images.forEach(addImage);
      function addImage(value, index, array) {
        let i = index;
        let newText = slideDummyText
          .replace("NUMBER", i + 1 + "/" + images.length)
          .replace("IMAGE", basePath + images[i])
          .replace("CAPTION", "This is image number " + (i + 1));
        slideshowContent += newText;
        dotContent += dotDummyText.replace("CURRENT_SLIDE_NUM", i + 1);
      }
      //insertAdjacentHTML is used because there is other stuff in the slideshow container
      // already, and I want this new content to go in front of it.
      slideshowContainer.insertAdjacentHTML("afterbegin", slideshowContent);
      dotContainer.innerHTML = dotContent;
      currentSlide(1);
    })
    .catch((error) => {
      console.log(
        "There was an error getting the images from the server: ",
        error
      );
    });
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
