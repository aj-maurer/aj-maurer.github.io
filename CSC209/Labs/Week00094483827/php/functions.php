<?php

function getWeek($path) {
    $path = realpath($path);
    $file = basename($path);
    $week = getNumberFromEndOfString($file);
    return $week;
}

//Return number of any length from the end of a string, if there is no number return null
function getNumberFromEndOfString($s) {

    if (strlen($s == 0)) {
        return null;
    }

    //$characters is an array
    $characters = str_split($s);
    $index = count($characters) - 1;
    $digitCount = 0;
    while (is_numeric($characters[$index]) && $index > 0) {
        $digitCount++;
        $index--;
    }

    if ($digitCount == 0) {
        return null;
    } else {
        //returns a string, not an int, so leading zeros are preserved
        return substr($s, -$digitCount, $digitCount);
    }
}

?>