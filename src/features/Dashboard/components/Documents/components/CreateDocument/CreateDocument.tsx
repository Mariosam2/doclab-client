import { ToastType } from "@src/shared/enums/ToastType.enum";
import { showToast } from "@src/shared/helpers";
import DocumentPlus from "@src/shared/ui/Icons/DocumentPlus";
import { useCreateDocumentMutation } from "@src/store/api/documentSlice";
import { useNavigate } from "react-router";

const CreateDocument = () => {
  const navigate = useNavigate();
  const [createDocument, { isLoading }] = useCreateDocumentMutation();

  const handleCreateDocument = async () => {
    try {
      const result = await createDocument({ content: "" }).unwrap();
      navigate(`/dashboard/documents/${result.idOut}`);
      showToast("Document created successfully", "Your document has been created successfully", ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleCreateDocument}
      className="w-48 h-60 rounded-lg border-2 border-dashed border-gray-300 hover:border-c-medium-purple hover:bg-c-medium-purple/5 flex flex-col items-center justify-center gap-3 transition-all duration-200 cursor-pointer group">
      <div className="size-12 rounded-full bg-gray-100 group-hover:bg-c-medium-purple/10 flex items-center justify-center transition-colors duration-200">
        <DocumentPlus className="size-6 text-gray-400 group-hover:text-c-medium-purple transition-colors duration-200" />
      </div>
      <span className="text-sm text-gray-500 group-hover:text-c-medium-purple font-medium transition-colors duration-200">
        New document
      </span>
    </button>
  );
};

export default CreateDocument;
