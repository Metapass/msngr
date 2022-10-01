export interface MessageEmbed {
    author?: Author;
    title: string;
    url: string;
    description: string;
    color: number;
    fields: Field[];
    thumbnail: Image;
    image: Image;
    footer: Footer;
}
export interface Author {
    name: string;
    url: string;
    iconURL: string;
}
export interface Field {
    name: string;
    value: string;
    inline?: boolean;
}
export interface Footer {
    text: string;
    iconURL: string;
}
export interface Image {
    url: string;
}
