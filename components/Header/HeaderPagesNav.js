import Link from "next/link";

export const HeaderPagesNav = ({ link, text }) => {
	return (
		<li>
			<Link href={link}>
				<a>{text}</a>
			</Link>
		</li>
	);
};
