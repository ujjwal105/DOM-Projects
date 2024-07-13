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

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('user-avatar').src = data.avatar_url;
                document.getElementById('user-name').innerText = data.name || data.login;
                document.getElementById('user-bio').innerText = data.bio || 'No bio available';
                document.getElementById('user-location').innerText = data.location || 'Location not available';
                document.getElementById('user-card').style.display = 'block';
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert('User not found');
            });
    }
});
