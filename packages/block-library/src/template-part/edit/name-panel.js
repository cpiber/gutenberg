/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function TemplatePartNamePanel( { postId } ) {
	const [ title, setTitle ] = useEntityProp(
		'postType',
		'wp_template_part',
		'title',
		postId
	);

	return (
		<PanelBody>
			<TextControl
				label={ __( 'Template title' ) }
				value={ title }
				onChange={ ( value ) => {
					setTitle( value );
				} }
				onFocus={ ( event ) => event.target.select() }
			/>
		</PanelBody>
	);
}
