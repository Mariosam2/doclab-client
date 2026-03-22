export interface IDocument {
  documentId: string;
  title: string;
  documentContent: Record<string, unknown>;
  documentOwnerId: string;
  createdAt: string;
  updatedAt: string | null;
}
