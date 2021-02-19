<?php
    /* Get Department Totals ====================================================================================================================================== */
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

    /* 3. Get Department Totals ===== */
    // Setup query
    $query = <<<QUERY
        SELECT d.name as department, COUNT(*) as departmentTotals 
        FROM personnel p
        LEFT JOIN department d ON (p.departmentID = d.id) 
        GROUP BY d.name
QUERY;

	$result = $conn->query($query);
    
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get department totals).", $execution_start_time);

    }
    
    /* 4. Return Results ===== */
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }
    
    data_return($conn, "200", "ok", "Department totals successfully retrieved.", $execution_start_time, $data);

?>