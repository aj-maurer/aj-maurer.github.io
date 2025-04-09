<?php
//Check whether the folder is set in the URL
$folderName = isset($_GET['folder']) ? $_GET['folder'] : '';
$folderName = basename($folderName);
//Where is the image folder relative to this file
$dirPrefix = '../images/';
$folderPath = $dirPrefix.$folderName;
$images = glob("$folderPath/*.jpeg");
$images = array_map('getFinalFolderPath', $images);
$images = array_values($images);
echo json_encode($images);

//Get the path starting with the correct image folder
function getFinalFolderPath($filename) {
  global $folderName;
  return $folderName."/".basename($filename);
}
?>