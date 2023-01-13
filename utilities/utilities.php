<?php
/**
 * Utilities
 *
 * @package tenup\BlockComponents
 */

namespace tenup\BlockComponents\Utilities;

use tenup\BlockComponents\Components\Icons;

/**
 * Standard SVG settings for escaping through `wp_kses()` function.
 *
 * @return array Array of allowed HTML tags and their allowed attributes.
 */
function svg_kses_allowed_html() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$svg_args = [
		'svg'            => [
			'version'           => true,
			'class'             => true,
			'fill'              => true,
			'height'            => true,
			'xml:space'         => true,
			'xmlns'             => true,
			'xmlns:xlink'       => true,
			'viewbox'           => true,
			'enable-background' => true,
			'width'             => true,
			'x'                 => true,
			'y'                 => true,
		],
		'path'           => [
			'clip-rule'       => true,
			'd'               => true,
			'fill'            => true,
			'fill-rule'       => true,
			'stroke'          => true,
			'stroke-width'    => true,
			'stroke-linecap'  => true,
			'stroke-linejoin' => true,
			'class'           => true,
		],
		'g'              => [
			'clip-rule'    => true,
			'd'            => true,
			'transform'    => true,
			'fill'         => true,
			'fill-rule'    => true,
			'stroke'       => true,
			'stroke-width' => true,
			'class'        => true,
		],
		'rect'           => [
			'clip-rule'    => true,
			'd'            => true,
			'transform'    => true,
			'fill'         => true,
			'fill-rule'    => true,
			'stroke'       => true,
			'stroke-width' => true,
			'width'        => true,
			'height'       => true,
			'rx'           => true,
			'ry'           => true,
			'x'            => true,
			'y'            => true,
			'class'        => true,
		],
		'polygon'        => [
			'clip-rule'    => true,
			'd'            => true,
			'fill'         => true,
			'fill-rule'    => true,
			'stroke'       => true,
			'stroke-width' => true,
			'points'       => true,
			'class'        => true,
		],
		'circle'         => [
			'clip-rule'    => true,
			'd'            => true,
			'fill'         => true,
			'fill-rule'    => true,
			'stroke'       => true,
			'stroke-width' => true,
			'cx'           => true,
			'cy'           => true,
			'r'            => true,
			'class'        => true,
		],
		'lineargradient' => [
			'id'                => true,
			'gradientunits'     => true,
			'x'                 => true,
			'y'                 => true,
			'x2'                => true,
			'y2'                => true,
			'gradienttransform' => true,
		],
		'stop'           => [
			'offset' => true,
			'style'  => true,
		],
		'image'          => [
			'height'     => true,
			'width'      => true,
			'xlink:href' => true,
		],
		'defs'           => [
			'clipPath' => true,
		],
		'style'          => true,
	];

	return array_merge( $kses_defaults, $svg_args );
}

/**
 * Registers an icon set.
 *
 * @param  array $options Array containing the properties of the icon set.
 * @return void
 */
function register_icons( $options ) {
	Icons::get_instance()->register( $options['name'], $options );
}

/**
 * Outputs the markup of the desired icon.
 *
 * @param string $icon_set  Name of the icon set.
 * @param string $icon_name Name of the icon.
 */
function render_icon( $icon_set, $icon_name ) {
	Icons::get_instance()->render_icon( $icon_set, $icon_name );
}

/**
 * Retrieves the icon object.
 *
 * @param  string $icon_set  Name of the icon set.
 * @param  string $icon_name Name of the icon.
 * @return \tenup\BlockComponents\Icon|null
 */
function get_icon( $icon_set, $icon_name ) {
	return Icons::get_instance()->get_icon( $icon_set, $icon_name );
}

/**
 * Retrieve a serialized icon set.
 *
 * @param  string $icon_set Name of the icon set.
 * @return array
 */
function get_serialized_icons( $icon_set ) {
	return Icons::get_instance()->get_serialized_icons( $icon_set );
}
