import type { IDocument } from "../document/IDocument";

export interface IDocumentsResponse {
  userDocuments: IDocument[];
  editorDocuments: IDocument[];
}
