<?php include "php/functions.php"?>

<html>
<head>
  <link rel="stylesheet" href="css/slideshow.css" />
</head>
<body>
<h2>Slideshow</h2>

<select id="folderSelect">
  <?php
  //Get list of folders within the "images" folder on the server,
  // set these as options for the select element
  foreach (getFolders("images") as $folder) {
    echo "<option value=$folder>".basename($folder)."</option>";
  }
  ?>
</select>

<!-- Slideshow container -->
<div id="slideshow" class="slideshow-container">
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br />
<!-- Dots -->
<div id="dots" style="text-align: center"></div>

<script src="js/slideshow.js"></script>
<script>
  let folderSelector = document.getElementById("folderSelect");
  folderSelector.onchange = function() {
    populateSlideshow(folderSelector.value);
  }
  folderSelector.selectedIndex = 1;
  //Emulate a first click on the selector
  folderSelector.dispatchEvent(new Event('change'));
</script>
<body>

</html>