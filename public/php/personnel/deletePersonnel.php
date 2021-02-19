<?php
    /* Delete Personnel ====================================================================================================================== */
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
    $data = $_POST["data"];
    $expected_properties = ["personnelID"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup ID
    $personnel_id = cleanup_int($data['personnelID']);

    // Validate ID
    if ($valid[0]) {

        $valid = validate_int($personnel_id, "personnelID");

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Delete Personnel ===== */
    // Setup query
    $query_string = <<<QUERY
        DELETE FROM personnel
        WHERE id = ?
QUERY;
    
    $delete_personnel = $conn->prepare($query_string);
    $delete_personnel->bind_param('i', $personnel_id);

    // Execute Query and Capture Result
    $result = $delete_personnel->execute();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (delete personnel).", $execution_start_time);

    }

    /* 5. Return Results ===== */
    $data = [];

    data_return($conn, "200", "ok", "User was successfully deleted.", $execution_start_time, $data);

?>