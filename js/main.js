document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    const faqItems = document.querySelectorAll('.faq-item');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const copyLinkBtn = document.getElementById('copy-link');
    const linkCopiedAlert = document.getElementById('link-copied');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletter-form');

    // Mobile Menu Toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const faqToggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    if (icon) {
                        icon.className = 'fas fa-plus';
                    }
                }
            });
            
            item.classList.toggle('active');
            const icon = faqToggle.querySelector('i');
            if (icon) {
                icon.className = item.classList.contains('active') ? 'fas fa-times' : 'fas fa-plus';
            }
        });
    });

    // Product Categories Filter
    if (categoryBtns.length > 0 && productCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonial Slider
    let currentSlide = 0;
    
    function showSlide(index) {
        if (index < 0) {
            currentSlide = testimonialSlides.length - 1;
        } else if (index >= testimonialSlides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === currentSlide ? 'block' : 'none';
        });
    }
    
    if (testimonialSlides.length > 0) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Next and Previous buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Copy Link to Clipboard
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = window.location.href;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Show alert
            linkCopiedAlert.style.display = 'block';
            
            // Hide alert after 2 seconds
            setTimeout(() => {
                linkCopiedAlert.style.display = 'none';
            }, 2000);
        });
    }

    // Social Sharing
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        if (!btn.classList.contains('whatsapp') && !btn.classList.contains('facebook') && !btn.classList.contains('twitter')) {
            return;
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';
            
            if (this.classList.contains('whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            } else if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });

    // Form Submissions
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const formData = new FormData(contactForm);
            console.log('Contact Form Data:');
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('alert', 'success');
            successMessage.textContent = 'Votre message a été envoyé avec succès!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const email = newsletterForm.querySelector('input[type="email"]').value;
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.classList.add('alert', 'success');
            successMessage.textContent = 'Merci pour votre inscription!';
            newsletterForm.appendChild(successMessage);
            
            // Reset form
            newsletterForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = (windowTopPosition + windowHeight);
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = (elementTopPosition + elementHeight);
            
            // Check if element is in view
            if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            } else {
                element.classList.remove('animated');
            }
        });
    }
    
    if (animateElements.length > 0) {
        window.addEventListener('scroll', checkIfInView);
        window.addEventListener('resize', checkIfInView);
        window.addEventListener('load', checkIfInView);
    }

    // Détails des produits
    const products = {
        curcuma: {
            title: "Savon Naturel - Édition Limitée",
            image: "images/savon-1.jpg",
            description: "Notre savon naturel est un produit 100% naturel spécialement formulé pour les peaux à tendance acnéique. Il combine les propriétés anti-inflammatoires et antioxydantes du curcuma avec des ingrédients naturels pour un nettoyage en profondeur.",
            benefits: [
                "Lutte efficacement contre l'acné en régulant l'excès de sébum",
                "Ravive la peau et la rend uniforme",
                "Propriétés anti-inflammatoires et antioxydantes",
                "Laisse votre peau propre et éclatante",
                "Convient à tous les types de peau"
            ],
            ingredients: [
                "Curcuma biologique",
                "Huile de coco",
                "Beurre de karité",
                "Huile essentielle de tea tree",
                "Miel"
            ],
            usage: "Utiliser quotidiennement sur le visage et le corps. Masser délicatement sur peau humide, rincer à l'eau tiède.",
            price: "15€",
            promo: "Promotion en cours!",
            contact: "Contactez-nous au 07 55 07 81 85",
            specialFeatures: [
                "Formule exclusive brevetée",
                "Fabriqué en France",
                "Sans parabènes ni sulfates",
                "Testé dermatologiquement",
                "Emballage écologique"
            ],
            customerReviews: [
                {
                    rating: 5,
                    comment: "Un produit exceptionnel qui a transformé ma peau!",
                    author: "Marie D."
                },
                {
                    rating: 5,
                    comment: "Je recommande vivement, ma peau n'a jamais été aussi belle!",
                    author: "Sophie M."
                }
            ],
            stockStatus: "En stock",
            shippingInfo: "Livraison gratuite à partir de 50€ d'achat",
            guarantee: "Satisfaction garantie ou remboursé sous 30 jours"
        }
    };

    // Gestion de la modale
    const modal = document.getElementById('product-modal');
    const closeModal = document.querySelector('.close-modal');
    const viewProductButtons = document.querySelectorAll('.view-product');

    viewProductButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            if (productId && products[productId]) {
                const product = products[productId];
                
                // Mise à jour des informations de base
                modal.querySelector('.modal-product-image img').src = product.image;
                modal.querySelector('.modal-product-image img').alt = product.title;
                modal.querySelector('.modal-product-info h2').textContent = product.title;
                modal.querySelector('.modal-description').textContent = product.description;
                
                // Mise à jour des bénéfices avec des icônes
                const benefitsList = modal.querySelector('.modal-benefits ul');
                benefitsList.innerHTML = '';
                product.benefits.forEach(benefit => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-check-circle"></i>${benefit}`;
                    benefitsList.appendChild(li);
                });
                
                // Mise à jour des ingrédients avec des icônes
                const ingredientsList = modal.querySelector('.modal-ingredients ul');
                ingredientsList.innerHTML = '';
                product.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-leaf"></i>${ingredient}`;
                    ingredientsList.appendChild(li);
                });
                
                // Mise à jour du mode d'emploi
                modal.querySelector('.modal-usage p').textContent = product.usage;
                
                // Mise à jour des caractéristiques avec des icônes
                const featuresList = modal.querySelector('.modal-special-features ul');
                featuresList.innerHTML = '';
                product.specialFeatures.forEach(feature => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-star"></i>${feature}`;
                    featuresList.appendChild(li);
                });
                
                // Ajout des avis clients
                const reviewsContainer = modal.querySelector('.reviews-container');
                reviewsContainer.innerHTML = '';
                product.customerReviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.className = 'review-item';
                    reviewDiv.innerHTML = `
                        <div class="stars">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                        </div>
                        <p class="comment">${review.comment}</p>
                        <p class="author">${review.author}</p>
                    `;
                    reviewsContainer.appendChild(reviewDiv);
                });
                
                // Mise à jour du prix et des promotions
                modal.querySelector('.price').textContent = product.price;
                modal.querySelector('.promo').textContent = product.promo || '';
                modal.querySelector('.stock-status').textContent = product.stockStatus || '';
                
                // Mise à jour des informations de livraison et garantie
                modal.querySelector('.shipping-info').textContent = product.shippingInfo || 'Livraison sous 48h - Gratuite dès 50€ d\'achat';
                modal.querySelector('.guarantee-text').textContent = product.guarantee || 'Satisfait ou remboursé pendant 30 jours';
                
                // Mise à jour de la section contact
                const contactLabel = modal.querySelector('.call-label');
                if (contactLabel) {
                    contactLabel.textContent = 'Contactez-nous au';
                }

                const contactPhoneText = modal.querySelector('.contact-phone-text');
                if (contactPhoneText) {
                    contactPhoneText.textContent = 'Contactez-nous au';
                }
                
                modal.style.display = 'block';
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}); 