import { useEffect, useState } from "react";
import useFirebase from "../../../contexts/firebase";

/**
 * Retrieves post data for specified id
 */
export default function usePostData(postDataId) {
  const [postDataPending, setPending] = useState(true);
  const [postData, setPostData] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    setPostData(null);
    setPending(true);

    firebase
      .singlePostData(postDataId)
      .get()
      .then(doc => {
        setPostData(doc.data());
      })
      .catch(failure => {
        alert(
          `Sorry, something went wrong with fetching this post. Please refresh and try again.`
        );
        console.error(failure);
        setPostData(null);
      })
      .finally(() => {
        setPending(false);
      });
  }, [postDataId, firebase]);

  return { postData, postDataPending };
}
