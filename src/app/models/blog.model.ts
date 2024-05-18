export type PageAttributes = {
  title: string;
  description: string;
  thumbnailImageUrl: string;
  date: string;
  published?: boolean;
  tags?: string;
};

// Add more cornerstone page specific attributes here
export type CornerstonePageAttributes = PageAttributes & {};

// Add more supporting page specific attributes here
export type SupportingPageAttributes = PageAttributes & {};
