import ShareButton from "@src/shared/ui/ShareButton/ShareButton";
import CreateDocument from "./components/CreateDocument/CreateDocument";
import "./Documents.css";
import DocumentList from "./components/DocumentList/DocumentList";
import { useGetProfileQuery } from "@src/store/api/profileSlice";

const Documents = () => {
  const { data: profile } = useGetProfileQuery();

  return (
    <section className="documents w-full  relative py-12  px-12 flex flex-col flex-1">
      <h1 className="text-4xl mb-12 font-bold">
        Welcome {profile?.data.firstname + " " + profile?.data.lastname + "!"}
      </h1>
      <CreateDocument />
      <ShareButton className="absolute top-12 translate-y-1/2 right-12 flex items-center" />
      <DocumentList />
    </section>
  );
};

export default Documents;
