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
define( 'EXAMPLE_PLUGIN_DIST_PATH', EXAMPLE_PLUGIN_PATH . 'build/' );
define( 'EXAMPLE_PLUGIN_DIST_URL', EXAMPLE_PLUGIN_TEMPLATE_URL . '/build/' );
define( 'EXAMPLE_PLUGIN_INC', EXAMPLE_PLUGIN_PATH . 'includes/' );
define( 'EXAMPLE_PLUGIN_BLOCK_DIR', EXAMPLE_PLUGIN_INC . 'blocks/' );
define( 'EXAMPLE_PLUGIN_BLOCK_DIST_DIR', EXAMPLE_PLUGIN_PATH . 'build/blocks/' );

add_action( 'init', __NAMESPACE__ . '\register_block' );
/**
 * Register the block
 */
function register_block() {

	if ( file_exists( EXAMPLE_PLUGIN_BLOCK_DIST_DIR ) ) {
		$block_json_files = glob( EXAMPLE_PLUGIN_BLOCK_DIST_DIR . '*/block.json' );
		foreach ( $block_json_files as $filename ) {
			$block_folder = dirname( $filename );
			register_block_type( $block_folder );
		};
	};
};

add_action( 'enqueue_block_assets', __NAMESPACE__ . '\enqueue_block_editor_scripts' );

/**
 * Enqueue Block Editor Scripts
 */
function enqueue_block_editor_scripts() {
	$asset_file = include EXAMPLE_PLUGIN_DIST_PATH . 'index.asset.php';

	wp_enqueue_script(
		'example-block-editor-script',
		EXAMPLE_PLUGIN_DIST_URL . 'index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
}

/**
 * Register Book Custom Post Type
 */
function register_book_custom_post_type() {
	$labels = array(
		'name'          => __( 'Books', 'tenup' ),
		'singular_name' => __( 'Book', 'tenup' ),
		'menu_name'     => __( 'Books', 'tenup' ),
		'view_item'     => __( 'View book', 'tenup' ),
	);

	$args = [
		'labels'              => $labels,
		'menu_icon'           => 'dashicons-book',
		'supports'            => [ 'title', 'editor', 'meta', 'custom-fields', 'revisions' ],
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 20,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'template'            => [],
		'template_lock'       => false,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
	];

	register_post_type( 'books', $args );

	register_post_meta(
		'books',
		'author',
		[
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		]
	);

	register_post_meta(
		'books',
		'isbn',
		[
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		]
	);

	register_post_meta(
		'books',
		'price',
		[
			'type'         => 'number',
			'single'       => true,
			'show_in_rest' => true,
		]
	);

	register_post_meta(
		'books',
		'is_featured',
		[
			'type'         => 'boolean',
			'single'       => true,
			'show_in_rest' => true,
		]
	);
}

add_action( 'init', __NAMESPACE__ . '\register_book_custom_post_type' );


add_action(
	'after_setup_theme',
	function() {
		remove_theme_support( 'core-block-patterns' );
	}
);


/**
 * Remove page level patterns
 */
function example_remove_page_level_patterns() {
	$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();
	foreach ( $patterns as $pattern ) {
		if (
			! empty( $pattern['blockTypes'] ) &&
			in_array( 'core/post-content', $pattern['blockTypes'] )
		) {
			unregister_block_pattern( $pattern['name'] );
			$pattern['blockTypes'] = array_diff( $pattern['blockTypes'], array( 'core/post-content' ) );
			register_block_pattern( $pattern['name'], $pattern );
		}
	}
}

add_action( 'init', __NAMESPACE__ . '\example_remove_page_level_patterns' );
