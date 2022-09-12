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

    const querySnapshot = await getDocs(collection(db, "category"));
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
    const storageRef = ref(storade, 'category/'+randomName);

    uploadBytes(storageRef, data.file).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (file) => {
          const docRef = await addDoc(collection(db, "category"), {
            categ_name : data.categ_name,
            file : file,
            FileName:randomName
          });

          dispatch({
            type: Actiontype.POST_DOCTOR,
            payload: {
              id: docRef.id,
              categ_name : data.categ_name,
              file : file,   
              FileName:randomName
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
  console.log(data);
  try {
    dispatch(loadingdoctor())

    const fileRef = ref(storage, 'category/'+data.FileName);
    deleteObject(fileRef)
      .then(async () => {
        await deleteDoc(doc(db, "category", data.id));
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
    const updataRef = doc(db, "category", data.id);
    if (typeof data.file === "string") {
      console.log('upload data')
      await updateDoc(updataRef, {
        categ_name : data.categ_name,
        FileName:data.FileName,
        file : data.file
      });
      dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data })
    } else {
      const fileRefupdate = ref(storage, 'category/'+data.FileName);
      deleteObject(fileRefupdate)
        .then(async () => {
          const randomName = Math.floor(Math.random() * 1000000).toString();
          const storageRef = ref(storade, 'category/'+randomName);

          uploadBytes(storageRef, data.file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (file) => {
                await updateDoc(updataRef, {
                  categ_name : data.categ_name,
                  FileName:randomName,
                  file : file
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