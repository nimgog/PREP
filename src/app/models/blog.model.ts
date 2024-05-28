export type PageAttributes = {
  title: string;
  description: string;
  thumbnailImageUrl: string;
  date: string;
  published?: boolean;
};

// Add more cornerstone page specific attributes here
export type CornerstonePageAttributes = PageAttributes & {};

// Add more supporting page specific attributes here
export type SupportingPageAttributes = PageAttributes & {};

export type BlogContentImage = {
  type: 'image';
  src: string;
  alt: string;
  srcset: string;
  width?: number;
  height?: number;
  fill: boolean;
  priority: boolean;
};

export type BlogContentMarkdown = {
  type: 'markdown';
  text: string;
};

export type BlogContentPart = BlogContentImage | BlogContentMarkdown;
