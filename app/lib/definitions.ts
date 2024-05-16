// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
};

export type PagesTable = {
  id: string;
  userId: string;
  title: string;
  metatitle: string;
  metadescription: string;
  metakeywords: string;
  html: string;
  url: string;
  state: string;
};

export type PageForm = {
  id: string;
  userId: string;
  title: string;
  html: string;
  modified: Date;
};
