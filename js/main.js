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
    
    // Éléments pour la navigation des modales de savon
    const productModal = document.getElementById('product-modal');
    const variantsModal = document.getElementById('variants-modal');
    const closeVariantsModal = document.querySelector('.close-variants-modal');
    const viewVariantBtns = document.querySelectorAll('.view-variant-btn');
    const variantCards = document.querySelectorAll('.variant-card');

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
            title: "Savon Naturel - Curcuma",
            image: "images/savon-1.jpg",
            description: "Notre savon naturel au curcuma est un produit 100% naturel spécialement formulé pour les peaux à tendance acnéique. Il combine les propriétés anti-inflammatoires et antioxydantes du curcuma avec des ingrédients naturels pour un nettoyage en profondeur.",
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
        },
        citron: {
            title: "Savon Naturel - Citron",
            image: "images/savon-1.jpg", // On utilise la même image pour le moment
            description: "Notre savon naturel au citron est un produit 100% naturel parfait pour revitaliser et purifier votre peau. Riche en vitamine C, il éclaircit le teint et resserre les pores pour une peau fraîche et lumineuse.",
            benefits: [
                "Éclaircit et uniformise le teint",
                "Resserre les pores et réduit l'excès de sébum",
                "Propriétés antiseptiques et antibactériennes",
                "Effet tonifiant et revitalisant",
                "Parfum frais et énergisant"
            ],
            ingredients: [
                "Huile essentielle de citron bio",
                "Huile d'olive",
                "Huile de coco",
                "Beurre de karité",
                "Argile blanche"
            ],
            usage: "Appliquer sur peau humide en massant délicatement. Éviter le contour des yeux. Rincer abondamment à l'eau tiède.",
            price: "15€",
            promo: "2 achetés = 1 offert!",
            contact: "Contactez-nous au 07 55 07 81 85",
            specialFeatures: [
                "Formule exclusive revitalisante",
                "Fabriqué en France",
                "Sans colorants artificiels",
                "Testé dermatologiquement",
                "Emballage biodégradable"
            ],
            customerReviews: [
                {
                    rating: 5,
                    comment: "Ce savon a complètement transformé mon teint terne!",
                    author: "Lucie R."
                },
                {
                    rating: 4,
                    comment: "J'adore son parfum frais et ses effets sur ma peau!",
                    author: "Thomas M."
                }
            ],
            stockStatus: "En stock",
            shippingInfo: "Livraison gratuite à partir de 50€ d'achat",
            guarantee: "Satisfaction garantie ou remboursé sous 30 jours"
        },
        carotte: {
            title: "Savon Naturel - Carotte",
            image: "images/savon-1.jpg", // On utilise la même image pour le moment
            description: "Notre savon naturel à la carotte est riche en bêta-carotène et en vitamines, parfait pour nourrir et revitaliser les peaux ternes et fatiguées. Il apporte un éclat naturel et améliore l'élasticité de la peau.",
            benefits: [
                "Nourrit et revitalise la peau",
                "Apporte un teint éclatant et lumineux",
                "Riche en antioxydants naturels",
                "Améliore l'élasticité et la fermeté",
                "Idéal pour les peaux ternes et fatiguées"
            ],
            ingredients: [
                "Extrait de carotte bio",
                "Huile de carotte",
                "Huile d'amande douce",
                "Beurre de karité",
                "Argile jaune"
            ],
            usage: "Utiliser quotidiennement sur le visage et le corps. Faire mousser doucement sur peau humide et rincer à l'eau tiède.",
            price: "16€",
            promo: "Nouveau produit!",
            contact: "Contactez-nous au 07 55 07 81 85",
            specialFeatures: [
                "Formule riche en bêta-carotène",
                "Fabriqué en France",
                "Sans conservateurs",
                "Testé dermatologiquement",
                "Emballage écologique"
            ],
            customerReviews: [
                {
                    rating: 5,
                    comment: "Ma peau est radieuse, merci pour ce savon exceptionnel!",
                    author: "Émilie F."
                },
                {
                    rating: 5,
                    comment: "Je l'utilise depuis 2 semaines et ma peau est transformée!",
                    author: "Jean-Philippe B."
                }
            ],
            stockStatus: "En stock limité",
            shippingInfo: "Livraison gratuite à partir de 50€ d'achat",
            guarantee: "Satisfaction garantie ou remboursé sous 30 jours"
        },
        charbon: {
            title: "Savon Naturel - Charbon",
            image: "images/savon-1.jpg", // On utilise la même image pour le moment
            description: "Notre savon détoxifiant au charbon actif est parfait pour une peau nette et purifiée. Le charbon actif absorbe les impuretés et les toxines en profondeur, pour un teint purifié et une peau douce.",
            benefits: [
                "Détoxifie et purifie la peau en profondeur",
                "Absorbe l'excès de sébum et les impuretés",
                "Combat efficacement les points noirs",
                "Laisse la peau douce et nette",
                "Convient aux peaux mixtes à grasses"
            ],
            ingredients: [
                "Charbon actif végétal",
                "Huile de jojoba",
                "Huile d'argan",
                "Huile essentielle de tea tree",
                "Argile verte"
            ],
            usage: "Appliquer sur peau humide, masser en mouvements circulaires en évitant le contour des yeux. Rincer abondamment.",
            price: "17€",
            promo: "Offre découverte!",
            contact: "Contactez-nous au 07 55 07 81 85",
            specialFeatures: [
                "Pouvoir détoxifiant exceptionnel",
                "Fabriqué en France",
                "Sans colorants artificiels",
                "Testé dermatologiquement",
                "Emballage zéro déchet"
            ],
            customerReviews: [
                {
                    rating: 5,
                    comment: "Finis les points noirs! Ce savon est miraculeux!",
                    author: "Camille T."
                },
                {
                    rating: 4,
                    comment: "Très efficace pour ma peau grasse, je recommande!",
                    author: "Alexandre M."
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

    // Fonction pour mettre à jour les détails du produit dans la modale
    function updateProductDetails(productId) {
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
            
            // Ajout des avis clients avec animation
            const reviewsContainer = modal.querySelector('.reviews-container');
            reviewsContainer.innerHTML = '';
            
            // Mettre à jour le compteur d'avis dans le titre
            const reviewCount = modal.querySelector('.review-count');
            if (reviewCount) {
                reviewCount.textContent = `(${product.customerReviews.length} avis)`;
            }
            
            // Créer et afficher progressivement les avis
            product.customerReviews.forEach((review, index) => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = 'review-item';
                reviewDiv.style.opacity = '0';
                reviewDiv.style.transform = 'translateY(20px)';
                reviewDiv.innerHTML = `
                    <div class="stars">
                        ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                    </div>
                    <p class="comment">${review.comment}</p>
                    <p class="author">${review.author}</p>
                `;
                reviewsContainer.appendChild(reviewDiv);
                
                // Animation d'entrée pour chaque avis
                setTimeout(() => {
                    reviewDiv.style.opacity = '1';
                    reviewDiv.style.transform = 'translateY(0)';
                    reviewDiv.style.transition = 'all 0.5s ease';
                }, 300 + (index * 150));
            });
            
            // Mise à jour du prix avec animation
            const priceElement = modal.querySelector('.price');
            priceElement.style.transform = 'scale(1.2)';
            priceElement.textContent = product.price;
            setTimeout(() => {
                priceElement.style.transform = 'scale(1)';
                priceElement.style.transition = 'transform 0.3s ease';
            }, 300);
            
            // Mise à jour des promotions avec animation
            const promoElement = modal.querySelector('.promo');
            if (product.promo) {
                promoElement.textContent = product.promo;
                promoElement.style.display = 'inline-block';
                
                // Animation pulsante pour la promo
                promoElement.classList.add('pulse-animation');
            } else {
                promoElement.style.display = 'none';
                promoElement.classList.remove('pulse-animation');
            }
            
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
            
            // Mettre à jour le bouton actif dans le sélecteur de variantes
            const variantButtons = modal.querySelectorAll('.variant-btn');
            variantButtons.forEach(btn => {
                if (btn.getAttribute('data-variant') === productId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Gérer l'affichage du bouton de retour
            const backButton = modal.querySelector('.back-to-variants');
            if (backButton) {
                if (productId === 'curcuma' || productId === 'citron' || productId === 'carotte' || productId === 'charbon') {
                    backButton.style.display = 'flex';
                } else {
                    backButton.style.display = 'none';
                }
            }
            
            // Gérer l'animation de badge spécifique pour chaque variante
            const badges = modal.querySelectorAll('.badge-custom');
            badges.forEach(badge => {
                badge.classList.remove('badge-highlight');
            });
            
            // Mettre en évidence le badge spécifique à la variante
            if (productId === 'curcuma') {
                // Mettre en évidence le badge anti-inflammatoire
                badges[1].classList.add('badge-highlight');
            } else if (productId === 'citron') {
                // Mettre en évidence le badge écologique
                badges[3].classList.add('badge-highlight');
            } else if (productId === 'carotte') {
                // Mettre en évidence le badge testé dermatologiquement
                badges[2].classList.add('badge-highlight');
            } else if (productId === 'charbon') {
                // Mettre en évidence le badge fabriqué en France
                badges[1].classList.add('badge-highlight');
            }
        }
    }

    // Gestion des clics sur les boutons "Voir détails"
    viewProductButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            
            // Si c'est le savon naturel, afficher la modale des variétés
            if (productId === 'curcuma') {
                variantsModal.style.display = 'block';
                // Gérer le défilement correctement sans bloquer complètement la page
                document.body.classList.add('modal-open');
                
                // Animation d'entrée pour la modale des variétés
                setTimeout(() => {
                    variantsModal.querySelector('.modal-content').classList.add('animated');
                }, 50);
                
                // Animer les cartes des variétés
                const cards = variantsModal.querySelectorAll('.variant-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, 100 + (index * 100));
                });
            } else if (productId) {
                // Afficher le sélecteur de variantes uniquement pour le savon naturel
                const variantsSelector = modal.querySelector('#variants-selector');
                if (variantsSelector) {
                    if (productId === 'curcuma' || productId === 'citron' || productId === 'carotte' || productId === 'charbon') {
                        variantsSelector.style.display = 'block';
                    } else {
                        variantsSelector.style.display = 'none';
                    }
                }
                
                updateProductDetails(productId);
                modal.style.display = 'block';
                // Gérer le défilement correctement sans bloquer complètement la page
                document.body.classList.add('modal-open');
                
                // Animation d'entrée pour la modale détaillée
                setTimeout(() => {
                    modal.querySelector('.modal-content').classList.add('animated');
                }, 50);
            }
        });
    });

    // Permettre le zoom des images dans les modales
    const modalImages = document.querySelectorAll('.modal-product-image img');
    modalImages.forEach(img => {
        img.addEventListener('click', function() {
            // Toggle la classe zoom pour permettre de zoomer/dézoomer
            this.classList.toggle('zoomed');
            
            // Si l'image est zoomée, permettre le défilement
            if (this.classList.contains('zoomed')) {
                this.closest('.modal-content').style.overflow = 'auto';
            } else {
                this.closest('.modal-content').style.overflow = '';
            }
        });
    });

    // Gestion du swipe sur mobile pour naviguer entre les variantes
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Fonction pour gérer le swipe entre variantes
    function handleSwipe() {
        const swipeThreshold = 100; // Minimum de distance pour considérer qu'il y a swipe
        const activeVariantBtn = modal.querySelector('.variant-btn.active');
        
        if (!activeVariantBtn) return;
        
        const allVariantBtns = Array.from(modal.querySelectorAll('.variant-btn'));
        const currentIndex = allVariantBtns.indexOf(activeVariantBtn);
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe vers la droite - variante précédente
            const prevIndex = (currentIndex - 1 + allVariantBtns.length) % allVariantBtns.length;
            const prevVariantBtn = allVariantBtns[prevIndex];
            const variantId = prevVariantBtn.getAttribute('data-variant');
            
            // Animation de transition
            const modalContent = modal.querySelector('.modal-product-details');
            modalContent.style.opacity = '0.5';
            modalContent.style.transform = 'translateX(50px)';
            setTimeout(() => {
                updateProductDetails(variantId);
                updateVariantTheme(variantId);
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateX(0)';
            }, 200);
            
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe vers la gauche - variante suivante
            const nextIndex = (currentIndex + 1) % allVariantBtns.length;
            const nextVariantBtn = allVariantBtns[nextIndex];
            const variantId = nextVariantBtn.getAttribute('data-variant');
            
            // Animation de transition
            const modalContent = modal.querySelector('.modal-product-details');
            modalContent.style.opacity = '0.5';
            modalContent.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                updateProductDetails(variantId);
                updateVariantTheme(variantId);
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateX(0)';
            }, 200);
        }
    }
    
    // Ajouter les écouteurs d'événements tactiles
    if (modal) {
        const modalProductDetails = modal.querySelector('.modal-product-details');
        if (modalProductDetails) {
            modalProductDetails.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            modalProductDetails.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
    }

    // Corriger le comportement de défilement sur iOS
    function fixIOSScroll() {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (!iOS) return;
        
        const modalContents = document.querySelectorAll('.modal-content');
        modalContents.forEach(content => {
            content.style.webkitOverflowScrolling = 'touch';
        });
        
        // Prévenir le défilement de la page sous la modale
        document.body.addEventListener('touchmove', function(e) {
            if (document.body.classList.contains('modal-open')) {
                // Vérifier si l'événement provient d'un élément à l'intérieur de la modale
                let isModalContent = false;
                let target = e.target;
                
                while (target) {
                    if (target.classList && (target.classList.contains('modal-content') || 
                                            target.classList.contains('modal-product-info'))) {
                        isModalContent = true;
                        break;
                    }
                    target = target.parentElement;
                }
                
                // Si nous ne sommes pas dans un contenu défilable de modale, empêcher le défilement
                if (!isModalContent) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }
    
    // Exécuter le correctif iOS
    fixIOSScroll();

    // Gestion des clics sur les boutons de variantes dans la modale détaillée
    const variantButtons = modal.querySelectorAll('.variant-btn');
    variantButtons.forEach(button => {
        button.addEventListener('click', () => {
            const variantId = button.getAttribute('data-variant');
            
            // Petite animation lors du changement de variante
            const modalContent = modal.querySelector('.modal-product-details');
            modalContent.style.opacity = '0.5';
            setTimeout(() => {
                updateProductDetails(variantId);
                modalContent.style.opacity = '1';
            }, 200);
            
            // Adapter les couleurs du thème en fonction de la variante
            updateVariantTheme(variantId);
        });
    });

    // Fonction pour adapter les couleurs du thème en fonction de la variante
    function updateVariantTheme(variantId) {
        const modalContent = modal.querySelector('.modal-content');
        
        // Réinitialiser les classes de thème
        modalContent.classList.remove('theme-curcuma', 'theme-citron', 'theme-carotte', 'theme-charbon');
        
        // Ajouter la classe de thème correspondante
        modalContent.classList.add('theme-' + variantId);
        
        // Adapter les couleurs des boutons
        const orderBtn = modal.querySelector('.order-btn');
        const questionBtn = modal.querySelector('.question-btn');
        
        if (orderBtn && questionBtn) {
            // Réinitialiser les couleurs
            orderBtn.style.backgroundColor = '';
            questionBtn.style.backgroundColor = '';
            
            // Définir les nouvelles couleurs
            switch(variantId) {
                case 'curcuma':
                    orderBtn.style.backgroundColor = '#E6A800';
                    questionBtn.style.backgroundColor = '#D99A00';
                    break;
                case 'citron':
                    orderBtn.style.backgroundColor = '#FFD700';
                    questionBtn.style.backgroundColor = '#F5CE00';
                    orderBtn.style.color = '#2C1810';
                    break;
                case 'carotte':
                    orderBtn.style.backgroundColor = '#FF7F00';
                    questionBtn.style.backgroundColor = '#F07700';
                    break;
                case 'charbon':
                    orderBtn.style.backgroundColor = '#333333';
                    questionBtn.style.backgroundColor = '#222222';
                    break;
                default:
                    // Couleurs par défaut
                    orderBtn.style.backgroundColor = '#D4A76A';
                    questionBtn.style.backgroundColor = '#C17C3F';
            }
        }
    }

    // Gestion des clics sur "Voir détails" dans les cartes de variantes
    if (viewVariantBtns.length > 0) {
        viewVariantBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Empêcher que l'événement se propage au parent (variant-card)
                
                // Récupérer la variante sélectionnée
                const variant = this.closest('.variant-card').dataset.variant;
                
                // Animer la sortie de la modale des variétés
                variantsModal.querySelector('.modal-content').classList.remove('animated');
                
                // Ouvrir la modale détaillée avec la variante sélectionnée après une courte transition
                setTimeout(() => {
                    // Cacher la modale des variétés mais ne pas la fermer complètement
                    // pour permettre d'y retourner
                    variantsModal.style.display = 'none';
                    
                    // Ouvrir la modale détaillée
                    updateProductDetails(variant);
                    modal.style.display = 'block';
                    
                    // Stocker la référence à la modale précédente
                    modal.dataset.previousModal = 'variants-modal';
                    
                    // Adapter les couleurs du thème
                    updateVariantTheme(variant);
                    
                    // Animation d'entrée
                    setTimeout(() => {
                        modal.querySelector('.modal-content').classList.add('animated');
                    }, 50);
                }, 200);
            });
        });
    }

    // Permettre également de cliquer sur toute la carte de variante pour ouvrir la modale détaillée
    if (variantCards.length > 0) {
        variantCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Ne pas déclencher si on a cliqué sur le bouton (pour éviter la double action)
                if (!e.target.closest('.view-variant-btn')) {
                    const variant = this.dataset.variant;
                    
                    // Animer la sortie de la modale des variétés
                    variantsModal.querySelector('.modal-content').classList.remove('animated');
                    
                    // Ouvrir la modale détaillée avec la variante sélectionnée après une courte transition
                    setTimeout(() => {
                        // Cacher la modale des variétés mais ne pas la fermer complètement
                        variantsModal.style.display = 'none';
                        
                        // Ouvrir la modale détaillée
                        updateProductDetails(variant);
                        modal.style.display = 'block';
                        
                        // Stocker la référence à la modale précédente
                        modal.dataset.previousModal = 'variants-modal';
                        
                        // Adapter les couleurs du thème
                        updateVariantTheme(variant);
                        
                        // Animation d'entrée
                        setTimeout(() => {
                            modal.querySelector('.modal-content').classList.add('animated');
                        }, 50);
                    }, 200);
                }
            });
        });
    }

    // Ajouter un bouton pour retourner à la modale précédente
    const backButton = document.createElement('button');
    backButton.classList.add('back-to-variants');
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Retour aux variétés';
    
    // Ajouter le bouton à la modale détaillée
    const modalHeader = modal.querySelector('.modal-product-info');
    if (modalHeader) {
        modalHeader.insertBefore(backButton, modalHeader.firstChild);
    }
    
    // Gérer le clic sur le bouton de retour
    backButton.addEventListener('click', function() {
        if (modal.dataset.previousModal === 'variants-modal') {
            // Animer la sortie de la modale détaillée
            const modalContent = modal.querySelector('.modal-content');
            modalContent.classList.remove('animated');
            modalContent.classList.add('closing');
            
            // Animer le fond de la modale
            modal.classList.add('closing');
            
            // Créer un overlay temporaire pour éviter l'effet de flash
            const tempOverlay = document.createElement('div');
            tempOverlay.className = 'temp-overlay';
            document.body.appendChild(tempOverlay);
            
            setTimeout(() => {
                // Fermer la modale détaillée
                modal.style.display = 'none';
                // Retirer la classe de fermeture
                modalContent.classList.remove('closing');
                modal.classList.remove('closing');
                
                // Réafficher la modale des variétés
                variantsModal.style.display = 'block';
                
                // Animation d'entrée pour la modale des variétés
                setTimeout(() => {
                    variantsModal.querySelector('.modal-content').classList.add('animated');
                    
                    // Faire disparaître progressivement l'overlay
                    tempOverlay.style.opacity = '0';
                    setTimeout(() => {
                        tempOverlay.remove();
                    }, 300);
                }, 50);
                
                // Animer les cartes des variétés
                const cards = variantsModal.querySelectorAll('.variant-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, 100 + (index * 100));
                });
            }, 400); // Plus de temps pour voir la transition
        }
    });

    // Fermer la modale des variétés
    if (closeVariantsModal) {
        closeVariantsModal.addEventListener('click', () => {
            // Animer la sortie avec une transition plus longue
            const modalContent = variantsModal.querySelector('.modal-content');
            modalContent.classList.remove('animated');
            modalContent.classList.add('closing');
            
            // Animer le fond de la modale
            variantsModal.classList.add('closing');
            
            // Créer un overlay temporaire pour éviter l'effet de flash
            const tempOverlay = document.createElement('div');
            tempOverlay.className = 'temp-overlay';
            document.body.appendChild(tempOverlay);
            
            // Attendre plus longtemps avant de cacher complètement la modale
            setTimeout(() => {
                variantsModal.style.display = 'none';
                // Réactiver le défilement normal de la page
                document.body.classList.remove('modal-open');
                // Retirer la classe de fermeture
                modalContent.classList.remove('closing');
                variantsModal.classList.remove('closing');
                
                // Retirer l'overlay temporaire avec un fade out
                tempOverlay.style.opacity = '0';
                setTimeout(() => {
                    tempOverlay.remove();
                }, 300);
            }, 400); // Plus de temps pour voir la transition
        });
    }

    // Fermer la modale détaillée
    closeModal.addEventListener('click', () => {
        // Animer la sortie avec une transition plus longue
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.remove('animated');
        modalContent.classList.add('closing');
        
        // Animer le fond de la modale
        modal.classList.add('closing');
        
        // Créer un overlay temporaire pour éviter l'effet de flash
        const tempOverlay = document.createElement('div');
        tempOverlay.className = 'temp-overlay';
        document.body.appendChild(tempOverlay);
        
        // Attendre plus longtemps avant de cacher complètement la modale
        setTimeout(() => {
            modal.style.display = 'none';
            // Réactiver le défilement normal de la page
            document.body.classList.remove('modal-open');
            // Retirer la classe de fermeture
            modalContent.classList.remove('closing');
            modal.classList.remove('closing');
            
            // Effacer la référence à la modale précédente
            modal.dataset.previousModal = '';
            
            // Retirer l'overlay temporaire avec un fade out
            tempOverlay.style.opacity = '0';
            setTimeout(() => {
                tempOverlay.remove();
            }, 300);
        }, 400); // Plus de temps pour voir la transition
    });

    // Fermer les modales en cliquant en dehors
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            // Animer la sortie avec une transition plus longue
            const modalContent = modal.querySelector('.modal-content');
            modalContent.classList.remove('animated');
            modalContent.classList.add('closing');
            
            // Animer le fond de la modale
            modal.classList.add('closing');
            
            // Créer un overlay temporaire pour éviter l'effet de flash
            const tempOverlay = document.createElement('div');
            tempOverlay.className = 'temp-overlay';
            document.body.appendChild(tempOverlay);
            
            // Attendre plus longtemps avant de cacher complètement la modale
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                // Retirer la classe de fermeture
                modalContent.classList.remove('closing');
                modal.classList.remove('closing');
                
                // Effacer la référence à la modale précédente
                modal.dataset.previousModal = '';
                
                // Retirer l'overlay temporaire avec un fade out
                tempOverlay.style.opacity = '0';
                setTimeout(() => {
                    tempOverlay.remove();
                }, 300);
            }, 400); // Plus de temps pour voir la transition
        }
        if (e.target === variantsModal) {
            // Animer la sortie avec une transition plus longue
            const modalContent = variantsModal.querySelector('.modal-content');
            modalContent.classList.remove('animated');
            modalContent.classList.add('closing');
            
            // Animer le fond de la modale
            variantsModal.classList.add('closing');
            
            // Créer un overlay temporaire pour éviter l'effet de flash
            const tempOverlay = document.createElement('div');
            tempOverlay.className = 'temp-overlay';
            document.body.appendChild(tempOverlay);
            
            // Attendre plus longtemps avant de cacher complètement la modale
            setTimeout(() => {
                variantsModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                // Retirer la classe de fermeture
                modalContent.classList.remove('closing');
                variantsModal.classList.remove('closing');
                
                // Retirer l'overlay temporaire avec un fade out
                tempOverlay.style.opacity = '0';
                setTimeout(() => {
                    tempOverlay.remove();
                }, 300);
            }, 400); // Plus de temps pour voir la transition
        }
    });

    // Gérer la touche Échap pour fermer les modales
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') {
                closeModal.click();
            } else if (variantsModal.style.display === 'block') {
                closeVariantsModal.click();
            }
        }
    });

    // Assurer que les modales sont correctement positionnées sur mobile
    function adjustModalForMobile() {
        const isMobile = window.innerWidth <= 768;
        const modalContents = document.querySelectorAll('.modal-content');
        
        modalContents.forEach(content => {
            if (isMobile) {
                content.style.maxHeight = '85vh';
                content.style.width = '95%';
            } else {
                content.style.maxHeight = '';
                content.style.width = '';
            }
        });
    }
    
    // Exécuter à l'initialisation et au redimensionnement
    window.addEventListener('resize', adjustModalForMobile);
    adjustModalForMobile();
}); 