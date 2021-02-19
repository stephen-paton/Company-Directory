<?php
    /* Insert Department ====================================================================================================================== */
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

    $expected_properties = ["department", "locationID"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup String
    $department = cleanup_string($data['department']);

    // Validate String
    if ($valid[0]) {

        $valid = validate_string($department, "department");

    }

    // Setup Int
    $location_id = cleanup_int($data['locationID']);

    // Validate Int
    if ($valid[0]) {

        $valid = validate_int($location_id, "locationID");

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Check if department already exists ==== */
    // Setup query
    $query_string = <<<QUERY
        SELECT id as departmentID
        FROM department
        WHERE name = ?
QUERY;

    $get_department_id = $conn->prepare($query_string);
    $get_department_id->bind_param('s', $department);

    // Execute Query and Capture Result
    $get_department_id->execute();

    // Capture Query Results
    $result = $get_department_id->get_result();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get department id).", $execution_start_time);

    }


   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }

    // Error handling - location has dependencies
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "Identical department already exists, so a new department cannot be added with this name.", $execution_start_time);

    }

    /* 5. Insert Location ===== */
    // Setup query
    $query_string = <<<QUERY
        INSERT INTO department (name, locationID)
            VALUES (?, ?)
QUERY;
    
    $insert_department = $conn->prepare($query_string);
    $insert_department->bind_param('si', $department, $location_id);

    // Execute Query and Capture Result
    $result = $insert_department->execute();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (insert department).", $execution_start_time);

    }

    /* 6. Return Results ===== */
    $data = [];

    data_return($conn, "200", "ok", "Department successfully inserted.", $execution_start_time, $data);

?>