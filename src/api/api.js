import { ID, Query } from "./appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  storage,
} from "./appwrite";

export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      userId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    if (error.code === 409) {
      return { error: 'Usuário já existente, faça o Login.' };
    }
    console.log(error);
    return { error: 'Ocorreu um erro no cadastro' };
  }
}

export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export const signInAccount = async (email, password) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    if (error.code === 401) { 
      return { error: 'Email ou senha inválido.' };
    }
    return { error: 'Ocorreu um erro durante o login' };
  }
};

export const getCurrentSession = async () => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.error("Erro ao pegar a sessão atual", error);
    throw error;
  }
};

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("userId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export const createPost = async (post) => {
  const mediaId = ID.unique();

  try {
    const uploadedFile = await storage.createFile(appwriteConfig.storageId, mediaId, post.mediaUrl);
    const mediaUrl = storage.getFileView(appwriteConfig.storageId, uploadedFile.$id); 
    
    const tags = [];
    if (post.cidade) {
      tags.push(post.cidade);
    }
    if (post.praia) {
      tags.push(post.praia);
    }

    const createdPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      mediaId,
      {
        creator: post.creator,
        creatorName: post.creatorName,
        description: post.description,
        mediaUrl: mediaUrl,
        mediaType: post.mediaType,  // Incluindo o tipo de mídia no documento
        created_at: new Date().toISOString(),
        tags: tags
      }
    );

    return createdPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// export function getFilePreview(fileId) {
//   try {
//     const fileUrl = storage.getFilePreview(
//       appwriteConfig.storageId,
//       fileId,
//       2000,
//       2000,
//       "top",
//       100
//     );
//     if (!fileUrl) throw Error;
//     return fileUrl;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function searchPostsByLocation(cidade, praia) {
  try {
    if (!cidade && !praia) {
      throw { code: 400, message: 'Pelo menos um campo deve ser preenchido' };
    }

    const allPosts = await getAllPosts();

    const filteredPosts = allPosts.filter(post => {
      const hasCidade = cidade ? post.tags[0] === cidade : true;
      const hasPraia = praia ? post.tags[1] === praia : true;
      return hasCidade && hasPraia;
    });

    if (filteredPosts.length === 0) {
      throw { code: 404, message: 'Nenhum post encontrado' };
    }

    return filteredPosts;
  } catch (error) {
    console.error("Error searching posts:", error);
    if (error.code) {
      return { error: error.message };
    }
    return { error: 'Ocorreu um erro ao pesquisar' };
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId
    );

    if (!posts) {
      throw new Error("No posts found");
    }

    return posts.documents;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getUserPosts(creator) {
  if (!creator) return;
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", creator), Query.orderDesc("$createdAt")]
    );
    if (!post) throw Error;
    return post.documents; 
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId, mediaUrl) {
  
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    if (!statusCode) throw Error;
    await storage.deleteFile(appwriteConfig.storageId, mediaUrl);
    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}


