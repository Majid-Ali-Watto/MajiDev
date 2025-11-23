import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebaseConfig"; // Adjust the path as necessary

const useFirebase = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "uploads"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUploads(data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    uploads,
  };
};

export default useFirebase;
