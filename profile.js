// profile.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Update profile information
    if (userData) {
        document.getElementById('username').textContent = userData.username;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('role').textContent = userData.role;

        // Check if there's a profile picture stored
        const storedProfilePic = localStorage.getItem(`${userData.email}_profilePic`);
        if (storedProfilePic) {
            document.getElementById('profilePicPreview').src = storedProfilePic;
        }
    }

    // Handle profile picture upload
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const editProfilePicBtn = document.getElementById('editProfilePicBtn');

    // Trigger file input click when edit button is clicked
    editProfilePicBtn.addEventListener('click', function() {
        profilePicInput.click();
    });

    profilePicInput.addEventListener('change', function(event) {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                profilePicPreview.src = reader.result;

                // Save the profile picture to localStorage
                localStorage.setItem(`${userData.email}_profilePic`, reader.result);
            }
            reader.readAsDataURL(file);
        }
    });
});
