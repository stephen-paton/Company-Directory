<?php
    /* Delete Location ====================================================================================================================== */
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

    $expected_properties = ["locationID"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup ID
    $location_id = cleanup_int($data['locationID']);

    // Validate ID
    if ($valid[0]) {

        $valid = validate_int($location_id, "locationID");

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Check if location has dependencies in department table ==== */
    // Setup query
    $query_string = <<<QUERY
        SELECT id as departmentID
        FROM department
        WHERE locationID = ?
QUERY;

    $get_department_ids = $conn->prepare($query_string);
    $get_department_ids->bind_param('i', $location_id);

    // Execute Query and Capture Result
    $get_department_ids->execute();

    // Capture Query Results
    $result = $get_department_ids->get_result();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get department ids).", $execution_start_time);

    }


   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }

    // Error handling - location has dependencies
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "Location has dependencies, so cannot be deleted.", $execution_start_time);

    }

    /* 5. Delete Location Row ===== */
    // Setup query
    $query_string = <<<QUERY
        DELETE FROM location
        WHERE id = ?
QUERY;
    
    $delete_location = $conn->prepare($query_string);
    $delete_location->bind_param('i', $location_id);

    // Execute Query and Capture Result
    $result = $delete_location->execute();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (delete location).", $execution_start_time);

    }

    /* 6. Return Results ===== */
    $data = [];

    data_return($conn, "200", "ok", "Location successfully deleted", $execution_start_time, $data);

?>