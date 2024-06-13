# SurfLook

<div style="position: relative; width: 100%; height: 0; padding-top: 56.25%; overflow: hidden;">
  <iframe src="./public/logo-video.mp4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
</div>

## Sobre o Aplicativo

SurfLook é um aplicativo voltado para surfistas, projetado para compartilhar vídeos ou fotos das condições atuais do mar. Com este aplicativo, os surfistas podem se manter atualizados sobre as melhores ondas e condições de surf em diversas localidades.

## Funcionalidades

### Hoje no App
- **Autenticação de Usuário**: Registre-se e faça login com segurança.
- **Criação de Posts**: Usuários podem criar posts com vídeos de até 1 minuto ou fotos das condições do mar.
- **Visualização de Posts**: Veja os posts de todos os usuários na timeline.
- **Deleção de Posts**: Usuários podem deletar seus próprios posts.
- **Perfil de Usuário**: Veja e gerencie seus posts no seu perfil.
- **Pesquisa de Clima**: Página dedicada para pesquisa de clima por cidade e estado.
- **Filtro de Posts**: Filtre posts por tags, cidade, estado e praia.

## Tecnologias Utilizadas
- **Frontend**: Vite + React + JavaScript + CSS
- **Backend**: Node.js
- **APIs Públicas**:
  - Google Maps Address Validation API
  - OpenWeather Current Weather Data
- **Gerenciamento Backend e Autenticação**: Appwrite

## Como Rodar o Projeto

1. Crie uma pasta local chamada `.env.local` e adicione as seguintes variáveis de ambiente:

2. Certifique-se de ter o Node.js instalado.

3. Rode o seguinte comando no terminal:

# //weather config
VITE_OPENWEATHERMAP_API_KEY=2048fdc695bead8292a8cec15a302540

# //appwrite config
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=66661d9c00218688dfcf
VITE_APPWRITE_DATABASE_ID=66663c22000f3d430bf5
VITE_APPWRITE_STORAGE_ID=666745d0002418955122
VITE_APPWRITE_USER_COLLECTION_ID=66673e79000d90625e8c
VITE_APPWRITE_POST_COLLECTION_ID=66663e10000778f423ed

# //google maps config
VITE_GOOGLEMAPS_API_KEY=AIzaSyDVeQKmmyYiIhYZJzkslrChwujSO2vuMb4


## Status do Projeto

O aplicativo ainda está em construção, com novas funcionalidades e melhorias sendo adicionadas continuamente.

--------------------------------------

**Aproveite e boas ondas!**
