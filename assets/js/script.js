// assets/js/script.js - VERSÃO 2.0 (ENTREGA II)

/* --- 1. LÓGICA DO MENU HAMBÚRGUER (REQUISITO) --- */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Lógica para destacar o link ativo (Bônus)
    const currentLocation = window.location.pathname;
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
            // Também ativa o link pai no dropdown
            if (link.closest('.dropdown-menu')) {
                link.closest('.dropdown').querySelector('a').classList.add('active');
            }
        } else {
            link.classList.remove('active');
        }
    });

    // Chama as outras funções da página
    renderProjects();
    setupFormMasks();
});


/* --- 2. RENDERIZAÇÃO DE PROJETOS (ATUALIZADO COM GRID E TAGS) --- */
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return; // Se não estiver na página de projetos, não faz nada

    container.innerHTML = ''; 

    projectsDB.forEach(project => {
        // Gera o HTML para as tags (Badges - Requisito)
        let tagsHTML = '';
        project.tags.forEach(tag => {
            tagsHTML += `<span class="badge">${tag}</span>`;
        });

        const percentage = Math.floor((project.raised / project.goal) * 100);

        // Cria o card do projeto dentro de uma coluna do grid
        const projectCardHTML = `
            <div class="col-md-6 col-lg-4">
                <article class="project-card">
                    <img src="${project.image}" alt="${project.title}" class="project-card-image">
                    <div class="project-card-body">
                        <div class="tag-container">
                            ${tagsHTML}
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        
                        <div class="project-card-footer">
                            <div class="fundraising">
                                <h4>Arrecadação:</h4>
                                <div class="progress-bar-container">
                                    <div class="progress-bar" style="width: ${percentage}%;"></div>
                                </div>
                                <span>R$ ${project.raised.toFixed(2)} de R$ ${project.goal.toFixed(2)} (${percentage}%)</span>
                            </div>
                            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="showVolunteerModal(${project.id})">Quero Ajudar!</button>
                        </div>
                    </div>
                </article>
            </div>
        `;
        container.innerHTML += projectCardHTML;
    });
}

/* --- 3. LÓGICA DO MODAL (REQUISITO) --- */
function showVolunteerModal(projectId) {
    const modal = document.getElementById('volunteer-modal');
    const projectTitleEl = document.getElementById('modal-project-title');
    
    const project = projectsDB.find(p => p.id === projectId);
    
    if (project) {
        projectTitleEl.textContent = project.title;
        modal.style.display = 'flex';
    }
}

function closeVolunteerModal() {
    const modal = document.getElementById('volunteer-modal');
    modal.style.display = 'none';
}

/* --- 4. MÁSCARAS DE FORMULÁRIO (REQUISITO) --- */
function setupFormMasks() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value.slice(0, 14);
        });
    }

    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length > 13) {
                 value = value.replace(/(\d{5})(\d)/, '$1-$2');
            } else {
                 value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }
            e.target.value = value.slice(0, 15);
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 9);
        });
    }
}