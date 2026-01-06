// Extract first heading from markdown content
// Supports both Markdown (## Title) and HTML (<h2>Title</h2>) formats
function extractFirstHeading(markdown) {
    const lines = markdown.split(/\r?\n/);  // Handle both Unix and Windows line endings
    for (const line of lines) {
        const trimmedLine = line.trim();  // Remove leading/trailing whitespace

        // Try to match Markdown heading (## Title)
        const mdMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
        if (mdMatch) {
            const headingText = mdMatch[2].trim();
            return headingText;
        }

        // Try to match HTML heading (<h1>Title</h1>, <h2>Title</h2>, etc.)
        const htmlMatch = trimmedLine.match(/^<h[1-6][^>]*>(.+?)<\/h[1-6]>/i);
        if (htmlMatch) {
            const headingText = htmlMatch[1].trim();
            return headingText;
        }
    }
    return null;
}

// Generate valid HTML ID from text
function generateId(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Generate navigation menu from section information
function generateNavigation(sectionInfo) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        console.error('Sidebar not found');
        return;
    }

    // Group sections by their group name
    const groups = {};
    sectionInfo.forEach(section => {
        if (!groups[section.group]) {
            groups[section.group] = [];
        }
        groups[section.group].push(section);
    });

    // Find the container for dynamic nav sections (after the Title section)
    // We'll remove all existing dynamic sections and regenerate
    const existingDynamicSections = sidebar.querySelectorAll('.nav-section.dynamic');
    existingDynamicSections.forEach(section => section.remove());

    // Find the first nav-section (Title section) to insert after it
    const titleSection = sidebar.querySelector('.nav-section');
    let insertPoint = titleSection ? titleSection.nextSibling : sidebar.querySelector('.lock-button').nextSibling;

    // Generate navigation sections for each group
    Object.entries(groups).forEach(([groupName, sections]) => {
        // Create nav section
        const navSection = document.createElement('div');
        navSection.className = 'nav-section dynamic';

        // Create section title
        const navTitle = document.createElement('div');
        navTitle.className = 'nav-section-title';
        navTitle.innerHTML = `
            <span class="nav-toggle"></span>
            ${groupName}
        `;

        // Create nav items container
        const navItems = document.createElement('div');
        navItems.className = 'nav-items';

        // Add links for each section
        sections.forEach(section => {
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.className = 'nav-link';
            link.textContent = section.title;
            navItems.appendChild(link);
        });

        // Assemble the navigation section
        navSection.appendChild(navTitle);
        navSection.appendChild(navItems);

        // Insert into sidebar
        if (insertPoint) {
            sidebar.insertBefore(navSection, insertPoint);
        } else {
            sidebar.appendChild(navSection);
        }

        // Update insert point for next group
        insertPoint = navSection.nextSibling;
    });

    console.log('Navigation menu generated');
}

// Load and render content - now with automatic section generation
async function loadAndRenderContent() {
    const container = document.querySelector('.mixed-content');
    if (!container) {
        console.error('Container .mixed-content not found');
        return;
    }

    // Collect section information for navigation generation
    const sectionInfo = [];

    // Process each group
    for (const groupConfig of markdownFiles) {
        const groupName = groupConfig.group;
        const files = groupConfig.files;

        for (const file of files) {
            try {
                // Fetch markdown content
                const response = await fetch(file);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const markdown = await response.text();

                // Extract title from first heading
                const title = extractFirstHeading(markdown);
                if (!title) {
                    console.warn(`No heading found in ${file}, skipping`);
                    continue;
                }

                // Generate ID from title
                const id = generateId(title);

                // Create section element dynamically
                const section = document.createElement('section');
                section.id = id;
                section.className = 'markdown-section';

                // Render markdown to HTML
                section.innerHTML = md.render(markdown);

                // Append section to container
                container.appendChild(section);

                // Collect info for navigation
                sectionInfo.push({
                    id: id,
                    title: title,
                    group: groupName
                });

                console.log(`Created section: ${id} from ${file} (group: ${groupName})`);

            } catch (error) {
                console.error(`Error loading ${file}:`, error);
            }
        }
    }

    // Generate navigation menu
    generateNavigation(sectionInfo);

    // 为标题添加锚点链接
    addHeaderLinks();

    // Execute all scripts in rendered markdown
    executeMarkdownScripts();

    // Bind smooth scrolling for all anchor links (including dynamically generated ones)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // 临时更新URL但不触发跳转
                history.replaceState(null, null, `#${targetId}`);
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // 延迟移除锚点，让跳转完成
                setTimeout(() => {
                    history.replaceState(null, null, window.location.pathname);
                }, 200);

                // If sidebar is not locked, hide it after navigation
                const sidebar = document.querySelector('.sidebar');
                if (sidebar && !sidebar.classList.contains('locked')) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // 检查URL中的锚点并跳转
    setTimeout(() => {
        if (window.location.hash) {
            const element = document.getElementById(window.location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 100);
}

// Execute all scripts found in rendered markdown sections
function executeMarkdownScripts() {
    // Find all markdown sections
    const markdownSections = document.querySelectorAll('.markdown-section');

    markdownSections.forEach(section => {
        // Find all script tags in this section
        const scripts = section.querySelectorAll('script');

        scripts.forEach(script => {
            // Create a new script element and execute it
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;

            // Copy any attributes from the original script
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });

            // Replace the old script with the new one to execute it
            script.parentNode.replaceChild(newScript, script);
        });
    });
}

// 为标题添加锚点链接的函数
function addHeaderLinks() {
    // 生成slug的函数
    function generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // 移除特殊字符
            .replace(/\s+/g, '-')     // 空格替换为连字符
            .replace(/-+/g, '-')      // 多个连字符合并为一个
            .trim('-');               // 移除首尾连字符
    }

    // 为所有标题添加ID和链接
    const headers = document.querySelectorAll('.markdown-section h1, .markdown-section h2, .markdown-section h3, .markdown-section h4, .markdown-section h5, .markdown-section h6, .html-section h1, .html-section h2, .html-section h3, .html-section h4, .html-section h5, .html-section h6');

    headers.forEach(header => {
        const text = header.textContent;
        const slug = generateSlug(text);

        // 设置ID
        header.id = slug;

        // 创建链接元素
        const link = document.createElement('a');
        link.href = `#${slug}`;
        link.className = 'header-link';
        link.innerHTML = '#';

        // 添加点击事件处理
        link.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, null, `#${slug}`);
            header.scrollIntoView({ behavior: 'smooth' });
        });

        // 将链接插入到标题中
        header.appendChild(link);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // 强制跳转到title位置
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
    // Load and render markdown content
    loadAndRenderContent();

    // Sidebar animation
    setTimeout(() => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.add('active');
        setTimeout(() => {
            if (!sidebar.classList.contains('locked')) {
                sidebar.classList.remove('active');
            }
        }, 1000);
    }
}, 100);
});

// Lock button functionality
document.addEventListener('DOMContentLoaded', () => {
    const lockButton = document.querySelector('.lock-button');
    const sidebar = document.querySelector('.sidebar');

    if (lockButton && sidebar) {
        lockButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-lock-open')) {
                icon.classList.remove('fa-lock-open');
                icon.classList.add('fa-lock');
                sidebar.classList.add('locked');
            } else {
                icon.classList.remove('fa-lock');
                icon.classList.add('fa-lock-open');
                sidebar.classList.remove('locked');
                sidebar.classList.remove('active');
            }
        });
    }

    // Sidebar section toggle - using event delegation to handle both static and dynamic sections
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            const navTitle = e.target.closest('.nav-section-title');
            if (navTitle) {
                const section = navTitle.closest('.nav-section');
                section.classList.toggle('collapsed');
            }
        });
    }
});
