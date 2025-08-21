document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements for the time widget.
    const myTimeEl = document.getElementById('my-time');
    const userTimeEl = document.getElementById('user-time');
    const timeWidget = document.getElementById('time-widget');

    // Updates the time widget every second with local and user time.
    const myTimeZone = 'America/Bogota';
    const timeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    };
    function updateClocks() {
        const now = new Date();
        const myTimeStr = new Intl.DateTimeFormat('en-US', { ...timeFormatOptions, timeZone: myTimeZone }).format(now);
        const userTimeStr = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(now);
        if (myTimeEl) myTimeEl.textContent = myTimeStr;
        if (userTimeEl) userTimeEl.textContent = userTimeStr;
    }
    updateClocks();
    setInterval(updateClocks, 1000);

    // Handles the collapsible state of the time widget on mobile devices.
    if (timeWidget) {
        const isMobilePortrait = () => window.innerWidth <= 768 && window.innerHeight > window.innerWidth;

        const checkAndCollapse = () => {
            timeWidget.classList.toggle('collapsed', isMobilePortrait());
        };

        checkAndCollapse();

        timeWidget.addEventListener('click', () => {
            if (isMobilePortrait()) {
                timeWidget.classList.toggle('collapsed');
            }
        });
        
        window.addEventListener('resize', checkAndCollapse);
    }
});