/* eslint-disable @next/next/no-img-element */
import { useLanyard } from "react-use-lanyard";
import styles from './styles.module.scss';
import { ThemeSwitch } from "../utils/Darktoggle";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { DiscordProps } from "../../@types/interfaces";
import { LoadingDiscord } from "./Loading";
import { FragementParticles } from "../utils/particles";
import { Game } from "../utils/CreateSVG";


export function Status() {
	const { loading, status } = useLanyard({
		userId: "873617725103153202",
		socket: true,
	});

	if (loading) {
		return <LoadingDiscord />
	}

	function HandleProfile() {

		const name = status?.discord_user.username;
		const hastag = '#'
		const discriminator = status?.discord_user.discriminator;
		const Copy = name + hastag + discriminator;

		navigator.clipboard.writeText(Copy)
		
		toast(Copy, {
			delay: 1000,
			type: "success",
			className: styles.toast,
		})
	}

		const StatusDiscord: Array<DiscordProps> = [
		{
			username: status?.discord_user.username,
			discriminator: status?.discord_user.discriminator,
			
			avatar: {
				alt: 'Discord Avatar',
				url: `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.webp?size=2048`,
			},


			StatusDiscord: {
				status:  status?.discord_status === 'online' && '🟢' || status?.discord_status === "idle" && "🟡" || status?.discord_status === "dnd" && "🔴" || status?.discord_status === "offline" && "⚫" 
			},

			activities: {
				name: status?.activities[1]?.name,
				details: status?.activities[1]?.details,
				type: status?.activities[1]?.type,
				state: status?.activities[1]?.state,
				application_id: status?.activities[1]?.application_id,

				assets: {
					large_image: status?.activities[1]?.assets?.large_image,
					large_text: status?.activities[1]?.assets?.large_text,
					small_image: status?.activities[1]?.assets?.small_image,
					small_text: status?.activities[1]?.assets?.small_text,
				},

				timestamps: {
					start: status?.activities[1]?.timestamps?.start,
					end: status?.activities[1]?.timestamps?.end,
			},
				
		},
			 Image: `https://cdn.discordapp.com/app-assets/${status?.activities[1]?.application_id}/${status?.activities[1]?.assets?.large_image}.webp?size=2048`,
	}
];

	return (
		<>
			<main className={styles.main}>
			<div className={styles.darktoggle}><ThemeSwitch /></div>
				{StatusDiscord?.map(react => {
					return (
						<>
							<article className={styles.container}>
								<div className={styles.profile}>
									<img src={react.avatar.url} alt={react.avatar.alt}/>
									<strong onClick={HandleProfile}>{react.username}#{react.discriminator}</strong>
									<span className={styles.statusDiscord}>{react.StatusDiscord.status}</span>
								</div>
								{react.activities.state ? (
									<div className={styles.status}>
									<span className={styles.span}>Jogando<Game /> </span>
									<div className={styles.playing}>
										<img key={react.Image} src={react.Image} alt="" width={75} height={75} />
										<div className={styles.text}>
											{StatusDiscord?.map(react => {
											return (
												<>
													<span>{react.activities.name || !react.activities.state && <span>Não esta jogando...</span> }</span>
													<span>{react.activities.details}</span>
													<span>{react.activities.state}</span>
												</>
												) 
											})}
										</div>
									</div>
								</div>
								) : (
									<div className={styles.status}>
									<span className={styles.span}>Jogando<Game /> </span>
									<div className={styles.playing}>
										<h3>Não esta jogando...</h3>
									</div>
								</div>
								)}
							</article>
						</>
					)})}
			</main>
			<FragementParticles />
		</>
	)
}
	