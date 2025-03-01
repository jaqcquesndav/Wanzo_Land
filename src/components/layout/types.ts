export interface NavigationItem {
  name: string;
  href: string;
  children?: {
    name: string;
    href: string;
    description: string;
  }[];
}