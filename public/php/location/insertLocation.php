<?php
    /* Insert Location ====================================================================================================================== */
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

    $expected_properties = ["location"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Setup String
    $location = cleanup_string($data['location']);

    // Validate String
    if ($valid[0]) {

        $valid = validate_string($location, "location");

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1], $execution_start_time);

    }

    /* 4. Check if location already exists ==== */
    // Setup query
    $query_string = <<<QUERY
        SELECT id as locationID
        FROM location
        WHERE name = ?
QUERY;

    $get_location_id = $conn->prepare($query_string);
    $get_location_id->bind_param('s', $location);

    // Execute Query and Capture Result
    $get_location_id->execute();

    // Capture Query Results
    $result = $get_location_id->get_result();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get location id).", $execution_start_time);

    }


   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }

    // Error handling - location has dependencies
    if (sizeof($data) !== 0) {

        data_reject($conn, "400", "executed", "Identical location already exists, so a new location cannot be added with this name.", $execution_start_time);

    }

    /* 5. Insert Location ===== */
    // Setup query
    $query_string = <<<QUERY
        INSERT INTO location (name)
            VALUES (?)
QUERY;
    
    $insert_location = $conn->prepare($query_string);
    $insert_location->bind_param('s', $location);

    // Execute Query and Capture Result
    $result = $insert_location->execute();

    // Error handling - no results obtained
    if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (insert location).", $execution_start_time);

    }

    /* Return Results ===== */
    $data = [];

    data_return($conn, "200", "ok", "Location successfully inserted.", $execution_start_time, $data);

?>