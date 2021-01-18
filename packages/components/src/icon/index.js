/**
 * WordPress dependencies
 */
import {
	cloneElement,
	createElement,
	Component,
	isValidElement,
} from '@wordpress/element';
import { SVG } from '@wordpress/primitives';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import Dashicon from '../dashicon';

function Icon( { icon = null, size, ...additionalProps } ) {
	if ( 'string' === typeof icon ) {
		deprecated( '`string` type for `icon` property in `Icon component`', {
			alternative: '`@wordpress/icons` SVG icons or custom SVG icons',
		} );
		return <Dashicon icon={ icon } { ...additionalProps } />;
	}

	if ( icon && Dashicon === icon.type ) {
		deprecated(
			'passing `Dashicon component` for `icon` property in `Icon component`',
			{
				alternative: '`@wordpress/icons` SVG icons or custom SVG icons',
			}
		);
		return cloneElement( icon, {
			...additionalProps,
		} );
	}

	// Icons should be 24x24 by default.
	const iconSize = size || 24;
	if ( 'function' === typeof icon ) {
		if ( icon.prototype instanceof Component ) {
			return createElement( icon, {
				size: iconSize,
				...additionalProps,
			} );
		}

		return icon( { size: iconSize, ...additionalProps } );
	}

	if ( icon && ( icon.type === 'svg' || icon.type === SVG ) ) {
		const appliedProps = {
			width: iconSize,
			height: iconSize,
			...icon.props,
			...additionalProps,
		};

		return <SVG { ...appliedProps } />;
	}

	if ( isValidElement( icon ) ) {
		return cloneElement( icon, {
			size: iconSize,
			...additionalProps,
		} );
	}

	return icon;
}

export default Icon;
