// 1. Lógica para Criar Nova Postagem
document.getElementById('blog-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const postsContainer = document.getElementById('posts-container');

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('pt-BR', options);

    const newPost = document.createElement('article');
    newPost.classList.add('post');

    // O novo post já é gerado com a estrutura de curtidas e comentários
    newPost.innerHTML = `
        <span class="post-date">${today}</span>
        <h2>${titleInput.value}</h2>
        <p>${contentInput.value}</p>
        <div class="post-interactions">
            <button class="like-btn">❤️ Curtir (<span class="like-count">0</span>)</button>
            <div class="comments-section">
                <h4>Comentários</h4>
                <div class="comments-list"></div>
                <form class="comment-form">
                    <input type="text" placeholder="Escreva um comentário..." required>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    `;

    postsContainer.insertBefore(newPost, postsContainer.firstChild);

    titleInput.value = '';
    contentInput.value = '';
});

// 2. Lógica para Curtir e Comentar (Funciona em posts novos e antigos)
document.getElementById('posts-container').addEventListener('click', function(e) {
    
    // Se o clique foi no botão de Curtir
    if (e.target.classList.contains('like-btn') || e.target.closest('.like-btn')) {
        const button = e.target.classList.contains('like-btn') ? e.target : e.target.closest('.like-btn');
        const countSpan = button.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.textContent);
        countSpan.textContent = currentLikes + 1;
    }
});

// Escuta o envio de formulários de comentários
document.getElementById('posts-container').addEventListener('submit', function(e) {
    if (e.target.classList.contains('comment-form')) {
        e.preventDefault();
        
        const form = e.target;
        const input = form.querySelector('input');
        const commentsList = form.closest('.comments-section').querySelector('.comments-list');
        
        // Cria a caixinha do novo comentário
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.textContent = input.value;
        
        // Adiciona à lista de comentários daquele post específico
        commentsList.appendChild(newComment);
        
        // Limpa o campo de texto
        input.value = '';
    }
});

