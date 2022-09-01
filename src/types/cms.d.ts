interface QueryResult<T> {
  results: T[];
  pagination: Pagination;
}

interface LoginResult {
  data: {
    token: string;
  };
}

interface LoginPayload {
  email: string;
  password: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Recording {
  id: number;
  Title: string;
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  File: File;
  createdBy: User;
  updatedBy: User;
}

interface Tab {
  id: number;
  Title: string;
  version: number;
  instrument: string;
  Author: string;
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  File: File;
  createdBy: User;
  updatedBy: User;
}

interface Lyrics {
  id: number;
  Title: string;
  version: number;
  Author: string;
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  File: File;
  createdBy: User;
  updatedBy: User;
}

interface Event {
  id: number;
  Title: string;
  LocationName: string;
  LocationUrl: string;
  TicketsUrl: string;
  Date: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  File: File;
  createdBy: User;
  updatedBy: User;
}

interface Image {
  id: number;
  Title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  File: File;
  createdBy: User;
  updatedBy: User;
}

interface File {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: null;
  height: null;
  formats: null;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: Provider;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

enum EXT {
  Wav = '.wav',
}

enum MIME {
  AudioWav = 'audio/wav',
}

enum Provider {
  AwsS3 = 'aws-s3',
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
}
