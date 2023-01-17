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


 // Useful global constants.
define( 'EXAMPLE_PLUGIN_TEMPLATE_URL', plugin_dir_url( __FILE__ ) );
define( 'EXAMPLE_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'EXAMPLE_PLUGIN_DIST_PATH', EXAMPLE_PLUGIN_PATH . 'dist/' );
define( 'EXAMPLE_PLUGIN_DIST_URL', EXAMPLE_PLUGIN_TEMPLATE_URL . '/dist/' );
define( 'EXAMPLE_PLUGIN_INC', EXAMPLE_PLUGIN_PATH . 'includes/' );
define( 'EXAMPLE_PLUGIN_BLOCK_DIR', EXAMPLE_PLUGIN_INC . 'blocks/' );
define( 'EXAMPLE_PLUGIN_BLOCK_DIST_DIR', EXAMPLE_PLUGIN_PATH . 'build/blocks/' );

// Require Composer autoloader if it exists.
if ( file_exists( EXAMPLE_PLUGIN_PATH . 'vendor/autoload.php' ) ) {
	require_once EXAMPLE_PLUGIN_PATH . 'vendor/autoload.php';
}

add_action( 'init', __NAMESPACE__ . '\register_block' );
/**
 * Register the block
 */
function register_block() {

	// $dir               = dirname( __FILE__ );
	// $script_asset_path = "$dir/build/index.asset.php";
	// $index_js          = 'build/index.js';
	// $script_asset      = require $script_asset_path;
	// wp_register_script(
	// 	'editor-script',
	// 	plugins_url( $index_js, __FILE__ ),
	// 	$script_asset['dependencies'],
	// 	$script_asset['version'],
	// 	false
	// );

	if ( file_exists( EXAMPLE_PLUGIN_BLOCK_DIST_DIR ) ) {
		$block_json_files = glob( EXAMPLE_PLUGIN_BLOCK_DIST_DIR . '*/block.json' );
		foreach ( $block_json_files as $filename ) {
			$block_folder = dirname( $filename );
			$block = register_block_type( $block_folder );
		};
	};

};
