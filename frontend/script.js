document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Interactive Button Click
    const getStartedBtn = document.getElementById('getStartedBtn');
    
    getStartedBtn.addEventListener('click', () => {
        // Simple scale effect on click
        getStartedBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            getStartedBtn.style.transform = 'translateY(-2px)'; // Return to hover state
        }, 150);
        
        console.log("Get Started button clicked - initializing onboarding...");
    });

    const navMenu = document.querySelector(".nav-menu");
const pill = document.querySelector(".nav-pill");

const navItems = document.querySelectorAll(
    ".nav-links a, .login-btn"
);

function movePill(item) {

    const menuRect = navMenu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    pill.style.width = `${itemRect.width}px`;
    pill.style.height = `${itemRect.height}px`;

    pill.style.transform =
        `translate(
            ${itemRect.left - menuRect.left}px,
            ${itemRect.top - menuRect.top}px
        )`;
}


/* Start on Login */
const login = document.querySelector(".login-btn");

movePill(login);


/* Move when hovering */
navItems.forEach(item => {

    item.addEventListener("mouseenter", () => {
        movePill(item);
    });

});

    // 2. Scroll Indicator Interaction
const scrollIndicator = document.getElementById('scrollIndicator');


// Click the SCROLL button
scrollIndicator.addEventListener('click', () => {

    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });

});


// Hide SCROLL button when scrolling down
window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {
        scrollIndicator.classList.add('fade-out');
    } 
    else {
        scrollIndicator.classList.remove('fade-out');
    }

});

    // 3. Navbar float effect on mouse movement
    const navbar = document.getElementById('navbar');
    
    document.addEventListener('mousemove', (e) => {
        // Subtle parallax effect for the navbar based on mouse position
        const xAxis = (window.innerWidth / 2 - e.pageX) / 100;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 100;
        
        navbar.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });
});