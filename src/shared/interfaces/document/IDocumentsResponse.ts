import type { IDocument } from './IDocument';

export interface IDocumentsResponse {
  userDocuments: IDocument[];
  editorDocuments: IDocument[];
}
