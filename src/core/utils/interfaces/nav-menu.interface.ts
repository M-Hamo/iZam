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
