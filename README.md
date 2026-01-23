# Azure Hawking Fan Control

A realistic ceiling fan simulation built with vanilla HTML, CSS, and JavaScript. This project demonstrates smooth animation control using the Web Animations API and simulates physics-based inertia for realistic acceleration and deceleration.

## Features

- **Realistic Physics**: Simulates inertia with acceleration and deceleration. The fan doesn't just stop instantly; it spins down gradually.
- **Smooth Animation**: Uses the Web Animations API for high-performance, jank-free 60fps animations.
- **Vertical Speed Control**: A custom vertical slider (0-100 range) to control the fan speed.
- **Dynamic Feedback**: Visual status indicator changes color from Red (Off) to Cyan (High Speed) based on the current RPM.
- **Responsive Design**: Adjusts layout for smaller screens, ensuring the controls and fan remain usable on mobile devices.

## How It Works

### Animation Engine
Unlike traditional CSS animations which can be jerky when changing speeds, this app uses `element.animate()` with an infinite rotation. The speed is controlled by modifying `animation.playbackRate`.

### Inertia Loop
A requestAnimationFrame loop constantly monitors the difference between the `currentPlaybackRate` (actual speed) and `targetPlaybackRate` (set by the slider).
- If the target is higher, it accelerates by `0.05` per frame.
- If the target is lower, it decelerates by `0.03` per frame to simulate friction.

## Usage

1. Open `index.html` in any modern web browser.
2. Use the vertical slider on the right to increase or decrease the fan speed.
3. Observe the LED indicator changing color and the fan smoothly ramping up or down.

## Files

- `index.html`: Main structure.
- `style.css`: Styling for the fan components, 3D perspective, and slider.
- `script.js`: Logic for animation control, inertia calculation, and UI updates.
# ceiling-fan
