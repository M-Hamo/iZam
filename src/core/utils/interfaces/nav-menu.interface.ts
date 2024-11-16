export interface NavItem extends Children {
  children?: Children[];
  opened?: boolean;
}

export interface Children {
  id: number;
  title: string;
  target?: string;
  visible?: boolean;
  editTitle?: boolean;
}

export interface TrackNavItem {
  id: number;
  from: number;
  to: number;
}

export interface HeaderItem {
  title?: string;
  icon?: string;
}

export interface UserInfo {
  name: string;
  description: string;
  img: string;
}
