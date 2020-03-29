import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Slider, { Settings } from 'react-slick';
import debounce from 'lodash.debounce';
import ResizeObserver from 'resize-observer-polyfill';

//@ts-ignore
import createRef from 'react-create-ref';

import { Testimonial, TestimonialObj } from '../testimonial';
import './slick-slider.module.scss';

import styles from './carousel.module.scss';
import sliderStyles from './slick-slider.module.scss';

type CommentCarouselProps = {
	/**
	 *  Testimonials show in the carousel. They include:
	 * -   content - main txt
	 * -   avatar - url to user's image
	 * -   name - owner name to display
	 * -   description - owner sub title
	 */
	content: TestimonialObj[];
	/**
	 * Props override for the ReactSlick carousel
	 */
	slider?: Settings;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * A responsive carousel based on `react-slick`, showing real user testimonials.
 *
 * @example
 * const bitTestimonials = [
 * 		{ name: 'Barbra', description: 'head of barbering', content: 'Great scissors!', avatar: '...', }
 * 		{ name: 'Roberto', description: 'Robber of Bertos', content: 'Easy to carry.', avatar: '...', }
 * ];
 *
 * <CommentCarousel content={bitTestimonials} />
 */

export default class CommentCarousel extends PureComponent<CommentCarouselProps> {
	state = { active: 0, slidesToShow: 3 };

	private elemRef = createRef();

	componentDidMount() {
		if (this.elemRef.current) {
			this._resizeObserver.observe(this.elemRef.current);
		}
	}

	componentWillUnmount() {
		if (this.elemRef.current) {
			this._resizeObserver.unobserve(this.elemRef.current);
		}
	}

	_resizeObserver = new ResizeObserver((entries, observer) => {
		const width = entries[0] && entries[0].contentRect && entries[0].contentRect.width;
		if (!width) return;

		this.handleResize(width);
	});

	_handleResize = (width: number) => {
		const slidesToShow = 920 <= width ? 3 : 1;

		if (slidesToShow === this.state.slidesToShow) return;

		this.setState({ slidesToShow });
	};

	handleResize = debounce(this._handleResize, 180, {
		leading: true,
	});

	handleSlideChange = (currentSlide: number, nextSlide: number) => {
		this.setState({ active: nextSlide });
	};

	private sliderOptions: Settings = {
		dots: true,
		infinite: true,
		centerMode: true,
		centerPadding: '0',
		focusOnSelect: true,
		speed: 500,
	};

	render() {
		const { content, slider, className, ...rest } = this.props;

		return (
			<div
				data-bit-id="bit.evangelist/atom/comment-carousel"
				{...rest}
				className={classNames(
					styles.carouselWrapper,
					sliderStyles.carouselTheme,
					className
				)}
				ref={this.elemRef}
			>
				<Slider
					{...this.sliderOptions}
					{...slider}
					beforeChange={this.handleSlideChange}
					slidesToShow={this.state.slidesToShow}
					className={classNames(
						styles.carousel,
						this.sliderOptions && this.sliderOptions.className
					)}
				>
					{content.map((x, index) => (
						<Testimonial
							key={index}
							data={x}
							active={this.state.active === index}
							className={styles.testimonial}
						/>
					))}
				</Slider>
			</div>
		);
	}
}
