document.addEventListener('DOMContentLoaded', () => {
    // Get all input elements
    const form = document.getElementById('tweetForm');
    const profilePicture = document.getElementById('profilePicture');
    const views = document.getElementById('views');
    const bookmarks = document.getElementById('bookmarks');
    const comments = document.getElementById('comments');
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    const message = document.getElementById('message');
    const time = document.getElementById('time');
    const date = document.getElementById('date');
    const client = document.getElementById('client');
    const quotes = document.getElementById('quotes');
    const likes = document.getElementById('likes');
    const charCount = document.getElementById('charCount');
    const verified = document.getElementById('verified');
    
    // Get all preview elements
    console.log('Initializing preview elements...');
    const tweetPreview = document.getElementById('tweetPreview');
    const previewProfilePic = document.getElementById('previewProfilePic');
    const previewName = document.getElementById('previewName');
    const previewUsername = document.getElementById('previewUsername');
    const previewMessage = document.getElementById('previewMessage');
    const previewTime = document.getElementById('previewTime');
    const previewDate = document.getElementById('previewDate');
    const previewClient = document.getElementById('previewClient');
    const previewComments = document.getElementById('previewComments');
    console.log('previewComments element:', previewComments);
    const previewRetweets = document.getElementById('previewRetweets');
    console.log('previewRetweets element:', previewRetweets);
    const previewQuotes = document.getElementById('previewQuotes');
    const previewLikes = document.getElementById('previewLikes');
    const previewBookmarks = document.getElementById('previewBookmarks');
    const previewViews = document.getElementById('previewViews');
    const previewVerified = document.getElementById('previewVerified');
    const previewCustomIcon = document.getElementById('previewCustomIcon');
    const previewFollowBtn = document.getElementById('previewFollowBtn');

    // Function to format numbers
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    };
    
    // Set current date and time as default
    const now = new Date();
    time.value = now.toTimeString().slice(0, 5);
    date.value = now.toISOString().slice(0, 10);
    
    // Update character count
    message.addEventListener('input', () => {
        const length = message.value.length;
        charCount.textContent = `${length}/1000`;
    });
    
    // Update profile picture
    profilePicture.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewProfilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            previewProfilePic.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
        }
    });

    // Update tweet image
    document.getElementById('tweetImage').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const tweetImagePreview = document.getElementById('tweetImagePreview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Create or update image element
                let img = tweetImagePreview.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'tweet-image';
                    tweetImagePreview.appendChild(img);
                }
                img.src = e.target.result;
                tweetImagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            tweetImagePreview.innerHTML = '';
            tweetImagePreview.style.display = 'none';
        }
    });
    
    // Update name
    name.addEventListener('input', () => {
        previewName.textContent = name.value || 'Name';
    });
    
    // Update username
    username.addEventListener('input', () => {
        previewUsername.textContent = username.value ? `@${username.value}` : '@username';
    });
    
// Update message with line breaks
message.addEventListener('input', () => {
    const sanitizedMessage = message.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    previewMessage.innerHTML = sanitizedMessage || "What's happening?";
});
    
    // Update time
    time.addEventListener('input', () => {
        const timeValue = time.value;
        if (timeValue) {
            const [hours, minutes] = timeValue.split(':');
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            previewTime.textContent = date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        }
    });
    
    // Update date
    date.addEventListener('input', () => {
        const dateValue = new Date(date.value);
        if (!isNaN(dateValue)) {
            previewDate.textContent = dateValue.toLocaleDateString('en-US', {
                month: 'numeric',
                day: 'numeric',
                year: 'numeric'
            }).replace(/\//g, '/');
        }
    });

    // Update custom icon
    document.getElementById('customIcon').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewCustomIcon.src = e.target.result;
                previewCustomIcon.style.display = 'inline-flex';
            };
            reader.readAsDataURL(file);
        } else {
            previewCustomIcon.style.display = 'none';
        }
    });

    // Update follow button
    document.getElementById('showFollow').addEventListener('change', (e) => {
        previewFollowBtn.style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Update client
    client.addEventListener('input', () => {
        if (client.value) {
            previewClient.textContent = ' · ' + client.value;
            previewClient.style.display = 'inline';
        } else {
            previewClient.style.display = 'none';
        }
    });
    
    // Update comment count
    document.getElementById('comments').addEventListener('input', (event) => {
        try {
            const value = parseInt(event.target.value) || 0;
            const formattedValue = formatNumber(value);
            console.log('Updating comments to:', formattedValue);
            const commentsElement = document.querySelector('#previewComments');
            if (commentsElement) {
                commentsElement.textContent = formattedValue;
                console.log('Comments updated successfully');
            } else {
                console.error('previewComments element not found');
            }
        } catch (error) {
            console.error('Error updating comments:', error);
        }
    });

    quotes.addEventListener('input', () => {
        try {
            const value = formatNumber(parseInt(quotes.value) || 0);
            console.log('Updating retweets to:', value);
            const retweetsElement = document.getElementById('previewRetweets');
            if (retweetsElement) {
                retweetsElement.textContent = value;
                console.log('Retweets updated successfully');
            } else {
                console.error('previewRetweets element not found');
            }
        } catch (error) {
            console.error('Error updating retweets:', error);
        }
    });
    
    likes.addEventListener('input', () => {
        if (previewLikes) {
            previewLikes.textContent = formatNumber(parseInt(likes.value) || 0);
        }
    });

    views.addEventListener('input', () => {
        if (previewViews) {
            previewViews.textContent = formatNumber(parseInt(views.value) || 0);
        }
    });

    bookmarks.addEventListener('input', () => {
        if (previewBookmarks) {
            previewBookmarks.textContent = formatNumber(parseInt(bookmarks.value) || 0);
        }
    });

    // Theme buttons functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const setTheme = (theme) => {
        // Remove active class from all buttons
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        // Add active class to clicked button
        const activeButton = Array.from(themeButtons).find(btn => btn.dataset.theme === theme);
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-pressed', 'true');
        }
        // Update tweet preview theme
        if (tweetPreview) {
            tweetPreview.className = 'tweet-preview ' + theme;
        }
    };

    themeButtons.forEach(button => {
        button.setAttribute('role', 'radio');
        button.setAttribute('aria-checked', button.classList.contains('active'));
        button.addEventListener('click', () => {
            setTheme(button.dataset.theme);
        });
    });

    // Set initial theme
    setTheme('light');

    // Ensure toggle switches work properly
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        const toggleGroup = toggle.closest('.toggle-group');
        if (toggleGroup) {
            toggleGroup.addEventListener('click', (e) => {
                if (e.target !== toggle) {
                    toggle.click();
                }
            });
        }
    });

    // Update verified badge
    document.getElementById('verified').addEventListener('change', (e) => {
        if (previewVerified) {
            previewVerified.style.display = e.target.checked ? 'inline-flex' : 'none';
        }
    });

    // Set initial values for views and bookmarks
    views.dispatchEvent(new Event('input'));
    bookmarks.dispatchEvent(new Event('input'));
    comments.dispatchEvent(new Event('input'));
    quotes.dispatchEvent(new Event('input'));
    
    // Prevent form submission
    form.addEventListener('submit', (e) => e.preventDefault());

    // Download functionality
    document.getElementById('downloadBtn').addEventListener('click', () => {
        html2canvas(tweetPreview, {
            scale: 2,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'tweet.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
    
    // Trigger initial preview updates
    date.dispatchEvent(new Event('input'));
});
