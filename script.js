document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================================
    // 1. INTERAKTIVITAS UTAMA (Form Pendaftaran & Form Kontak)
    // =========================================================

    // --- A. Logika Form Kontak (index.html#contact) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { 
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            if (name.trim() && email.trim() && message.trim()) {
                alert('✅ Terima kasih! Pesan Anda telah dikirim dan akan segera kami balas.');
                contactForm.reset();
            } else {
                alert('❌ Harap isi semua kolom wajib di formulir kontak.');
            }
        });
    }

    // --- B. Logika Form Pendaftaran (registration.html) ---
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        autoFillCourse();
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
    
    /**
     * Mengambil parameter 'course' dari URL dan mengisi kolom select di form pendaftaran.
     */
    function autoFillCourse() {
        const urlParams = new URLSearchParams(window.location.search);
        const courseParam = urlParams.get('course');
        const courseSelect = document.getElementById('course-name');
        
        if (courseParam && courseSelect) {
            let courseName = '';
            
            // Mapping parameter pendek dari URL ke nama kursus lengkap
            switch (courseParam) {
                case 'basic_programming':
                    courseName = 'Pemrograman Dasar';
                    break;
                case 'advanced_math': 
                    courseName = 'Matematika Lanjutan';
                    break;
                case 'english_course': 
                    courseName = 'Bahasa Inggris';
                    break;
                case 'full_stack':
                    courseName = 'Full Stack Web Development';
                    break;
                case 'digital_marketing':
                    courseName = 'Digital Marketing Strategi';
                    break;
                case 'UI/UX Design':
                    courseName = 'UI/UX Design Fundamentals';
                    break;
                default:
                    return; 
            }
            
            // Mencari dan mengatur nilai kolom select
            for (let i = 0; i < courseSelect.options.length; i++) {
                if (courseSelect.options[i].text.includes(courseName)) { 
                    courseSelect.value = courseSelect.options[i].value;
                    break;
                }
            }
        }
    }
    
    /**
     * Menangani submit form pendaftaran: MENGALIHKAN KE HALAMAN KONFIRMASI.
     */
    function handleRegistrationSubmit(event) {
        event.preventDefault(); 
        
        const submittedCourse = document.getElementById('course-name').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (submittedCourse && name && email) {
            // PENTING: Pengalihan (redirect) ke confirmation.html
            window.location.href = `confirmation.html?course=${encodeURIComponent(submittedCourse)}`;
        } else {
             alert('❌ Harap pastikan semua data pendaftaran (Nama, Email, dan Kursus) telah diisi.');
        }
    }

    // --- C. Logika Halaman Konfirmasi (confirmation.html) ---
    /**
     * Mengambil parameter 'course' dari URL dan menampilkannya di halaman konfirmasi.
     * Logika ini harus dijalankan saat DOMContentLoaded di halaman confirmation.html.
     */
    function displayConfirmationDetails() {
        // Cek apakah elemen spesifik halaman konfirmasi ada
        const displayElement = document.getElementById('display-course');

        if (displayElement) {
            const urlParams = new URLSearchParams(window.location.search);
            // Gunakan decodeURIComponent karena nama kursus di-encode sebelum redirect
            const courseName = decodeURIComponent(urlParams.get('course') || ''); 

            if (courseName) {
                displayElement.innerHTML = `Pilihan Kursus Anda: <strong>${courseName}</strong>`;
            } else {
                displayElement.innerHTML = `Pendaftaran Anda sedang diproses. (Detail akan dikirim via email)`;
            }
        }
    }

    // Panggil fungsi konfirmasi jika kita berada di halaman confirmation.html
    displayConfirmationDetails();

    
    // =========================================================
    // 2. EFEK INTERAKTIVITAS VISUAL
    // =========================================================

    // --- Efek Hover pada CTA Link/Button (untuk kelas .cta-button) ---
    const ctaButtons = document.querySelectorAll('.cta-button'); 
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'; 
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // --- Scroll Smooth ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

});