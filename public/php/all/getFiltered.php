<?php
    /* Get Filtered ====================================================================================================================================== */
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
 
    /* 3. Validate Inputs ===== */
    // Check that POST data is valid
    $data = $_POST["data"];
    $expected_properties = ["searchTerm", "searchFilters"];

    $valid = validate_array_keys($data, "data", $expected_properties);

    // Check that searchFilters are valid
    if ($valid[0]) {

        $search_filters = $data['searchFilters'];
        $expected_properties = ['first-name', 'surname', 'department', 'location', 'email'];

        $valid = validate_array_keys($search_filters, "search filters", $expected_properties);

    }

    // Error Handling - Incorrect POST data supplied
    if (!$valid[0]) {

        data_reject($conn, "300", "failure", $valid[1]);

    }

    /* 4. Get Filtered ===== */
    // Setup Filters
    // Helper Function
    /* Update Filters ===============================================================================================================================
    Description: If input filter value is valid (not empty), then updates the filter query string and adds the input filter to the filter variables array. */
    function update_filters(&$filter, $new_filter_value, $filter_query, &$filter_variables, &$filter_query_string, &$filter_iterator) {

        // Check that input filter isn't empty
        if ($filter !== "") {

            // If this is the first filter, then set the filter query string to "AND ( " to link it to the first WHERE condition  
            if ($filter_iterator == 0) {

                $filter_query_string = " AND ( ";

            // If this isn't the first filter, then link this filter to the previous in the query with " AND " ("previous filter AND ")
            } else {
                
                $filter_query_string .= " AND ";

            }

            // Update the value of the filter to the input new filter value
            $filter = $new_filter_value;
            // Append the updated filter to the filter variables array
            array_push($filter_variables, $filter);
            // Add the input filter query to the filter query string e.g. "AND( previous query AND (p.firstName LIKE ?) "
            $filter_query_string .= " " . $filter_query . " ";
            // Increase the filter iterator by 1
            $filter_iterator += 1;

        }

    }

    // Setup Filters
    $search_term = wrap_in_percentages($data['searchTerm']);

    $first_name_filter = $data['searchFilters']['first-name'];
    $surname_filter = $data['searchFilters']['surname'];
    $email_filter = $data['searchFilters']['email'];
    $department_filter = $data['searchFilters']['department'];
    $location_filter = $data['searchFilters']['location'];
    
    $filter_query_string = "";
    $filter_variables = array_fill(0, 5, $search_term);
    $filter_iterator = 0;

    update_filters($first_name_filter, wrap_in_percentages($first_name_filter), "(p.firstName LIKE ?)", $filter_variables, $filter_query_string, $filter_iterator);
    update_filters($surname_filter, wrap_in_percentages($surname_filter), "(p.lastName LIKE ?)", $filter_variables, $filter_query_string, $filter_iterator);
    update_filters($email_filter, wrap_in_percentages($email_filter), "(p.email LIKE ?)", $filter_variables, $filter_query_string, $filter_iterator);
    update_filters($department_filter, $department_filter, "(d.name = ?)", $filter_variables, $filter_query_string, $filter_iterator);
    update_filters($location_filter, $location_filter, "(l.name = ?)", $filter_variables, $filter_query_string, $filter_iterator);

    // If the filter query string isn't empty, then close it e.g. AND ( first filter )
    if ($filter_query_string !== "") {

        $filter_query_string .= " )";

    }

    // Setup query
    $query_string = <<<QUERY
        SELECT p.id as personnelID, p.lastName, p.firstName, p.jobTitle, p.email, d.name as department, l.name as location 
        FROM personnel p
        LEFT JOIN department d 
            ON (d.id = p.departmentID)
        LEFT JOIN location l 
            ON (l.id = d.locationID) 
        WHERE (
            (p.firstName LIKE ?)
            OR (p.lastName LIKE ?)
            OR (p.email LIKE ?)
            OR (d.name LIKE ?)
            OR (l.name LIKE ?)
        ) $filter_query_string
        ORDER BY p.id, p.lastName, p.firstName, d.name, l.name
QUERY;

    $get_filtered = $conn->prepare($query_string);

    // Setup first variable of bind params to "s" to the number of variables present in filter variables
    $types = str_repeat('s', count($filter_variables));

    $get_filtered->bind_param($types, ...$filter_variables);
    
    // Execute Query
    $get_filtered->execute();

    // Capture Query Results
    $result = $get_filtered->get_result();
 
    // Error handling - no results obtained
	if (!$result) {

        data_reject($conn, "400", "executed", "Query failed (get filtered).", $execution_start_time);

    }
    
    /* 5. Return Results ===== */
   	$data = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($data, $row);

    }
    
    data_return($conn, "200", "ok", "Successfully retrieved filtered results.", $execution_start_time, $data);

?>