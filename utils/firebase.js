/* eslint-disable */

import firebaseLib from "react-native-firebase";

const firebaseFunctions = {};

const auth = firebaseLib.auth()
const db = firebaseLib.firestore()
const storageRef = firebaseLib.storage().ref()

firebaseFunctions.signUpWithEmail = async (email , password , userName, number, country) => {
    try{
        const authResponse = await auth.createUserWithEmailAndPassword(email, password)
        const userId = authResponse.user.uid        
        const userObj = {
            userName,
            userId,
            email,
            followers: [],
            following: [],
            userPackage: 'none',
            userType: 'free',
            number,
            deleted: false,
            createdAt: Date.now(),
            country,
            photoUrl: null
        }
       await firebaseFunctions.setDocument('Users' , userId , userObj)
       userObj.userId = userId
        return userObj
    }
    catch(e){
        throw e
    }
}

firebaseFunctions.signInWithEmail = async (email , password) => {
    try{
        const authResponse = await auth.signInWithEmailAndPassword(email, password)
        return authResponse
    }
    catch(e){
        throw {message : e.message}
    }
}

firebaseFunctions.setDocument = (collection, docId, data) => {
    return db.collection(collection).doc(docId).set(data)
}

firebaseFunctions.addDocument = async (collection, data) => {
    try{
        const response = await db.collection(collection).add(data)
        return response
    }
    catch(e){
        return e
    }
}

firebaseFunctions.getDocument = async (collection, docId ) => {
    try{
        const dbResponse = await db.collection(collection).doc(docId).get()
        return dbResponse
    }
    catch(e){        
        throw e
    }
}

firebaseFunctions.getCollection = async collection => {
    try{
        const usersArr = []
        const querySnapshot = await db.collection(collection).get()
        querySnapshot.forEach(doc => usersArr.push(doc.data()))
        return usersArr
    }
    catch(e){
        alert(e.message)
    }
}

firebaseFunctions.getDocumentByQuery = async (collection, find , operator , findBy) => {
    try{
        const userIds = []
        const response =  await db.collection(collection).where(find , operator, findBy).get()
        response.forEach(doc => {
            idsObj = doc.data().userObj
            const keysArr = Object.keys(idsObj)
            for(var i =0; i < keysArr.length; i++){
                if(userIds.indexOf(keysArr[i]) === -1 && keysArr[i] !== 'createdAt'){
                    userIds.push(keysArr[i])
                }
            }
            // var set = new Set(userIds)
            // var a = Array.from(set)
        })
        return userIds
    }
    catch(e){
        return e.message
    }
}

firebaseFunctions.deleteDoc = async (collection , docId) => {
    try{
        await db.collection(collection).doc(docId).delete()
    }
    catch(e){
        return e.message
    }
}

firebaseFunctions.uploadImage = async (image , userId) => {
    try{
        let name = `${Date.now()} - ${userId}`
        const response = await firebaseLib.storage().ref(name).putFile(image)
        const url = await storageRef.child(name).getDownloadURL();
        return url
    }
    catch(e){
       alert(e.message);
    }
}

firebaseFunctions.updateDoc = async (collection, docId, data) => {
    try{
        await db.collection(collection).doc(docId).update(data)
        return 'Success'
    }
    catch(e){
        return e
    }
}

firebaseFunctions.loginWithPhoneNumber = async (phoneNumber) => {
    try{
        const response = await auth.signInWithPhoneNumber(phoneNumber)
        return response
    }
    catch(e){
        console.log('Error', e.message)
    }
}
export default firebaseFunctions