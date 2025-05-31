document.addEventListener('DOMContentLoaded', function() {
    // Loading Page
    const loaderWrapper = document.querySelector('.loader-wrapper');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loaderWrapper.style.opacity = '0';
            setTimeout(function() {
                loaderWrapper.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar ul');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Game Data
    const games = {
        'space-invaders': {
            title: 'Space Invaders',
            genre: 'Classic Arcade',
            rating: '<i class="fas fa-star"></i> 4.8',
            description: 'The classic arcade shooter that started it all! Defend Earth from waves of descending aliens with your laser cannon. Simple yet addictive gameplay that defined a generation of gaming.',
            image: 'https://via.placeholder.com/800x500?text=Space+Invaders'
        },
        'pacman': {
            title: 'Pac-Man',
            genre: 'Classic Arcade',
            rating: '<i class="fas fa-star"></i> 4.9',
            description: 'Guide Pac-Man through the maze while eating dots and avoiding ghosts. This iconic game needs no introduction - it\'s one of the most recognized video games of all time!',
            image: 'https://via.placeholder.com/800x500?text=Pac-Man'
        },
        'tetris': {
            title: 'Tetris',
            genre: 'Puzzle',
            rating: '<i class="fas fa-star"></i> 4.7',
            description: 'The timeless tile-matching puzzle game. Arrange the falling blocks to complete lines and prevent the stack from reaching the top. Simple mechanics with endless strategic possibilities.',
            image: 'https://via.placeholder.com/800x500?text=Tetris'
        },
        'minecraft': {
            title: 'Minecraft',
            genre: 'Adventure',
            rating: '<i class="fas fa-star"></i> 4.9',
            description: 'Explore infinite worlds and build everything from simple homes to grand castles. Mine, craft, and survive in this modern classic that offers endless creative possibilities.',
            image: 'https://via.placeholder.com/800x500?text=Minecraft'
        }
    };
    
    // Modal Elements
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalGameTitle');
    const modalGenre = document.getElementById('modalGameGenre');
    const modalRating = document.getElementById('modalGameRating');
    const modalDescription = document.getElementById('modalGameDescription');
    const modalImage = document.getElementById('modalGameImage');
    const closeBtn = document.querySelector('.close-btn');
    
    // Game Card Click Event
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            const game = games[gameId];
            
            if (game) {
                modalTitle.textContent = game.title;
                modalGenre.textContent = game.genre;
                modalRating.innerHTML = game.rating;
                modalDescription.textContent = game.description;
                modalImage.src = game.image;
                modalImage.alt = game.title;
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close Modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Close Modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Here you would typically send the email to your server
        console.log('Subscribed email:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav link when scrolling to section
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact Modal
    const contactModal = document.getElementById('contactModal');
    const contactLink = document.querySelector('a[href="#"]');
    const contactForm = document.getElementById('contactForm');

    // Open contact modal when clicking Contact link
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent === 'Contact') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                contactModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Handle contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            message: this.querySelector('#message').value
        };
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        contactModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Games Modal
    const gamesModal = document.getElementById('gamesModal');
    const gamesGrid = gamesModal.querySelector('.games-grid');

    // Open games modal when clicking Games links
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent === 'Classic Games' || link.textContent === 'Modern Games') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                loadGames(this.textContent === 'Classic Games' ? 'classic' : 'modern');
                gamesModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Load games into the modal
    function loadGames(type) {
        const gamesList = type === 'classic' ? Object.entries(games).filter(([_, game]) => game.genre === 'Classic Arcade')
                                           : Object.entries(games).filter(([_, game]) => game.genre !== 'Classic Arcade');
        
        gamesGrid.innerHTML = gamesList.map(([id, game]) => `
            <div class="game-card" data-game="${id}">
                <div class="game-image">
                    <img src="${game.image}" alt="${game.title}">
                    <div class="game-overlay">
                        <span class="play-btn"><i class="fas fa-play"></i></span>
                    </div>
                </div>
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="genre">${game.genre}</span>
                        <span class="rating">${game.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // About Modal
    const aboutModal = document.getElementById('aboutModal');

    // Open about modal when clicking About link
    document.querySelectorAll('a').forEach(link => {
        if (link.textContent === 'About') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                aboutModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }
    });

    // Update modal close functionality to include about modal
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            contactModal.classList.remove('show');
            gamesModal.classList.remove('show');
            aboutModal.classList.remove('show');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target === contactModal || e.target === gamesModal || e.target === aboutModal || e.target === modal) {
            contactModal.classList.remove('show');
            gamesModal.classList.remove('show');
            aboutModal.classList.remove('show');
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});