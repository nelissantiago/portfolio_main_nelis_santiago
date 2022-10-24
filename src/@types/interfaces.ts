import { StaticImageData } from "next/image";
import uuuid from 'uuid'
import { Newaccount, Tag } from "@prisma/client";

export interface FrieldsProps {
    name: string;
    profissao: string;
    avatar: string;
    buttonCopy: string;
    href: string;
    copy: any
}

export interface HomeProps{
    logoImg: string;
    title: string;
    typerwriter: string;
    paragraph: string;
    copy?: any
}

export interface TabProps {
    name: string;
    nametwo: string;
    title: string;
    titletwo: string;
    pargraph: string;
    pargraphtwo: string;
    link: string;
    linktwo: string;
}

export interface ServicesProps {
    title: string;
    paragraph: string;
    icon: any
}

export interface ProjectProps {
    title: string;
    paragraph: string;
}

export interface KnowledgeProps {
    img: StaticImageData;
    tooltip: string;
    width: number;
    height: number;
}

type Avatar = | 
	{
		alt: string;
		href?: string;
		url: string;
};

export interface DiscordProps {
	username: string;
	discriminator: string;
	avatar: Avatar;
    Image: string;
	StatusDiscord: {
		status: string;
	}
    activities: {
		name: string;
		type: number;
		state: string;
		details: string;

		assets?: {
			large_image: string;
			large_text: string;
			small_image: string;
			small_text: string;
		}

		timestamps?: {
			start: number;
			end: number;
		}
		application_id?: string;
	};
}


export type ITag = Tag;
export type INewAccount = Newaccount & {
  tags: ITag[];
};


export type PostFrontMatter = {
    title: string;
    date: string;
    link: string;
    tags: string[];
    lastmod?: string;
    Released: string;
    type: string;
    draft?: boolean;
    summary?: string;
    images?: string[];
    authors?: string[];
    layout?: string;
    readingTime: any;
    canonicalUrl?: string;
    name: string;
  };
  
  export type  ContentFrontMatter = {
    name: string;
    summary?: string;
    link?: string;
    tags?: string[];
    image?: string[];
    layout?: string;
    slug: string;
  }

  export type Toc = {
    value: string;
    depth: number;
    url: string;
  }[];
  

  export type AuthorFrontMatter = {
    layout?: string;
    name: string;
    shortname: string;
    avatar: string;
    occupation: string;
    company: string;
    resume: string;
    email: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  
export interface newBook {
    id: uuuid;
    
}
