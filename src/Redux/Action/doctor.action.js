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

    const querySnapshot = await getDocs(collection(db, "Catagory"));
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
  try {
    dispatch(loadingdoctor());

    const randomName = Math.floor(Math.random() * 1000000).toString();
    const storageRef = ref(storade, 'Catagory/' + randomName);

    uploadBytes(storageRef, data.url).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then(async (url) => {
          const docRef = await addDoc(collection(db, "Catagory"), {
            catagory_name : data.catagory_name,
            catagory_price : data.catagory_price,
            catagory_list : data.catagory_list,
            url : url,
            FileName:randomName
          });

          dispatch({
            type: Actiontype.POST_DOCTOR,
            payload: {
              id: docRef.id,
              catagory_name : data.catagory_name,
              catagory_price : data.catagory_price,
              catagory_list : data.catagory_list,
              url : url,   
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

    const doctorRef = ref(storage, 'Catagory/' + data.fileName);
    deleteObject(doctorRef)
      .then(async () => {
        await deleteDoc(doc(db, "Catagory", data.id));
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
    const updataRef = doc(db, "doctor", data.id);
    if (typeof data.url === "string") {
      console.log('upload data')
      await updateDoc(updataRef, {
        catagory_name : data.catagory_name,
        catagory_price : data.catagory_price,
        catagory_list : data.catagory_list,
        FileName:data.FileName,
        url : data.url
      });
      dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: data })
    } else {
      const doctorRef = ref(storage, 'Catagory/' + data.fileName);
      deleteObject(doctorRef)
        .then(async () => {
          const randomName = Math.floor(Math.random() * 1000000).toString();
          const storageRef = ref(storade, 'Catagory/' + randomName);

          uploadBytes(storageRef, data.url).then((snapshot) => {
            getDownloadURL(snapshot.ref)
              .then(async (url) => {
                await updateDoc(updataRef, {
                  catagory_name : data.catagory_name,
                  catagory_price : data.catagory_price,
                  catagory_list : data.catagory_list,
                  FileName:randomName,
                  url : url
                });
                dispatch({ type: Actiontype.UPDATE_DOCTOR, payload: { ...data, fileName: randomName, url: url } })
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