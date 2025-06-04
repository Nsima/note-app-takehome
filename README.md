# Notes App Technical Assessment

This is a simple notes application built with React on the frontend and Node.js on the backend. The app allows users to create, mark as completed, and delete notes. Note data is stored in a JSON file on the backend.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   The backend server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The frontend application will run on http://localhost:3000

## Application Features

- Add new notes
- Mark notes as completed/uncompleted
- Delete notes
- Notes are stored in a JSON file on the backend

## Technical Assessment Bugs to Fix

This application has several intentional bugs that a senior developer should be able to identify and fix:

### Backend Bugs

1. **Missing Error Handling in saveNotes Function**: The catch block in the saveNotes function is empty, meaning file write errors are silently ignored.

2. **No Error Handling in GET Route**: The GET /api/notes route does not have proper error handling.

3. **Using Current Time as ID**: Using Date.now() as an ID can lead to collisions if notes are created simultaneously.

4. **Missing Creation Date**: Notes don't store their creation date, which would be useful for sorting.

5. **Type Coercion in ID Comparison**: Using == instead of === for ID comparison in the PUT route.

6. **Complete Note Replacement**: The PUT route completely replaces the note instead of just updating the specified fields.

7. **No Existence Check Before Delete**: The DELETE route doesn't check if the note exists before attempting to delete.

8. **Incorrect Status Code for Deletion**: The DELETE route sends a 200 status code instead of 204 (No Content) which would be more appropriate for a successful deletion with no response body.

### Frontend Bugs

1. **Hardcoded API URL**: The API URL is hardcoded instead of using an environment variable.

2. **Not Checking Response Status**: The fetchNotes function doesn't check if the response is ok before processing.

3. **Mutating State Directly**: Using array.push() directly on the state instead of creating a new array.

4. **Incomplete Data in PUT Request**: The toggleComplete function only sends the completed status, not the complete note data.

5. **String Concatenation for URLs**: Using string concatenation instead of template literals for constructing URLs.

6. **Missing Response Check in deleteNote**: Not checking if the response is ok in the deleteNote function.

7. **No Sorting of Notes**: Notes are not sorted by any criteria (e.g., creation date, completion status).

## Assessment Criteria

A senior developer should be able to:

1. Identify and fix all the bugs mentioned above
2. Implement proper error handling
3. Follow best practices for state management in React
4. Ensure type safety in comparisons
5. Implement RESTful API practices correctly
6. Add appropriate data validation
7. Improve overall code quality and maintainability

Good luck with the assessment!
