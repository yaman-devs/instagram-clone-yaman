import { app, auth, db } from "@/firebase";
import { data } from "autoprefixer";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage";

const storage = getStorage(app);

export const UploadFile = () => {
  const [user, userLoading, userError] = useAuthState(auth);

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File>();
  const refs = ref(storage, "images/" + selectedFile?.name);

  const upload = async () => {
    if (selectedFile) {
      const result = await uploadFile(refs, selectedFile);
      getDownloadURL(refs).then((url) => {
        addDoc(collection(db, "posts"), {
          userId: user?.displayName || "anonymous",
          imageUrl: url,
          addDate: format(new Date(), "MM/dd/yyyy hh:mm:ss"),
        }).then((ref) => {
          addDoc(collection(ref, "comments"), {
            userId: user?.displayName || "guest",
          });
        });
      });
    }
  };

  return (
    <div>
      <p>
        {uploading && <span>Uploading file...</span>}

        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
        />
        <button onClick={upload}>Upload file</button>
      </p>
    </div>
  );
};
