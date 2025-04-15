// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const bottomNav = document.querySelector('.bottom-nav');

mobileMenuBtn.addEventListener('click', () => {
    bottomNav.classList.toggle('show');
});

// Daily Bible Verse - This would typically be fetched from an API
// For now, we'll use a static array that you can update
const bibleVerses = [
    {
        text: "Your word is a lamp for my feet, a light on my path.",
        reference: "Psalm 119:105 (NIV)"
    },
    {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "John 3:16 (NIV)"
    },
    {
        text: "I can do all this through him who gives me strength.",
        reference: "Philippians 4:13 (NIV)"
    },
    {
        text: "Trust in the LORD with all your heart and lean not on your own understanding.",
        reference: "Proverbs 3:5 (NIV)"
    }
];

// Function to update the daily verse
function updateDailyVerse() {
    const today = new Date().getDate();
    const verseIndex = today % bibleVerses.length;
    const verse = bibleVerses[verseIndex];
    
    document.querySelector('.verse-text').textContent = `"${verse.text}"`;
    document.querySelector('.verse-reference').textContent = verse.reference;
}

// Share button functionality
document.querySelector('.share-verse').addEventListener('click', () => {
    const shareText = "నేటి బైబిల్ వాక్యం - లైట్హౌస్ చర్చి";
    const imageUrl = document.querySelector('.verse-image img').src;
    
    if (navigator.share) {
        navigator.share({
            title: "నేటి బైబిల్ వాక్యం",
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText, imageUrl);
        });
    } else {
        fallbackShare(shareText, imageUrl);
    }
});

function fallbackShare(text, imageUrl) {
    // For devices that don't support sharing images directly
    const shareUrl = `${window.location.href}?verse=${encodeURIComponent(imageUrl)}`;
    navigator.clipboard.writeText(`${text}\n${shareUrl}`).then(() => {
        alert('వాక్యం లింక్ కాపీ అయ్యింది!');
    }).catch(err => {
        console.log('Could not copy text: ', err);
        prompt('ఈ వాక్యాన్ని షేర్ చేయండి:', `${text}\n${shareUrl}`);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDailyVerse();
    
    // Highlight current day in nav
    const currentPage = window.location.hash || '#home';
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
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
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
});