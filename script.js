// Spotlight cursor effect
const body = document.body;
body.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    body.style.setProperty('--spotlight-x', `${clientX}px`);
    body.style.setProperty('--spotlight-y', `${clientY}px`);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const isDarkMode = savedTheme ? savedTheme === 'dark' : true;

function setTheme(theme) {
    const html = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const mobileThemeIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

    if (theme === 'light') {
        html.classList.add('light');
        html.classList.remove('dark');
        if(themeIcon) themeIcon.className = 'fas fa-moon';
        if(mobileThemeIcon) mobileThemeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
        if(themeIcon) themeIcon.className = 'fas fa-sun';
        if(mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile theme toggle
const mobileThemeToggle = document.getElementById('theme-toggle-mobile');

// Initialize theme
setTheme(isDarkMode ? 'dark' : 'light');

// Theme toggle event listener
if(themeToggle){
     themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function updateMobileMenuPosition() {
    if (mobileMenu) {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            mobileMenu.style.top = headerHeight + 'px';
        }
    }
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('mobile-menu-open');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
        // Enable body scroll
        document.body.style.overflow = '';
    }
}

function openMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.add('mobile-menu-open');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
        // Disable body scroll
        document.body.style.overflow = 'hidden';
    }
}

if (mobileMenuToggle && mobileMenu) {
    // Update position on load and resize
    updateMobileMenuPosition();
    window.addEventListener('resize', updateMobileMenuPosition);
    
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        }
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        setTimeout(() => {
            typeWriter(typingElement, 'I build things for the web.', 150);
        }, 1000);
    }
});

// Animate skill progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress div');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    progressObserver.observe(skillsSection);
}

// Experience tabs
const jobTabs = document.querySelectorAll('.job-tab');
const jobPanels = document.querySelectorAll('.job-panel');

jobTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Deactivate all tabs
        jobTabs.forEach(t => {
            t.classList.remove('active', 'text-[#64ffda]', 'bg-[#112240]');
            t.classList.add('text-[#8892b0]', 'hover:bg-[#112240]', 'hover:text-[#64ffda]');
            t.style.borderColor = '#233554';
        });
        
        // Activate clicked tab
        tab.classList.add('active', 'text-[#64ffda]', 'bg-[#112240]');
        tab.classList.remove('text-[#8892b0]', 'hover:bg-[#112240]', 'hover:text-[#64ffda]');
        tab.style.borderColor = '#64ffda';
        
        // Hide all panels
        jobPanels.forEach(panel => {
            panel.classList.add('hidden');
        });
        
        // Show target panel
        const targetPanel = document.getElementById(tab.dataset.target);
        targetPanel.classList.remove('hidden');
    });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(elem => {
    revealObserver.observe(elem);
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Copy email to clipboard
function copyEmail() {
    const emailText = document.getElementById('email').innerText;
    const toast = document.getElementById('email-copy-toast');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(emailText).then(() => {
            showToast();
        }).catch(() => {
            fallbackCopy(emailText);
        });
    } else {
        fallbackCopy(emailText);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast();
    } catch (err) {
        console.error('Failed to copy email:', err);
    }
    
    document.body.removeChild(textArea);
}

function showToast() {
    const toast = document.getElementById('email-copy-toast');
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 0.5rem)';
    }, 3000);
}

// Add smooth scrolling offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Resume download functionality
function downloadResume() {
    // Local PDF file path
    const resumeUrl = './Rahul_Resume.pdf';
    
    // Create download link
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Rahul_Das_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add event listeners for resume download buttons
const downloadResumeBtn = document.getElementById('download-resume');
const downloadResumeContactBtn = document.getElementById('download-resume-contact');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadResume();
    });
}

if (downloadResumeContactBtn) {
    downloadResumeContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadResume();
    });
}
