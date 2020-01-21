import { useEffect, useState } from "react";

export default function usePostData(id, firebase) {
  const [postDataPending, setPending] = useState(false);
  const [postData, setPostData] = useState(null);
  const [postDataError, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    setPending(true);
    setPostData(null);
    setError(null);
    firebase
      .singlePostData(id)
      .get()
      .then(doc => {
        setPostData(doc.data());
      })
      .catch(failure => {
        setError(failure);
      })
      .finally(() => {
        setPending(false);
      });
  }, [id]);

  return { postData, postDataPending, postDataError };
}
