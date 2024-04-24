## Components

- **Login.jsx**: Handles user sign-in, leveraging `authenticateUser` from `LoginHandler.jsx`. It checks for valid credentials and manages user session.
- **AccountNumber.jsx**: Allows users to enter an account number. It performs validation and uses `AccountIDHandler` to fetch and verify the account ID.
- **PaymentSubmit.jsx**: Enables users to enter payment amounts and initiates the confirmation process.
- **Confirmation.jsx**: A confirmation dialog before finalizing the payment, leveraging `PaymentHandler`.
- **PaymentComplete.jsx**: Displays the success state and new balance after the payment is processed.
- **Date.jsx**: Displays the current date retrieved from `date-fns` library.
- **Logout.jsx**: Displays a logout button at the top right corner on valid routes.

## Handlers

- **LoginHandler.jsx**: Manages the login process by interacting with an API to validate user credentials and receive token.
- **AccountIDHandler.jsx**: Validates and retrieves the account ID using the user's account number.
- **BalanceHandler.jsx**: Fetches and updates the user’s balance from the API using the account ID.
- **PaymentHandler.jsx**: Handles the transaction submission to the API.
- **ErrorHandler.jsx**: Displays error messages based on the application state.
- **NavigationHandler.jsx**: Manages redirection and resetting of the application state upon unauthorized access.

## Context Management

- **AppContext.jsx**: Provides a React context for managing global state, including user info, payment details, and session status.

## Routing and Navigation

- **App.jsx**: Configures routing for the application using React Router. Routes are protected based on authentication, transaction status and whether an account number was previously entered.

## Features

- **Session Management**: Uses `sessionStorage` to store and validate session tokens.
- **Error Handling**: Centralized error management to provide feedback and troubleshooting support for end-users.
- **Security Features**: Implements checks and such as token validation and input sanitization, to enhance security.

## Other

- Input validation is heavily used to prevent XSS and SQL Injection.
- Secure handling of user sessions with token-based authentication.
- User experience is enhanced through confirmation dialogs and post-transaction state updates.
