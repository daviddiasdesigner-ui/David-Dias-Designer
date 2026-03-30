const fs = require('fs');

const file = 'c:/Projetos/site de portfólio/index.html';
let html = fs.readFileSync(file, 'utf8');

// The Social Media block original inner HTML:
const socialMediaCards = `                    <!-- Projeto 1: 60% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Dentista.png" alt="Dentista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Renovação de onboarding aumento +40%</h3>
                            <span class="tag">Social Media</span>
                        </div>
                    </article>

                    <!-- Projeto 2: 40% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Esteticista.png" alt="Esteticista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">App de beleza com IA</h3>
                            <span class="tag">Mobile</span>
                        </div>
                    </article>

                    <!-- Projeto 3: 40% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Massoterapia.png" alt="Massoterapia Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Plataforma com IA</h3>
                            <span class="tag">IA</span>
                        </div>
                    </article>

                    <!-- Projeto 4: 60% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Dentista.png" alt="Dentista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Consultoria de Growth Design</h3>
                            <span class="tag">Estratégia</span>
                        </div>
                    </article>

                    <!-- Projeto 5: 60% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Dentista.png" alt="Dentista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Renovação de onboarding aumento +40%</h3>
                            <span class="tag">Social Media</span>
                        </div>
                    </article>

                    <!-- Projeto 6: 40% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Esteticista.png" alt="Esteticista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">App de beleza com IA</h3>
                            <span class="tag">Mobile</span>
                        </div>
                    </article>

                    <!-- Projeto 7: 40% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Massoterapia.png" alt="Massoterapia Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Plataforma com IA</h3>
                            <span class="tag">IA</span>
                        </div>
                    </article>

                    <!-- Projeto 8: 60% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Social Media - Dentista.png" alt="Dentista Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Consultoria de Growth Design</h3>
                            <span class="tag">Estratégia</span>
                        </div>
                    </article>`;

const visualIdCards = `                    <!-- Projeto 1: 75% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Identidade Visual - Atelier de macramê.png" alt="Atelier Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Levando a marca para uma rodada série A de R$ 20
                                milhões</h3>
                            <span class="tag">Branding</span>
                        </div>
                    </article>

                    <!-- Projeto 2: 25% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Identidade Visual - Massoterapeuta.png" alt="Massoterapeuta Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Massoterapia</h3>
                            <span class="tag">Logo</span>
                        </div>
                    </article>

                    <!-- Projeto 3: 25% largura -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Identidade Visual - Moda modesta.png" alt="Moda Modesta Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Moda modesta</h3>
                            <span class="tag">Moda</span>
                        </div>
                    </article>

                    <!-- Projeto 4: 75% largura (Ajustando a Grid) -->
                    <article class="projeto-cartao">
                        <div class="projeto-imagem">
                            <img src="Assets/Identidade Visual - Moda infantil.png" alt="Moda Infantil Case">
                        </div>
                        <div class="projeto-conteudo">
                            <h3 class="projeto-titulo font-serif">Kids</h3>
                            <span class="tag">Kids</span>
                        </div>
                    </article>`;

const mobileSocial = socialMediaCards.replace(/class="projeto-cartao"/g, 'class="projeto-cartao-mobile"');
const mobileVisualId = visualIdCards.replace(/class="projeto-cartao"/g, 'class="projeto-cartao-mobile"');

const newSocialBlock = `                <div class="projetos-grade">
${socialMediaCards}
                </div>
                <div class="projetos-mobile-stack">
${mobileSocial}
                </div>`;

const newVisualIdBlock = `                <div class="projetos-grade">
${visualIdCards}
                </div>
                <div class="projetos-mobile-stack">
${mobileVisualId}
                </div>`;

html = html.replace(/<div class="projetos-grade">[\s\S]*?<!-- Projeto 8: 60% largura -->[\s\S]*?<\/article>\s+<\/div>/m, newSocialBlock);
html = html.replace(/<div class="projetos-grade">[\s\S]*?<!-- Projeto 4: 75% largura \(Ajustando a Grid\) -->[\s\S]*?<\/article>\s+<\/div>/m, newVisualIdBlock);

fs.writeFileSync(file, html, 'utf8');
console.log('HTML updated!');
