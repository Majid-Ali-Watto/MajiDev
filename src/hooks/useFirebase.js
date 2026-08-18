import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; // Adjust the path as necessary

const useFirebase = () => {
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getDocs(collection(db, "uploads"))
      .then((querySnapshot) => {
        if (!cancelled) {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setUploads(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Firebase fetch failed:", err);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return {
    isLoading,
    uploads,
    error,
  };
};

export default useFirebase;
