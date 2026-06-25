/* ==========================================================================
   FARMASUITS PREMIUM VETERINARY WEBSITES JAVASCRIPT
   Interactivity, Animations, Simulated AI Chat, Interactive Map & Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Animated Loading Screen
       ========================================== */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1200);

    /* ==========================================
       2. Scroll Progress & Sticky Nav Bar
       ========================================== */
    const header = document.getElementById('mainHeader');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        // Progress bar width
        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        // Header scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollTop > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================
       3. Dark / Light Theme Toggle
       ========================================== */
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check existing preference in localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    /* ==========================================
       4. Language Dropdown Selector
       ========================================== */
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('show');
    });

    langDropdown.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.currentTarget.getAttribute('data-lang').toUpperCase();
            langBtn.querySelector('span').innerText = lang;
            langDropdown.classList.remove('show');
        });
    });

    /* ==========================================
       5. Mobile Hamburger Navigation
       ========================================== */
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navMenu.classList.remove('show');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    /* ==========================================
       6. Hero Floating Particles Canvas effect
       ========================================== */
    const heroParticles = document.getElementById('heroParticles');
    if (heroParticles) {
        const particleCount = 18;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 8 + 4;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const drift = Math.random() * 100 - 50;
            const delay = Math.random() * -10;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.setProperty('--duration', `${duration}s`);
            particle.style.setProperty('--drift', `${drift}px`);
            particle.style.animationDelay = `${delay}s`;
            
            heroParticles.appendChild(particle);
        }
    }

    /* ==========================================
       7. Statistics Animated Counters
       ========================================== */
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1500; // 1.5 seconds
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / 50);
                if (current >= target) {
                    counter.innerText = target + (target === 99 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    counter.innerText = current + '+';
                }
            }, stepTime < 10 ? 10 : stepTime);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                startCounters();
                countersStarted = true;
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================
       8. Scroll Reveal Animations
       ========================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================
       9. Product Database & Search & Filters
       ========================================== */
    const productsData = [
        {
            name: "Farma-Tylosin 20% Inj",
            category: "Antibiotics",
            subcat: "Injectables",
            volume: "100ml Bottle",
            desc: "Broad-spectrum veterinary antibiotic designed for cows, goats, and camels. Highly effective against severe respiratory complex.",
            composition: "Tylosin Tartrate 200mg/ml",
            admin: "Intramuscular injection: 1ml per 20kg body weight daily.",
            boxStyle: ""
        },
        {
            name: "Suit-Vacc ND LaSota",
            category: "Vaccines",
            subcat: "Poultry Products",
            volume: "1000 Doses Vial",
            desc: "Live virus vaccine for chicken flock immunization against Newcastle disease. High protection rates.",
            composition: "Newcastle Disease Virus LaSota Strain",
            admin: "Ocular route or mixed with clean drinking water.",
            boxStyle: "box-red"
        },
        {
            name: "Vitasuit Forte Liquid",
            category: "Nutritional Supplements",
            subcat: "Oral Solutions",
            volume: "1 Litre Jar",
            desc: "High potency liquid vitamin mix with organic trace minerals. Boosts postpartum dairy cows' milk yield.",
            composition: "Vitamins A, D3, E, B12, H & Choline Chloride",
            admin: "Cattle: 50ml daily; Poultry: 10ml per 100 birds.",
            boxStyle: "box-gold"
        },
        {
            name: "Suit-Deworm Suspension",
            category: "Dewormers",
            subcat: "Oral Solutions",
            volume: "500ml Bottle",
            desc: "High compliance drench eliminating mature and immature liver flukes, lungworms and roundworms.",
            composition: "Oxyclozanide 3.4% + Levamisole 3%",
            admin: "Oral drench: 5ml per 10kg body weight.",
            boxStyle: "box-teal"
        },
        {
            name: "BioShield-Forte Sanitizer",
            category: "Disinfectants",
            subcat: "Disinfectants",
            volume: "5 Litre Can",
            desc: "Industrial grade virucidal and bactericidal farm disinfectant for surgical equipment cleaning.",
            composition: "Glutaraldehyde + Benzalkonium Chloride",
            admin: "Dilute 1:200 for surface spray; 1:100 for foot bath.",
            boxStyle: "box-teal"
        },
        {
            name: "FARMAMINERAL Block",
            category: "Minerals",
            subcat: "Livestock Products",
            volume: "5kg Mineral Lick",
            desc: "Weather resistant trace mineral blocks designed for sheep, dairy cattle, and buffalo pasture licking.",
            composition: "Sodium, Calcium, Zinc, Cobalt, Iodine, Selenium",
            admin: "Place in licking holders. Provide free access near water supply.",
            boxStyle: "box-gold"
        },
        {
            name: "Farma-Colistin Oral",
            category: "Antibiotics",
            subcat: "Oral Solutions",
            volume: "1 Litre Bottle",
            desc: "Specifically targeted treatment for Gram-negative enteric pathogens, E.coli, and Salmonella in broilers.",
            composition: "Colistin Sulfate 2,000,000 IU/ml",
            admin: "1ml per 5 litres of drinking water for 3-5 days.",
            boxStyle: ""
        },
        {
            name: "Farma-FMD Vaccine",
            category: "Vaccines",
            subcat: "Injectables",
            volume: "50ml Bottle",
            desc: "Trivalent inactivated vaccine protecting ruminants against Foot and Mouth Disease outbreaks.",
            composition: "Inactivated FMD Virus Antigens O, A & Asia-1",
            admin: "Subcutaneous: 2ml per cattle, repeated bi-annually.",
            boxStyle: "box-red"
        },
        {
            name: "Suit-Ivermec 1% Inj",
            category: "Dewormers",
            subcat: "Injectables",
            volume: "50ml Vial",
            desc: "Injectable parasiticide for cattle, sheep, and camels. Eliminates ticks, mites, and internal worms.",
            composition: "Ivermectin 10mg/ml",
            admin: "Subcutaneous route: 1ml per 50kg body weight.",
            boxStyle: "box-teal"
        },
        {
            name: "BioToxin Binder Forte",
            category: "Feed Additives",
            subcat: "Poultry Products",
            volume: "25kg Bag",
            desc: "Triple action premium clay base toxin binder preventing aflatoxins from poisoning livestock feed.",
            composition: "HSCAS, Yeast Cell Wall Extract, Organic Acids",
            admin: "Mix 1-2 kg per ton of animal feed compound.",
            boxStyle: "box-gold"
        },
        {
            name: "Suit-TickGuard Spot On",
            category: "Pet Medicines",
            subcat: "Pet Medicines",
            volume: "3 Pipettes Pack",
            desc: "Rapid action topical spot-on treatment for dogs. Kills adult fleas, ticks, and lice within 24 hours.",
            composition: "Fipronil 9.8% + S-Methoprene 8.8%",
            admin: "Apply 1 pipette directly to skin at base of neck.",
            boxStyle: ""
        },
        {
            name: "Farma-Calcium Gel",
            category: "Nutritional Supplements",
            subcat: "Oral Solutions",
            volume: "300g Tube",
            desc: "Fast absorbing calcium paste tube preventing milk fever (parturient paresis) in high yield dairy cows.",
            composition: "Ionic Calcium Chloride + Magnesium + Vitamin D3",
            admin: "Administer 1 tube orally 12 hours before calving.",
            boxStyle: "box-gold"
        }
    ];

    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const aiSearchBar = document.getElementById('aiSearchBar');
    const searchClearBtn = document.getElementById('searchClearBtn');
    const categoryTabs = document.getElementById('categoryTabs');

    let activeFilter = 'all';
    let searchQuery = '';

    // Function to render products in UI
    const renderProducts = () => {
        if (!productsGrid) return;
        productsGrid.innerHTML = '';

        const filtered = productsData.filter(prod => {
            const matchesCategory = activeFilter === 'all' || 
                                    prod.category === activeFilter || 
                                    prod.subcat === activeFilter ||
                                    (activeFilter === 'Pet Care' && prod.category === 'Pet Medicines') ||
                                    (activeFilter === 'Livestock' && prod.category === 'Livestock Products') ||
                                    (activeFilter === 'Poultry' && prod.category === 'Poultry Products') ||
                                    (activeFilter === 'Nutritional' && prod.category === 'Nutritional Supplements');

            const matchesSearch = prod.name.toLowerCase().includes(searchQuery) ||
                                  prod.category.toLowerCase().includes(searchQuery) ||
                                  prod.desc.toLowerCase().includes(searchQuery) ||
                                  prod.composition.toLowerCase().includes(searchQuery);

            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            productsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            productsGrid.style.display = 'grid';
            noResults.style.display = 'none';

            filtered.forEach((prod, index) => {
                const card = document.createElement('div');
                card.className = 'product-card glass-card scroll-reveal';
                card.style.animationDelay = `${index * 0.05}s`;

                // Determine badge class
                let badgeClass = 'prod-badge';
                if (prod.category === 'Vaccines') badgeClass += ' bg-green';
                
                card.innerHTML = `
                    <div class="${badgeClass}">${prod.category}</div>
                    <div class="prod-pack-type">${prod.volume}</div>
                    <h3 class="prod-name">${prod.name}</h3>
                    <p class="prod-desc">${prod.desc}</p>
                    <div class="prod-composition">
                        <span>Active:</span> ${prod.composition}
                    </div>
                    <div class="prod-actions">
                        <button class="btn btn-primary btn-block btn-sm modal-open-trigger" data-name="${prod.name}">
                            <span>Inquire Dossier</span> <i class="fa-solid fa-clipboard-question"></i>
                        </button>
                    </div>
                `;
                productsGrid.appendChild(card);
            });
            
            // Re-bind modal triggers to dynamic elements
            bindModalTriggers();
        }
    };

    // Initialize product render
    renderProducts();

    // Category Tabs filtering
    if (categoryTabs) {
        categoryTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                categoryTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                activeFilter = e.target.getAttribute('data-filter');
                renderProducts();
            }
        });
    }

    // AI Search input trigger
    if (aiSearchBar) {
        aiSearchBar.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            if (searchQuery.length > 0) {
                searchClearBtn.style.display = 'block';
            } else {
                searchClearBtn.style.display = 'none';
            }
            renderProducts();
        });

        searchClearBtn.addEventListener('click', () => {
            aiSearchBar.value = '';
            searchQuery = '';
            searchClearBtn.style.display = 'none';
            renderProducts();
            aiSearchBar.focus();
        });
    }

    // Global category filtering function (called from Footer)
    window.filterCategory = (catName) => {
        if (!categoryTabs) return;
        const targetTab = Array.from(categoryTabs.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('data-filter') === catName);
        if (targetTab) {
            targetTab.click();
            window.location.hash = '#categories';
        }
    };

    /* ==========================================
       10. Product Detail Modal & Form Binding
       ========================================== */
    const productModal = document.getElementById('productModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Modal Element references
    const modalProductName = document.getElementById('modalProductName');
    const modalProductBadge = document.getElementById('modalProductBadge');
    const modalProductDosage = document.getElementById('modalProductDosage');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalProductAdmin = document.getElementById('modalProductAdmin');
    const inquiryProductName = document.getElementById('inquiryProductName');
    
    // Box contents on modal
    const modalProductBox = document.getElementById('modalProductBox');
    const modalProductBrandText = document.getElementById('modalProductBrandText');
    const modalProductVolumeText = document.getElementById('modalProductVolumeText');

    const openProductModal = (prodName) => {
        const prod = productsData.find(p => p.name === prodName) || productsData[0];
        
        modalProductName.innerText = prod.name;
        modalProductBadge.innerText = prod.category;
        
        // Color badge accordingly
        if (prod.category === 'Vaccines') {
            modalProductBadge.style.backgroundColor = 'var(--color-green)';
            modalProductBadge.style.color = '#fff';
        } else {
            modalProductBadge.style.backgroundColor = 'rgba(15, 76, 129, 0.15)';
            modalProductBadge.style.color = '#38bdf8';
        }

        modalProductDosage.innerText = prod.volume;
        modalProductDesc.innerText = prod.desc + " Composition: " + prod.composition;
        modalProductAdmin.innerText = prod.admin;
        inquiryProductName.value = prod.name;

        // Customize the 3D box graphic inside the modal
        modalProductBrandText.innerText = prod.name.split(' ')[0].toUpperCase();
        modalProductVolumeText.innerText = prod.volume;
        
        // Remove old style classes
        modalProductBox.className = "pharm-box-3d detail-box float-anim";
        if (prod.boxStyle) {
            modalProductBox.classList.add(prod.boxStyle);
        }

        productModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeProductModal = () => {
        productModal.classList.remove('show');
        document.body.style.overflow = '';
    };

    const bindModalTriggers = () => {
        // Dynamic products grid triggers
        document.querySelectorAll('.modal-open-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prodName = e.currentTarget.getAttribute('data-name');
                openProductModal(prodName);
            });
        });
    };

    // Inquiry triggers on the Featured Product slides
    document.querySelectorAll('.featured-actions .inquiry-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prodName = e.currentTarget.getAttribute('data-product');
            openProductModal(prodName);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProductModal);
    }
    
    // Close modal on backdrop click
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) closeProductModal();
        });
    }

    /* ==========================================
       11. Featured Products Showcase Carousel
       ========================================== */
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrevBtn = document.getElementById('carouselPrevBtn');
    const carouselNextBtn = document.getElementById('carouselNextBtn');
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;

    const updateCarousel = () => {
        if (!carouselTrack) return;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    };

    if (carouselNextBtn && carouselPrevBtn) {
        carouselNextBtn.addEventListener('click', nextSlide);
        carouselPrevBtn.addEventListener('click', prevSlide);
        
        // Auto-scroll every 6 seconds
        let autoCarousel = setInterval(nextSlide, 6000);
        
        // Reset timer on manual control
        const resetCarouselTimer = () => {
            clearInterval(autoCarousel);
            autoCarousel = setInterval(nextSlide, 6000);
        };
        
        carouselNextBtn.addEventListener('click', resetCarouselTimer);
        carouselPrevBtn.addEventListener('click', resetCarouselTimer);
    }

    /* ==========================================
       12. About Story Section Tabs
       ========================================== */
    const storyTabBtns = document.querySelectorAll('.story-tab-btn');
    const storyTabContents = document.querySelectorAll('.story-tab-content');

    storyTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            storyTabBtns.forEach(b => b.classList.remove('active'));
            storyTabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    /* ==========================================
       13. Interactive Masonry Gallery & Lightbox
       ========================================== */
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryFilters = document.getElementById('galleryFilters');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    let currentGalleryGroup = 'all';
    let visibleGalleryItems = [];
    let currentLightboxIndex = 0;

    // Filter logic
    if (galleryFilters) {
        galleryFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                galleryFilters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                currentGalleryGroup = e.target.getAttribute('data-group');
                
                // Animate masonry filter
                document.querySelectorAll('.gallery-item').forEach(item => {
                    const group = item.getAttribute('data-group');
                    if (currentGalleryGroup === 'all' || group === currentGalleryGroup) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            }
        });
    }

    // Lightbox triggers
    const getVisibleGalleryItems = () => {
        return Array.from(document.querySelectorAll('.gallery-item')).filter(item => {
            return currentGalleryGroup === 'all' || item.getAttribute('data-group') === currentGalleryGroup;
        });
    };

    const openLightbox = (index) => {
        visibleGalleryItems = getVisibleGalleryItems();
        currentLightboxIndex = index;
        const targetItem = visibleGalleryItems[currentLightboxIndex];
        const imgUrl = targetItem.querySelector('img').src;
        const caption = targetItem.querySelector('.gallery-hover span').innerText;

        lightboxImg.src = imgUrl;
        lightboxCaption.innerText = caption;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    };

    const navigateLightbox = (direction) => {
        const count = visibleGalleryItems.length;
        currentLightboxIndex = (currentLightboxIndex + direction + count) % count;
        const targetItem = visibleGalleryItems[currentLightboxIndex];
        
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
            lightboxImg.src = targetItem.querySelector('img').src;
            lightboxCaption.innerText = targetItem.querySelector('.gallery-hover span').innerText;
            lightboxImg.style.transform = 'scale(1)';
        }, 200);
    };

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // Find current index among currently visible items
            visibleGalleryItems = getVisibleGalleryItems();
            const visibleIndex = visibleGalleryItems.indexOf(item);
            openLightbox(visibleIndex);
        });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => navigateLightbox(1));
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => navigateLightbox(-1));
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    /* ==========================================
       14. Testimonial Slider Animation
       ========================================== */
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialDots = document.getElementById('testimonialDots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let activeTestimonial = 0;

    if (testimonialTrack && testimonialDots) {
        // Generate Dots
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                activeTestimonial = index;
                updateTestimonials();
            });
            testimonialDots.appendChild(dot);
        });

        const updateTestimonials = () => {
            testimonialTrack.style.transform = `translateX(-${activeTestimonial * 100}%)`;
            const dots = testimonialDots.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === activeTestimonial) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        };

        // Auto-run reviews slider
        setInterval(() => {
            activeTestimonial = (activeTestimonial + 1) % testimonialCards.length;
            updateTestimonials();
        }, 8000);
    }

    /* ==========================================
       15. Contact Interactive Map (Leaflet JS)
       ========================================== */
    const initMap = () => {
        const mapContainer = document.getElementById('contactMap');
        if (!mapContainer) return;

        // Coordinates for Lahore B2B Area (based on +92 300 phone code)
        const lat = 31.5204;
        const lng = 74.3587;

        // Initialize leaflet map
        const map = L.map('contactMap', {
            scrollWheelZoom: false,
            dragging: !L.Browser.mobile,
            tap: !L.Browser.mobile
        }).setView([lat, lng], 13);

        // Load OpenStreetMap vector tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        // Custom pointer styling
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: 'Poppins', sans-serif; padding: 5px;">
                <h4 style="margin: 0 0 4px 0; color: #0F4C81; font-size: 0.95rem;">FARMASUITS Head Office</h4>
                <p style="margin: 0; font-size: 0.75rem; color: #64748B;">Premium Veterinary Pharmaceuticals</p>
                <p style="margin: 4px 0 0 0; font-size: 0.8rem; font-weight: 600;">+92 300 6142273</p>
            </div>
        `).openPopup();
    };

    initMap();

    /* ==========================================
       16. Forms Submissions & success Popup
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const inquiryForm = document.getElementById('inquiryForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const successPopup = document.getElementById('successPopup');
    const successCloseBtn = document.getElementById('successCloseBtn');

    const showSuccessModal = () => {
        successPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeSuccessModal = () => {
        successPopup.classList.remove('show');
        document.body.style.overflow = '';
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                contactForm.reset();
                showSuccessModal();
            }, 1500);
        });
    }

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = inquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Registering Request...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                inquiryForm.reset();
                closeProductModal();
                showSuccessModal();
            }, 1600);
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            input.disabled = true;
            newsletterForm.querySelector('button').innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                input.value = '';
                input.disabled = false;
                newsletterForm.querySelector('button').innerHTML = `<i class="fa-solid fa-check"></i>`;
                setTimeout(() => {
                    newsletterForm.querySelector('button').innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
                }, 2000);
            }, 1000);
        });
    }

    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closeSuccessModal);
    }

    /* ==========================================
       17. Simulated AI Veterinary Live Chat
       ========================================== */
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatPanel = document.getElementById('chatPanel');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');

    const botGreetings = [
        "Hello! I am Dr. Suit-AI, your digital veterinarian assistant.",
        "How can I assist you with FARMASUITS bulk products, dosages, or distributorship programs today?"
    ];

    const loadGreetings = () => {
        chatMessages.innerHTML = '';
        botGreetings.forEach((msg, idx) => {
            setTimeout(() => {
                addMessage(msg, 'bot');
            }, (idx + 1) * 600);
        });
    };

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${sender}`;
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const showTypingIndicator = () => {
        const ind = document.createElement('div');
        ind.className = 'msg msg-bot typing-indicator';
        ind.id = 'typingIndicator';
        ind.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
        chatMessages.appendChild(ind);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const ind = document.getElementById('typingIndicator');
        if (ind) ind.remove();
    };

    const generateBotResponse = (userText) => {
        const text = userText.toLowerCase();
        
        if (text.includes('distributor') || text.includes('dealership') || text.includes('partner') || text.includes('agency')) {
            return "FARMASUITS is actively expanding its corporate distributor network. For wholesale pricing guides and compliance standards, please fill out the 'Distributor Inquiry Form' on our contact grid, and our logistics manager will write back to you.";
        }
        if (text.includes('tylosin') || text.includes('pneumonia') || text.includes('respiratory')) {
            return "Our flagship 'Farma-Tylosin 20% Inj' is premium-grade Tylosin Tartrate, designed for cattle lung infection. Ruminant dosage is 1ml per 20kg body weight daily via deep IM. Always double-check with a clinical veterinarian.";
        }
        if (text.includes('calcium') || text.includes('fever') || text.includes('gel')) {
            return "For acute calving calcium drops, we recommend 'Farma-Calcium Gel' paste tubes. Administer 1 tube orally 12 hours prior to calving, and 1 tube immediately post calving to avoid milk fever drops.";
        }
        if (text.includes('price') || text.includes('cost') || text.includes('quote')) {
            return "FARMASUITS operates on a direct-to-farm B2B pricing model. Send a commercial inquiry outlining your required dosage quantities via the contact form or WhatsApp button, and we will dispatch a custom quote sheet.";
        }
        if (text.includes('vaccine') || text.includes('newcastle') || text.includes('poultry')) {
            return "For poultry flocks, our 'Suit-Vacc ND LaSota' live vaccine vial provides high antigen titers against Ranikhet outbreaks. We ship vaccines inside temperature-insulated cold containers to preserve efficacy.";
        }
        if (text.includes('shipping') || text.includes('delivery') || text.includes('export')) {
            return "We export globally. R&D dossiers and drug regulatory compliance certificate packs are available for our B2B trade partners. Standard domestic shipping is completed in 24-48 hours.";
        }
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            return "Hello! How can I help you? Ask me about product compositions, dosages, pricing requests, or farm delivery details.";
        }

        return "Thank you for reaching out. Your query has been logged. Can I help you with bulk catalog inquiries, product dossiers, or distributor registration guidelines?";
    };

    chatToggleBtn.addEventListener('click', () => {
        chatPanel.classList.toggle('show');
        // Hide badge dot when chat is opened
        const badge = chatToggleBtn.querySelector('.chat-badge-dot');
        if (badge) badge.remove();
        
        if (chatPanel.classList.contains('show') && chatMessages.children.length === 0) {
            loadGreetings();
        }
    });

    chatCloseBtn.addEventListener('click', () => {
        chatPanel.classList.remove('show');
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        chatInput.value = '';

        // Simulate bot typing delay
        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateBotResponse(query);
                addMessage(response, 'bot');
            }, 1200);
        }, 300);
    });

});
