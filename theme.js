document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            icon.className = 'fas fa-moon';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            icon.className = 'fas fa-sun';
        }
        // Save preference
        localStorage.setItem('isDarkMode', isDark);
    }

    // Check for saved preference
    const savedIsDark = localStorage.getItem('isDarkMode');
    
    // If there's a saved preference, use it
    if (savedIsDark !== null) {
        setTheme(savedIsDark === 'true');
    } else {
        // Default to dark mode if no preference
        setTheme(true);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        setTheme(!isDark);
    });
});