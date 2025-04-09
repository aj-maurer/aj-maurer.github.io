<?php
  //Return array of folders inside the given rootFolder
  function getFolders($rootFolder) {
    $folders = glob($rootFolder . '/*', GLOB_ONLYDIR);
    return $folders;
  }
?>