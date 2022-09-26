import { StaticImageData } from "next/image";
import { ReactNode } from "react";
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
    copy: any
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
