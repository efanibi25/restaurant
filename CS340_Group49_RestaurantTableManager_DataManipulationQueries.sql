-- Course:        CS 340 - Fall 2021
-- Assignment:    Project Step 6 Draft Version: Implement UPDATE and DELETE operations
-- Group:         49
-- Team members:  Chi Hang Leung, Tobi Fanibi
-- Team’s name:   DROP TABLE mic;
-- Project Title: Restaurant Table Manager

-- --------------------------------------------------------
-- Customers Page
-- --------------------------------------------------------

-- View the customer's id, names and phone number of all registered customers
SELECT customer_id, customer_name, customer_phone FROM customers
	ORDER BY customer_name ASC;

-- Register (Add) a new customer
INSERT INTO customers (customer_name, customer_phone) 
    VALUES (:customer_nameInput, :customer_phoneInput);

-- Update a customer's info
UPDATE customers SET 
    customer_name = :customer_nameInput, 
    customer_phone = :customer_phoneInput 
    WHERE customer_id = :customer_id_selected_from_drop_down_menu;

-- Remove a customer
DELETE FROM customers 
    WHERE customer_id = :customer_id_selected_from_drop_down_menu;

-- --------------------------------------------------------
-- Dining Tables Page
-- --------------------------------------------------------

-- View all tables with their special features
SELECT table_id, num_seat, feature_description 
	FROM dining_tables LEFT JOIN table_features
    ON dining_tables.feature_id = table_features.feature_id
    ORDER BY table_id ASC;

-- Create a new table without a feature or with an existing feature
INSERT INTO dining_tables (num_seat, feature_id) VALUES (
    :num_seatInput, 
    :feature_id_selected_from_drop_down_menu
);

-- Create a new table with a new feature
INSERT INTO table_features (feature_description) VALUES (
    :feature_descriptionInput
);
INSERT INTO dining_tables (num_seat, feature_id) VALUES (
    :num_seatInput, 
    (SELECT MAX(feature_id) FROM table_features) 
);

-- Update the information about the table (not adding new features)
UPDATE dining_tables SET 
    num_seat = :num_seatInput,
    feature_id = :feature_id_selected_from_drop_down_menu
    WHERE table_id = :table_id_selected_from_drop_down_menu;

-- Delete a dining table
DELETE FROM dining_tables
    WHERE table_id = :table_id_selected_from_drop_down_menu;

-- Display all existing features for a table
SELECT feature_id, feature_description FROM table_features 
    ORDER BY feature_id;

-- Insert a new dining table feature
INSERT INTO table_features (feature_description) VALUES (
    :feature_descriptionInput);

-- Update the description of a table feature
UPDATE table_features SET 
    feature_description = feature_descriptionInput 
    WHERE feature_id = :feature_id_from_drop_down_menu;

-- Delete a table feature
DELETE FROM table_features 
    WHERE feature_id = :feature_id_selected_from_drop_down_menu;

-- --------------------------------------------------------
-- Waiters Page
-- --------------------------------------------------------

-- View all waiters
SELECT waiter_id, waiter_name FROM waiters
    ORDER BY waiter_name ASC;

-- Add a new waiter
INSERT INTO waiters (waiter_name) VALUES (
    :waiter_nameInput);

-- Update the name of a waiter
UPDATE waiters SET 
    waiter_name = :waiter_nameInput 
    WHERE waiter_id = :waiter_id_from_drop_down_menu;

-- Remove a waiter
DELETE FROM waiters 
    WHERE waiter_id = :waiter_id_from_drop_down_menu;

-- Average tip percentages for each waiter from the most to the least
SELECT waiter_name, AVG(tips_amount / (check_amount + tips_amount) * 100) AS tips_percentage FROM waiters 
    LEFT JOIN visits ON waiters.waiter_id = visits.waiter_id 
    GROUP BY waiters.waiter_id 
    ORDER BY tips_percentage DESC;

-- --------------------------------------------------------
-- Waitlist Page
-- --------------------------------------------------------

-- View all reservations that have not been cancelled (from the latest to the earliest).
SELECT queue_id, customer_name, customer_phone, num_seat, reserved_time, feature_description, is_seated 
    FROM waiting_lists 
    LEFT JOIN customers ON waiting_lists.customer_id = customers.customer_id 
    LEFT JOIN table_features ON waiting_lists.requested_feature_id = table_features.feature_id
    WHERE waiting_lists.customer_id IS NOT NULL
    ORDER BY reserved_time DESC;

-- View all reservations that have not been cancelled and customers have not been seated yet (from the earliest to the latest).
SELECT queue_id, customer_name, customer_phone, num_seat, reserved_time, feature_description, is_seated 
    FROM waiting_lists 
    LEFT JOIN customers ON waiting_lists.customer_id = customers.customer_id 
    LEFT JOIN table_features ON waiting_lists.requested_feature_id = table_features.feature_id
    WHERE waiting_lists.customer_id IS NOT NULL AND is_seated = 0
    ORDER BY reserved_time DESC;

-- Add a new reservation (recurring customer)
INSERT INTO waiting_lists(customer_id, num_seat, reserved_time, requested_feature_id, is_seated) VALUES (
    :customer_id_selected_from_drop_down_menu,
    :num_seatInput,
    :reserved_timeInput,
    :requested_feature_id_selected_from_drop_down_menu,
    0)

-- Add a new reservation (new customer)
INSERT INTO customers (customer_name, customer_phone) 
    VALUES (:customer_nameInput, :customer_phoneInput);
INSERT INTO waiting_lists(customer_id, num_seat, reserved_time, requested_feature_id, is_seated) VALUES (
    (SELECT MAX(customer_id) FROM customers),
    :num_seatInput,
    :reserved_timeInput,
    :requested_feature_id_selected_from_drop_down_menu,
    0)

-- Update the details about a reservation
UPDATE waiting_lists SET 
    customer_id = :customer_id_selected_from_drop_down_menu,
    num_seat = :num_seatInput,
    reserved_time = :reserved_timeInput,
    requested_feature_id = :requested_feature_id_selected_from_drop_down_menu
    WHERE queue_id = :queue_id_selected_from_drop_down_menu;

-- Cancel a reservation
UPDATE waiting_lists SET customer_id= NULL WHERE queue_id = :queue_id_selected_from_drop_down_menu;

-- Mark that a reservation has been fullfilled (customers have been seated)
UPDATE waiting_lists SET is_seated = 1 WHERE queue_id = :queue_id_selected_from_drop_down_menu;

-- Find a table matching to the customer's need (based on number of seats and special request for the table)
SELECT dining_tables.table_id, dining_tables.num_seat FROM dining_tables 
	WHERE dining_tables.num_seat >= (SELECT num_seat FROM waiting_lists WHERE queue_id = :queue_id_selected_from_drop_down_menu) 
    AND (
        (SELECT waiting_lists.requested_feature_id FROM waiting_lists WHERE queue_id = :queue_id_selected_from_drop_down_menu) IS NULL 
        OR 
 		(SELECT waiting_lists.requested_feature_id FROM waiting_lists WHERE queue_id = :queue_id_selected_from_drop_down_menu) = dining_tables.feature_id
    );

-- --------------------------------------------------------
-- Visit Page
-- --------------------------------------------------------

-- View all transactions (visits) from the latest to the earliest
SELECT visit_id, table_id, customer_name, waiter_name, num_guest, time_start, time_stop, check_amount, tips_amount, check_amount + tips_amount AS total_amount 
    FROM visits 
    INNER JOIN customers ON visits.customer_id = customers.customer_id 
    INNER JOIN waiters ON visits.waiter_id = waiters.waiter_id 
    ORDER BY time_start DESC;

-- Record (add) a visit
INSERT INTO visits (table_id, customer_id, waiter_id, num_guest, time_start, time_stop, check_amount, tips_amount) VALUES (
    :table_id_selected_from_drop_down_menu,
    :customer_id_selected_from_drop_down_menu,
    :waiter_id_from_drop_down_menu,
    :num_guestInput,
    :time_startInput,
    :time_stopInput,
    :check_amountInput,
    :tips_amountInput);

-- Update the details about a visit
UPDATE visits SET 
    table_id = :table_id_selected_from_drop_down_menu,
    customer_id = :customer_id_selected_from_drop_down_menu,
    waiter_id = :waiter_id_from_drop_down_menu,
    num_guest = :num_guestInput,
    time_start = :time_startInput,
    time_stop = :time_stopInput,
    check_amount = :check_amountInput,
    tips_amount = :tips_amountInput 
    WHERE visit_id = :visit_id_selected_from_drop_down_menu;

-- Delete a visit
DELETE FROM visits WHERE visit_id = :visit_id_selected_from_drop_down_menu;
