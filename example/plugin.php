<?php
/**
 * Plugin Name: Example Plugin
 * Plugin URI:
 * Description: This is a basic block to show how the Content Picker can be used.
 * Version:     0.1.0
 * Author:      10up
 * Author URI:  https://10up.com
 * Text Domain: example
 * Domain Path: /languages
 *
 * @package HelloWorld
 */

namespace HelloWorld;

add_action( 'init', __NAMESPACE__ . '\register_block' );
/**
 * Register the block
 */
function register_block() {

	$dir               = dirname( __FILE__ );
	$script_asset_path = "$dir/build/index.asset.php";
	$index_js          = 'build/index.js';
	$script_asset      = require $script_asset_path;
	wp_register_script(
		'editor-script',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		false
	);

	register_block_type(
		'example/hello-world',
		[
			'editor_script' => 'editor-script',
		]
	);

	register_block_type(
		__DIR__ . '/src/blocks/link-example',
		[
			'editor_script'   => 'editor-script',
			'render_callback' => function( $attributes, $content, $block ) {
				$title = $attributes['title'];

				$link_one_url   = isset( $attributes['url'] ) ? $attributes['url'] : '';
				$link_one_label = isset( $attributes['text'] ) ? $attributes['text'] : '';

				$link_two_url   = isset( $attributes['urlTwo'] ) ? $attributes['urlTwo'] : '';
				$link_two_label = isset( $attributes['textTwo'] ) ? $attributes['textTwo'] : '';

				$wrapper_attributes = get_block_wrapper_attributes();

				ob_start();
				?>
				<div <?php echo wp_kses_post( $wrapper_attributes ); ?>>
					<h2><?php echo wp_kses_post( $title ); ?></h2>
					<a href="<?php echo esc_url( $link_one_url ); ?>"><?php echo wp_kses_post( $link_one_label ); ?></a>
					<a href="<?php echo esc_url( $link_two_url ); ?>"><?php echo wp_kses_post( $link_two_label ); ?></a>
				</div>
				<?php
				return ob_get_clean();
			},
		]
	);
};
