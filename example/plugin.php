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
};
