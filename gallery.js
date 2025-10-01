// Gallery functionality
document.addEventListener('DOMContentLoaded', function () {
    const projectsData = [
        {
            folder: '3dpcp',
            name: '3D Printed Custom Products',
            description: 'Custom 3D printed components and prototypes',
            images: ['1.jpg', '10.png', '11.png', '12.jpg', '13.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.png', '8.png', '9.png']
        },
        {
            folder: 'cabel-winding',
            name: 'Cable Winding Machine',
            description: 'Fully automatic cable winding and packaging system',
            images: ['1.png', '2.jpg', '3.jpg', '4.png', '5.jpg', '6.png']
        },
        {
            folder: 'hegm',
            name: 'Hybrid Energy Generator Machine',
            description: 'Innovative hybrid energy generation system',
            images: ['1.png', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
        },
        {
            folder: 'lms',
            name: 'Linear Motion Systems',
            description: 'Precision linear motion and automation solutions',
            images: ['1.png', '2.png', '3.jpg', '4.jpg', '4.png']
        },
        {
            folder: 'plms',
            name: 'Precision Linear Motion Slides',
            description: 'High-precision linear motion slides with servo control',
            images: ['1.png', '10.png', '11.png', '13.jpg', '15.png', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.png', '8.png', '9.png']
        },
        {
            folder: 'spm-fp',
            name: 'Special Purpose Machine - Food Processing',
            description: 'Automated food processing machinery',
            images: ['1.png', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '2.jpg', '3.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.png']
        },
        {
            folder: 'spm-hsd',
            name: 'SPM - Hydraulic System Development',
            description: 'Custom hydraulic systems and components',
            images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '8.png']
        },
        {
            folder: 'spm-hvps',
            name: 'SPM - Hydraulic Valve Pack System',
            description: 'Advanced hydraulic valve pack systems',
            images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '6.jpg']
        },
        {
            folder: 'spmhs',
            name: 'Special Purpose Machine - Hydraulic System',
            description: 'Heavy-duty hydraulic machinery systems',
            images: ['1.jpg', '2.jpg', '3.jpg', '4.png', '5.jpg', '6.jpg']
        },
        {
            folder: 'spmsu',
            name: 'Special Purpose Machine - Sub Units',
            description: 'Custom sub-unit systems and components',
            images: ['1.png', '2.jpg', '3.jpg', '4.jpg', '5.png', '6.jpg']
        },
        {
            folder: 'spmsus',
            name: 'Special Purpose Machine - Sub Unit Systems',
            description: 'Advanced sub-unit automation systems',
            images: ['1.jpg', '10.jpg', '11.jpg', '2.jpg', '3.jpg', '4.jpg', '8.jpg', '9.jpg']
        },
        {
            folder: 'tri-axis-travers',
            name: 'Tri-Axis Travers Bar Machine',
            description: 'Fully automatic 3-axis pick and place machine',
            images: ['1.png', '2.jpg', '3.jpg', '4.jpg']
        }
    ];

    let currentFilter = 'all';
    let allImages = [];

    // Get project from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProject = urlParams.get('project');

    function initializeGallery() {
        createFilterButtons();
        loadAllImages();
        displayImages();
    }

    function createFilterButtons() {
        const filterContainer = document.querySelector('.filter-buttons');

        // Clear existing content first
        filterContainer.innerHTML = '';

        // Add "All Projects" button
        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.textContent = 'All Projects';
        allBtn.setAttribute('data-filter', 'all');
        filterContainer.appendChild(allBtn);

        // Add project-specific buttons
        projectsData.forEach(project => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = project.name;
            btn.setAttribute('data-filter', project.folder);
            filterContainer.appendChild(btn);
        });

        // Add event listeners
        filterContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('filter-btn')) {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                e.target.classList.add('active');

                // Update filter
                currentFilter = e.target.getAttribute('data-filter');
                displayImages();
            }
        });
    }

    function loadAllImages() {
        allImages = [];

        projectsData.forEach(project => {
            project.images.forEach(imageName => {
                allImages.push({
                    src: `images/projects/${project.folder}/${imageName}`,
                    alt: `${project.name} - ${imageName}`,
                    project: project.folder,
                    projectName: project.name,
                    projectDescription: project.description
                });
            });
        });
    }

    function displayImages() {
        const container = document.getElementById('galleryContainer');
        container.innerHTML = '';

        let imagesToShow = allImages;

        if (currentFilter !== 'all') {
            imagesToShow = allImages.filter(img => img.project === currentFilter);
        }

        imagesToShow.forEach((imageData, index) => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 mb-4';

            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <img src="${imageData.src}" alt="${imageData.alt}" class="img-fluid">
                    <div class="gallery-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
                <div class="gallery-info">
                    <h5>${imageData.projectName}</h5>
                    <p>${imageData.projectDescription}</p>
                </div>
            `;

            galleryItem.addEventListener('click', () => {
                openImageModal(imageData, index, imagesToShow);
            });

            col.appendChild(galleryItem);
            container.appendChild(col);
        });
    }

    function openImageModal(imageData, currentIndex, allImages) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: #1a1a1a;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        // Create image
        const modalImg = document.createElement('img');
        modalImg.src = imageData.src;
        modalImg.alt = imageData.alt;
        modalImg.style.cssText = `
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            display: block;
        `;

        // Create navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.style.cssText = `
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 123, 255, 0.9);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 11;
        `;

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.style.cssText = prevBtn.style.cssText;
        nextBtn.style.left = 'auto';
        nextBtn.style.right = '20px';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
            z-index: 11;
        `;

        // Create image counter
        const counter = document.createElement('div');
        counter.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
        `;
        counter.textContent = `${currentIndex + 1} / ${allImages.length}`;

        // Assemble modal
        modalContent.appendChild(modalImg);
        modalContent.appendChild(prevBtn);
        modalContent.appendChild(nextBtn);
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(counter);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Navigation functionality
        let currentImageIndex = currentIndex;

        function updateImage() {
            const currentImage = allImages[currentImageIndex];
            modalImg.src = currentImage.src;
            modalImg.alt = currentImage.alt;
            counter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
        }

        prevBtn.addEventListener('click', () => {
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
            updateImage();
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
            updateImage();
        });

        // Close functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Keyboard navigation
        const handleKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKey);
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        };
        document.addEventListener('keydown', handleKey);
    }

    // Initialize gallery
    initializeGallery();

    // If a specific project is selected, filter to that project
    if (selectedProject) {
        setTimeout(() => {
            const projectBtn = document.querySelector(`[data-filter="${selectedProject}"]`);
            if (projectBtn) {
                projectBtn.click();
            }
        }, 100);
    }
});
