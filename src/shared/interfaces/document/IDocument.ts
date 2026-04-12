export interface IDocument {
  documentId: string;
  title: string;
  documentContent: Record<string, unknown>;
  documentPreview: string;
  documentOwnerId: string;
  createdAt: string;
  updatedAt: string | null;
}
