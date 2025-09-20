// Register - create user, nothing else
// takes username, password, and any other relevant info, returns void

// Login - return access token + refresh token
// takes username, password, and returns access token

// Logout - wipes refresh token
// removes refresh token from DB, does nothing to access token, no args required

// Refresh Access Token - uses refresh token to get new access token
// just hits refresh endpoint, NO token needed or other input
// Returns new access token

// Get Logged in User - uses access token to get user info
// takes access token, returns User object or null



// WORKFLOWS

// User is new to device / session
// User logs in, gets credentials, is all set

// User navigates to new page, session still fresh
// No need for endpoint validation

// User hits the refresh button
// Fetch access token
// Use access token to fetch user info