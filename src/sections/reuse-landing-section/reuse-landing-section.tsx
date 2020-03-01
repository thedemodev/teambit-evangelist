import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { PossibleSizes } from '../../constants/sizes';

import { Paragraph } from '../../components/base/paragraph';
// import { Image } from '../../components/concrete/image';
// import { IconLine } from '../../components/concrete/icon-line';
import { H1 } from '../../components/concrete/heading';
import { PrimaryButton } from '../../components/base/primary-button';
import { CtaButton } from '../../components/concrete/cta-button';

import { text, marginCenter } from '../../components/layout/align';

import styles from './reuse-landing-section.module.scss';
import { ThemedText } from '../../components/base/themed-text';
import { IconLine } from '../../components/concrete/icon-line';
import { Link } from '../../components/base/link';

const iconsArray = [
	'logo-react',
	'logo-vue',
	'logo-angular',
	'logo-web-components',
	'logo-ts',
	'logo-js',
];

export function ReuseLandingSection(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className={classNames(styles.reuseLandingSection, text.center, props.className)}
		>
			<H1 size={PossibleSizes.sm} className={styles.headline}>
				The reusable component ecosystem <br />
				for modern applications
			</H1>
			<Paragraph size={PossibleSizes.lg} className={styles.paragraph}>
				Bit is a scalable and collaborative way to reuse components. It’s everything you{' '}
				<br />
				need from local development to cross-project collaboration. Try it for free.
			</Paragraph>
			<div className={classNames(styles.buttons)}>
				<Link href="https://bit.dev/signup">
					<CtaButton elevation="medium">Reuse your components</CtaButton>
				</Link>
				<div style={{ height: '20px', width: '20px' }} />
				<Link external href="https://docs.bit.dev/docs/quick-start">
					<PrimaryButton elevation="medium">Learn more</PrimaryButton>
				</Link>
			</div>
			<IconLine icons={iconsArray} className={marginCenter} />
		</div>
	);
}
