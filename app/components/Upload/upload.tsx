import { app, auth, db } from "@/firebase";
import { data } from "autoprefixer";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage";

const storage = getStorage(app);

export const UploadFile = () => {
  const [user, userLoading, userError] = useAuthState(auth);

  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File>();
  const refs = ref(storage, "images/" + selectedFile?.name);

  useEffect(() => {
    upload();
    setSelectedFile(undefined);
  }, [selectedFile]);
  const upload = async () => {
    if (selectedFile) {
      await uploadFile(refs, selectedFile);
      getDownloadURL(refs).then((url) => {
        addDoc(collection(db, "posts"), {
          userId: user?.displayName || "anonymous",
          imageUrl: url,
          likes: 0,
          addDate: format(new Date(), "MM/dd/yyyy hh:mm:ss"),
        }).then((ref) => {
          setSelectedFile(undefined);
        });
      });
    }
  };

  return (
    <div className="flex justify-center">
      <input
        id="file"
        className="hidden"
        type="file"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : undefined;
          setSelectedFile(file);
        }}
      />
      <label
        htmlFor="file"
        className="cursor-pointer bg-blue-500 px-4 py-2 text-white rounded-lg self-center text-xs"
      >
        Upload
      </label>
    </div>
  );
};
