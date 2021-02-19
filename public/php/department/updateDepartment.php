<?php
    /* Update Department ============================================================================================================================ */
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
    $expected_properties = ["departmentID", "department", "locationID"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup String
    $department = cleanup_string($data['department']);
    
    // Validate String
    if ($valid[0]) {

        $valid = validate_string($department, "department");

    }

    // Setup Ints
    $department_id = cleanup_int($data['departmentID']);
    $location_id = cleanup_int($data['locationID']);

    // Validate Ints
    if ($valid[0]) {

        $ints = [$department_id, $location_id];
        $int_names = ['departmentID', 'locationID'];

        $valid = validate_ints($ints, $int_names);

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }
    
    /* 4. Check if department already exists ===== */
    // Setup Query
    $query_string = <<<QUERY
        SELECT id as departmentID
        FROM department
        WHERE name = ?
            AND locationID = ?
QUERY;

    $get_department_id = $conn->prepare($query_string);
    $get_department_id->bind_param('si', $department, $location_id);

    // Execute Query
    $get_department_id->execute();

    // Capture Results
    $result = $get_department_id->get_result();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get department).", $execution_start_time);

    }

    $data = [];

    while ($row = mysqli_fetch_assoc($result)) {

        array_push($data, $row);

    }

    // Error handling - location already exists
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "Identical department already exists, so this department cannot be updated with this name.", $execution_start_time);

    }

    /* 5. Update Department ===== */
    // Setup Query
    $query_string = <<<QUERY
        UPDATE department
        SET name = ?,
            locationID = ?
        WHERE id = ?
QUERY;

    $update_department = $conn->prepare($query_string);
    $update_department->bind_param('sii', $department, $location_id, $department_id);

    // Execute Query and Capture Result
    $result = $update_department->execute();

    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (update department).", $execution_start_time);

    }

    /* 6. Return Result ===== */
    $data = [];

    data_return($conn, "200", "ok", "Department successfully updated.", $execution_start_time, $data);

?>