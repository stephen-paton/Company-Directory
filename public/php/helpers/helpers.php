<?php
/* Helpers ================================================================================================================================== */
/* Functions ===== */
/* ==================================================================================================================================================
General Helper Functions
===================================================================================================================================================== */
/* Wrap In Percentages ==============================================================================================================================
Description: Wraps the input string in percentages. */
function wrap_in_percentages($input_string, $wrap_type = "starts with") {

    if ($wrap_type == "starts with") {

        return $input_string . "%";

    } else if ($wrap_type == "contains") {

        return "%" . $input_string . "%";

    } else if ($wrap_type == "ends with") {

        return "%" . $input_string . "%";

    }

}

/* Remove Excess Whitespace =========================================================================================================================
Description: Removes excess whitespace from the input string. */
function remove_excess_whitespace($string_input) {

    $string_input = trim(preg_replace('/\s+/',' ', $string_input));

    return $string_input;

}

/* ==================================================================================================================================================
Data Cleanup
===================================================================================================================================================== */
/* Cleanup Int ===================================================================================================================================
Description: Cleans up SQL string input. */
function cleanup_int($input_int) {

    $input_int = intval($input_int);

    return $input_int;

}

/* Cleanup Ints ===================================================================================================================================
Description: Cleans up SQL string input. */
function cleanup_ints($input_ints) {

    foreach($input_ints as &$input_int) {

        $input_int = intval($input_int);

    }
    unset($input_int);

    return $input_ints;

}

/* Cleanup String ===================================================================================================================================
Description: Cleans up SQL string input. */
function cleanup_string($input_string) {

    $input_string = remove_excess_whitespace(ucwords($input_string));

    return $input_string;

}

/* Cleanup Email ====================================================================================================================================
Description: Cleans up SQL email input. */
function cleanup_email($input_string) {

    $input_string = remove_excess_whitespace($input_string);

    return $input_string;
    
}

/* ==================================================================================================================================================
Data Validation
===================================================================================================================================================== */
/* Contains Profanity (Helper) ===============================================================================================================================
Description: Checks if the input string contains profanity. */
function contains_profanity($input_string) {

    $profanity_array = file(__DIR__ . '/profanityList.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Remove all non-alphabetic and space characters
    $input_string = preg_replace('/[^a-zA-Z ]/', '', strtolower($input_string));

    // Check each word in the profanity array against the input string
    $profanity = false;
	foreach($profanity_array as $word) {

        $word = "\b" . $word . "\b";

        $regex = '/' . $word . '/';

        // If the profanity word is in the string, then return false
        if (preg_match($regex, $input_string)) {

            $profanity = true;
            return $profanity;

        }

    }

    // If no profanity word is in the string, then return true
    return $profanity;
}

/* Validate Array Keys ==============================================================================================================================
Description: Validates Array Keys. */
function validate_array_keys($array_input, $array_name, $expected_keys) {

    foreach ($expected_keys as $key) {

        if (!array_key_exists($key, $array_input)) {

            $valid = false;
            $description = "'" . $key . "'" . " was not supplied in the '" . $array_name . "' array.";

            return [$valid, $description];

        }

    }

    $valid = true;
    $description = "No issues found.";

    return [$valid, $description];
    
}

/* Validate String ==================================================================================================================================
Description: Validates SQL string input. */
function validate_string($input_string, $input_name) {

    $input_string = remove_excess_whitespace(ucwords($input_string));

    if (!is_string($input_string)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must be a string.";

        return [$valid, $description];

    }

    // Check that string isn't empty
    if (strlen(trim($input_string)) == 0) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must not be empty.";

        return [$valid, $description];

    }

    // Check that string length isn't over 50 characters long
    if (strlen($input_string) > 50) {

        $valid = false;
        $description = "'". $input_name . "'" . " cannot be longer than 50 characters.";

        return [$valid, $description];

    }

    // Check for profanity
    if (contains_profanity($input_string)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " cannot contain profanity.";

        return [$valid, $description];

    }

    // Check that string contains only whitespace, letters, commas, full-stops and hyphens (returns true on first non-allowed character)
    if (preg_match('/[^A-Za-z\,\.\']/', str_replace(' ', '', $input_string))) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must contain only letters, spaces, commas, full-stops and/or hyphens.";

        return [$valid, $description];

    }

    $valid = true;
    $description = "No issues found.";

    return [$valid, $description];

}

/* Validate Strings =================================================================================================================================
Description: Validates SQL string inputs. */
function validate_strings($input_strings, $input_names) {

    foreach ($input_strings as $i=>$input_string) {

        $valid = validate_string($input_string, $input_names[$i]);

        if (!$valid[0]) {

            return $valid;

        }

    }

    return $valid;

}


/* Validate Email ===================================================================================================================================
Description: Validates SQL email input. */
function validate_email($input_string, $input_name) {

    if (!is_string($input_string)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must be a string.";

        return [$valid, $description];

    }

    // Check that string isn't empty
    if (strlen(trim($input_string)) == 0) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must not be empty.";

        return [$valid, $description];

    }

    // Check that string length isn't over 50 characters long
    if (strlen($input_string) > 50) {

        $valid = false;
        $description = "'" . $input_name . "'" . " cannot be longer than 50 characters.";

        return [$valid, $description];

    }

    // Check for profanity
    if (contains_profanity($input_string)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " cannot contain profanity.";

        return [$valid, $description];

    }

    // Check that email is valid
    if (!filter_var($input_string, FILTER_VALIDATE_EMAIL)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must be a valid email.";

        return [$valid, $description];

    }

    $valid = true;
    $description = "No issues found.";

    return [$valid, $description];

}

/* Validate Int =====================================================================================================================================
Description: Validates SQL int input. */
function validate_int($input_int, $input_name) {

    // Check that ID is an int value
    if (!is_int($input_int)) {

        $valid = false;
        $description = "'" . $input_name . "'" . " must be an int.";

        return [$valid, $description];

    }

    $valid = true;
    $description = "No issues found.";

    return [$valid, $description];

}

/* Validate Ints =================================================================================================================================
Description: Validates SQL string inputs. */
function validate_ints($input_ints, $input_names) {

    foreach ($input_ints as $i => $input_int) {

        $valid = validate_int($input_int, $input_names[$i]);

        if (!$valid[0]) {

            return $valid;

        }

    }

    return $valid;

}

/* ==================================================================================================================================================
Data Return
===================================================================================================================================================== */
/* Data Reject ===========================================================================================================================================
Description: Returns rejection object to calling JS file. */
function data_reject(&$conn, $code, $name, $description, $execution_start_time) {

    $output['status']['code'] = $code;
    $output['status']['name'] = $name;
    $output['status']['description'] = $description;
    $output['status']['returnedIn'] = (microtime(true) - $execution_start_time) / 1000 . " ms";	
    $output['data'] = [];

    mysqli_close($conn);

    echo json_encode($output); 

    exit;

}

/* Data Return ===========================================================================================================================================
Description: Returns return object to calling JS file. */
function data_return(&$conn, $code, $name, $description, $execution_start_time, $data) {

    $output['status']['code'] = $code;
    $output['status']['name'] = $name;
    $output['status']['description'] = $description;
    $output['status']['returnedIn'] = (microtime(true) - $execution_start_time) / 1000 . " ms";
    $output['data'] = $data;

    mysqli_close($conn);

    echo json_encode($output); 

    exit;

}

?>