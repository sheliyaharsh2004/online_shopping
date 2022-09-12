import { deletedoctordata, getdoctordata, postDoctor, updatedoctordata } from "../../commene/apis/doctor.api";
import storade, { db } from "../../Firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../../shared/baseurl";
import * as Actiontype from "../ActionType";
import storage from "../../Firebase";

export const doctordata = () => async (dispatch) => {

    try {
        dispatch(loadingdoctor());

        const querySnapshot = await getDocs(collection(db, "Product"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });

        dispatch({ type: Actiontype.GET_DOCTOR, payload: data })

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
};

export const postdoctordata = (data) => async (dispatch) => {
    console.log(data);
    try {
        dispatch(loadingdoctor());

        const randomName = Math.floor(Math.random() * 1000000).toString();
        const storageRef = ref(storade, 'Product/' + randomName);

        uploadBytes(storageRef, data.file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then(async (file) => {
                    const docRef = await addDoc(collection(db, "Product"), {
                        product_name: data.product_name,
                        product_price: data.product_price,
                        product_list: data.product_list,
                        product_description: data.product_description,
                        file: file,
                        FileName: randomName
                    });

                    dispatch({
                        type: Actiontype.POST_DOCTOR,
                        payload: {
                            id: docRef.id,
                            product_name: data.product_name,
                            product_price: data.product_price,
                            product_list: data.product_list,
                            product_description: data.product_description,
                            file: file,
                            FileName: randomName
                        }
                    })
                })
        });

    } catch (error) {
        dispatch(errordoctor(error.message));
        console.error("Error adding document: ", error);
    }
};

export const deletedoctor = (data) => async (dispatch) => {
    try {
        dispatch(loadingdoctor())

        const fileRef = ref(storage, 'Product/' + data.FileName);
        deleteObject(fileRef)
            .then(async () => {
                await deleteDoc(doc(db, "Product", data.id));
                dispatch({ type: Actiontype.DELETE_DOCTOR, payload: data.id })
            })
            .catch((error) => {
                dispatch(errordoctor(error.message));
            });

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

export const updatedoctor = (data) => async (dispatch) => {
    try {
        dispatch(loadingdoctor())
        const updataRef = doc(db, "Product", data.id);
        if (typeof data.file === "string") {
            console.log('upload data')
            await updateDoc(updataRef, {
                product_name : data.product_name,
                product_price : data.product_price,
                product_list : data.product_list,
                product_description : data.product_description,
                FileName: data.FileName,
                file: data.file
            });
            dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data })
        } else {
            const fileRefupdate = ref(storage, 'Product/' + data.FileName);
            deleteObject(fileRefupdate)
                .then(async () => {
                    const randomName = Math.floor(Math.random() * 1000000).toString();
                    const storageRef = ref(storade, 'Product/' + randomName);

                    uploadBytes(storageRef, data.file).then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then(async (file) => {
                                await updateDoc(updataRef, {
                                    product_name : data.product_name,
                                    product_price : data.product_price,
                                    product_list : data.product_list,
                                    product_description : data.product_description,
                                    FileName: randomName,
                                    file: file
                                });
                                dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: { ...data, fileName: randomName, file: file } })
                            })
                    })
                })
        }

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

export const loadingdoctor = () => (dispatch) => {
    dispatch({ type: Actiontype.LOADING_DOCTOR })
}

export const errordoctor = (error) => (dispatch) => {
    dispatch({ type: Actiontype.ERROR_DOCTOR, payload: error })
}