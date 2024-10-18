import confi from "../confi/confi.js";
import { Storage, Databases, Query, ID, Client } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor () {
        this.client
        .setEndpoint(confi.appwriteURL)
        .setProject(confi.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost (slug, {title,  content, featuredImage, status}) { 
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }

    }

    async getPost (slug) {
        try {
           return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts (queries = [Query.equal("status","active")]) {  //-no parameter req as we want every post-- indexes(keys) req for queries
    try {
        return await this.databases.listDocuments(
            confi.appwriteDatabaseId,
            confi.appwriteCollectionId,
            queries,
        )
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }    
    }
    
    //--file upload--

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false 
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false 
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId
        )
    }

    
    
} 

const service = new Service()
export default service
