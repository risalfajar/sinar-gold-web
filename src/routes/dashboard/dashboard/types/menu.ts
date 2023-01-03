export type Menu = {
    title: string
    link?: string
    isExpanded?: boolean
    subMenus?: SubMenu[]
}

export type SubMenu = {
    title: string
    link: string
}
