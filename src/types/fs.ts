/**
 * Filesystem domain model.
 *
 * Pure type module — zero runtime imports. Everything that walks the
 * Finder tree (data/, store/location, Finder, Home, Text, Image, Photos)
 * consumes these types.
 */

export type FileType = "txt" | "url" | "img" | "pdf";

export type FolderKind = "folder";
export type FileKind = "file";
export type FsKind = FolderKind | FileKind;

/** The `description` field is either plain paragraphs or resume-style entries. */
export interface DescriptionEntry {
  heading: string;
  meta?: string;
  bullets: string[];
}
export type Description = Array<string | DescriptionEntry>;

interface FsNodeBase {
  id: number;
  name: string;
  icon: string;
}

export interface FolderNode extends FsNodeBase {
  kind: FolderKind;
  children: FsNode[];
  /** Tailwind position classes for desktop icons (project folders only). */
  desktopPosition?: string;
}

interface FileNodeBase extends FsNodeBase {
  kind: FileKind;
  fileType: FileType;
}

export interface TxtFileNode extends FileNodeBase {
  fileType: "txt";
  description?: Description;
  subtitle?: string;
  image?: string;
}

export interface UrlFileNode extends FileNodeBase {
  fileType: "url";
  href?: string;
}

export interface ImgFileNode extends FileNodeBase {
  fileType: "img";
  imageUrl?: string;
}

export interface PdfFileNode extends FileNodeBase {
  fileType: "pdf";
}

export type FileNode = TxtFileNode | UrlFileNode | ImgFileNode | PdfFileNode;

export type FsNode = FileNode | FolderNode;

export type LocationKey = "work" | "about" | "resume" | "trash";

/** A root folder in Finder's sidebar; `type` is its sidebar key. */
export interface Location extends FolderNode {
  type: LocationKey;
}

export type LocationMap = Record<LocationKey, Location>;

export interface Project {
  id: number;
  name: string;
  type: string;
  summary: string;
  description: string[];
  tags: string[];
  year: string;
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  desktopPosition: string;
}

export interface Social {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
}

export interface TechStack {
  category: string;
  items: string[];
}

export interface GalleryImage {
  id: number;
  img: string;
}
