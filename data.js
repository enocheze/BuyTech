// script.js

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    const role = document.getElementById('role').value;

    // Check if the email already exists in localStorage
    if (checkEmailExists(email)) {
        showPopup('User already exists!');
        return;
    }

    // Simple validation (you can add more complex validation)
    if (password !== repassword) {
        showPopup('Passwords do not match!');
        return;
    }

    // Store data in local storage
    const userData = {
        username: username,
        email: email,
        password: password,
        role: role,
        joined: new Date().toLocaleDateString() // Capture current date as joined date
    };
    
      // Check if localStorage already has userData stored, and append if necessary
      let allUsersData = JSON.parse(localStorage.getItem('allUsersData')) || [];
      allUsersData.push(userData);
      localStorage.setItem('allUsersData', JSON.stringify(allUsersData));
  

    // Convert the object to a string and store it
    localStorage.setItem('userData', JSON.stringify(userData));

    // Show success message
    showPopup('Signup successful!', function() {
        // Redirect to a new page after showing the popup
        window.location.href = 'profile.html'; // Replace with your desired success page URL
    });
});

function showPopup(message, callback) {
    const popupContainer = document.getElementById('popupMessage');
    popupContainer.textContent = message;
    popupContainer.classList.add('show');

    // Remove the show class after 3 seconds (adjust timing as needed)
    setTimeout(function() {
        popupContainer.classList.remove('show');
        if (typeof callback === 'function') {
            callback();
        }
    }, 3000); // 3 seconds
}

function checkEmailExists(email) {
    // Retrieve stored data from localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Check if email already exists
        return userData.email === email;
    }

    return false; // Return false if no user data or email doesn't match
}
