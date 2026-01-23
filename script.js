document.addEventListener('DOMContentLoaded', () => {
    const fanSpeedInput = document.getElementById('fan-speed');
    const fanBlades = document.querySelector('.fan-blades');
    const statusIndicator = document.querySelector('.status-indicator');

    // Create the animation using Web Animations API
    // 1000ms duration per rotation (base speed), infinite iterations
    const fanAnimation = fanBlades.animate(
        [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ],
        {
            duration: 1000,
            iterations: Infinity
        }
    );

    // Initial state
    fanAnimation.playbackRate = 0;

    // State for inertia
    let currentPlaybackRate = 0;
    let targetPlaybackRate = 0;
    const acceleration = 0.05; // How fast it speeds up
    const deceleration = 0.03; // How fast it slows down (simulated friction)

    // Animation Loop for Smooth Inertia
    function updateFanSpeed() {
        if (currentPlaybackRate !== targetPlaybackRate) {
            const diff = targetPlaybackRate - currentPlaybackRate;

            // Determine step size based on direction (accelerate vs decelerate)
            const step = diff > 0 ? acceleration : deceleration;

            if (Math.abs(diff) < step) {
                currentPlaybackRate = targetPlaybackRate;
            } else {
                currentPlaybackRate += (diff > 0 ? step : -step);
            }

            // Apply new rate
            // Ensure rate doesn't go negative
            const safeRate = Math.max(0, currentPlaybackRate);
            fanAnimation.playbackRate = safeRate;


            // Update Status Light (Visual Feedback)
            // Optimization: Only update DOM if rate changes significantly or occasionally
            // This reduces style recalculations per frame during inertia
            requestAnimationFrame(() => updateStatusLight(safeRate));
        }

        requestAnimationFrame(updateFanSpeed);
    }

    // Start the loop
    requestAnimationFrame(updateFanSpeed);

    // Map slider value (0-100) to Playback Rate (0 - 8)
    // 0 = Stopped
    // 100 = 8x speed (very fast)
    function handleInput() {
        const val = parseInt(fanSpeedInput.value);
        if (val === 0) {
            targetPlaybackRate = 0;
        } else {
            // Non-linear mapping feels more natural? Linear is fine too.
            // Let's do Linear: 0-100 mapped to 0-6
            targetPlaybackRate = (val / 100) * 6;
        }
    }

    let lastHue = -1;
    function updateStatusLight(rate) {
        // Change color based on speed
        // 0 = Red (#ff4444)
        // Max (6) = Cyan (#00bcd4)
        // We can interpolate HSL

        if (rate === 0) {
            if (lastHue !== 0) { // optimization
                statusIndicator.style.backgroundColor = '#ff4444';
                statusIndicator.style.boxShadow = '0 0 5px #ff4444';
                lastHue = 0;
            }
            return;
        }

        // Map rate 0-6 to Hue 0-180 (Red to Cyanish)
        // Actually Red is 0, Green 120, Cyan 180.
        // Let's go from Orange (30) to Cyan (180)

        const minHue = 30;
        const maxHue = 180;
        const maxRate = 6;

        // Clamp rate
        const clampedRate = Math.min(rate, maxRate);
        const hue = Math.floor(minHue + (clampedRate / maxRate) * (maxHue - minHue)); // floor for integer comparisons

        // Only touch DOM if hue changed
        if (hue !== lastHue) {
            const color = `hsl(${hue}, 100%, 50%)`;
            statusIndicator.style.backgroundColor = color;
            statusIndicator.style.boxShadow = `0 0 10px ${color}`;
            lastHue = hue;
        }
    }

    fanSpeedInput.addEventListener('input', handleInput);

    // Initial call
    handleInput();
});
