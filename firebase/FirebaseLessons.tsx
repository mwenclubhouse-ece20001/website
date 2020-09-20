import FirebaseInterface from "./FirebaseInterface";

export default class FirebaseLessons{

    ref: string;
    title: string;
    description: string;
    problemFirebasePath: any;
    hint: string;
    solutionFirebasePath: any;
    note: string;
    isFlipped: boolean;
    constructor(ref, data) {
        this.ref = ref;
        this.isFlipped = false;
        if ("Title" in data) {
            this.title = data["Title"]
        }
        if ("answerPath" in data) {
            this.solutionFirebasePath = data["answerPath"];
        }
        if ("problemPath" in data) {
            this.problemFirebasePath = data["problemPath"];
        }
        if ("description" in data) {
            this.description = data["description"];
        }
        if ("note" in data) {
            this.note = data["note"];
        }
    }

    handleClick (e) {
        e.preventDefault();
        this.isFlipped = !this.isFlipped;
    }

    static async loadLessonByUid(ref) {
        const response = await FirebaseLessons.getLessonByUid(ref);
        return new FirebaseLessons(ref, response.data());
    }

    static async getPageByUid(uid) {
        const db = FirebaseInterface.shared.db;
        return await db.collection("ece20001\\pages").doc(uid).get();
    }

    static async getLessonByUid(uid) {
        const db = FirebaseInterface.shared.db;
        return await db.collection("ece20001\\lessons").doc(uid).get();
    }

    static async getFirebasePicture(ref) {
        const storage = FirebaseInterface.shared.storage;
        return await storage.ref(ref).getDownloadURL();
    }

}