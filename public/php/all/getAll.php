<?php
    /* Get All ====================================================================================================================================== */
    /* 1. Setup ===== */
    // Imports
    include("../../../../../portfolio-config/company-directory/config.php");
    include("../helpers/helpers.php");

    /* 2. Connect to companydirectory Database ===== */
    // Attempt to connect
	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

    // Error handling - Failure to connect
	if (mysqli_connect_errno()) {

        data_reject($conn, "300", "failure", "Database unavailable.", $execution_start_time);

	}	

    /* 3. Get All ===== */
    // Setup query
    $query_string = <<<QUERY
        SELECT p.id as personnelID, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
        FROM personnel p 
        LEFT JOIN department d ON (d.id = p.departmentID) 
        LEFT JOIN location l ON (l.id = d.locationID) 
        ORDER BY p.id, p.lastName, p.firstName, d.name, l.name
QUERY;

	$result = $conn->query($query_string);
    
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get all).");

    }
    
    /* 4. Return Results ===== */
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }
    
    data_return($conn, "200", "ok", "Successfully retrieved all results.", $execution_start_time, $data);

?>