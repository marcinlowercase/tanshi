// Function to start the bouncing animation and handle interactions
import {playAudio} from "./audioUtilities.js";
import variables from "./variables.js";

function startDVDBounce(divID, originalX, originalY, initialSpeed, initialZoom, audio, callback) { // Renamed speed -> initialSpeed for clarity
    const dvd = document.getElementById(divID);
    if (!dvd) {
        console.error(`Element with ID '${divID}' not found.`);
        return;
    }
    dvd.style.position = 'absolute';

    // Animation state variables
    let x = originalX;
    let y = originalY;
    let dx = 1;
    let dy = 1;

    // --- State Variables Managed Internally ---
    let currentZoom = initialZoom;
    let currentSpeed = initialSpeed; // Initialize with the starting speed

    // --- Interaction Handlers ---

    // Mouse Enter - Temporary zoom increase
    dvd.addEventListener("mouseenter", () => {
        // Zoom relative to the current base zoom
        dvd.style.transform = `scale(${currentZoom + 0.1})`;
    });

    // Mouse Leave - Revert to base zoom
    dvd.addEventListener("mouseleave", () => {
        dvd.style.transform = `scale(${currentZoom})`;
    });

    // Mouse Down (Click) - Random position, permanent zoom increase, and speed increase
    dvd.addEventListener("mousedown", () => {
        // Only apply changes if zoom hasn't reached the limit
        if (currentZoom < 5) {
            playAudio({
                audioArray: [audio],
                loop: false,
                volume: 1,
            })

            // 1. Calculate Max bounds considering current element size
            const maxX = window.innerWidth - dvd.clientWidth;
            const maxY = window.innerHeight - dvd.clientHeight;

            // 2. Generate random coordinates within bounds
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;

            // 3. Update the animation's position variables
            x = randomX;
            y = randomY;

            // 4. Increase the base zoom permanently
            currentZoom += 1; // Increment zoom

            // 5. Increase the speed permanently
            currentSpeed += 1; // Increment speed
            // Optional: Add a max speed limit if desired
            // if (currentSpeed > 15) { currentSpeed = 15; }

            // 6. Apply the changes immediately to the element's style
            dvd.style.left = `${x}px`;
            dvd.style.top = `${y}px`;
            dvd.style.transform = `scale(${currentZoom})`; // Apply new base zoom
        } else {
            // If zoom limit is reached, call the callback
            if (typeof callback === 'function') { // Check if callback is a function
                callback();
            } else {
                console.warn("Zoom limit reached, but no valid callback function provided.");
            }
        }
    });

    // --- Animation Logic ---

    function moveDVD() {
        // Calculate max bounds for collision detection
        const maxX = window.innerWidth - dvd.clientWidth;
        const maxY = window.innerHeight - dvd.clientHeight;

        // Update position based on direction and CURRENT speed
        x += dx * currentSpeed; // Use currentSpeed here
        y += dy * currentSpeed; // Use currentSpeed here

        // Collision detection and bounce logic
        let bounced = false;
        if (x <= 0) {
            dx = 1; // Ensure positive direction away from wall
            x = 0;  // Clamp position to edge
            bounced = true;
        } else if (x >= maxX) {
            dx = -1; // Ensure negative direction away from wall
            x = maxX; // Clamp position to edge
            bounced = true;
        }

        if (y <= 0) {
            dy = 1; // Ensure positive direction away from wall
            y = 0;  // Clamp position to edge
            bounced = true;
        } else if (y >= maxY) {
            dy = -1; // Ensure negative direction away from wall
            y = maxY; // Clamp position to edge
            bounced = true;
        }

        if (bounced) {
            changeColor();
        }

        // Apply the calculated position to the element
        dvd.style.left = `${x}px`;
        dvd.style.top = `${y}px`;

        // Request the next animation frame
        requestAnimationFrame(moveDVD);
    }

    function changeColor() {
        // Change background color (using hsl for vibrant colors)
        dvd.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    // Set initial zoom and position before starting animation
    dvd.style.left = `${x}px`;
    dvd.style.top = `${y}px`;
    dvd.style.transform = `scale(${currentZoom})`;

    // Start the animation loop
    moveDVD();
}

// Function to create the basic div element (No changes needed here)
const createDVD = (id, content, initialZoom) => {
    // Check if an element with this ID already exists
    if (document.getElementById(id)) {
        console.warn(`Element with ID '${id}' already exists. Reusing it. For multiple DVDs, use unique IDs.`);
        return document.getElementById(id); // Return existing element
    }

    const dvdDiv = document.createElement("div");
    dvdDiv.id = id; // Use the provided ID
    dvdDiv.classList.add('button'); // Keep existing class if needed

    // --- Basic Styling ---
    dvdDiv.style.cursor = "pointer";
    dvdDiv.style.color = "white";
    dvdDiv.style.background = variables.colorLightRed;
    dvdDiv.style.padding = "10px 20px"; // Add some padding
    dvdDiv.style.borderRadius = variables.borderRadiusButton
    dvdDiv.style.display = "flex";
    dvdDiv.style.alignItems = "center";
    dvdDiv.style.justifyContent = "center";
    dvdDiv.style.fontWeight = "bold";
    dvdDiv.style.zIndex = '11111111111111'; // Keep high z-index
    dvdDiv.style.transition = 'transform 0.1s ease-in-out'; // Smooth zoom transition

    // Set content
    dvdDiv.innerText = content;

    document.body.appendChild(dvdDiv);
    return dvdDiv; // Return the created element
}

export {startDVDBounce, createDVD};