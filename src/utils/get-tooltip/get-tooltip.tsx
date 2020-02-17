import React from 'react';
import tippy from 'tippy.js';

import styles from './get-tooltip.module.scss';

const bitDevPrefix = 'https://bit.dev/bit/marketing';

type DictionaryOptions = {
	[key: string]: string;
};
const componentDictionary: DictionaryOptions = {
	heading: `${bitDevPrefix}/concrete/heading`,
	paragraph: `${bitDevPrefix}/base/paragraph`,
	mainSection: `${bitDevPrefix}/sections/main-section`,
	image: `${bitDevPrefix}/concrete/image`,
	primaryButton: `${bitDevPrefix}/base/primary-button`,
	ctaButton: `${bitDevPrefix}/concrete/cta-button`,
	iconLine: `${bitDevPrefix}/concrete/icon-line`,
	marketingCard: `${bitDevPrefix}/concrete/marketing-card`,
	label: `${bitDevPrefix}/base/label`,
	commentCarousel: 'https://bit.dev/bit/web/components/comment-carousel',
	slackLink: `${bitDevPrefix}/community-links/slack-link`,
	twitterLink: `${bitDevPrefix}/community-links/twitter-link`,
	githubLink: `${bitDevPrefix}/community-links/github-link`,
	twitterCard: `${bitDevPrefix}/concrete/twitter-card`,
	separator: `${bitDevPrefix}/base/separator`,
	summaryCards: `${bitDevPrefix}/sections/summary-cards`,
	devSection: `${bitDevPrefix}/sections/dev-section`,
	autoSection: `${bitDevPrefix}/sections/auto-section`,
	ctaSection: `${bitDevPrefix}/sections/cta`,
	buildSection: `${bitDevPrefix}/sections/build-section`,
	deploySection: `${bitDevPrefix}/sections/deploy-section`,
	reuseSection: `${bitDevPrefix}/sections/reuse`,
	communitySection: `${bitDevPrefix}/sections/community`,
};

export function getTooltip() {
	return tippy(document.querySelectorAll(`[data-bit-id]`), {
		content(reference) {
			const id: string = reference.getAttribute('data-bit-id') || ''; // TODO - handle when it is undefined
			return `<a allowHTML id=${id} target="_blank" href=${componentDictionary[id]}>${id}</a>`;
		},
		delay: [200, 0],
		placement: 'left-start',
		interactive: true,
        hideOnClick: false,
        ignoreAttributes: true,
        theme: styles.tooltip,
        interactiveBorder: 20,
	});
}
