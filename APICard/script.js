document.addEventListener("DOMContentLoaded", function() {
    var fetchButton = document.getElementById('fetch-button');

    fetchButton.addEventListener('click', function() {
        var username = document.getElementById('username-input').value;
        if (username) {
            fetchGitHubUser(username);
        } else {
            alert('Please enter a GitHub username');
        }
    });

    function fetchGitHubUser(username) {
        var url = `https://api.github.com/users/${username}`;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                document.getElementById('user-avatar').src = data.avatar_url;
                document.getElementById('user-name').innerText = data.name || data.login;
                document.getElementById('user-bio').innerText = data.bio || 'No bio available';
                document.getElementById('user-location').innerText = data.location || 'Location not available';
                document.getElementById('user-card').style.display = 'block';
            } else {
                console.error('Error fetching user data');
                alert('User not found');
            }
        };

        xhr.onerror = function() {
            console.error('Request error...');
        };

        xhr.send();
    }
});
