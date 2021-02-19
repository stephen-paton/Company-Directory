<?php
    /* Update Personnel ================================================================================================================================ */
    /* 1. Setup ===== */
    // Imports
    include("../../../../../portfolio-config/company-directory/config.php");
    include("../helpers/helpers.php");

    /* 2. Connect to companydirectory database ===== */
    // Attempt to connect
	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    // Error handling - Failure to connect
	if (mysqli_connect_errno()) {

        data_reject($conn, "300", "failure", "Database unavailable.", $execution_start_time);

	}
    
    /* 3. Validate Inputs ===== */
    // Check that POST data is valid
    $data = $_POST['data'];
    $expected_properties = ['personnelID, firstName', 'surname', 'email', 'departmentID'];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup Strings
    $first_name = cleanup_string($data['firstName']);
    $surname = cleanup_string($data['surname']);
 
    // Validate Strings
    $strings = [$first_name, $surname];
    $string_names = ['firstName', 'surname'];

    $valid = validate_strings($strings, $string_names);

    // Setup Email
    $email = cleanup_email($data['email']);

    // Validate Email
    if ($valid[0]) {

        $valid = validate_email($email, "email");

    }

    // Setup Ints
    $personnel_id = cleanup_int($data['personnelID']);
    $department_id = cleanup_int($data['departmentID']);

    // Validate Ints
    if ($valid[0]) {

        $ints = [$personnel_id, $department_id];
        $int_names = ['personnelID', 'departmentID'];

        $valid = validate_ints($ints, $int_names);

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Check if Personnel already exists ===== */
    // Setup query
    $query_string = <<<QUERY
        SELECT id as personnelID
        FROM personnel
        WHERE firstName = ?
            AND lastName = ?
            AND email = ?
            AND departmentID = ?
QUERY;

    $get_personnel_id = $conn->prepare($query_string);
    $get_personnel_id->bind_param('sssi', $first_name, $surname, $email, $department_id);
    
    // Execute Query
    $get_personnel_id->execute();

    // Capture Query Results
    $result = $get_personnel_id->get_result();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get personnel id).", $execution_start_time);

    }
 
    $data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }
    
    // If location ID wasn't obtained
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "A user with identical information already exists, so cannot update this user with the same information.", $execution_start_time);

    }

    /* 5. Update Personnel ===== */
    // Setup query
    $job_title = "";

    $query_string = <<<QUERY
        UPDATE personnel
        SET firstName = ?,
            lastName = ?,
            email = ?,
            jobTitle = ?,
            departmentID = ?
        WHERE id = ?
QUERY;

    $update_personnel = $conn->prepare($query_string);
    $update_personnel->bind_param('ssssii', $first_name, $surname, $email, $job_title, $department_id, $personnel_id);
    
    // Execute Query and Get Result
    $result = $update_personnel->execute();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (update personnel).", $execution_start_time);

    }
    
    /* 6. Return Results ===== */
    $data = [];
    
    data_return($conn, "200", "ok", "User was successfully updated.", $execution_start_time, $data);

?>