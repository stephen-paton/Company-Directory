<?php
    /* Delete Department ====================================================================================================================== */
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

    $expected_properties = ["departmentID"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup ID
    $department_id = cleanup_int($data['departmentID']);

    // Validate ID
    if ($valid[0]) {

        $valid = validate_int($department_id, "departmentID");

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Check if department has dependencies in personnel table ==== */
    // Setup query
    $query_string = <<<QUERY
        SELECT id as personnelID
        FROM personnel
        WHERE departmentID = ?
QUERY;

    $get_personnel_ids = $conn->prepare($query_string);
    $get_personnel_ids->bind_param('i', $department_id);

    // Execute Query and Capture Result
    $get_personnel_ids->execute();

    // Capture Query Results
    $result = $get_personnel_ids->get_result();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get personnel ids).", $execution_start_time);

    }


   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }

    // Error handling - department has dependencies
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "Department has dependencies, so cannot be deleted.", $execution_start_time);

    }

    /* 5. Delete Department Row ===== */
    // Setup query
    $query_string = <<<QUERY
        DELETE FROM department
        WHERE id = ?
QUERY;
    
    $delete_department = $conn->prepare($query_string);
    $delete_department->bind_param('i', $department_id);

    // Execute Query and Capture Result
    $result = $delete_department->execute();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (delete department).", $execution_start_time);

    }

    /* 6. Return Results ===== */
    $data = [];

    data_return($conn, "200", "ok", "Department successfully deleted.", $execution_start_time, $data);

?>